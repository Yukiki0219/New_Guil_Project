System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EventMouse, EventTouch, Input, Touch, UITransform, Vec3, view, game, Game, KeyCode, SHOOTER_Y, GROUND_Y_SCALE, _crd;

  function verifySlingshot(component) {
    const g = component;
    const originalTuto = g.save.tuto;
    g.save.tuto = true;
    const lines = [];
    let failed = 0;

    const check = (v, text) => {
      if (!v) throw new Error(text);
    };

    const near = (a, b) => check(Math.abs(a - b) < .01, `${a} != ${b}`);

    const anchor = 30 + (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
      error: Error()
    }), GROUND_Y_SCALE) : GROUND_Y_SCALE) * (_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
      error: Error()
    }), SHOOTER_Y) : SHOOTER_Y);

    const raw = (x, y) => {
      const p = g.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(x, y, 0));
      const viewport = view.getViewportRect();
      return [p.x * view.getScaleX() + viewport.x, p.y * view.getScaleY() + viewport.y];
    };

    const touch = (type, id, x, y) => {
      const p = raw(x, y);
      const t = new Touch(p[0], p[1], id);
      const e = new EventTouch([t], false, type, [t]);
      e.touch = t;
      return e;
    };

    const mouse = (type, x, y, button = 0) => {
      const p = raw(x, y);
      const e = new EventMouse(type);
      e.setLocation(p[0], p[1]);
      e.setButton(button);
      return e;
    };

    const test = (name, fn) => {
      try {
        g.startLevel(0);
        fn();
        lines.push('PASS ' + name);
      } catch (e) {
        failed++;
        lines.push('FAIL ' + name + ': ' + String(e));
      }
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
      near(g.shooterPreview.position.y, anchor);
      check(g.model.used === 0, 'Cancel spent shot');
    });
    test('Release launches once from pulled position; native physics settles normally', () => {
      g.touchDown(touch(Input.EventType.TOUCH_START, 3, 0, anchor));
      g.touchUp(touch(Input.EventType.TOUCH_END, 3, 60, anchor - 100));
      const b = g.model.balls.find(b => b.shooter);
      near(b.x, 60);
      near(b.y, (_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
        error: Error()
      }), SHOOTER_Y) : SHOOTER_Y) - 100 / (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
        error: Error()
      }), GROUND_Y_SCALE) : GROUND_Y_SCALE));
      check(b.vx < 0 && b.vy > 0, 'Incorrect launch direction');
      g.touchUp(touch(Input.EventType.TOUCH_END, 3, 60, anchor - 100));
      g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
      check(g.model.used === 1 && g.sling.pointer === null, 'Duplicate input fired');
      check(!g.aimMarker.active, 'Arrow remains after release');
      let frames = 0;

      while (g.model.phase === 'moving' && frames++ < 1800) g.physics.advance(1 / 60);

      check(g.model.phase !== 'moving', 'Physics did not settle in 30s');
      check(!g.model.balls.some(b => b.shooter), 'Shooter was not cleaned up');
    });
    test('Mouse caps at 100, Esc and right click cancel, tap does not fire', () => {
      g.lastTouch = 0;
      g.mouseDown(mouse(Input.EventType.MOUSE_DOWN, 0, anchor));
      g.mouseMove(mouse(Input.EventType.MOUSE_MOVE, 0, anchor - 300));
      near(g.shooterPreview.position.y, anchor - 120);
      check(g.powerText.string === '100 / 100', 'Power did not cap');
      g.keyDown({
        keyCode: KeyCode.ESCAPE
      });
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
      g.down('mouse', 150, 150);
      check(g.sling.pointer === null, 'Board started pull');
      g.down('mouse', 0, anchor);
      g.move('mouse', 0, anchor - 90);
      game.emit(Game.EVENT_HIDE);
      check(g.sling.pointer === null && g.model.used === 0, 'Hide spent shot');
      g.down('mouse', 0, anchor);
      g.move('mouse', 0, anchor - 90);
      g.blurHandler();
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

  function _reportPossibleCrUseOfSHOOTER_Y(extras) {
    _reporterNs.report("SHOOTER_Y", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGROUND_Y_SCALE(extras) {
    _reporterNs.report("GROUND_Y_SCALE", "./Slingshot", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuliGame(extras) {
    _reporterNs.report("GuliGame", "./GuliGame", _context.meta, extras);
  }

  _export("verifySlingshot", verifySlingshot);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      EventMouse = _cc.EventMouse;
      EventTouch = _cc.EventTouch;
      Input = _cc.Input;
      Touch = _cc.Touch;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      view = _cc.view;
      game = _cc.game;
      Game = _cc.Game;
      KeyCode = _cc.KeyCode;
    }, function (_unresolved_2) {
      SHOOTER_Y = _unresolved_2.SHOOTER_Y;
    }, function (_unresolved_3) {
      GROUND_Y_SCALE = _unresolved_3.GROUND_Y_SCALE;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ca947iRtqJG8qM33u/5kfsd", "SlingshotVerification", undefined);
      /** Opt-in preview integration checks. Synchronous: no gameplay update/save during tests. */


      __checkObsolete__(['EventMouse', 'EventTouch', 'Input', 'Touch', 'UITransform', 'Vec3', 'view', 'game', 'Game', 'KeyCode']);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2da3ee31eb2016350dc9e44f4e084feb967aead0.js.map