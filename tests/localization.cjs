const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ts=require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
function load(name){const box={exports:{},require:path=>load(path.replace('./',''))};vm.runInNewContext(ts.transpileModule(fs.readFileSync(`assets/scripts/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,box);return box.exports;}
const {translate}=load('Localization'),{cleanSave,award,GameModel,marbleName,rarity}=load('GameModel');
for(const language of [undefined,null,'fr',0,'zh'])assert.equal(cleanSave({language}).language,'zh');
const save=cleanSave({language:'en',stars:[3,2],collection:[0,55],sound:false,tuto:true});
assert.deepEqual(cleanSave(JSON.parse(JSON.stringify(save))),save);
assert.equal(award(save,new GameModel()).language,'en');
console.log('PASS language defaults, persistence and award preservation');
for(let id=0;id<56;id++)for(const source of [marbleName(id),rarity(id)]){assert.equal(translate(source,'zh'),source);assert.ok(!/[一-龥]/.test(translate(source,'en')),source);}
for(const [source,target] of [['开始游戏','Play'],['回到主菜单','Main Menu'],['剩余 0 次','Shots Left: 0'],['第 5 关','Level 5'],['击出 1 颗 · 使用 1 次射击','1 marble out · 1 shot used'],['击出 2 颗 · 使用 3 次射击','2 marbles out · 3 shots used'],['目标 2/4     剩余 3 次','Target 2/4   Shots Left: 3'],['可能抽到重复奖励；重复时返还 1 星','Duplicates refund 1 star.'],['重复奖励 · 返还 1 星','Duplicate Prize · 1 Star Refunded'],['重复奖励','Duplicate Prize'],['已返还 1 星','1 Star Refunded'],['抽奖中…','Drawing…'],['点击跳过','Tap to Skip'],['中文','中文'],['English','English'],['GULI','GULI']])assert.equal(translate(source,'en'),target);
for(const title of load('GameModel').LEVELS.map(level=>level.title))assert.ok(!/[一-龥]/.test(translate(title,'en')),title);
assert.equal(translate('新收藏 +1  ·  成绩星星 +2  ·  最佳 3 星','en'),'New +1 · Score stars +2 · Best: 3 stars');
for(const [source,target] of [['三星：2 次内完成目标','3 stars: Reach target in 2 shots'],['两星：4 次内完成目标','2 stars: Reach target in 4 shots'],['一星：6 次内完成目标','1 star: Reach target in 6 shots']])assert.equal(translate(source,'en'),target);
for(const [source,target] of [['取消','Cancel'],['确定返回主页？','Return to the main menu?'],['确定重玩本关？','Restart this level?'],['确认返回主页','Return to Main Menu'],['确认重玩','Restart Level']])assert.equal(translate(source,'en'),target);
for(const [source,target] of [['声音设置','Sound Settings'],['背景音乐','Music'],['音效','Sound Effects'],['完成','Done']])assert.equal(translate(source,'en'),target);
for(const [source,target] of [['皮肤测试 · 不保存','Skin Test · Not Saved'],['试用','Try'],['试用中','Trying'],['恢复正式皮肤','Restore Saved Skin'],['当前预览：竹影小径','Previewing: Bamboo Path']])assert.equal(translate(source,'en'),target);
console.log('PASS 56 marble names, rarity, dynamic counts, plurals and fixed labels');
