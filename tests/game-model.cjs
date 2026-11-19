const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/scripts/GameModel.ts'), 'utf8');
const out = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const gacha = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require('node:path').join(__dirname, '../assets/scripts/Gacha.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, gacha);
const box = { exports: {}, console, require: name => name === './Gacha' ? gacha.exports : {} }; vm.runInNewContext(out.outputText, box);
const { GameModel, LEVELS, RADIUS, award, cleanSave, rollMarbles } = box.exports;
let tests = 0;
function test(name, f) { f(); tests++; console.log('PASS ' + name); }
// Rules-only tests feed completed engine snapshots; actual collision/route tests run in Cocos.
function settle(m) { for (const b of m.balls) { b.vx = 0; b.vy = 0; } for (let i = 0; i < 32; i++) m.afterPhysics(1 / 120); assert.notEqual(m.phase, 'moving'); }
test('Every layout starts inside the circle without overlapping discs', () => {
  assert.equal(LEVELS.length, 30);
  const counts = [2,3,3,4,5,4,5,6,6,7,6,7,8,8,9,6,7,8,9,9,8,9,10,10,10,9,10,11,12,12];
  const verifiedShots = [2,2,2,2,3,2,2,3,2,3,3,3,3,4,3,2,4,4,4,5,3,5,4,5,6,4,4,7,5,6]; // Box2D candidate routes, 2026-11-16.
  LEVELS.forEach((l, i) => { const m = new GameModel(i); m.balls.forEach((b, j) => {
    assert(Math.hypot(b.x, b.y) + b.r < RADIUS);
    m.balls.slice(j + 1).forEach(c => assert(Math.hypot(c.x - b.x, c.y - b.y) >= b.r + c.r));
  }); assert.equal(l.positions.length, counts[i]); assert(l.target <= counts[i]); assert(verifiedShots[i] <= l.three); assert(l.three < l.two && l.two < l.shots); });
});
test('Only an entire target outside the circle counts, counted once', () => {
  const m = new GameModel(); m.balls = [{ id: 48, x: RADIUS + 22, y: 0, vx: 0, vy: 0, r: 23, shooter: false, entered: true, gone: false }]; m.phase = 'moving';
  m.afterPhysics(1 / 120); assert.equal(m.knocked.length, 0);
  m.balls[0].x += 1; m.afterPhysics(1 / 120); assert.equal(m.balls[0].gone, false);
  m.balls[0].x += 1; m.afterPhysics(1 / 120); assert.equal(m.balls[0].gone, true);
  assert.equal(m.knocked.length, 0); settle(m); assert.equal(m.knocked.length, 1); assert.equal(m.knocked[0], 48);
});
test('Shooter survives its outside spawn and repeated launch is rejected', () => {
  const m = new GameModel(); assert(m.shoot(0, 0, .65)); assert(!m.shoot(0, 0, .65));
  m.afterPhysics(1 / 120); assert.equal(m.balls[m.balls.length - 1].gone, false); assert.equal(m.used, 1);
});
test('Final shot may win and awards collection only after settling', () => {
  const m = new GameModel(); m.used = m.level.shots - 1; m.knocked = [31]; m.balls = [{ id: 49, x: 0, y: 210, vx: 0, vy: 0, r: 23, shooter: false, entered: true, gone: false }];
  m.shoot(0, 210, 1); assert.equal(award(cleanSave(null), m).collection.length, 0);
  const shooter=m.balls.find(b=>b.shooter); shooter.entered=true; shooter.y=RADIUS+shooter.r+1;
  m.balls[0].x = RADIUS + m.balls[0].r + 1; settle(m);
  assert.equal(m.phase, 'won'); assert.equal(m.stars, 1); assert.equal(award(cleanSave(null), m).collection.length, 2);
  assert(!m.balls.some(b => b.shooter));
});
test('Failed round never unlocks its collected items', () => {
  const m = new GameModel(); m.phase = 'lost'; m.knocked = [49]; const s = award(cleanSave(null), m); assert.equal(s.collection.length, 0);
});
test('Replaying resets layout and shots, retaining best stars and collection', () => {
  const m = new GameModel(); m.phase = 'won'; m.used = 1; m.knocked = [48, 49]; let s = award(cleanSave(null), m);
  m.used = 5; s = award(s, m); assert.equal(s.stars[0], 3); assert.equal(s.collection.length, 2);
  m.reset(); assert.equal(m.used, 0); assert.equal(m.balls.length, 2); assert.equal(m.knocked.length, 0); assert.equal(s.collection.length, 2);
});
test('Corrupt or old save values are bounded', () => {
  const s = cleanSave({ stars: [99, -1, 'broken'], collection: [3, 3, -1, 56, '2'], sound: false });
  assert.equal(s.stars[3], 3); assert.equal(s.stars[7], 0); assert.equal(s.collection.length, 1); assert.equal(s.sound, false);
  assert.equal(s.musicVolume, 0); assert.equal(s.effectsVolume, 0);
  const current = cleanSave({version: 4, sound: false, musicVolume: 0.4, effectsVolume: 2});
  assert.equal(current.musicVolume, 0.4); assert.equal(current.effectsVolume, 1); assert.equal(current.sound, true);
  assert.equal(cleanSave({...current, musicVolume: NaN}).musicVolume, 1);
});
test('Rarity generation produces all three valid ID bands', () => {
  for (const r of [0, .71, .96]) { const ids = rollMarbles(20, () => r); ids.forEach(id => assert(id >= 0 && id < 56)); }
});
test('Settling requires continuous quiet time; late collision resets it and no timeout forces a result', () => {
  const m = new GameModel(); m.phase = 'moving';
  for (let i=0;i<20;i++) m.afterPhysics(1/120);
  m.afterPhysics(1/120,true); assert.equal(m.quiet,0);
  m.balls[0].vx=2; m.afterPhysics(20); assert.equal(m.phase,'moving'); assert.equal(m.quiet,0);
  settle(m); assert.equal(m.phase,'aim');
});
test('Final launch speed increases exactly 10% at low, middle and maximum power without clipping', () => {
  for(const [p,v] of [[-1,418],[0,418],[.1,552.2],[.5,1089],[1,1760],[2,1760]]) {
    const m=new GameModel(); m.shoot(150,80,p); const b=m.balls[m.balls.length-1];
    assert(Math.abs(Math.hypot(b.vx,b.vy)-v)<1e-9);
  }
  assert(!new GameModel().shoot(NaN,0,1));
});
test('Failed shot restores all target state including removed targets, preserving prior progress and spent attempt', () => {
  const m=new GameModel(); m.knocked=[40]; const before=JSON.stringify(m.balls);
  m.shoot(0,0,.5); m.balls[0].x=RADIUS+100; m.balls[1].x+=45;
  const shooter=m.balls.find(b=>b.shooter); shooter.y=0;
  m.afterPhysics(1/120); assert(m.balls[0].gone); assert.equal(m.phase,'moving');
  settle(m); assert.equal(JSON.stringify(m.balls),before); assert.equal(m.knocked.join(), '40');
  assert.equal(m.used,1); assert.equal(m.phase,'aim');
});
test('Successful exit keeps moved targets even without any target leaving', () => {
  const m=new GameModel(); m.shoot(0,0,.5); m.balls[0].x+=20;
  const x=m.balls[0].x,s=m.balls.find(b=>b.shooter); s.entered=true;s.y=RADIUS+s.r+1;
  settle(m); assert.equal(m.balls[0].x,x);assert.equal(m.knocked.length,0);assert.equal(m.used,1);
});
test('Shooter centre crossing or tangency is not complete exit; last failure rolls back then loses', () => {
  for(const distance of [RADIUS+1,RADIUS+32]) {
    const m=new GameModel();m.used=m.level.shots-1;const before=JSON.stringify(m.balls);
    m.shoot(0,0,1);m.balls[0].x=400;m.balls[1].x=420;
    const s=m.balls.find(b=>b.shooter);s.entered=true;s.y=distance;
    settle(m);assert.equal(m.phase,'lost');assert.equal(m.remaining,0);assert.equal(m.knocked.length,0);
    assert.equal(JSON.stringify(m.balls),before);
  }
});
test('Starting outside or safety removal is not a successful exit', () => {
  const m=new GameModel();const before=JSON.stringify(m.balls);m.shoot(0,0,1);
  m.balls[0].x+=10;m.balls.find(b=>b.shooter).y=-700;settle(m);
  assert.equal(JSON.stringify(m.balls),before);assert.equal(m.used,1);
});
test('56 IDs preserve all legacy ownership and exact rarity counts',()=>{
 const save=cleanSave({version:1,stars:[3,2],collection:Array.from({length:50},(_,i)=>i),sound:false});
 assert.equal(save.version,4);assert.equal(save.collection.length,50);assert.equal(save.stars[3],3);assert.equal(save.stars[7],2);assert.equal(save.stars[0],0);assert.equal(save.starBalance,5);assert.equal(save.sound,false);
 const old=cleanSave({version:3,stars:[1,2,3,1,2],starBalance:4,rewards:['M01']});
 assert.deepEqual([3,7,12,24,29].map(i=>old.stars[i]),[1,2,3,1,2]);
 assert.equal(old.starBalance,4);assert.equal(old.rewards.join(),'M01');
 assert.equal(cleanSave(old).stars.join(),old.stars.join());
 assert.equal(cleanSave({...save,collection:Array.from({length:56},(_,i)=>i)}).collection.length,56);
 const counts={};for(let i=0;i<56;i++){const r=box.exports.rarity(i);counts[r]=(counts[r]||0)+1;assert(box.exports.marbleName(i));}
 assert.deepEqual(counts,{'普通':23,'稀有':16,'超级稀有':8,'珍藏':5,'传奇':4});
 for(const r of [.1,.8,.92,.97,.995])assert(rollMarbles(1,()=>r)[0]<56);
});
test('Invalid result is reported once without changing instant rollback or shot cost',()=>{
 const m=new GameModel();const before=JSON.stringify(m.balls);m.shoot(0,0,0);settle(m);
 assert.equal(m.phase,'aim');assert(m.lastShotInvalid);assert.equal(JSON.stringify(m.balls),before);assert.equal(m.used,1);
 m.shoot(0,0,0);assert(!m.lastShotInvalid);assert.equal(m.used,2);
});
console.log(`${tests} model checks passed.`);
