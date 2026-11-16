const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
const cache = {};
function load(name) {
  if (cache[name]) return cache[name];
  const source = fs.readFileSync(path.join(__dirname, '../assets/scripts', name + '.ts'), 'utf8');
  const box = { exports: {}, require: relative => load(relative.replace('./', '')) };
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, box);
  return cache[name] = box.exports;
}
const { REWARDS, RARITIES, drawReward, equipReward } = load('Gacha');
const { cleanSave, GameModel, award } = load('GameModel');
const counts = Object.fromEntries(RARITIES.map(rarity => [rarity, REWARDS.filter(reward => reward.rarity === rarity).length]));
assert.equal(REWARDS.length, 35);
assert.equal(new Set(REWARDS.map(reward => reward.id)).size, 35);
assert.equal(REWARDS.filter(reward => reward.kind === 'scene').length, 5);
assert.equal(REWARDS.filter(reward => reward.kind === 'marble').length, 20);
assert.equal(REWARDS.filter(reward => reward.kind === 'trail').length, 10);
assert.equal(JSON.stringify(counts), JSON.stringify({ '普通': 14, '稀有': 10, '超级稀有': 5, '珍藏': 3, '传奇': 3 }));
const legacy = cleanSave({ version: 2, stars: [3, 2], collection: [1, 55] });
assert.equal(legacy.starBalance, 5);
assert.equal(cleanSave(legacy).starBalance, 5);
const first = new GameModel(2); first.phase = 'won'; first.used = 3;
const credited = award(legacy, first);
assert.equal(credited.starBalance, 8);
assert.equal(award(credited, first).starBalance, 8); // Replays and improved scores cannot mint more currency.
const save = cleanSave({ version: 3, starBalance: 10 });
const firstDraw = drawReward(save, () => 0);
assert.equal(firstDraw.reward.id, 'S01');
assert.equal(firstDraw.duplicate, false);
assert.equal(firstDraw.save.starBalance, 7);
assert.equal(firstDraw.save.rewards.length, 1);
const repeat = drawReward(firstDraw.save, () => 0);
assert.equal(repeat.reward.id, 'S01');
assert.equal(repeat.duplicate, true);
assert.equal(repeat.save.starBalance, 5); // 3 spent, 1 refunded.
assert.equal(repeat.save.rewards.length, 1);
assert.deepEqual([.25, .675, .9125, .985, .9975].map(roll => {
  let calls = 0;
  return drawReward(save, () => calls++ ? 0 : roll).reward.rarity;
}), Array.from(RARITIES));
const allOwned = cleanSave({ version: 3, starBalance: 3, rewards: REWARDS.map(reward => reward.id) });
assert.equal(drawReward(allOwned, () => 0).duplicate, true);
assert.equal(drawReward(allOwned, () => 0).save.starBalance, 1);
assert.equal(drawReward(cleanSave({ version: 3, starBalance: 2 }), () => 0), null);
assert.equal(equipReward(allOwned, 'M01').equipped.marble, 'M01');
assert.equal(equipReward(allOwned, 'M99').equipped.marble, allOwned.equipped.marble);
assert.equal(cleanSave({ version: 3, starBalance: -100, rewards: ['M01', 'M01', 'invalid'], equipped: { marble: 'M01', scene: 'M01' } }).equipped.scene, null);
assert.equal(cleanSave({ version: 3, starBalance: Infinity }).starBalance, 0);
console.log('PASS gacha: 35 rewards, fixed odds, duplicates refund 1 star, ownership, equip and save validation');
