const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const templateDir = 'C:/ProgramData/cocos/editors/Creator/3.8.8/resources/resources/3d/engine/editor/assets/default_prefab/ui';
const sprite = JSON.parse(fs.readFileSync(path.join(templateDir, 'Sprite.prefab'), 'utf8'));
const button = JSON.parse(fs.readFileSync(path.join(templateDir, 'Button.prefab'), 'utf8'));
const atlas = JSON.parse(fs.readFileSync(path.join(root, 'assets/resources/hud/guli-hud.plist.meta'), 'utf8'));
const parts = require('../docs/hud-regions.json');
const ballCenters = { MarbleBlue: [905,445,81], MarbleAmber: [1150,448,81], MarbleGreen: [890,675,85], MarblePurple: [1150,674,84], MarbleShooter: [1410,674,85] };
const labels = { LevelPlate: '第 1 关', TargetPlate: '目标 0/2', ShotsPlate: '剩余 5 次', FireButton: '发射' };
for (const [name, rect] of Object.entries(parts)) {
  const frame = Object.values(atlas.subMetas).find(s => s.name === name);
  if (!frame) throw new Error('Missing frame ' + name);
  const hasLabel = name in labels;
  const data = structuredClone(hasLabel || /Button$/.test(name) ? button : sprite);
  data[0]._name = name; data[1]._name = name;
  const ui = data.find(d => d.__type__ === 'cc.UITransform' && d.node.__id__ === 1);
  ui._contentSize = { __type__: 'cc.Size', width: rect[2], height: rect[3] };
  const art = data.find(d => d.__type__ === 'cc.Sprite' && d.node.__id__ === 1);
  art._spriteFrame = { __uuid__: frame.uuid, __expectedType__: 'cc.SpriteFrame' }; art._type = 0; art._sizeMode = 0;
  art._color = { __type__: 'cc.Color', r:255,g:255,b:255,a:255 };
  const label = data.find(d => d.__type__ === 'cc.Label');
  if (label) { label._string = labels[name] || ''; label._fontSize = name === 'FireButton' ? 44 : 32; label._lineHeight=50; label._color={__type__:'cc.Color',r:name==='FireButton'?255:22,g:name==='FireButton'?255:78,b:name==='FireButton'?255:84,a:255}; }
  if (!/Button$/.test(name)) data[1]._components = data[1]._components.filter(r => data[r.__id__].__type__ !== 'cc.Button');
  if (label) {
    const labelUI = data.find(d => d.__type__ === 'cc.UITransform' && d.node.__id__ === label.node.__id__);
    labelUI._contentSize.width = rect[2] - 40;
    labelUI._contentSize.height = 64;
    label._overflow = 2;
  }
  const btn = data.find(d => d.__type__ === 'cc.Button');
  if (btn) { btn._transition = 3; btn._zoomScale = 0.94; btn._duration = 0.1; btn._interactable = true; btn.clickEvents=[]; }
  if (ballCenters[name]) { const [x,y] = ballCenters[name]; ui._anchorPoint = { __type__:'cc.Vec2', x:(x-rect[0])/rect[2], y:1-(y-rect[1])/rect[3] }; }
  for (const d of data) if (d.fileId) d.fileId = crypto.randomBytes(16).toString('base64').replace(/=/g,'');
  const file = path.join(root,'assets/resources/hud/prefabs',name+'.prefab');
  if (fs.existsSync(file)) throw new Error('Refusing to overwrite edited prefab: ' + name);
  fs.writeFileSync(file, JSON.stringify(data,null,2));
}
console.log('Created 19 independent editable prefabs.');
