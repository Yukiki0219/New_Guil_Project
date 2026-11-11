const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ts=require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
function load(name){const box={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(`assets/scripts/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,box);return box.exports;}
const {translate}=load('Localization'),{cleanSave,award,GameModel,marbleName,rarity}=load('GameModel');
for(const language of [undefined,null,'fr',0,'zh'])assert.equal(cleanSave({language}).language,'zh');
const save=cleanSave({language:'en',stars:[3,2],collection:[0,55],sound:false,tuto:true});
assert.deepEqual(cleanSave(JSON.parse(JSON.stringify(save))),save);
assert.equal(award(save,new GameModel()).language,'en');
console.log('PASS language defaults, persistence and award preservation');
for(let id=0;id<56;id++)for(const source of [marbleName(id),rarity(id)]){assert.equal(translate(source,'zh'),source);assert.ok(!/[一-龥]/.test(translate(source,'en')),source);}
for(const [source,target] of [['开始游戏','Play'],['回到主菜单','Main Menu'],['剩余 0 次','Shots Left: 0'],['第 5 关','Level 5'],['击出 1 颗 · 使用 1 次射击','1 marble out · 1 shot used'],['击出 2 颗 · 使用 3 次射击','2 marbles out · 3 shots used'],['目标 2/4     剩余 3 次','Target 2/4   Shots Left: 3'],['中文','中文'],['English','English'],['GULI','GULI']])assert.equal(translate(source,'en'),target);
console.log('PASS 56 marble names, rarity, dynamic counts, plurals and fixed labels');
