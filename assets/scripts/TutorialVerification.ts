import { Label, Button, UITransform } from 'cc';
import { cleanSave, SHOOTER_Y, award } from './GameModel';
import type { GuliGame } from './GuliGame';
/** Opt-in preview regression checks; restores user's in-memory save and never writes storage. */
export function verifyTutorial(component:GuliGame){
 const g=component as any,save=g.save,persist=g.persist;let writes=0,failed=0;const lines:string[]=[];
 const check=(v:boolean,m:string)=>{if(!v)throw Error(m);};
 const test=(name:string,run:()=>void)=>{try{run();lines.push('PASS '+name);}catch(e){failed++;lines.push('FAIL '+name+': '+e);}};
 g.persist=()=>writes++;g.save=cleanSave(null);g.navigate('home');
 test('Main menu routes Play to levels and centers Help between skin and sound',()=>{
  const buttons=g.ui.children;check(!buttons.some((n:any)=>n.name==='Button-关卡选择'),'duplicate level button');
  const help=buttons.find((n:any)=>n.name==='Button-新手教学 / Help');
  const skin=buttons.find((n:any)=>n.name==='Button-发射球皮肤');
  const sound=buttons.find((n:any)=>n.name.startsWith('Button-音效'));
  check(help.position.x===0&&skin.position.y>help.position.y&&help.position.y>sound.position.y,'menu ordering');
  g.play();check(g.screen==='levels'&&!g.tutorial,'Play skipped level selector');
 });
 g.startLevel(0);
 test('Three pages, back/swipe, no shots or state changes',()=>{
  const before=JSON.stringify(g.model);check(g.tutorial.page===0,'first page');
  g.down('test',0,-274);g.move('test',0,-380);g.up('test',0,-380);check(g.model.used===0,'fired');
  g.down('test',200,0);g.up('test',-200,0);check(g.tutorial.page===1,'swipe left');
  g.down('test',-200,0);g.up('test',200,0);check(g.tutorial.page===0,'swipe right');
  g.tutorialNext();g.tutorialNext();check(g.tutorial.page===2,'next pages');g.update(10);
  check(JSON.stringify(g.model)===before,'demonstration mutated level');
 });
 test('Start persists completion and allows real launch once',()=>{
  g.tutorialNext();check(!g.tutorial&&g.save.tuto&&writes===1,'completion');
  const y=g.projectY(SHOOTER_Y);g.down('test',0,y);g.move('test',0,y-80);g.up('test',0,y-80);g.up('test',0,y-80);
  check(g.model.used===1&&g.model.phase==='moving','launch/cost');
 });
 test('Replay freezes and preserves active round and shots',()=>{
  const model=g.model,physics=g.physics,before=JSON.stringify(model);g.startTutorial();g.update(5);
  g.tutorialNext();g.tutorialNext();g.tutorialNext();
  check(g.model===model&&g.physics===physics&&JSON.stringify(model)===before,'replay reset state');
 });
 test('Wrong target and idle hints clear on valid input',()=>{
  g.startLevel(0);const b=g.model.balls[0];g.down('test',b.x,g.projectY(b.y));check(g.hints.reason==='wrong','wrong hint');
  const y=g.projectY(SHOOTER_Y);g.down('test',0,y);check(!g.hints.reason,'stale hint');g.cancelInput();
  g.update(11);check(g.hints.reason==='idle','idle hint');check(g.model.used===0,'hint cost');
 });
 test('Later levels suppress idle, wrong-target, result hints and first-run tutorial',()=>{
  for(const index of [1,2,3,4]){
   g.save.tuto=false;g.startLevel(index);check(!g.tutorial,'later level auto tutorial');
   const b=g.model.balls[0];g.down('test',b.x,g.projectY(b.y));g.update(20);
   check(!g.hints.reason&&!g.hintLayer,'later level hint');
   const text=g.ui.getComponentsInChildren(Label).map((l:Label)=>l.string).join('|');
   check(!/按住|后拉|取消|查看提示|整颗离开/.test(text),'instruction text remains');
   check(g.powerG.node.position.y===47,'compact power placement');
   const before=JSON.stringify(g.model);g.startTutorial();check(!!g.tutorial,'explicit help disabled');
   g.tutorialNext();g.tutorialNext();g.tutorialNext();check(JSON.stringify(g.model)===before,'help changed level');
  }
 });
 test('Guide circles are gray 2px dashes at original bounds',()=>{
  const paths:number[][]=[];const mock:any={moveTo:(x:number,y:number)=>paths.push([x,y]),lineTo:()=>{},stroke:()=>{}};
  g.drawGuideCircle(mock,10,20,44,44);check(mock.lineWidth===2,'guide width');
  check(mock.strokeColor.r===128&&mock.strokeColor.g===128&&mock.strokeColor.b===128,'guide color');
  check(paths.length>=16&&paths[0][0]===54&&paths[0][1]===20,'dash geometry');
 });
 test('Every completed level offers Home with matching styling and preserves awarded save',()=>{
  for(let index=0;index<5;index++){
   g.save.tuto=true;g.startLevel(index);
   // UI fixture: model-rule tests separately exercise real settlement and rewards.
   g.model.phase='won';g.model.used=3;g.model.knocked=g.model.balls.slice(0,g.model.level.target).map((b:any)=>b.id);
   g.save=award(g.save,g.model);const before=JSON.stringify(g.save),count=writes;
   g.showModal('result');
   const home=g.overlay.getChildByName('Button-回到主菜单'),retry=g.overlay.getChildByName('Button-再试一次');
   check(!!home&&home.position.x===0&&home.position.y===-275,'missing/unaligned Home');
   check(home.getComponent(UITransform).width===retry.getComponent(UITransform).width,'width mismatch');
   check(home.getComponent(UITransform).height===retry.getComponent(UITransform).height,'height mismatch');
   const saved=g.overlay.getComponentsInChildren(Label).find((l:Label)=>l.string==='星级与收藏已保存');
   check(saved&&saved.node.position.y<home.position.y-35,'saved copy overlaps');
   home.emit(Button.EventType.CLICK);check(g.screen==='home'&&g.modal==='','did not close result');
   check(JSON.stringify(g.save)===before&&writes===count,'Home mutated saved progress');
  }
 });
 g.save=save;g.persist=persist;g.navigate('home');
 const preview=new URLSearchParams(window.location.search).get('guliUiPreview');
 if(preview==='level2'){g.startLevel(1);return;}
 if(preview==='guide'){g.startLevel(0);g.clearTutorial();g.render();g.hints.show('idle');g.updateHints(0);return;}
 if(preview==='home')return;
 if(preview==='result'){
  g.startLevel(0);g.clearTutorial();g.render();g.model.phase='won';g.model.used=3;g.model.knocked=g.model.balls.slice(0,2).map((b:any)=>b.id);
  g.showModal('result');return;
 }
 const report=document.createElement('pre');report.id='tutorial-verification';report.style.cssText='position:fixed;inset:0;background:#102b30;color:white;padding:24px;z-index:99999;white-space:pre-wrap';
 report.textContent=lines.join('\n')+`\nDONE: ${8-failed} passed, ${failed} failed`;document.body.appendChild(report);
}
