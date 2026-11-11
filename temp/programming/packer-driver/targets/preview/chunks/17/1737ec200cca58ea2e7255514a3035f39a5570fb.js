System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Label, Button, UITransform, cleanSave, SHOOTER_Y, award, _crd;

  /** Opt-in preview regression checks; restores user's in-memory save and never writes storage. */
  function verifyTutorial(component) {
    var g = component,
        save = g.save,
        persist = g.persist;
    var writes = 0,
        failed = 0;
    var lines = [];

    var check = (v, m) => {
      if (!v) throw Error(m);
    };

    var test = (name, run) => {
      try {
        run();
        lines.push('PASS ' + name);
      } catch (e) {
        failed++;
        lines.push('FAIL ' + name + ': ' + e);
      }
    };

    g.persist = () => writes++;

    g.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
      error: Error()
    }), cleanSave) : cleanSave)(null);
    g.navigate('home');
    test('Main menu routes Play to levels and centers Help between skin and sound', () => {
      var buttons = g.ui.children;
      check(!buttons.some(n => n.name === 'Button-关卡选择'), 'duplicate level button');
      var help = buttons.find(n => n.name === 'Button-新手教学 / Help');
      var skin = buttons.find(n => n.name === 'Button-发射球皮肤');
      var sound = buttons.find(n => n.name.startsWith('Button-音效'));
      check(help.position.x === 0 && skin.position.y > help.position.y && help.position.y > sound.position.y, 'menu ordering');
      g.play();
      check(g.screen === 'levels' && !g.tutorial, 'Play skipped level selector');
    });
    g.startLevel(0);
    test('Three pages, back/swipe, no shots or state changes', () => {
      var before = JSON.stringify(g.model);
      check(g.tutorial.page === 0, 'first page');
      g.down('test', 0, -274);
      g.move('test', 0, -380);
      g.up('test', 0, -380);
      check(g.model.used === 0, 'fired');
      g.down('test', 200, 0);
      g.up('test', -200, 0);
      check(g.tutorial.page === 1, 'swipe left');
      g.down('test', -200, 0);
      g.up('test', 200, 0);
      check(g.tutorial.page === 0, 'swipe right');
      g.tutorialNext();
      g.tutorialNext();
      check(g.tutorial.page === 2, 'next pages');
      g.update(10);
      check(JSON.stringify(g.model) === before, 'demonstration mutated level');
    });
    test('Start persists completion and allows real launch once', () => {
      g.tutorialNext();
      check(!g.tutorial && g.save.tuto && writes === 1, 'completion');
      var y = g.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
        error: Error()
      }), SHOOTER_Y) : SHOOTER_Y);
      g.down('test', 0, y);
      g.move('test', 0, y - 80);
      g.up('test', 0, y - 80);
      g.up('test', 0, y - 80);
      check(g.model.used === 1 && g.model.phase === 'moving', 'launch/cost');
    });
    test('Replay freezes and preserves active round and shots', () => {
      var model = g.model,
          physics = g.physics,
          before = JSON.stringify(model);
      g.startTutorial();
      g.update(5);
      g.tutorialNext();
      g.tutorialNext();
      g.tutorialNext();
      check(g.model === model && g.physics === physics && JSON.stringify(model) === before, 'replay reset state');
    });
    test('Wrong target and idle hints clear on valid input', () => {
      g.startLevel(0);
      var b = g.model.balls[0];
      g.down('test', b.x, g.projectY(b.y));
      check(g.hints.reason === 'wrong', 'wrong hint');
      var y = g.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
        error: Error()
      }), SHOOTER_Y) : SHOOTER_Y);
      g.down('test', 0, y);
      check(!g.hints.reason, 'stale hint');
      g.cancelInput();
      g.update(11);
      check(g.hints.reason === 'idle', 'idle hint');
      check(g.model.used === 0, 'hint cost');
    });
    test('Later levels suppress idle, wrong-target, result hints and first-run tutorial', () => {
      for (var index of [1, 2, 3, 4]) {
        g.save.tuto = false;
        g.startLevel(index);
        check(!g.tutorial, 'later level auto tutorial');
        var b = g.model.balls[0];
        g.down('test', b.x, g.projectY(b.y));
        g.update(20);
        check(!g.hints.reason && !g.hintLayer, 'later level hint');
        var text = g.ui.getComponentsInChildren(Label).map(l => l.string).join('|');
        check(!/按住|后拉|取消|查看提示|整颗离开/.test(text), 'instruction text remains');
        check(g.powerG.node.position.y === 47, 'compact power placement');
        var before = JSON.stringify(g.model);
        g.startTutorial();
        check(!!g.tutorial, 'explicit help disabled');
        g.tutorialNext();
        g.tutorialNext();
        g.tutorialNext();
        check(JSON.stringify(g.model) === before, 'help changed level');
      }
    });
    test('Guide circles are gray 2px dashes at original bounds', () => {
      var paths = [];
      var mock = {
        moveTo: (x, y) => paths.push([x, y]),
        lineTo: () => {},
        stroke: () => {}
      };
      g.drawGuideCircle(mock, 10, 20, 44, 44);
      check(mock.lineWidth === 2, 'guide width');
      check(mock.strokeColor.r === 128 && mock.strokeColor.g === 128 && mock.strokeColor.b === 128, 'guide color');
      check(paths.length >= 16 && paths[0][0] === 54 && paths[0][1] === 20, 'dash geometry');
    });
    test('Every completed level offers Home with matching styling and preserves awarded save', () => {
      for (var index = 0; index < 5; index++) {
        g.save.tuto = true;
        g.startLevel(index); // UI fixture: model-rule tests separately exercise real settlement and rewards.

        g.model.phase = 'won';
        g.model.used = 3;
        g.model.knocked = g.model.balls.slice(0, g.model.level.target).map(b => b.id);
        g.save = (_crd && award === void 0 ? (_reportPossibleCrUseOfaward({
          error: Error()
        }), award) : award)(g.save, g.model);
        var before = JSON.stringify(g.save),
            count = writes;
        g.showModal('result');
        var home = g.overlay.getChildByName('Button-回到主菜单'),
            retry = g.overlay.getChildByName('Button-再试一次');
        check(!!home && home.position.x === 0 && home.position.y === -275, 'missing/unaligned Home');
        check(home.getComponent(UITransform).width === retry.getComponent(UITransform).width, 'width mismatch');
        check(home.getComponent(UITransform).height === retry.getComponent(UITransform).height, 'height mismatch');
        var saved = g.overlay.getComponentsInChildren(Label).find(l => l.string === '星级与收藏已保存');
        check(saved && saved.node.position.y < home.position.y - 35, 'saved copy overlaps');
        home.emit(Button.EventType.CLICK);
        check(g.screen === 'home' && g.modal === '', 'did not close result');
        check(JSON.stringify(g.save) === before && writes === count, 'Home mutated saved progress');
      }
    });
    g.save = save;
    g.persist = persist;
    g.navigate('home');
    var preview = new URLSearchParams(window.location.search).get('guliUiPreview');

    if (preview === 'level2') {
      g.startLevel(1);
      return;
    }

    if (preview === 'guide') {
      g.startLevel(0);
      g.clearTutorial();
      g.render();
      g.hints.show('idle');
      g.updateHints(0);
      return;
    }

    if (preview === 'home') return;

    if (preview === 'result') {
      g.startLevel(0);
      g.clearTutorial();
      g.render();
      g.model.phase = 'won';
      g.model.used = 3;
      g.model.knocked = g.model.balls.slice(0, 2).map(b => b.id);
      g.showModal('result');
      return;
    }

    var report = document.createElement('pre');
    report.id = 'tutorial-verification';
    report.style.cssText = 'position:fixed;inset:0;background:#102b30;color:white;padding:24px;z-index:99999;white-space:pre-wrap';
    report.textContent = lines.join('\n') + ("\nDONE: " + (8 - failed) + " passed, " + failed + " failed");
    document.body.appendChild(report);
  }

  function _reportPossibleCrUseOfcleanSave(extras) {
    _reporterNs.report("cleanSave", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSHOOTER_Y(extras) {
    _reporterNs.report("SHOOTER_Y", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfaward(extras) {
    _reporterNs.report("award", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuliGame(extras) {
    _reporterNs.report("GuliGame", "./GuliGame", _context.meta, extras);
  }

  _export("verifyTutorial", verifyTutorial);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Label = _cc.Label;
      Button = _cc.Button;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      cleanSave = _unresolved_2.cleanSave;
      SHOOTER_Y = _unresolved_2.SHOOTER_Y;
      award = _unresolved_2.award;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "395bdU0YjJNy4kpta1/xkVQ", "TutorialVerification", undefined);

      __checkObsolete__(['Label', 'Button', 'UITransform']);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1737ec200cca58ea2e7255514a3035f39a5570fb.js.map