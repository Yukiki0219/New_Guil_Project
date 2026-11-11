/** Explicit opt-in preview test harness. Runs the real Cocos components/Box2D backend.
 * Open the Guli preview with ?guliPhysicsTest=1. Does not access player saves.
 */
import { Node, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, Vec2, CircleCollider2D } from 'cc';
import { GameModel, Marble, LEVELS, RADIUS } from './GameModel';
import { GuliPhysics, PHYSICS_CONFIG } from './GuliPhysics';

export async function verifyPhysics(scene: Node) {
    const report = document.createElement('pre');
    report.id = 'physics-verification';
    report.style.cssText = 'position:fixed;inset:0;margin:0;padding:24px;background:#102b30;color:#efffdc;z-index:99999;overflow:auto;white-space:pre-wrap;font:15px monospace';
    document.body.appendChild(report);
    const lines: string[] = [];
    const write = (s: string) => { lines.push(s); report.textContent = lines.join('\n'); console.log('[GuliPhysicsTest] ' + s); };
    const check = (ok: boolean, s: string) => { if (!ok) throw new Error(s); };
    const near = (a: number, b: number, tolerance: number, s: string) => check(Math.abs(a - b) <= tolerance, `${s}: ${a} vs ${b}`);
    const ball = (id: number, x: number, y: number, vx = 0, r = 30): Marble => ({ id,x,y,vx,vy:0,r,shooter:false,entered:true,gone:false });
    const clone = (m: GameModel) => {
        const c = new GameModel(m.levelIndex); c.balls = m.balls.map(b => ({ ...b })); c.used=m.used; c.knocked=[...m.knocked]; c.phase=m.phase; return c;
    };
    const finish = (p: GuliPhysics, frame = 1/60) => {
        let frames=0;
        while(p.model.phase === 'moving' && frames++ < Math.ceil(30/frame)) p.advance(frame);
        check(p.model.phase !== 'moving','Shot did not settle within 30 simulated seconds');
        check(p.model.balls.every(b=>Number.isFinite(b.x+b.y+b.vx+b.vy)), 'Non-finite body state');
    };
    const yieldFrame = () => new Promise<void>(resolve=>setTimeout(resolve,0));
    let passed=0,failed=0;
    const test = async (name: string, fn: ()=>void | Promise<void>) => {
        try { await fn(); passed++; write('PASS '+name); } catch(e) { failed++; write('FAIL '+name+': '+String(e)); }
        await yieldFrame();
    };
    write('Cocos 3.8.8 actual Box2D verification');
    write('PTM='+PHYSICS_2D_PTM_RATIO+'; config='+JSON.stringify(PHYSICS_CONFIG));
    await test('Engine unit conversion, collider radius and equal masses',()=>{
        const m=new GameModel(); m.shoot(0,0,0);
        const p=new GuliPhysics(scene,m,{linearDamping:0});
        try {
            for(const [b,body] of p.bodies) near(body.getMass(),1,1e-5,'mass');
            const b=m.balls[m.balls.length-1], y=b.y;
            p.advance(1/120); near(b.y-y,380/120,0.01,'position from velocity/time');
            near(p.bodies.get(b)!.linearVelocity.y,380/32,1e-6,'velocity unit');
        } finally { p.dispose(); }
    });
    await test('Restitution 0.25 / 0.3 / 0.45 / 0.6: momentum, energy and one response',()=>{
        for(const restitution of [.25,.3,.45,.6]) {
            const m=new GameModel(); m.balls=[ball(0,-50,0,320),ball(1,50,0)]; m.phase='moving';
            const p=new GuliPhysics(scene,m,{linearDamping:0,friction:0,restitution});
            try {
                p.advance(.1); p.advance(.1);
                const [a,b]=m.balls;
                near(a.vx,160*(1-restitution),.05,'incoming velocity');
                near(b.vx,160*(1+restitution),.05,'outgoing velocity');
                near(a.vx+b.vx,320,.05,'momentum');
                check(a.vx*a.vx+b.vx*b.vx<=320*320+.1,'energy increased');
                const v=b.vx; p.advance(.1); near(b.vx,v,.01,'duplicate impulse');
            } finally { p.dispose(); }
        }
    });
    await test('Unequal masses are resolved by the engine',()=>{
        const m=new GameModel(); m.balls=[ball(0,-50,0,320),ball(1,50,0)]; m.phase='moving';
        const p=new GuliPhysics(scene,m,{linearDamping:0,friction:0,restitution:.45});
        try {
            const second=Array.from(p.bodies.values())[1];
            // Test a real fixture mass change; production marbles remain equal mass.
            const collider=second.node.getComponent(CircleCollider2D)!;
            collider.density*=2; collider.apply();
            near(second.getMass(),2,1e-5,'second mass');
            p.advance(.1);p.advance(.1);
            near(m.balls[0].vx+2*m.balls[1].vx,320,.1,'mass-weighted momentum');
            near(m.balls[1].vx,320*1.45/3,.1,'mass-weighted restitution');
        } finally { p.dispose(); }
    });
    await test('Damping acts once, without a second manual friction pass',()=>{
        const m=new GameModel(); m.balls=[ball(0,0,0,32)]; m.phase='moving';
        const p=new GuliPhysics(scene,m);
        try { p.advance(.1); near(m.balls[0].vx,32/(1+PHYSICS_CONFIG.linearDamping/120)**12,.02,'Box2D damping'); }
        finally { p.dispose(); }
    });
    await test('Entire-ball boundary and deferred counting',()=>{
        const m=new GameModel(); m.balls=[ball(0,RADIUS+30,0),ball(1,0,0,10)]; m.phase='moving';
        const p=new GuliPhysics(scene,m);
        try {
            p.advance(1/120); check(!m.balls[0].gone,'tangent incorrectly out');
            // Move through the boundary using engine velocity, not a visual-node teleport.
            p.bodies.get(m.balls[0])!.linearVelocity=new Vec2(.1,0);
            p.advance(1/120); check(m.balls[0].gone,'fully outside not detected'); check(m.knocked.length===0,'counted before settling');
            finish(p); check(m.knocked.length===1,'not counted exactly once');
        } finally { p.dispose(); }
    });
    await test('Low speed must persist, collisions reset quiet time, no 15-second forced result',()=>{
        const m=new GameModel(); m.balls=[ball(0,0,0,1)]; m.phase='moving';
        const p=new GuliPhysics(scene,m);
        try {
            p.advance(.1);p.advance(.1);check(m.phase==='moving','settled too early');
            p.bodies.get(m.balls[0])!.linearVelocity=new Vec2(.2,0);
            p.advance(1/120);check(m.quiet===0,'speed did not reset quiet time');
            m.elapsed=16;p.advance(1/120);check(m.phase==='moving','forced timeout'); finish(p);
        } finally { p.dispose(); }
    });
    await test('Pause (no advance), resume and replay cleanup',()=>{
        const previous=PhysicsSystem2D.instance.autoSimulation;
        const m=new GameModel();m.shoot(-100,-85,.65);const p=new GuliPhysics(scene,m);
        p.advance(.1);const before=JSON.stringify(m.balls); const elapsed=m.elapsed;
        const positions=Array.from(p.bodies.values()).map(b=>b.getWorldCenter(new Vec2()));
        check(!PhysicsSystem2D.instance.autoSimulation,'automatic duplicate stepping enabled');
        // Simulate the director reaching its automatic physics stage during a modal pause.
        PhysicsSystem2D.instance.postUpdate(1);
        check(before===JSON.stringify(m.balls)&&elapsed===m.elapsed,'pause changed model');
        Array.from(p.bodies.values()).forEach((b,i)=>{
            const pos=b.getWorldCenter(new Vec2());near(pos.x,positions[i].x,0,'paused body x');near(pos.y,positions[i].y,0,'paused body y');
        });
        p.advance(.1);check(m.elapsed>elapsed,'resume failed');p.dispose();
        check(PhysicsSystem2D.instance.autoSimulation===previous,'global configuration not restored');
        const replay=new GuliPhysics(scene,new GameModel());check(replay.bodies.size===4,'stale bodies after replay');replay.dispose();
    });
    await test('Overlapping start separates stably; maximum-power shot does not tunnel',()=>{
        const m=new GameModel();m.balls=[ball(0,-25,0),ball(1,25,0)];m.phase='moving';
        const p=new GuliPhysics(scene,m);
        try { finish(p);check(Math.hypot(m.balls[0].x-m.balls[1].x,m.balls[0].y-m.balls[1].y)>59,'overlap not resolved'); }
        finally { p.dispose(); }
        const fast=new GameModel();fast.balls=[ball(0,0,-200)];fast.shoot(0,0,1);
        const q=new GuliPhysics(scene,fast);
        try {q.advance(.1);q.advance(.1);check(fast.balls[0].vy>0,'high speed missed target');finish(q);}
        finally {q.dispose();}
    });
    await test('30 / 60 / 144 FPS and a long frame produce the same completed shot',()=>{
        let baseline: GameModel | undefined;
        for(const fps of [30,60,144]) {
            const m=new GameModel();m.shoot(-100,-85,.65);const p=new GuliPhysics(scene,m);
            try {finish(p,1/fps);}finally {p.dispose();}
            if(!baseline) baseline=m;
            else {check(m.phase===baseline.phase&&m.knocked.join()===baseline.knocked.join(),'frame dependent outcome');
                m.balls.forEach((b,i)=>{near(b.x,baseline!.balls[i].x,.02,'frame x');near(b.y,baseline!.balls[i].y,.02,'frame y');});}
        }
        const m=new GameModel();m.shoot(-100,-85,.65);const p=new GuliPhysics(scene,m);
        try {p.advance(3);check(m.elapsed<=.101,'stall used wall time for settling');finish(p);check(m.knocked.join()===baseline!.knocked.join(),'stall outcome');}finally {p.dispose();}
    });
    await test('Last permitted shot can win; shooter removed only after completed settlement',()=>{
        const m=new GameModel();m.used=m.level.shots-1;m.knocked=[31];
        m.balls=[ball(49,0,210,0,23)];m.shoot(0,210,1);
        const p=new GuliPhysics(scene,m);
        try {
            p.advance(1/120);check(m.balls.some(b=>b.shooter&&!b.gone),'spawned shooter removed');
            finish(p);check(m.phase==='won'&&m.remaining===0&&m.knocked.length===2,'last shot did not win');
            check(!m.balls.some(b=>b.shooter),'shooter retained after shot');
        }finally {p.dispose();}
    });
    await test('10 / 30 / 50 / 100 power: isolated rolling, two balls and four-ball chain',()=>{
        // Unbounded test floor only: suppress out-of-bounds removal so travel/settling
        // measurements are not confused with a ball being removed at the ring.
        const run = (power: number, count: number, old: boolean) => {
            const m = new GameModel(); m.balls = [];
            m.launch(1, 0, (power - 1) / 99, 0, 0);
            const shooter = m.balls[0];
            if (old) shooter.vx=380+(power-1)/99*820;
            for (let i=1;i<count;i++) m.balls.push(ball(i, 90 + (i-1)*65, 0));
            const starts=m.balls.map(b=>b.x), distances=m.balls.map(()=>0);
            let quiet=0, time=0, peakTarget=0, previousEnergy=Infinity;
            m.afterPhysics = (dt, contact=false) => {
                time+=dt;
                check(m.balls.every(b=>Number.isFinite(b.x+b.y+b.vx+b.vy)), 'non-finite benchmark');
                const energy=m.balls.reduce((s,b)=>s+b.vx*b.vx+b.vy*b.vy,0);
                check(energy<=previousEnergy+1,'collision created energy'); previousEnergy=energy;
                m.balls.forEach((b,i)=>distances[i]=Math.hypot(b.x-starts[i],b.y));
                peakTarget=Math.max(peakTarget,...m.balls.slice(1).map(b=>Math.hypot(b.vx,b.vy)));
                quiet=m.balls.some(b=>Math.hypot(b.vx,b.vy)>=2)||contact ? 0 : quiet+dt;
                if(quiet>=.25) m.phase='aim';
            };
            const p=new GuliPhysics(scene,m,old?{linearDamping:.65,restitution:.45}:{});
            try { finish(p); check(m.balls.every(b=>Math.hypot(b.vx,b.vy)<2),'settled while moving');
                check(shooter.vx>=-.01,'unexpected reverse velocity');
                for(let i=1;i<m.balls.length;i++) check(m.balls[i].x-m.balls[i-1].x>=m.balls[i].r+m.balls[i-1].r-1,'overlap/tunneling');
                return {time,distance:distances[0],target:Math.max(0,...distances.slice(1)),peakTarget};
            } finally {p.dispose();}
        };
        for(const count of [1,2,4]) {
            let previous=-1;
            for(const power of [10,30,50,100]) {
                const before=run(power,count,true),after=run(power,count,false);
                write(`ROLL ${power}% ${count} balls: before=${JSON.stringify(before)} after=${JSON.stringify(after)}`);
                check(after.time<before.time,'settling did not improve');
                check(after.distance<before.distance,'travel did not shorten');
                check(after.target<=before.target+.1,'target travel increased');
                const travel=count===1?after.distance:after.target;
                check(travel>previous,'power lost meaningful travel ordering');previous=travel;
                if(count>1) check(after.peakTarget>0,'collision response lost');
                if(count===1&&power===10) check(after.distance<330&&after.time<4,'low power still too long');
            }
        }
    });
    await test('All five unchanged levels remain completable with slingshot launch positions',async()=>{
        for(let i=0;i<LEVELS.length;i++) {
            let m=new GameModel(i);const route:number[][]=[];
            while(m.phase==='aim') {
                let best:GameModel|undefined,bestScore=-Infinity,shot:number[]=[];
                for(const target of m.balls) for(const offset of [-20,0,20]) for(const power of [.45,.65,.85,1]) {
                    const c=clone(m);
                    const dx=target.x+offset,dy=target.y+350;
                    const screenLength=Math.hypot(dx,dy*.87);
                    const pull=8+112*power;
                    const x=-dx/screenLength*pull,y=-350-dy/screenLength*pull;
                    c.launch(dx,dy,power,x,y);
                    const p=new GuliPhysics(scene,c);
                    try {finish(p);}finally {p.dispose();}
                    const score=c.knocked.length*10000+c.balls.reduce((s,b)=>s+Math.hypot(b.x,b.y),0);
                    if(score>bestScore){bestScore=score;best=c;shot=[target.x+offset,target.y,power];}
                }
                m=best!;route.push(shot);await yieldFrame();
            }
            write(`Level ${i+1}: ${m.used} shots, ${m.knocked.length} targets, ${m.stars} stars; route=${JSON.stringify(route)}`);
            check(m.phase==='won','level '+(i+1)+' has no tested completion route');
        }
    });
    write(`DONE: ${passed} passed, ${failed} failed.`);
    return {passed,failed,lines};
}
