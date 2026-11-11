import { Node, PhysicsSystem2D, RigidBody2D, CircleCollider2D, Collider2D, Contact2DType, IPhysics2DContact, Vec2, ERigidBody2DType, PHYSICS_2D_PTM_RATIO } from 'cc';
import { GameModel, Marble, SETTLE_SPEED, SETTLE_DURATION } from './GameModel';

export const PHYSICS_CONFIG = {
    timestep: 1 / 120,
    maxSubSteps: 12,
    velocityIterations: 10,
    positionIterations: 10,
    restitution: 0.25,
    friction: 0.05,
    linearDamping: 1.6,
    mass: 1,
    settleSpeed: SETTLE_SPEED,
    settleDuration: SETTLE_DURATION,
};
export type PhysicsConfig = typeof PHYSICS_CONFIG;

/** One Cocos Box2D world; manual scheduling only, never a second integrator/solver.
 * Invisible physics nodes are scene-root children at identity scale. The HUD projects
 * their snapshots separately, so Canvas resizing and the 0.87 visual tilt cannot change physics.
 */
export class GuliPhysics {
    readonly bodies = new Map<Marble, RigidBody2D>();
    readonly config: PhysicsConfig;
    readonly root: Node;
    private system = PhysicsSystem2D.instance;
    private previous: { auto: boolean; timestep: number; max: number; velocity: number; position: number; sleep: boolean };
    private accumulator = 0;
    private touched = false;
    private colliders = new Set<Collider2D>();
    private point = new Vec2();
    private disposed = false;

    constructor(scene: Node, readonly model: GameModel, config: Partial<PhysicsConfig> = {}) {
        if (!PhysicsSystem2D.PHYSICS_BOX2D && !PhysicsSystem2D.PHYSICS_BOX2D_WASM) {
            throw new Error('GULI requires the Cocos Box2D 2D physics backend.');
        }
        this.config = { ...PHYSICS_CONFIG, ...config };
        const s = this.system;
        this.previous = { auto: s.autoSimulation, timestep: s.fixedTimeStep, max: s.maxSubSteps,
            velocity: s.velocityIterations, position: s.positionIterations, sleep: s.allowSleep };
        // Exactly one owner of stepping. No automatic engine step can duplicate our step.
        s.autoSimulation = false;
        s.fixedTimeStep = this.config.timestep; s.maxSubSteps = this.config.maxSubSteps;
        s.velocityIterations = this.config.velocityIterations; s.positionIterations = this.config.positionIterations;
        s.allowSleep = true; s.resetAccumulator();
        this.root = new Node('GuliPhysics'); scene.addChild(this.root);
        s.on(Contact2DType.POST_SOLVE, this.onContact, this);
        this.syncBodies();
    }

    syncBodies() {
        for (const b of this.model.balls) {
            if (b.gone || this.bodies.has(b)) continue;
            const n = new Node(b.shooter ? 'ShooterBody' : 'TargetBody');
            n.active = false; this.root.addChild(n); n.setPosition(b.x, b.y);
            const body = n.addComponent(RigidBody2D);
            body.type = ERigidBody2DType.Dynamic; body.gravityScale = 0;
            body.fixedRotation = true; body.allowSleep = true; body.bullet = true;
            body.linearDamping = this.config.linearDamping; body.angularDamping = 0;
            body.enabledContactListener = true;
            body.linearVelocity = new Vec2(b.vx / PHYSICS_2D_PTM_RATIO, b.vy / PHYSICS_2D_PTM_RATIO);
            const collider = n.addComponent(CircleCollider2D);
            collider.radius = b.r;
            // Equal mass preserves existing gameplay despite the shooter's larger art/radius.
            collider.density = this.config.mass / (Math.PI * (b.r / PHYSICS_2D_PTM_RATIO) ** 2);
            collider.friction = this.config.friction; collider.restitution = this.config.restitution;
            this.colliders.add(collider); this.bodies.set(b, body); n.active = true;
        }
    }

    private onContact(a: Collider2D, b: Collider2D, contact: IPhysics2DContact | null) {
        if (!this.colliders.has(a) || !this.colliders.has(b)) return;
        // Reporting only. Box2D has already applied the normal/tangent impulses once.
        const impulse = contact?.getImpulse();
        const normal = impulse ? Math.max(0, ...impulse.normalImpulses) : 0;
        if (normal > 0.00001) this.touched = true;
        if (normal > 30) this.model.impacts.push(normal);
    }

    advance(dt: number): boolean {
        if (this.disposed || this.model.phase !== 'moving' || !Number.isFinite(dt) || dt <= 0) return false;
        this.syncBodies();
        // Long browser stalls slow simulation rather than producing a giant step or premature settle.
        this.accumulator += Math.min(dt, this.config.timestep * this.config.maxSubSteps);
        this.model.impacts.length = 0;
        let count = 0;
        while (this.accumulator + 1e-10 >= this.config.timestep && count++ < this.config.maxSubSteps && this.model.phase === 'moving') {
            this.accumulator -= this.config.timestep;
            this.touched = false;
            this.system.step(this.config.timestep);
            // getWorldCenter is in Cocos pixels; linearVelocity is Box2D metres/s.
            // Physical nodes never render or receive external transforms, so no scene-to-world
            // resync is needed. Reading the bodies avoids teleporting them via visual nodes.
            for (const [b, body] of this.bodies) {
                if (b.gone) continue;
                body.getWorldCenter(this.point);
                b.x = this.point.x; b.y = this.point.y;
                const v = body.linearVelocity;
                b.vx = v.x * PHYSICS_2D_PTM_RATIO; b.vy = v.y * PHYSICS_2D_PTM_RATIO;
            }
            this.model.afterPhysics(this.config.timestep, this.touched, this.config.settleSpeed, this.config.settleDuration);
            // Never remove or disable bodies from a collision callback (world is locked there).
            for (const [b, body] of this.bodies) {
                if (b.gone || !this.model.balls.includes(b)) {
                    body.node.active = false; body.node.destroy(); this.bodies.delete(b);
                    const collider = body.node.getComponent(CircleCollider2D); if (collider) this.colliders.delete(collider);
                } else if (this.model.phase !== 'moving') body.sleep();
            }
        }
        if (this.model.phase !== 'moving') {
            this.accumulator = 0;
            // Rollback replaces snapshots: recreate missing bodies after the world unlocks.
            this.syncBodies();
            for (const body of this.bodies.values()) body.sleep();
        }
        return this.model.impacts.length > 0;
    }

    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.system.off(Contact2DType.POST_SOLVE, this.onContact, this);
        this.root.active = false; this.root.destroy(); this.bodies.clear(); this.colliders.clear();
        const s = this.system, p = this.previous;
        s.autoSimulation = p.auto; s.fixedTimeStep = p.timestep; s.maxSubSteps = p.max;
        s.velocityIterations = p.velocity; s.positionIterations = p.position; s.allowSleep = p.sleep;
        s.resetAccumulator();
    }
}
