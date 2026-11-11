# 透明 HUD 素材与独立组件

当前调整：仅弹珠外观采用 Git `03dde136bdf4761450c015086a9074e5d99bd3d5` 的程序绘制版本；其他 HUD 组件继续使用本图集。五种弹珠 Prefab 仍作为备用资产保留，以下关于复用五种弹珠图像的说明记录此前集成状态。

使用用户提供的 `Glossy GULi Marble Game HUD Sprite Sheet.png`，复制到 `assets/resources/hud/guli-hud.png`。PNG 原始字节保持不变，没有重新生成、抠图、重采样或擦除光晕。

## 在 Cocos 中使用

1. 打开 `assets/scenes/HudComponents.scene` 查看19个独立组件；在层级面板逐个选择即可修改。
2. 打开 `assets/resources/hud/prefabs/`，把所需 `.prefab` 拖入任意 Canvas。
3. 双击 Prefab 编辑其 Sprite、UITransform、Button 或 Label，保存后游戏下一次载入使用更新后的外观。
4. 若只需要图片，展开 `assets/resources/hud/guli-hud.plist`，把独立 SpriteFrame 拖到 Sprite 的 Sprite Frame 属性。
5. 回到 `assets/scenes/Guli.scene` 预览完整游戏。展示场景仅用于编辑和查看，各按钮未绑定游戏回调。

## 组件清单

| Prefab | 组成与用途 |
| --- | --- |
| HomeButton、PauseButton | Sprite + 原生 Button，缩放按压反馈 |
| FireButton | Sprite + Button + 独立 Label（发射） |
| Logo | 独立 Sprite |
| LevelPlate、TargetPlate、ShotsPlate | 独立 Sprite + Label，运行时更新关卡/进度/次数 |
| StarEmpty、StarEmpty2、StarEmpty3 | 原图的三颗独立空星；游戏用金色绘制层表示已获得星级 |
| ChalkRing | 独立圆圈 Sprite，游戏按略倾斜视角显示，规则仍使用原有圆形地面 |
| AimMarker | 独立 Sprite，随瞄准拖动 |
| AimLine | 原图虚线 Sprite；已提供 Prefab，游戏中的变长虚线仍由 Graphics 绘制 |
| MarbleBlue、MarbleAmber、MarbleGreen、MarblePurple、MarbleShooter | 五种弹珠 Sprite，完整保留透明边缘、阴影和光晕；锚点设置在球心 |
| ControlPanel | 底部背景 Sprite，力度条与按钮独立叠加 |

## 实现范围

- 使用一个 PNG 图集 + 19 个 SpriteFrame 区域 + 19 个可独立编辑的 Prefab。没有另存19张PNG；这不影响它们在 Cocos 中独立使用。
- 原始素材只有五种弹珠图像。50个收藏ID、存档与物理规则仍保留，目前会复用这五种视觉素材，尚未为50个ID各制作独有图案。
- 阴影/光晕仍与各自球体在同一 SpriteFrame 中，未从原图再次拆成光照层。球心锚点让运动位置对应球体，碰撞不包含阴影。
- 主游戏从 Prefab 实例化素材，界面布局坐标与事件回调目前仍由 `GuliGame.ts` 管理。展示场景内的布局仅供查看，移动展示场景里的节点不会改动游戏布局。
- 状态底板与面板当前使用 Simple Sprite 按比例/尺寸显示，不宣称已经做九宫格重绘；很大幅度改长宽比时建议另外制作九宫格底图。

## 维护

`docs/hud-regions.json` 保存所有区域的像素坐标（左上角原点）。`tools/create-hud-atlas.cjs` 可重新生成 plist。

`tools/create-hud-prefabs.cjs` 用当前 Cocos 3.8.8 内置模板生成初始 Prefab，发现现有 Prefab 会拒绝覆盖，避免破坏手工编辑。
