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
let save = cleanSave({ version: 3, stars: [3], starBalance: 105 });
for (let i = 0; i < 35; i++) {
  const result = drawReward(save, () => .42);
  assert(result);
  assert(!save.rewards.includes(result.reward.id));
  assert.equal(result.save.starBalance, save.starBalance - 3);
  save = result.save;
}
assert.equal(save.rewards.length, 35);
assert.equal(drawReward(save, () => .42), null);
const owned = save.rewards.find(id => id.startsWith('M'));
assert.equal(equipReward(save, owned).equipped.marble, owned);
assert.equal(equipReward(save, 'M99').equipped.marble, save.equipped.marble);
assert.equal(cleanSave({ version: 3, starBalance: -100, rewards: ['M01', 'M01', 'invalid'], equipped: { marble: 'M01', scene: 'M01' } }).equipped.scene, null);
assert.equal(cleanSave({ version: 3, starBalance: Infinity }).starBalance, 0);
console.log('PASS gacha: 35 rewards, legacy stars, one-time credit, no duplicates, 3-star cost, equip and save validation');
