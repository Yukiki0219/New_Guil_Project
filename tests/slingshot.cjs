const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('../extensions/cocos-creator-mcp-main/node_modules/typescript');
function load(name) {
    const source = fs.readFileSync(`${__dirname}/../assets/scripts/${name}.ts`, 'utf8');
    const box = { exports: {}, require: name => load(name.replace('./', '')) };
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, box);
    return box.exports;
}
const { Slingshot, GROUND_Y_SCALE } = load('Slingshot');
const { GameModel, SHOOTER_Y } = load('GameModel');
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
test('Only shooter hit area starts a pull; off-centre grab does not jump', () => {
    const s = new Slingshot();
    assert(!s.begin('a', 45, 0, 0, 0));
    assert(s.begin('a', 20, 0, 0, 0));
    assert.equal(s.distance, 0);
    s.move('a', 20, -64); assert.equal(s.x, 0); assert.equal(s.y, -64);
});
test('Power endpoints, midpoint and visual displacement stay capped', () => {
    const s = new Slingshot(); s.begin('a', 0, 0, 0, 0);
    for (const [distance, power] of [[0, 1], [8, 1], [64, 51], [120, 100], [10000, 100]]) {
        s.move('a', 0, -distance); assert.equal(s.power, power); assert(s.distance <= 120);
    }
    s.move('a', 10000, -10000); assert(Math.abs(s.distance - 120) < 1e-9);
});
test('Second finger cannot steal, move, release or cancel the first', () => {
    const s = new Slingshot(); s.begin('a', 0, 0, 0, 0); s.move('a', 0, -80);
    assert(!s.begin('b', 0, 0, 0, 0)); assert(!s.move('b', 0, -120));
    assert.equal(s.release('b', 0, -120), null); assert(!s.cancel('b'));
    assert.equal(s.y, -80); assert.equal(s.pointer, 'a');
});
test('Tap, deadzone, return to anchor and cancellation produce no shot', () => {
    for (const distance of [0, 7]) {
        const s = new Slingshot(); s.begin('a', 0, 0, 0, 0); s.move('a', 0, -100);
        assert.equal(s.release('a', 0, -distance), null); assert.equal(s.pointer, null);
    }
    const s = new Slingshot(); s.begin('a', 0, 0, 0, 0); s.move('a', 0, -80); s.cancel();
    assert.equal(s.distance, 0); assert.equal(s.release('a', 0, -80), null);
});
test('Release consumes final position, launches opposite the projected pull and spends once', () => {
    for (const [x, y] of [[30, -70], [-30, -70], [30, 70], [120, 0]]) {
        const s = new Slingshot(); const m = new GameModel();
        s.begin('a', 0, 0, 0, 0); const shot = s.release('a', x, y);
        assert(shot); const gy = shot.y / GROUND_Y_SCALE;
        assert(m.launch(-shot.x, -gy, (shot.power - 1) / 99, shot.x, SHOOTER_Y + gy));
        const b = m.balls.at(-1);
        assert.equal(b.x, shot.x); assert.equal(b.y, SHOOTER_Y + gy);
        assert(b.vx * shot.x + b.vy * GROUND_Y_SCALE * shot.y < 0);
        assert(Math.abs(b.vx * shot.y - b.vy * GROUND_Y_SCALE * shot.x) < 1e-8);
        assert.equal(m.used, 1); assert(!m.launch(0, 1, 1)); assert.equal(m.used, 1);
        assert.equal(s.release('a', x, y), null);
    }
});
test('Invalid and zero launch directions cannot consume shots', () => {
    const m = new GameModel();
    assert(!m.launch(0, 0, 1)); assert(!m.launch(NaN, 1, 1));
    assert(!m.launch(0, 1, Infinity)); assert.equal(m.used, 0);
});
console.log(`${count} slingshot checks passed.`);
const { predictAim } = load('AimPrediction');
const target = (x, y, r = 30) => ({ x, y, r, gone: false, shooter: false });
test('Prediction grows with power, follows normalized direction and does not mutate targets', () => {
    const balls = [target(150, 100)]; const before = JSON.stringify(balls);
    const low = predictAim(0, -450, 0, 1, 1, balls, .65);
    const high = predictAim(0, -450, 0, 1, 100, balls, .65);
    assert(high.distance > low.distance); assert.equal(high.x, 0);
    assert.equal(high.hit, 'boundary'); assert.equal(high.y, 228);
    assert.equal(JSON.stringify(balls), before);
});
test('Swept shooter radius stops at nearest target, including tangent contact', () => {
    const hit = predictAim(0, -450, 0, 1, 100, [target(0, 100), target(0, -100)], .65);
    assert.equal(hit.hit, 'marble'); assert.equal(hit.y, -162);
    const tangent = predictAim(0, -450, 0, 1, 100, [target(62, -100)], .65);
    assert.equal(tangent.hit, 'marble'); assert.equal(tangent.y, -100);
    const overlap = predictAim(0, 0, 1, 0, 100, [target(0, 0)], .65);
    assert.equal(overlap.distance, 0);
});
test('Boundary permits outside entry, stops inside exit, ignores targets behind or removed', () => {
    assert.equal(predictAim(0, 0, 1, 0, 100, [], .65).x, 228);
    const balls = [target(0, -600), { ...target(0, -100), gone: true }];
    assert.equal(predictAim(0, -450, 0, 1, 100, balls, .65).hit, 'boundary');
    assert.equal(predictAim(0, -450, 0, -1, 100, [], .65).hit, 'range');
    assert.equal(predictAim(0, 0, 0, 0, 100, [], .65), null);
});
test('Displayed low, middle and full power share the boosted actual launch speed and prediction', () => {
    for (const power of [1, 10, 50, 100]) {
        const normalized = (power - 1) / 99;
        const expected = (380 + normalized * 1220) * 1.1;
        const model = new GameModel();
        assert(model.launch(0, -1, normalized));
        const ball = model.balls.at(-1);
        assert(Math.abs(Math.hypot(ball.vx, ball.vy) - expected) < 1e-9);
        for (const damping of [0, .65]) {
            const predicted = predictAim(0, -450, 0, -1, power, [], damping);
            const travel = damping ? expected * (1 - Math.exp(-damping * .8)) / damping : expected * .8;
            assert.equal(predicted.hit, 'range');
            assert(Math.abs(predicted.distance - travel) < 1e-9);
        }
    }
});
console.log('4 aim prediction checks passed.');
