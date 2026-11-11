const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
function load(name) {
    const source = fs.readFileSync(`assets/scripts/${name}.ts`, 'utf8');
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    const context = { exports: {} }; vm.runInNewContext(code, context); return context.exports;
}
const model = load('GameModel');
const { MARBLE_APPEARANCES } = load('MarbleAppearance');
const rows = Object.entries(MARBLE_APPEARANCES).map(([id, style]) =>
    `| ${id} | ${model.marbleName(Number(id))} | ${model.rarity(Number(id))} | ${style.title} | ${style.glass} / ${style.motif} / ${style.variant} | ${Number(id)>=45&&Number(id)<50||Number(id)>=52?'共享图集':'程序化几何'} |`).join('\n');
fs.writeFileSync('docs/marble-56-update.md', `# 56 颗弹珠更新记录

## 保留规则

玩家和目标均须整颗越界（中心距 > 圈半径 + 弹珠半径）。发射时扣一次，不退款。全部相关弹珠稳定后结算；无效射击立即恢复目标快照。物理、瞄准、拖拉、关卡和收藏不可装备规则保持原有行为。GuliPhysics.ts 未修改。

## 修改文件

- GameModel.ts：56 个 ID、五档稀有度、抽取分组、存档校验及无效射击结果标志。
- GuliGame.ts：56 颗收藏分页、v2 存档键、无效射击次数 HUD 反馈。
- MarbleAppearance.ts：共享外观配置；旧 ID 0–49 和原名称保留，新 ID 50–55。
- MarbleRenderer.ts：玻璃底色、内部几何/图案、圆形裁切、顶层高光和边缘光。
- MarbleAppearancePreview.ts：不写存档的外观预览和场景验证入口。
- tests/game-model.cjs：存档兼容、稀有度数量、失败标志回归测试。
- assets/resources/art/marble-motifs.png 及 meta：九个动物/神兽共用一张 768×768 RGBA 图集，1,313,981 字节。
- tools/document-marble-update.cjs：从实际配置生成本记录中的外观表。

无效射击 HUD：红色 #ed3434；0.13 秒放大至原尺寸 1.3 倍，再用 0.37 秒恢复原颜色和尺寸。有效射击及取消不触发。保持即时回退，不新增回滚运动阶段。

## 数据兼容

旧 ID、名称及已有收藏保留。稀有度数量按批准的 23/16/8/5/4 调整；抽取概率为 70%/20%/5%/4%/1%。读取优先 guli.save.v2，否则读取 guli.save.v1；新进度写 v2，保留原 v1。切回旧程序不会读取 v2 的新进度；再次切换版本也不会自动合并两份进度。

## 渲染与性能

前 47 颗（23 普通、16 稀有、8 花卉）使用几何绘制。后九颗共享图集及 SpriteFrame，加载失败保留程序化图案。全部使用相同渲染入口，因此收藏和游戏对应同一外观。没有新增 Shader、自定义材质或逐帧弹珠动画。玻璃为分层视觉模拟，并非真实折射。

图集未压缩显存约 2.25 MiB（不含引擎开销）。圆形 Mask 会影响合批，仍需手机测试。复杂神兽在游戏小尺寸下细节较密；尚不能宣称达到参考图某个客观相似度百分比。

## 已实际验证

- npm test：25 项通过（16 模型、6 拖拉、3 瞄准）。
- npm run typecheck：通过。
- Cocos 预览 guliMarbleTest=1：4 组通过，覆盖 56 颗节点/遮罩/高光、末页 6 颗、无效 HUD 恢复、有效/取消不触发及最后一次失败。
- Cocos 预览 guliRollbackTest=1：5 项通过，覆盖普通/最后一次失败回退、普通/最后一次成功出圈及无目标出圈的有效射击。
- Cocos 预览 guliSlingTest=1：4 项通过，覆盖触控拖拉、多指隔离、松手只扣一次、鼠标上限及取消、后台取消。属于浏览器场景测试，不等同于手机实机测试。
- 收藏 0、30、40、50 页和游戏预览截图已检查；所有内部图案在圆形遮罩内，高光可见。截图保存在 docs/marbles-*.png。
- Cocos Creator 3.8.8 Web Mobile 发布构建成功，退出码 36。build/web-mobile 共 70 文件、9,631,155 字节（9.63 MB 十进制）。
- git diff --check：无空白错误；仅有 Git 换行转换提示。

## 尚未完成的验证

未构建 Huawei RPK；现有 builder.json 只有版本字段，没有 Huawei 发布配置。Web 目录体积不能作为 RPK 低于 100 MB 的证明。未执行 Huawei 真机帧率、GPU/内存、触控和存档重启测试，也未完整通关所有关卡。发布前应补齐应用包名、图标、签名等平台配置，再打包并真机验证。

## 每颗外观

外观主题不覆盖旧名称。variant 区分同类图案的布局。

| ID | 游戏名称 | 稀有度 | 外观主题 | 玻璃 / 图案 / variant | 内部渲染 |
| --- | --- | --- | --- | --- | --- |
${rows}
`, 'utf8');
