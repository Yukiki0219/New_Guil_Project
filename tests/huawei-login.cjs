const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ts=require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
const timers=new Map();let timerId=0;
function load(name,modules={}){const box={exports:{},require:n=>modules[n]||{},setTimeout:f=>{timers.set(++timerId,f);return timerId;},clearTimeout:id=>timers.delete(id)};vm.runInNewContext(ts.transpileModule(fs.readFileSync(`assets/scripts/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,experimentalDecorators:true}}).outputText,box);return box.exports;}
const {HuaweiLogin,LOGIN_TEXT}=load('HuaweiLogin');const {translate}=load('Localization');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
function setup(required=true){const calls=[];const login=new HuaweiLogin(required,()=>({gameLoginWithReal:o=>calls.push(o)}));return {login,calls};}
test('Web bypass and missing Huawei API remain playable without authentication',()=>{
 const {login,calls}=setup(false);login.login();assert.equal(calls.length,0);assert.equal(login.canPlay,true);
 const missing=new HuaweiLogin(true,()=>undefined);missing.login();assert.equal(missing.state,'unsupported');assert.equal(missing.canPlay,true);assert.equal(missing.isAuthenticated,false);assert.equal(login.isAuthenticated,false);
});
test('Single flight, correct App ID, successful player identity and duplicate callbacks',()=>{
 const {login,calls}=setup();login.login();login.login();assert.equal(calls.length,1);assert.equal(calls[0].appid,'119547855');assert.equal(calls[0].forceLogin,0);assert.equal(login.canPlay,true);assert.equal(login.isAuthenticated,false);
 calls[0].success({playerId:'test-player',displayName:'Test'});assert.equal(login.canPlay,true);assert.equal(login.isAuthenticated,true);assert.equal(login.player.playerId,'test-player');
 calls[0].fail({},7021);login.login();assert.equal(login.state,'authenticated');assert.equal(calls.length,1);login.dispose();
});
test('Cancellation and failures keep guest play; explicit retry can authenticate',()=>{
 for(const code of [7004,2012,6004]){const {login,calls}=setup();login.login();calls[0].fail({},code);assert.equal(login.state,Number(code)===6004?'failed':'cancelled');assert.equal(login.canPlay,true);assert.equal(login.isAuthenticated,false);assert.equal(login.player,null);assert.equal(calls.length,1);login.login(true);assert.equal(calls[1].forceLogin,1);calls[1].success({playerId:'retry'});assert.equal(login.isAuthenticated,true);login.dispose();assert.equal(login.isAuthenticated,false);}
});

test('Identity restriction survives pending retries and failures until valid authentication',()=>{
 const {login,calls}=setup();login.login();calls[0].fail({},'7021');assert.equal(login.canPlay,false);
 login.login(true);assert.equal(login.canPlay,false);calls[1].fail({},6004);assert.equal(login.canPlay,false);
 login.login(true);[...timers.values()].pop()();assert.equal(login.canPlay,false);
 login.login(true);calls[3].success({});assert.equal(login.canPlay,false);
 login.login(true);calls[4].success({playerId:'verified'});assert.equal(login.canPlay,true);login.dispose();
});
test('Empty success, thrown errors, timeout, explicit retry and stale callbacks',()=>{
 const {login,calls}=setup();login.login();calls[0].success({});assert.equal(login.state,'invalid-result');login.login();
 const timeout=[...timers.values()].pop();timeout();assert.equal(login.state,'timeout');assert.equal(login.canPlay,true);assert.equal(login.isAuthenticated,false);
 login.login();calls[1].success({playerId:'late'});assert.equal(login.state,'pending');calls[2].success({playerId:'current'});assert.equal(login.player.playerId,'current');login.dispose();
 const broken=new HuaweiLogin(true,()=>{throw Error('offline');});broken.login();assert.equal(broken.state,'failed');
});
test('Dispose cancels timers and ignores late responses; English messages complete',()=>{
 const {login,calls}=setup();let updates=0;login.onChange=()=>updates++;login.login();login.dispose();calls[0].success({playerId:'late'});assert.equal(updates,1);assert.equal(login.player,null);assert.equal(timers.size,0);
 for(const value of Object.values(LOGIN_TEXT))assert.ok(!/[一-龥]/.test(translate(value,'en')),value);
});
test('Real controller callbacks preserve active shot, result panel and saves; guest can select levels',()=>{
 const {GuliGame}=load('GuliGame',{'./HuaweiLogin':{HuaweiLogin,LOGIN_TEXT},'cc':{Component:class{},Button:class{},Label:class{},_decorator:{ccclass:()=>v=>v}}});
 const g=Object.create(GuliGame.prototype),{login,calls}=setup();g.huaweiLogin=login;g.save={stars:[3],collection:[1],language:'en',sound:true};g.model={used:2};g.physics={};g.isValid=true;
 const before=JSON.stringify(g.save),model=g.model,physics=g.physics;g.modal='result';g.sling={pointer:'finger'};g.showModal=()=>assert.fail('Login must not open a modal');g.render=()=>assert.fail('Login must not rebuild the game');
 const button={},label={},plateLabel={};g.hmsButton={isValid:true,active:true,getComponent:()=>button,getComponentsInChildren:()=>[plateLabel,label]};g.hmsNotice={isValid:true,node:{active:true}};g.setText=(l,t)=>l.text=t;
 let guestScreen;g.navigate=s=>guestScreen=s;g.play();assert.equal(guestScreen,'levels');assert.equal(g.ensureHuaweiLogin(),true);
 g.beginHuaweiLogin(false);assert.equal(button.interactable,false);assert.equal(plateLabel.text,'');assert.equal(label.text,'登录中…');calls[0].fail({},7004);assert.equal(label.text,'登录HMS');assert.equal(g.hmsButton.active,true);assert.equal(g.hmsNotice.node.active,true);assert.equal(button.interactable,false);
 g.modal='';g.refreshHuaweiLoginUI();assert.equal(button.interactable,true);g.beginHuaweiLogin();assert.equal(calls[1].forceLogin,1);calls[1].success({playerId:'player'});assert.equal(g.hmsButton.active,false);assert.equal(g.hmsNotice.node.active,false);assert.equal(g.model,model);assert.equal(g.physics,physics);assert.equal(g.sling.pointer,'finger');assert.equal(JSON.stringify(g.save),before);
 g.huaweiLogin=new HuaweiLogin(false);let screen;g.navigate=s=>screen=s;g.play();assert.equal(screen,'levels');
});
console.log(`${count} Huawei login groups passed (mock runtime, not device authentication).`);
