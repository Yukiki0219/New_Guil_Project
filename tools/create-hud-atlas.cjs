// Lossless separation: only texture coordinates are authored; source PNG is never modified.
const fs = require('node:fs');
const path = require('node:path');
const dir = path.join(__dirname, '../assets/resources/hud');
const parts = {
  HomeButton: [266, 7, 205, 207], Logo: [536, 7, 479, 212], PauseButton: [1097, 7, 213, 207],
  LevelPlate: [14, 220, 384, 126], TargetPlate: [398, 220, 362, 126], ShotsPlate: [762, 220, 352, 126],
  StarEmpty: [1115, 218, 125, 130], StarEmpty2: [1258, 218, 125, 130], StarEmpty3: [1398, 218, 132, 130],
  ChalkRing: [20, 380, 432, 420], AimMarker: [461, 480, 190, 187], AimLine: [676, 390, 50, 390],
  MarbleBlue: [752, 350, 265, 230], MarbleAmber: [1018, 350, 245, 230],
  MarbleGreen: [742, 580, 265, 224], MarblePurple: [1008, 580, 255, 224], MarbleShooter: [1265, 580, 265, 210],
  ControlPanel: [9, 807, 812, 213], FireButton: [1278, 789, 252, 235],
};
const frames = Object.entries(parts).map(([name, [x,y,w,h]]) => `<key>${name}</key><dict><key>frame</key><string>{{${x},${y}},{${w},${h}}}</string><key>offset</key><string>{0,0}</string><key>rotated</key><false/><key>sourceColorRect</key><string>{{0,0},{${w},${h}}}</string><key>sourceSize</key><string>{${w},${h}}</string></dict>`).join('\n');
fs.writeFileSync(path.join(dir, 'guli-hud.plist'), `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0"><dict><key>frames</key><dict>${frames}</dict><key>metadata</key><dict><key>format</key><integer>2</integer><key>size</key><string>{1536,1024}</string><key>textureFileName</key><string>guli-hud.png</string><key>realTextureFileName</key><string>guli-hud.png</string></dict></dict></plist>`);
fs.writeFileSync(path.join(__dirname, '../docs/hud-regions.json'), JSON.stringify(parts, null, 2));
console.log(`Wrote ${Object.keys(parts).length} atlas regions without changing image pixels.`);
