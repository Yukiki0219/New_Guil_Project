System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec2, GameModel, GuliPhysics, _crd;

  function verifyRollback(scene) {
    var lines = [];
    var failures = 0;

    var check = (ok, message) => {
      if (!ok) throw new Error(message);
    };

    var target = function target(x, y) {
      if (y === void 0) {
        y = 0;
      }

      return {
        id: 45,
        x,
        y,
        r: 30,
        vx: 0,
        vy: 0,
        shooter: false,
        entered: true,
        gone: false
      };
    };

    var test = (name, run) => {
      try {
        run();
        lines.push('PASS ' + name);
      } catch (e) {
        failures++;
        lines.push('FAIL ' + name + ': ' + e);
      }
    };

    var _loop = function _loop(success) {
      var _loop2 = function _loop2(last) {
        test((success ? 'Successful exit' : 'Rollback') + " / " + (last ? 'last' : 'normal') + " shot", () => {
          var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)();
          m.balls = [target(250)];
          m.knocked = [31];
          if (last) m.used = m.level.shots - 1;
          var before = JSON.stringify(m.balls),
              used = m.used;
          m.launch(1, 0, success ? 1 : 0, 180, 0);
          var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
            error: Error()
          }), GuliPhysics) : GuliPhysics)(scene, m);
          var removed = false,
              frames = 0;

          try {
            while (m.phase === 'moving' && frames++ < 1800) {
              p.advance(1 / 120);
              removed || (removed = m.balls.some(b => !b.shooter && b.gone));
            }

            check(m.phase !== 'moving', 'did not settle');
            check(removed, 'fixture did not knock target out');
            check(m.used === used + 1, 'attempt refunded');
            check(!m.balls.some(b => b.shooter), 'shooter retained');

            if (success) {
              check(m.phase === 'won' && m.knocked.length === 2, 'valid result not committed');
            } else {
              check(JSON.stringify(m.balls) === before, 'target snapshot not restored');
              check(m.knocked.join() === '31', 'progress leaked');
              check(m.phase === (last ? 'lost' : 'aim'), 'wrong failure phase');
              check(p.bodies.size === 1, 'restored collider missing');
              var body = p.bodies.get(m.balls[0]);
              var point = body.getWorldCenter(new Vec2());
              check(Math.abs(point.x - 250) < .01 && Math.abs(point.y) < .01, 'restored physics position wrong');

              if (!last) {
                check(m.launch(1, 0, 0, 180, 0), 'next shot blocked');
                p.advance(1 / 120);
                check(p.bodies.size === 2, 'next shot bodies incorrect');
              }
            }
          } finally {
            p.dispose();
          }
        });
      };

      for (var last of [false, true]) {
        _loop2(last);
      }
    };

    for (var success of [false, true]) {
      _loop(success);
    }

    test('Valid shooter exit without a target leaving', () => {
      var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
        error: Error()
      }), GameModel) : GameModel)();
      m.balls = [target(0, 150)];
      m.launch(1, 0, 1, 180, 0);
      var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
        error: Error()
      }), GuliPhysics) : GuliPhysics)(scene, m);

      try {
        var n = 0;

        while (m.phase === 'moving' && n++ < 1800) p.advance(1 / 120);

        check(m.phase === 'aim' && m.used === 1 && m.knocked.length === 0, 'empty valid shot incorrect');
      } finally {
        p.dispose();
      }
    });
    var report = document.createElement('pre');
    report.id = 'rollback-verification';
    report.style.cssText = 'position:fixed;inset:0;background:#102b30;color:white;padding:24px;z-index:99999;white-space:pre-wrap';
    report.textContent = lines.join('\n') + ("\nDONE: " + (5 - failures) + " passed, " + failures + " failed");
    document.body.appendChild(report);
  }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarble(extras) {
    _reporterNs.report("Marble", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuliPhysics(extras) {
    _reporterNs.report("GuliPhysics", "./GuliPhysics", _context.meta, extras);
  }

  _export("verifyRollback", verifyRollback);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      GameModel = _unresolved_2.GameModel;
    }, function (_unresolved_3) {
      GuliPhysics = _unresolved_3.GuliPhysics;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a31cdzfiwJOBIwC8fHd7oX4", "RollbackVerification", undefined);
      /** Explicit browser preview checks with real Box2D bodies; no player save access. */


      __checkObsolete__(['Node', 'Vec2']);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6974c553c7914b691dc63e9dbd6e5db6ad30c397.js.map