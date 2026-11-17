const fs = require('node:fs');
const path = require('node:path');

const rate = 44100;
const out = __dirname;
let seed = 71;
const rand = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const blank = seconds => new Float64Array(Math.ceil(seconds * rate));

function tone(buf, start, freq, duration, gain, kind = 'glass') {
  const first = Math.round(start * rate);
  const n = Math.round(duration * rate);
  const partials = kind === 'wood' ? [[1, 1, 15], [2.1, .30, 28], [3.7, .12, 42]]
    : kind === 'bell' ? [[1, 1, 4], [2, .30, 7], [2.76, .23, 9], [5.4, .09, 15]]
    : [[1, 1, 9], [2.02, .27, 14], [3.91, .12, 23]];
  for (let i = 0; i < n && first + i < buf.length; i++) {
    const t = i / rate;
    const attack = Math.min(1, t / .003);
    let value = 0;
    for (const [multiple, level, decay] of partials)
      value += Math.sin(2 * Math.PI * freq * multiple * t) * level * Math.exp(-decay * t);
    buf[first + i] += gain * attack * value;
  }
}

function tick(buf, start, gain = .08) {
  const first = Math.round(start * rate);
  let smooth = 0;
  for (let i = 0; i < .025 * rate && first + i < buf.length; i++) {
    smooth = smooth * .65 + rand() * .35;
    buf[first + i] += gain * smooth * Math.exp(-i / rate * 170);
  }
}

function brush(buf, duration, gain, start = 0) {
  let low = 0;
  const count = Math.round(duration * rate);
  const first = Math.round(start * rate);
  for (let i = 0; i < count; i++) {
    const noise = rand();
    low = low * .86 + noise * .14;
    const envelope = Math.sin(Math.PI * i / count) ** 2;
    buf[first + i] += (noise - low) * envelope * gain;
  }
}

function finish(buf) {
  // A quiet early reflection makes each dry synthesized tap feel physical.
  const delay = Math.round(.047 * rate);
  for (let i = buf.length - 1; i >= delay; i--) buf[i] += buf[i - delay] * .11;
  let peak = 0;
  for (const sample of buf) peak = Math.max(peak, Math.abs(sample));
  const scale = peak > .86 ? .86 / peak : 1;
  const pcm = Buffer.alloc(44 + buf.length * 2);
  pcm.write('RIFF', 0); pcm.writeUInt32LE(pcm.length - 8, 4); pcm.write('WAVEfmt ', 8);
  pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(1, 22);
  pcm.writeUInt32LE(rate, 24); pcm.writeUInt32LE(rate * 2, 28);
  pcm.writeUInt16LE(2, 32); pcm.writeUInt16LE(16, 34);
  pcm.write('data', 36); pcm.writeUInt32LE(buf.length * 2, 40);
  buf.forEach((sample, i) => pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, sample * scale)) * 32767), 44 + i * 2));
  return pcm;
}

const sounds = {};
sounds.navigation = blank(.18);
brush(sounds.navigation, .075, .014);

sounds.selection = blank(.16);
brush(sounds.selection, .06, .012);

sounds.confirm = blank(.22);
brush(sounds.confirm, .055, .013);
brush(sounds.confirm, .055, .014, .07);

sounds.draw = blank(.72);
for (let i = 0; i < 7; i++) {
  const t = i * .063 + i * i * .004;
  tone(sounds.draw, t, 320 + i * 65, .17, .20 + i * .016, i % 2 ? 'wood' : 'glass');
  tick(sounds.draw, t, .07);
}

sounds.reward = blank(1.12);
for (const [t, freq, gain] of [[0, 523.25, .27], [.125, 659.25, .25], [.25, 783.99, .25], [.39, 1046.5, .29]]) {
  tone(sounds.reward, t, freq, .69, gain, 'bell'); tick(sounds.reward, t, .025);
}

for (const [name, buf] of Object.entries(sounds)) fs.writeFileSync(path.join(out, `${name}.wav`), finish(buf));
const demo = blank(7.6);
let offset = .25;
for (const buf of Object.values(sounds)) {
  demo.set(buf, Math.round(offset * rate));
  offset += buf.length / rate + .5;
}
fs.writeFileSync(path.join(out, 'all-five.wav'), finish(demo));
