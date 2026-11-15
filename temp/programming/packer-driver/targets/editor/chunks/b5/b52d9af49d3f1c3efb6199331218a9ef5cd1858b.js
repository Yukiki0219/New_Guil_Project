System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, PhysicsSystem2D, RigidBody2D, CircleCollider2D, Contact2DType, Vec2, ERigidBody2DType, PHYSICS_2D_PTM_RATIO, SETTLE_SPEED, SETTLE_DURATION, GuliPhysics, _crd, PHYSICS_CONFIG;

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarble(extras) {
    _reporterNs.report("Marble", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSETTLE_SPEED(extras) {
    _reporterNs.report("SETTLE_SPEED", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSETTLE_DURATION(extras) {
    _reporterNs.report("SETTLE_DURATION", "./GameModel", _context.meta, extras);
  }

  _export("GuliPhysics", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      RigidBody2D = _cc.RigidBody2D;
      CircleCollider2D = _cc.CircleCollider2D;
      Contact2DType = _cc.Contact2DType;
      Vec2 = _cc.Vec2;
      ERigidBody2DType = _cc.ERigidBody2DType;
      PHYSICS_2D_PTM_RATIO = _cc.PHYSICS_2D_PTM_RATIO;
    }, function (_unresolved_2) {
      SETTLE_SPEED = _unresolved_2.SETTLE_SPEED;
      SETTLE_DURATION = _unresolved_2.SETTLE_DURATION;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "31535TiZexPIoWTjpgD3yS9", "GuliPhysics", undefined);

      __checkObsolete__(['Node', 'PhysicsSystem2D', 'RigidBody2D', 'CircleCollider2D', 'Collider2D', 'Contact2DType', 'IPhysics2DContact', 'Vec2', 'ERigidBody2DType', 'PHYSICS_2D_PTM_RATIO']);

      _export("PHYSICS_CONFIG", PHYSICS_CONFIG = {
        timestep: 1 / 120,
        maxSubSteps: 12,
        velocityIterations: 10,
        positionIterations: 10,
        restitution: 0.25,
        friction: 0.05,
        linearDamping: 1.6,
        mass: 1,
        settleSpeed: _crd && SETTLE_SPEED === void 0 ? (_reportPossibleCrUseOfSETTLE_SPEED({
          error: Error()
        }), SETTLE_SPEED) : SETTLE_SPEED,
        settleDuration: _crd && SETTLE_DURATION === void 0 ? (_reportPossibleCrUseOfSETTLE_DURATION({
          error: Error()
        }), SETTLE_DURATION) : SETTLE_DURATION
      });

      /** One Cocos Box2D world; manual scheduling only, never a second integrator/solver.
       * Invisible physics nodes are scene-root children at identity scale. The HUD projects
       * their snapshots separately, so Canvas resizing and the 0.87 visual tilt cannot change physics.
       */
      _export("GuliPhysics", GuliPhysics = class GuliPhysics {
        constructor(scene, model, config = {}) {
          this.bodies = new Map();
          this.contactPoints = [];
          this.config = void 0;
          this.root = void 0;
          this.system = PhysicsSystem2D.instance;
          this.previous = void 0;
          this.accumulator = 0;
          this.touched = false;
          this.colliders = new Set();
          this.point = new Vec2();
          this.disposed = false;
          this.model = model;

          if (!PhysicsSystem2D.PHYSICS_BOX2D && !PhysicsSystem2D.PHYSICS_BOX2D_WASM) {
            throw new Error('GULI requires the Cocos Box2D 2D physics backend.');
          }

          this.config = { ...PHYSICS_CONFIG,
            ...config
          };
          const s = this.system;
          this.previous = {
            auto: s.autoSimulation,
            timestep: s.fixedTimeStep,
            max: s.maxSubSteps,
            velocity: s.velocityIterations,
            position: s.positionIterations,
            sleep: s.allowSleep
          }; // Exactly one owner of stepping. No automatic engine step can duplicate our step.

          s.autoSimulation = false;
          s.fixedTimeStep = this.config.timestep;
          s.maxSubSteps = this.config.maxSubSteps;
          s.velocityIterations = this.config.velocityIterations;
          s.positionIterations = this.config.positionIterations;
          s.allowSleep = true;
          s.resetAccumulator();
          this.root = new Node('GuliPhysics');
          scene.addChild(this.root);
          s.on(Contact2DType.POST_SOLVE, this.onContact, this);
          this.syncBodies();
        }

        syncBodies() {
          for (const b of this.model.balls) {
            if (b.gone || this.bodies.has(b)) continue;
            const n = new Node(b.shooter ? 'ShooterBody' : 'TargetBody');
            n.active = false;
            this.root.addChild(n);
            n.setPosition(b.x, b.y);
            const body = n.addComponent(RigidBody2D);
            body.type = ERigidBody2DType.Dynamic;
            body.gravityScale = 0;
            body.fixedRotation = true;
            body.allowSleep = true;
            body.bullet = true;
            body.linearDamping = this.config.linearDamping;
            body.angularDamping = 0;
            body.enabledContactListener = true;
            body.linearVelocity = new Vec2(b.vx / PHYSICS_2D_PTM_RATIO, b.vy / PHYSICS_2D_PTM_RATIO);
            const collider = n.addComponent(CircleCollider2D);
            collider.radius = b.r; // Equal mass preserves existing gameplay despite the shooter's larger art/radius.

            collider.density = this.config.mass / (Math.PI * (b.r / PHYSICS_2D_PTM_RATIO) ** 2);
            collider.friction = this.config.friction;
            collider.restitution = this.config.restitution;
            this.colliders.add(collider);
            this.bodies.set(b, body);
            n.active = true;
          }
        }

        onContact(a, b, contact) {
          if (!this.colliders.has(a) || !this.colliders.has(b)) return; // Reporting only. Box2D has already applied the normal/tangent impulses once.

          const impulse = contact == null ? void 0 : contact.getImpulse();
          const normal = impulse ? Math.max(0, ...impulse.normalImpulses) : 0;
          if (normal > 0.00001) this.touched = true;

          if (normal > 30) {
            this.model.impacts.push(normal);

            if (this.contactPoints.length < 6) {
              const pa = a.node.getComponent(RigidBody2D).getWorldCenter(new Vec2());
              const pb = b.node.getComponent(RigidBody2D).getWorldCenter(new Vec2());
              this.contactPoints.push(new Vec2((pa.x + pb.x) / 2, (pa.y + pb.y) / 2));
            }
          }
        }

        advance(dt) {
          if (this.disposed || this.model.phase !== 'moving' || !Number.isFinite(dt) || dt <= 0) return false;
          this.syncBodies(); // Long browser stalls slow simulation rather than producing a giant step or premature settle.

          this.accumulator += Math.min(dt, this.config.timestep * this.config.maxSubSteps);
          this.model.impacts.length = 0;
          this.contactPoints.length = 0;
          let count = 0;

          while (this.accumulator + 1e-10 >= this.config.timestep && count++ < this.config.maxSubSteps && this.model.phase === 'moving') {
            this.accumulator -= this.config.timestep;
            this.touched = false;
            this.system.step(this.config.timestep); // getWorldCenter is in Cocos pixels; linearVelocity is Box2D metres/s.
            // Physical nodes never render or receive external transforms, so no scene-to-world
            // resync is needed. Reading the bodies avoids teleporting them via visual nodes.

            for (const [b, body] of this.bodies) {
              if (b.gone) continue;
              body.getWorldCenter(this.point);
              b.x = this.point.x;
              b.y = this.point.y;
              const v = body.linearVelocity;
              b.vx = v.x * PHYSICS_2D_PTM_RATIO;
              b.vy = v.y * PHYSICS_2D_PTM_RATIO;
            }

            this.model.afterPhysics(this.config.timestep, this.touched, this.config.settleSpeed, this.config.settleDuration); // Never remove or disable bodies from a collision callback (world is locked there).

            for (const [b, body] of this.bodies) {
              if (b.gone || !this.model.balls.includes(b)) {
                body.node.active = false;
                body.node.destroy();
                this.bodies.delete(b);
                const collider = body.node.getComponent(CircleCollider2D);
                if (collider) this.colliders.delete(collider);
              } else if (this.model.phase !== 'moving') body.sleep();
            }
          }

          if (this.model.phase !== 'moving') {
            this.accumulator = 0; // Rollback replaces snapshots: recreate missing bodies after the world unlocks.

            this.syncBodies();

            for (const body of this.bodies.values()) body.sleep();
          }

          return this.model.impacts.length > 0;
        }

        dispose() {
          if (this.disposed) return;
          this.disposed = true;
          this.system.off(Contact2DType.POST_SOLVE, this.onContact, this);
          this.root.active = false;
          this.root.destroy();
          this.bodies.clear();
          this.colliders.clear();
          const s = this.system,
                p = this.previous;
          s.autoSimulation = p.auto;
          s.fixedTimeStep = p.timestep;
          s.maxSubSteps = p.max;
          s.velocityIterations = p.velocity;
          s.positionIterations = p.position;
          s.allowSleep = p.sleep;
          s.resetAccumulator();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b52d9af49d3f1c3efb6199331218a9ef5cd1858b.js.map