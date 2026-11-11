/** Explicit browser preview checks with real Box2D bodies; no player save access. */
import { Node, Vec2 } from 'cc';
import { GameModel, Marble } from './GameModel';
import { GuliPhysics } from './GuliPhysics';
export function verifyRollback(scene: Node) {
    const lines: string[]=[];let failures=0;
    const check=(ok:boolean,message:string)=>{if(!ok)throw new Error(message);};
    const target=(x:number,y=0):Marble=>({id:45,x,y,r:30,vx:0,vy:0,shooter:false,entered:true,gone:false});
    const test=(name:string,run:()=>void)=>{try{run();lines.push('PASS '+name);}catch(e){failures++;lines.push('FAIL '+name+': '+e);}};
    for(const success of [false,true]) for(const last of [false,true]) test(`${success?'Successful exit':'Rollback'} / ${last?'last':'normal'} shot`,()=>{
        const m=new GameModel();m.balls=[target(250)];m.knocked=[31];if(last)m.used=m.level.shots-1;
        const before=JSON.stringify(m.balls),used=m.used;
        m.launch(1,0,success?1:0,180,0);
        const p=new GuliPhysics(scene,m);let removed=false,frames=0;
        try{
            while(m.phase==='moving'&&frames++<1800){p.advance(1/120);removed ||= m.balls.some(b=>!b.shooter&&b.gone);}
            check(m.phase!=='moving','did not settle');check(removed,'fixture did not knock target out');
            check(m.used===used+1,'attempt refunded');check(!m.balls.some(b=>b.shooter),'shooter retained');
            if(success){check(m.phase==='won'&&m.knocked.length===2,'valid result not committed');}
            else{
                check(JSON.stringify(m.balls)===before,'target snapshot not restored');check(m.knocked.join()==='31','progress leaked');
                check(m.phase===(last?'lost':'aim'),'wrong failure phase');
                check(p.bodies.size===1,'restored collider missing');
                const body=p.bodies.get(m.balls[0])!;const point=body.getWorldCenter(new Vec2());
                check(Math.abs(point.x-250)<.01&&Math.abs(point.y)<.01,'restored physics position wrong');
                if(!last){check(m.launch(1,0,0,180,0),'next shot blocked');p.advance(1/120);check(p.bodies.size===2,'next shot bodies incorrect');}
            }
        }finally{p.dispose();}
    });
    test('Valid shooter exit without a target leaving',()=>{
        const m=new GameModel();m.balls=[target(0,150)];m.launch(1,0,1,180,0);const p=new GuliPhysics(scene,m);
        try{let n=0;while(m.phase==='moving'&&n++<1800)p.advance(1/120);
            check(m.phase==='aim'&&m.used===1&&m.knocked.length===0,'empty valid shot incorrect');
        }finally{p.dispose();}
    });
    const report=document.createElement('pre');report.id='rollback-verification';
    report.style.cssText='position:fixed;inset:0;background:#102b30;color:white;padding:24px;z-index:99999;white-space:pre-wrap';
    report.textContent=lines.join('\n')+`\nDONE: ${5-failures} passed, ${failures} failed`;document.body.appendChild(report);
}
