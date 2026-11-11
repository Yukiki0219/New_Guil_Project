/** Explicit preview-only visual fixture. Never changes persisted ownership. */
import { GuliPhysics } from './GuliPhysics';
import type { GuliGame } from './GuliGame';
export function previewMarbleAppearances(component: GuliGame, mode: string) {
    const g = component as any;
    g.persist = () => {}; // Preview fixtures must never write player saves.
    g.save = { ...g.save, stars: [...g.save.stars], collection: Array.from({length:56},(_,i)=>i) };
    if (mode === 'game') {
        g.startLevel(0);
        g.physics.dispose();
        g.model.ids = [40,46,52,55]; g.model.reset();
        g.physics = new GuliPhysics(g.node.scene, g.model); g.render();
    } else {
        g.page = Math.floor(Number(mode)/10); g.navigate('collection');
    }
}

/** Explicit test page: no persistent writes, real scene nodes and native physics. */
export function verifyMarbleUpdate(component: GuliGame) {
 const g=component as any,lines:string[]=[];let failed=0;
 const check=(ok:boolean,message:string)=>{if(!ok)throw Error(message);};
 const test=(name:string,run:()=>void)=>{try{run();lines.push('PASS '+name);}catch(e){failed++;lines.push('FAIL '+name+': '+e);}};
 const save=g.save,persist=g.persist;g.persist=()=>{};
 test('All 56 appearances render at gameplay and collection radii; locked placeholder preserved',()=>{
   g.navigate('home');
   for(let id=0;id<56;id++)for(const r of [30,32]){
     const n=g.marble(g.ballLayer,id,0,0,r);
     check(n.getChildByName('GlassInteriorClip')!==null,'missing clip '+id);
     check(n.getChildByName('GlassReflections')!==null,'missing reflections '+id);
     n.destroy();
   }
   const locked=g.marble(g.ballLayer,-2,0,0,32);check(!locked.getChildByName('GlassInteriorClip'),'locked marble exposed motif');locked.destroy();
 });
 test('Collection last page contains six entries, all legacy ownership remains',()=>{
   g.save={...save,collection:Array.from({length:56},(_,i)=>i)};g.page=5;g.navigate('collection');
   const names=g.ui.children.filter((n:any)=>n.name.startsWith('Marble-')).map((n:any)=>n.name);
   check(names.length===6&&names.includes('Marble-55'),'last page wrong');
 });
 const finish=(valid:boolean,last=false)=>{
   g.startLevel(0);if(last)g.model.used=g.model.level.shots-1;
   g.model.launch(valid?0:1,valid?1:0,valid?1:0,0,valid?-350:-500);g.render();
   let frames=0;while(g.model.phase==='moving'&&frames++<1800)g.update(1/120);
   check(g.model.phase!=='moving','shot did not settle');
 };
 test('Invalid shot restores instantly, costs once, HUD pulses and restores exact properties',()=>{
   finish(false);check(g.model.lastShotInvalid&&g.model.used===1,'invalid/cost incorrect');
   check(g.model.phase==='aim'&&g.model.balls.every((b:any)=>!b.shooter),'snapshot not immediately restored');
   const saved=g.invalidHud;check(!!saved,'no pulse');const label=saved.label,c=saved.color.clone(),scale=saved.scale.clone();
   g.update(.13);check(label.color.r===237&&label.node.scale.x>scale.x*1.29,'pulse peak wrong');
   g.refreshHud();check(label.color.r===237,'refresh erased color');g.update(.37);
   check(label.color.equals(c)&&label.node.scale.equals(scale)&&!g.invalidHud,'pulse did not restore');
 });
 test('Valid shot and cancellation never pulse; last invalid shot still loses',()=>{
   finish(true);check(!g.model.lastShotInvalid&&!g.invalidHud,'valid shot pulsed');
   g.startLevel(0);g.down('test',0,g.projectY(-350));g.cancelInput();check(g.model.used===0&&!g.invalidHud,'cancel pulsed');
   finish(false,true);check(g.model.phase==='lost'&&g.model.remaining===0,'last failure incorrect');
   g.navigate('home');check(!g.invalidHud,'page retained animation');
 });
 g.save=save;g.persist=persist;g.navigate('home');
 const report=document.createElement('pre');report.id='marble-update-verification';report.style.cssText='position:fixed;inset:0;background:#102b30;color:white;padding:24px;z-index:99999;white-space:pre-wrap';
 report.textContent=lines.join('\n')+`\nDONE: ${4-failed} passed, ${failed} failed`;document.body.appendChild(report);
}
