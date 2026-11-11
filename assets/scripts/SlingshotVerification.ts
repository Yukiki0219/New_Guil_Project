/** Opt-in preview integration checks. Synchronous: no gameplay update/save during tests. */
import { EventMouse, EventTouch, Input, Touch, UITransform, Vec3, view, game, Game, KeyCode } from 'cc';
import { SHOOTER_Y } from './GameModel';
import { GROUND_Y_SCALE } from './Slingshot';
import type { GuliGame } from './GuliGame';

export function verifySlingshot(component: GuliGame) {
    const g = component as any;
    const originalTuto = g.save.tuto; g.save.tuto = true;
    const lines: string[] = [];
    let failed = 0;
    const check = (v: boolean, text: string) => { if (!v) throw new Error(text); };
    const near = (a: number, b: number) => check(Math.abs(a - b) < .01, `${a} != ${b}`);
    const anchor = 30 + GROUND_Y_SCALE * SHOOTER_Y;
    const raw = (x: number, y: number) => {
        const p = g.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(x, y, 0));
        const viewport = view.getViewportRect();
        return [p.x * view.getScaleX() + viewport.x, p.y * view.getScaleY() + viewport.y];
    };
    const touch = (type: string, id: number, x: number, y: number) => {
        const p = raw(x, y);
        const t = new Touch(p[0], p[1], id);
        const e = new EventTouch([t], false, type as any, [t]); e.touch = t; return e;
    };
    const mouse = (type: string, x: number, y: number, button = 0) => {
        const p = raw(x, y); const e = new EventMouse(type as any);
        e.setLocation(p[0], p[1]); e.setButton(button); return e;
    };
    const test = (name: string, fn: () => void) => {
        try { g.startLevel(0); fn(); lines.push('PASS ' + name); }
        catch (e) { failed++; lines.push('FAIL ' + name + ': ' + String(e)); }
    };
    test('Touch pull updates marble, power label and aim; second touch cannot interfere', () => {
        g.touchDown(touch(Input.EventType.TOUCH_START, 1, 0, anchor));
        g.touchMove(touch(Input.EventType.TOUCH_MOVE, 1, 0, anchor - 64));
        near(g.shooterPreview.position.y, anchor - 64);
        check(g.powerText.string === '51 / 100', g.powerText.string);
        check(g.aimMarker.active, 'Missing aim marker');
        check(g.aimMarker.name === 'AimArrow', 'Old crosshair remains');
        near(g.aimMarker.angle, 0);
        check(g.aimMarker.position.y > g.shooterPreview.position.y, 'Arrow points behind launch');
        check(g.model.used === 0, 'Drag spent shot');
        g.touchDown(touch(Input.EventType.TOUCH_START, 2, 0, anchor));
        g.touchCancel(touch(Input.EventType.TOUCH_CANCEL, 2, 0, anchor));
        check(g.sling.pointer === 'touch:1', 'Second finger stole pull');
        g.touchCancel(touch(Input.EventType.TOUCH_CANCEL, 1, 0, anchor));
        near(g.shooterPreview.position.y, anchor); check(g.model.used === 0, 'Cancel spent shot');
    });
    test('Release launches once from pulled position; native physics settles normally', () => {
        g.touchDown(touch(Input.EventType.TOUCH_START, 3, 0, anchor));
        g.touchUp(touch(Input.EventType.TOUCH_END, 3, 60, anchor - 100));
        const b = g.model.balls.find((b: any) => b.shooter);
        near(b.x, 60); near(b.y, SHOOTER_Y - 100 / GROUND_Y_SCALE);
        check(b.vx < 0 && b.vy > 0, 'Incorrect launch direction');
        g.touchUp(touch(Input.EventType.TOUCH_END, 3, 60, anchor - 100));
        g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
        check(g.model.used === 1 && g.sling.pointer === null, 'Duplicate input fired');
        check(!g.aimMarker.active, 'Arrow remains after release');
        let frames = 0;
        while (g.model.phase === 'moving' && frames++ < 1800) g.physics.advance(1 / 60);
        check(g.model.phase !== 'moving', 'Physics did not settle in 30s');
        check(!g.model.balls.some((b: any) => b.shooter), 'Shooter was not cleaned up');
    });
    test('Mouse caps at 100, Esc and right click cancel, tap does not fire', () => {
        g.lastTouch = 0;
        g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
        g.mouseMove(mouse(Input.EventType.MOUSE_MOVE, 0, anchor - 300));
        near(g.shooterPreview.position.y, anchor - 120);
        check(g.powerText.string === '100 / 100', 'Power did not cap');
        g.keyDown({ keyCode: KeyCode.ESCAPE });
        near(g.shooterPreview.position.y, anchor);
        g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
        g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor, 2));
        check(g.sling.pointer === null, 'Right click did not cancel');
        g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
        g.mouseUp(mouse(Input.EventType.MOUSE_UP, 0, anchor));
        check(g.model.used === 0, 'Tap spent shot');
        g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
        g.mouseUp(mouse(Input.EventType.MOUSE_UP, -40, anchor - 80));
        check(g.model.used === 1 && g.model.phase === 'moving', 'Mouse release did not fire');
    });
    test('Background/blur cancel and non-shooter input cannot begin pull', () => {
        g.down('mouse', 150, 150); check(g.sling.pointer === null, 'Board started pull');
        g.down('mouse', 0, anchor); g.move('mouse', 0, anchor - 90);
        game.emit(Game.EVENT_HIDE);
        check(g.sling.pointer === null && g.model.used === 0, 'Hide spent shot');
        g.down('mouse', 0, anchor); g.move('mouse', 0, anchor - 90); g.blurHandler();
        near(g.shooterPreview.position.y, anchor);
        check(g.model.used === 0, 'Blur spent shot');
    });
    g.navigate('home');
    if (failed === 0 && new URLSearchParams(window.location.search).get('guliAimDemo') === '1') {
        g.startLevel(0);
        g.down('demo', 0, anchor);
        g.move('demo', 28, anchor - 110);
        return;
    }
    g.save.tuto = originalTuto;
    const report = document.createElement('pre');
    report.id = 'slingshot-verification';
    report.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#102b30;color:white;padding:20px;white-space:pre-wrap';
    report.textContent = lines.join('\n') + `\nDONE: ${4 - failed} passed, ${failed} failed`;
    document.body.appendChild(report);
    console.log(report.textContent);
}
