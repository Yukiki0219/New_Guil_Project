System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, GuliPhysics, _crd;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function previewMarbleAppearances(component, mode) {
    var g = component;

    g.persist = () => {}; // Preview fixtures must never write player saves.


    g.save = _extends({}, g.save, {
      stars: [...g.save.stars],
      collection: Array.from({
        length: 56
      }, (_, i) => i)
    });

    if (mode === 'game') {
      g.startLevel(0);
      g.physics.dispose();
      g.model.ids = [40, 46, 52, 55];
      g.model.reset();
      g.physics = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
        error: Error()
      }), GuliPhysics) : GuliPhysics)(g.node.scene, g.model);
      g.render();
    } else {
      g.page = Math.floor(Number(mode) / 10);
      g.navigate('collection');
    }
  }
  /** Explicit test page: no persistent writes, real scene nodes and native physics. */


  function verifyMarbleUpdate(component) {
    var g = component,
        lines = [];
    var failed = 0;

    var check = (ok, message) => {
      if (!ok) throw Error(message);
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

    var save = g.save,
        persist = g.persist;

    g.persist = () => {};

    test('All 56 appearances render at gameplay and collection radii; locked placeholder preserved', () => {
      g.navigate('home');

      for (var id = 0; id < 56; id++) for (var r of [30, 32]) {
        var n = g.marble(g.ballLayer, id, 0, 0, r);
        check(n.getChildByName('GlassInteriorClip') !== null, 'missing clip ' + id);
        check(n.getChildByName('GlassReflections') !== null, 'missing reflections ' + id);
        n.destroy();
      }

      var locked = g.marble(g.ballLayer, -2, 0, 0, 32);
      check(!locked.getChildByName('GlassInteriorClip'), 'locked marble exposed motif');
      locked.destroy();
    });
    test('Collection last page contains six entries, all legacy ownership remains', () => {
      g.save = _extends({}, save, {
        collection: Array.from({
          length: 56
        }, (_, i) => i)
      });
      g.page = 5;
      g.navigate('collection');
      var names = g.ui.children.filter(n => n.name.startsWith('Marble-')).map(n => n.name);
      check(names.length === 6 && names.includes('Marble-55'), 'last page wrong');
    });

    var finish = function finish(valid, last) {
      if (last === void 0) {
        last = false;
      }

      g.startLevel(0);
      if (last) g.model.used = g.model.level.shots - 1;
      g.model.launch(valid ? 0 : 1, valid ? 1 : 0, valid ? 1 : 0, 0, valid ? -350 : -500);
      g.render();
      var frames = 0;

      while (g.model.phase === 'moving' && frames++ < 1800) g.update(1 / 120);

      check(g.model.phase !== 'moving', 'shot did not settle');
    };

    test('Invalid shot restores instantly, costs once, HUD pulses and restores exact properties', () => {
      finish(false);
      check(g.model.lastShotInvalid && g.model.used === 1, 'invalid/cost incorrect');
      check(g.model.phase === 'aim' && g.model.balls.every(b => !b.shooter), 'snapshot not immediately restored');
      var saved = g.invalidHud;
      check(!!saved, 'no pulse');
      var label = saved.label,
          c = saved.color.clone(),
          scale = saved.scale.clone();
      g.update(.13);
      check(label.color.r === 237 && label.node.scale.x > scale.x * 1.29, 'pulse peak wrong');
      g.refreshHud();
      check(label.color.r === 237, 'refresh erased color');
      g.update(.37);
      check(label.color.equals(c) && label.node.scale.equals(scale) && !g.invalidHud, 'pulse did not restore');
    });
    test('Valid shot and cancellation never pulse; last invalid shot still loses', () => {
      finish(true);
      check(!g.model.lastShotInvalid && !g.invalidHud, 'valid shot pulsed');
      g.startLevel(0);
      g.down('test', 0, g.projectY(-350));
      g.cancelInput();
      check(g.model.used === 0 && !g.invalidHud, 'cancel pulsed');
      finish(false, true);
      check(g.model.phase === 'lost' && g.model.remaining === 0, 'last failure incorrect');
      g.navigate('home');
      check(!g.invalidHud, 'page retained animation');
    });
    g.save = save;
    g.persist = persist;
    g.navigate('home');
    var report = document.createElement('pre');
    report.id = 'marble-update-verification';
    report.style.cssText = 'position:fixed;inset:0;background:#102b30;color:white;padding:24px;z-index:99999;white-space:pre-wrap';
    report.textContent = lines.join('\n') + ("\nDONE: " + (4 - failed) + " passed, " + failed + " failed");
    document.body.appendChild(report);
  }

  function _reportPossibleCrUseOfGuliPhysics(extras) {
    _reporterNs.report("GuliPhysics", "./GuliPhysics", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuliGame(extras) {
    _reporterNs.report("GuliGame", "./GuliGame", _context.meta, extras);
  }

  _export({
    previewMarbleAppearances: previewMarbleAppearances,
    verifyMarbleUpdate: verifyMarbleUpdate
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      GuliPhysics = _unresolved_2.GuliPhysics;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c54e0KrCk1AXK5yLs/9W+gr", "MarbleAppearancePreview", undefined);
      /** Explicit preview-only visual fixture. Never changes persisted ownership. */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7386f4ce5fb5aad134a84ae2b4660fed21b7b6d5.js.map