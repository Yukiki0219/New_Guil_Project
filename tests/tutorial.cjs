const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
const cache = {};
function load(name) {
    if (cache[name]) return cache[name];
    const source = fs.readFileSync(path.join(__dirname, '../assets/scripts', name + '.ts'), 'utf8');
    const box = { exports: {}, require: value => load(value.replace('./', '')) };
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, box);
    return cache[name] = box.exports;
}
const { Tutorial, TutorialGameModel } = load('Tutorial');
const { cleanSave, award, GameModel, LEVELS } = load('GameModel');
let count = 0;
function test(name, run) { run(); count++; console.log('PASS ' + name); }
test('Old and malformed saves default false; completion round-trip preserves unrelated data', () => {
    for (const tuto of [undefined, null, 1, 'true', false]) assert.equal(cleanSave({tuto}).tuto, false);
    const save = cleanSave({stars:[3,2], collection:[45,55], sound:false, tuto:true});
    assert.deepEqual(cleanSave(JSON.parse(JSON.stringify(save))), save);
    assert.equal(award(save, new GameModel()).tuto, true);
});

test('Three explanatory pages clamp navigation without changing a game',()=>{
 const t=new Tutorial(),m=new GameModel(),before=JSON.stringify(m);
 t.previous();assert.equal(t.page,0);t.advancePage();assert.equal(t.page,1);t.advancePage();t.advancePage();assert.equal(t.page,2);t.previous();assert.equal(t.page,1);
 assert.equal(JSON.stringify(m),before);
});
const {GameHints}=load('GameHints');
test('Settled result feedback survives rollback; cooldown and stale hints clear',()=>{
 const m=new GameModel(),h=new GameHints();m.launch(0,1,.1);m.balls[0].x=400;
 m.balls.forEach(b=>{b.vx=0;b.vy=0;});m.afterPhysics(.3);
 assert.equal(m.used,1);assert.equal(m.knocked.length,0);assert.equal(m.lastShotReport.targetsOut,1);
 h.resolved(m);assert.equal(h.reason,'targetOnly');h.clear();h.show('targetOnly');assert.equal(h.reason,null);
 h.tick(13,false);h.show('targetOnly');assert.equal(h.repeated,2);h.clear();assert.equal(h.reason,null);
 for(const [report,reason] of [[{shooterExited:true,targetsOut:1,touchingBoundary:false},'success'],[{shooterExited:false,targetsOut:0,touchingBoundary:true},'boundary'],[{shooterExited:true,targetsOut:0,touchingBoundary:false},'miss']]){
 const hint=new GameHints();m.lastShotReport=report;hint.resolved(m);assert.equal(hint.reason,reason);
 }
});
console.log(count+' tutorial checks passed.');
