// Small original synthesized effects, no external samples or runtime audio dependencies.
const fs = require('node:fs');
const path = require('node:path');
const dir = path.join(__dirname, '../assets/resources/audio');
fs.mkdirSync(dir, { recursive: true });
for (const [name, duration, frequency] of [['hit', .09, 1800], ['shoot', .15, 410], ['win', .65, 660]]) {
  const rate = 22050, size = Math.floor(rate * duration), data = Buffer.alloc(44 + size * 2);
  data.write('RIFF'); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8); data.writeUInt32LE(16, 16);
  data.writeUInt16LE(1, 20); data.writeUInt16LE(1, 22); data.writeUInt32LE(rate, 24); data.writeUInt32LE(rate * 2, 28);
  data.writeUInt16LE(2, 32); data.writeUInt16LE(16, 34); data.write('data', 36); data.writeUInt32LE(size * 2, 40);
  for (let i = 0; i < size; i++) {
    const t = i / rate, f = name === 'win' ? frequency * [1, 1.25, 1.5][Math.min(2, Math.floor(t * 5))] : frequency;
    const envelope = Math.min(1, t * 300) * Math.exp(-t * (name === 'win' ? 5 : 35));
    data.writeInt16LE(Math.round(Math.sin(2 * Math.PI * f * t) * envelope * 12000), 44 + i * 2);
  }
  fs.writeFileSync(path.join(dir, name + '.wav'), data);
}
console.log('Created three original WAV effects.');
