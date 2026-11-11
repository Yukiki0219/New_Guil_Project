# GULI 庭院弹珠

2026-10-19：已接入用户提供的透明 HUD 图集，提供19个独立 Prefab 与 `HudComponents.scene` 展示场景。使用方式见 [HUD 组件说明](docs/hud-components.md)。弹珠外观按用户要求保留 Git `03dde136bdf4761450c015086a9074e5d99bd3d5` 的程序绘制样式；其余 UI 继续使用新 HUD 素材，Box2D 物理保持不变。

Cocos Creator 3.8.8 的第一版单机可玩原型。720 × 1280 竖屏；电脑鼠标与手机触控共用操作逻辑。

## 试玩

在 Cocos Creator 打开 `assets/scenes/Guli.scene`，点击顶部预览。编辑器运行时通常可访问 http://localhost:7456/ 。若预览工具栏选中固定设计尺寸导致窗口放不下，请选择 **Webpage Full Screen**；游戏按比例留黑边，不裁切操作区。

主页 → 开始游戏 → 第一关。按住自己的弹珠向后拖拉，查看实时力度和反向瞄准线，松手立即发射。拉回起点再松手可取消，电脑也可用 Esc 或右键取消。球静止后才能再次射击。未拖拉时，暂停按钮 / Esc 可暂停，包括碰撞过程中。主页提供图鉴、原始皮肤与音效开关。操作参数与测试步骤见 [弹弓操作说明](docs/slingshot-controls.md)。

## 已实现

- 五个固定布局关卡、逐关解锁、有限射击次数与按效率评分的三星。
- Cocos Box2D 原生刚体与圆形碰撞体，120 Hz 固定步长、连锁碰撞及引擎线性阻尼。物理在圆形地面计算，视觉纵向压缩为略倾斜俯视。
- 目标球完全越过边界才计数。发射球起始在圈外，不会在入场前误删除；回合结束清理。
- 碰撞全部结算后判断胜负，最后一发仍然可以获胜。
- 50 个独立收藏 ID：10 种基础颜色 × 5 个命名花纹系列，含普通、稀有、珍藏。外观为程序绘制的原型效果。
- 击出且过关才保存本局收藏；重复不叠加，不消耗收藏。重玩保留相同初始布局与本局弹珠种类，回到选关再进入会重新抽取种类。
- 本地保存最高星级、收藏与音效设置；存档损坏时安全回退。浏览器预览与 Android 存档各自独立。
- 皮肤与图鉴分开，当前仅有已装备的原始皮肤。
- 原创合成射击、碰撞、胜利音效；AI 生成的庭院背景。

## 验证

```powershell
npm.cmd test
npm.cmd run typecheck
```

测试使用项目已安装的 MCP 扩展内 TypeScript 编译器，无需额外下载依赖。命令行测试仅覆盖规则、边界、连续静止计时、最后一发、重复射击、失败不奖励、重玩保存和存档校验。

真实物理测试：打开 Guli 场景，在浏览器预览地址添加 `?guliPhysicsTest=1`，等待显示 `DONE`。它通过实际 Cocos RigidBody2D / CircleCollider2D 和 Box2D 验证碰撞、单位、阻尼、暂停、帧率及五关三星路线，不读写玩家存档。仅预览模式可启用。参数、实测结果和限制见 [物理迁移报告](docs/physics-migration.md)。

## 后续迭代与 Android

本版优先验证玩法，不是最终美术或发布包。需要玩家试玩调整摩擦、力度范围、关卡难度与稀有度；50 种外观后续可替换为更精细的专用美术资源。背景是独立图片，其余界面与弹珠由 Cocos 绘制，没有把概念图当作游戏截图。

Android APK/AAB 尚未构建或实机验证。构建时在 Creator 的构建发布面板选择 Android、入口场景 `Guli`、竖屏；配置本机 Android SDK/NDK/JDK 后再构建。引擎 API、图像资源和 WAV 音效不依赖浏览器 DOM；触控仍需在目标手机验证。没有账号、广告、内购或云同步。

## 主要文件

- `assets/scripts/GameModel.ts`：规则、关卡配置、收藏与存档逻辑；不再计算移动或碰撞冲量。
- `assets/scripts/GuliPhysics.ts`：Cocos 原生物理接入、单位换算、固定步进和参数。
- `assets/scripts/PhysicsVerification.ts`：仅预览启用的真实引擎回归测试。
- `assets/scripts/GuliGame.ts`：Cocos 界面、输入、音效与游戏状态显示。
- `assets/scenes/Guli.scene`：入口场景，挂载 `GuliGame`。
- `assets/resources/art/courtyard.png`：庭院背景。
- `tests/game-model.cjs`：不依赖引擎的规则测试。
- `docs/art-source.md`：背景生成来源与提示词。
