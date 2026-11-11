import { Label, UITransform, Vec3, Vec2, EventTouch, Touch, EventMouse } from 'cc';
import { cleanSave, award, MARBLE_COUNT } from './GameModel';
import { LanguageSwitch } from './LanguageSwitch';
import type { GuliGame } from './GuliGame';
/** Preview-only checks. Mock persistence so test rewards never enter the player's save. */
export function verifyLanguage(component:GuliGame) {
 const g=component as any,original=g.save,persist=g.persist,lines:string[]=[];let failed=0,writes=0;
 const check=(v:boolean,m:string)=>{if(!v)throw Error(m);};
 const test=(name:string,run:()=>void)=>{try{run();lines.push('PASS '+name);}catch(e){failed++;lines.push('FAIL '+name+': '+e);}};
 g.persist=()=>writes++;g.save=cleanSave({stars:[3,2,1],collection:Array.from({length:MARBLE_COUNT},(_,i)=>i),sound:false,tuto:true});g.navigate('home');
 const english=()=>{const labels=g.node.getComponentsInChildren(Label);const bad=labels.filter((l:Label)=>l.node.activeInHierarchy&&l.string!=='中文'&&/[一-龥]/.test(l.string));check(bad.length===0,'Untranslated: '+bad.map((l:Label)=>l.string).join('|'));};
 test('Default Chinese, click either side, smooth snap and unchanged player data',()=>{
  check(g.save.language==='zh','default');const before=JSON.stringify({...g.save,language:undefined});
  const toggle:any=g.ui.getChildByName('LanguageSwitch').getComponent(LanguageSwitch);
  const mouse=(x:number)=>{const p=toggle.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(x,0));const e=new EventMouse('mousedown',true);e.setButton(0);e.getUILocation=()=>new Vec2(p.x,p.y);return e;};
  toggle.mouseStart(mouse(60));toggle.mouseEnd(mouse(60));check(g.save.language==='en','right click');english();
  for(let i=0;i<60;i++)toggle.update(1/60);check(toggle.position===1,'right snap');
  toggle.mouseStart(mouse(-60));toggle.mouseEnd(mouse(-60));check(g.save.language==='zh','left click');
  for(let i=0;i<60;i++)toggle.update(1/60);check(toggle.position===0,'left snap');
  check(JSON.stringify({...g.save,language:undefined})===before,'save data changed');
 });
 test('Touch drag both ways, cancel and second finger protection',()=>{
  const toggle:any=g.ui.getChildByName('LanguageSwitch').getComponent(LanguageSwitch);
  const touch=(x:number,id=1)=>{const p=toggle.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(x,0));const t=new Touch(p.x,p.y,id);const e=new EventTouch([t],true,'touchstart');e.touch=t;e.getUILocation=()=>new Vec2(p.x,p.y);return e;};
  toggle.touchStart(touch(-70));toggle.touchMove(touch(70,2));check(toggle.pointer==='t1','second finger');toggle.touchMove(touch(70));toggle.touchEnd(touch(70));check(g.save.language==='en','right drag');
  toggle.touchStart(touch(70));toggle.touchMove(touch(-70));toggle.cancel();check(g.save.language==='en','cancel changed save');
  toggle.touchStart(touch(70));toggle.touchMove(touch(-70));toggle.touchEnd(touch(-70));check(g.save.language==='zh','left drag');
 });
 test('English menus, every collection page and all gameplay HUDs',()=>{
  g.setLanguage('en');
  for(const screen of ['home','levels','skins']){g.navigate(screen);english();}
  for(let page=0;page<6;page++){g.page=page;g.navigate('collection');english();}
  for(let level=0;level<5;level++){g.startLevel(level);english();g.model.phase='moving';g.refreshHud();english();g.model.phase='aim';g.refreshHud();english();}
 });
 test('All hints, modal states and tutorial pages translate without spending shots',()=>{
  g.startLevel(0);const used=g.model.used;
  for(const reason of ['idle','wrong','targetOnly','boundary','miss','success','low']){g.hints.clear();g.hintReason='';g.hints.show(reason);g.updateHints();english();}
  for(const modal of ['pause','leave']){g.showModal(modal);english();}
  for(const phase of ['won','lost']){g.model.phase=phase;g.showModal('result');english();}
  g.model.phase='aim';g.modal='';g.startTutorial();for(let page=0;page<3;page++){g.tutorial.page=page;g.refreshTutorial();english();}
  check(g.model.used===used,'tutorial spent shot');g.clearTutorial();
 });
 test('Language round-trip and awards preserve selection and progress',()=>{
  const saved=cleanSave(JSON.parse(JSON.stringify(g.save)));check(saved.language==='en','reload');
  g.model.phase='won';check(award(saved,g.model).language==='en','award reset language');
  g.render();const model=g.model,physics=g.physics,before=JSON.stringify(model);g.setLanguage('zh');g.setLanguage('en');
  check(g.model===model&&g.physics===physics&&JSON.stringify(model)===before,'game state changed');check(writes>=5,'not persisted');
 });
 g.save=original;g.persist=persist;g.navigate('home');
 console.log('LANGUAGE VERIFICATION\n'+lines.join('\n'));
 const preview=new URLSearchParams(window.location.search).get('languagePreview');
 if(preview){g.save={...original,language:preview==='zh'?'zh':'en'};g.render();if(preview==='tutorial'){g.startTutorial();}return;}
 const report=document.createElement('pre');report.id='language-verification';report.textContent=`${failed?'FAIL':'PASS'}: ${lines.length-failed}/${lines.length} groups\n`+lines.join('\n');report.style.cssText='position:fixed;inset:40px 10px;background:#fff;color:#123;z-index:99999;padding:20px;white-space:pre-wrap';document.body.appendChild(report);
}

