System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, Vec2, CircleCollider2D, GameModel, LEVELS, RADIUS, GuliPhysics, PHYSICS_CONFIG, _crd;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function verifyPhysics(_x) {
    return _verifyPhysics.apply(this, arguments);
  }

  function _verifyPhysics() {
    _verifyPhysics = _asyncToGenerator(function* (scene) {
      var report = document.createElement('pre');
      report.id = 'physics-verification';
      report.style.cssText = 'position:fixed;inset:0;margin:0;padding:24px;background:#102b30;color:#efffdc;z-index:99999;overflow:auto;white-space:pre-wrap;font:15px monospace';
      document.body.appendChild(report);
      var lines = [];

      var write = s => {
        lines.push(s);
        report.textContent = lines.join('\n');
        console.log('[GuliPhysicsTest] ' + s);
      };

      var check = (ok, s) => {
        if (!ok) throw new Error(s);
      };

      var near = (a, b, tolerance, s) => check(Math.abs(a - b) <= tolerance, s + ": " + a + " vs " + b);

      var ball = function ball(id, x, y, vx, r) {
        if (vx === void 0) {
          vx = 0;
        }

        if (r === void 0) {
          r = 30;
        }

        return {
          id,
          x,
          y,
          vx,
          vy: 0,
          r,
          shooter: false,
          entered: true,
          gone: false
        };
      };

      var clone = m => {
        var c = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)(m.levelIndex);
        c.balls = m.balls.map(b => _extends({}, b));
        c.used = m.used;
        c.knocked = [...m.knocked];
        c.phase = m.phase;
        return c;
      };

      var finish = function finish(p, frame) {
        if (frame === void 0) {
          frame = 1 / 60;
        }

        var frames = 0;

        while (p.model.phase === 'moving' && frames++ < Math.ceil(30 / frame)) p.advance(frame);

        check(p.model.phase !== 'moving', 'Shot did not settle within 30 simulated seconds');
        check(p.model.balls.every(b => Number.isFinite(b.x + b.y + b.vx + b.vy)), 'Non-finite body state');
      };

      var yieldFrame = () => new Promise(resolve => setTimeout(resolve, 0));

      var passed = 0,
          failed = 0;

      var test = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (name, fn) {
          try {
            yield fn();
            passed++;
            write('PASS ' + name);
          } catch (e) {
            failed++;
            write('FAIL ' + name + ': ' + String(e));
          }

          yield yieldFrame();
        });

        return function test(_x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }();

      write('Cocos 3.8.8 actual Box2D verification');
      write('PTM=' + PHYSICS_2D_PTM_RATIO + '; config=' + JSON.stringify(_crd && PHYSICS_CONFIG === void 0 ? (_reportPossibleCrUseOfPHYSICS_CONFIG({
        error: Error()
      }), PHYSICS_CONFIG) : PHYSICS_CONFIG));
      yield test('Engine unit conversion, collider radius and equal masses', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.shoot(0, 0, 0);
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m, {
          linearDamping: 0
        });

        try {
          for (var [_b, body] of p.bodies) near(body.getMass(), 1, 1e-5, 'mass');

          var b = m.balls[m.balls.length - 1],
              y = b.y;
          p.advance(1 / 120);
          near(b.y - y, 380 / 120, 0.01, 'position from velocity/time');
          near(p.bodies.get(b).linearVelocity.y, 380 / 32, 1e-6, 'velocity unit');
        } finally {
          p.dispose();
        }
      });
      yield test('Restitution 0.25 / 0.3 / 0.45 / 0.6: momentum, energy and one response', () => {
        for (var restitution of [.25, .3, .45, .6]) {
          var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)();
          m.balls = [ball(0, -50, 0, 320), ball(1, 50, 0)];
          m.phase = 'moving';
          var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
            error: Error()
          }), GuliPhysics) : GuliPhysics)(scene, m, {
            linearDamping: 0,
            friction: 0,
            restitution
          });

          try {
            p.advance(.1);
            p.advance(.1);
            var [a, b] = m.balls;
            near(a.vx, 160 * (1 - restitution), .05, 'incoming velocity');
            near(b.vx, 160 * (1 + restitution), .05, 'outgoing velocity');
            near(a.vx + b.vx, 320, .05, 'momentum');
            check(a.vx * a.vx + b.vx * b.vx <= 320 * 320 + .1, 'energy increased');
            var v = b.vx;
            p.advance(.1);
            near(b.vx, v, .01, 'duplicate impulse');
          } finally {
            p.dispose();
          }
        }
      });
      yield test('Unequal masses are resolved by the engine', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.balls = [ball(0, -50, 0, 320), ball(1, 50, 0)];
        m.phase = 'moving';
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m, {
          linearDamping: 0,
          friction: 0,
          restitution: .45
        });

        try {
          var second = Array.from(p.bodies.values())[1]; // Test a real fixture mass change; production marbles remain equal mass.

          var collider = second.node.getComponent(CircleCollider2D);
          collider.density *= 2;
          collider.apply();
          near(second.getMass(), 2, 1e-5, 'second mass');
          p.advance(.1);
          p.advance(.1);
          near(m.balls[0].vx + 2 * m.balls[1].vx, 320, .1, 'mass-weighted momentum');
          near(m.balls[1].vx, 320 * 1.45 / 3, .1, 'mass-weighted restitution');
        } finally {
          p.dispose();
        }
      });
      yield test('Damping acts once, without a second manual friction pass', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.balls = [ball(0, 0, 0, 32)];
        m.phase = 'moving';
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);

        try {
          p.advance(.1);
          near(m.balls[0].vx, 32 / (1 + (_crd && PHYSICS_CONFIG === void 0 ? (_reportPossibleCrUseOfPHYSICS_CONFIG({
            error: Error()
          }), PHYSICS_CONFIG) : PHYSICS_CONFIG).linearDamping / 120) ** 12, .02, 'Box2D damping');
        } finally {
          p.dispose();
        }
      });
      yield test('Entire-ball boundary and deferred counting', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.balls = [ball(0, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
          error: Error()
        }), RADIUS) : RADIUS) + 30, 0), ball(1, 0, 0, 10)];
        m.phase = 'moving';
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);

        try {
          p.advance(1 / 120);
          check(!m.balls[0].gone, 'tangent incorrectly out'); // Move through the boundary using engine velocity, not a visual-node teleport.

          p.bodies.get(m.balls[0]).linearVelocity = new Vec2(.1, 0);
          p.advance(1 / 120);
          check(m.balls[0].gone, 'fully outside not detected');
          check(m.knocked.length === 0, 'counted before settling');
          finish(p);
          check(m.knocked.length === 1, 'not counted exactly once');
        } finally {
          p.dispose();
        }
      });
      yield test('Low speed must persist, collisions reset quiet time, no 15-second forced result', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.balls = [ball(0, 0, 0, 1)];
        m.phase = 'moving';
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);

        try {
          p.advance(.1);
          p.advance(.1);
          check(m.phase === 'moving', 'settled too early');
          p.bodies.get(m.balls[0]).linearVelocity = new Vec2(.2, 0);
          p.advance(1 / 120);
          check(m.quiet === 0, 'speed did not reset quiet time');
          m.elapsed = 16;
          p.advance(1 / 120);
          check(m.phase === 'moving', 'forced timeout');
          finish(p);
        } finally {
          p.dispose();
        }
      });
      yield test('Pause (no advance), resume and replay cleanup', () => {
        var previous = PhysicsSystem2D.instance.autoSimulation;
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.shoot(-100, -85, .65);
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);
        p.advance(.1);
        var before = JSON.stringify(m.balls);
        var elapsed = m.elapsed;
        var positions = Array.from(p.bodies.values()).map(b => b.getWorldCenter(new Vec2()));
        check(!PhysicsSystem2D.instance.autoSimulation, 'automatic duplicate stepping enabled'); // Simulate the director reaching its automatic physics stage during a modal pause.

        PhysicsSystem2D.instance.postUpdate(1);
        check(before === JSON.stringify(m.balls) && elapsed === m.elapsed, 'pause changed model');
        Array.from(p.bodies.values()).forEach((b, i) => {
          var pos = b.getWorldCenter(new Vec2());
          near(pos.x, positions[i].x, 0, 'paused body x');
          near(pos.y, positions[i].y, 0, 'paused body y');
        });
        p.advance(.1);
        check(m.elapsed > elapsed, 'resume failed');
        p.dispose();
        check(PhysicsSystem2D.instance.autoSimulation === previous, 'global configuration not restored');
        var replay = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)());
        check(replay.bodies.size === 4, 'stale bodies after replay');
        replay.dispose();
      });
      yield test('Overlapping start separates stably; maximum-power shot does not tunnel', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.balls = [ball(0, -25, 0), ball(1, 25, 0)];
        m.phase = 'moving';
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);

        try {
          finish(p);
          check(Math.hypot(m.balls[0].x - m.balls[1].x, m.balls[0].y - m.balls[1].y) > 59, 'overlap not resolved');
        } finally {
          p.dispose();
        }

        var fast = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        fast.balls = [ball(0, 0, -200)];
        fast.shoot(0, 0, 1);
        var q = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, fast);

        try {
          q.advance(.1);
          q.advance(.1);
          check(fast.balls[0].vy > 0, 'high speed missed target');
          finish(q);
        } finally {
          q.dispose();
        }
      });
      yield test('30 / 60 / 144 FPS and a long frame produce the same completed shot', () => {
        var baseline;

        for (var fps of [30, 60, 144]) {
          var _m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)();

          _m.shoot(-100, -85, .65);

          var _p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
            error: Error()
          }), GuliPhysics) : GuliPhysics)(scene, _m);

          try {
            finish(_p, 1 / fps);
          } finally {
            _p.dispose();
          }

          if (!baseline) baseline = _m;else {
            check(_m.phase === baseline.phase && _m.knocked.join() === baseline.knocked.join(), 'frame dependent outcome');

            _m.balls.forEach((b, i) => {
              near(b.x, baseline.balls[i].x, .02, 'frame x');
              near(b.y, baseline.balls[i].y, .02, 'frame y');
            });
          }
        }

        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.shoot(-100, -85, .65);
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);

        try {
          p.advance(3);
          check(m.elapsed <= .101, 'stall used wall time for settling');
          finish(p);
          check(m.knocked.join() === baseline.knocked.join(), 'stall outcome');
        } finally {
          p.dispose();
        }
      });
      yield test('Last permitted shot can win; shooter removed only after completed settlement', () => {
        var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
          error: Error()
        }), GameModel) : GameModel)();
        m.used = m.level.shots - 1;
        m.knocked = [31];
        m.balls = [ball(49, 0, 210, 0, 23)];
        m.shoot(0, 210, 1);
        var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
          error: Error()
        }), GuliPhysics) : GuliPhysics)(scene, m);

        try {
          p.advance(1 / 120);
          check(m.balls.some(b => b.shooter && !b.gone), 'spawned shooter removed');
          finish(p);
          check(m.phase === 'won' && m.remaining === 0 && m.knocked.length === 2, 'last shot did not win');
          check(!m.balls.some(b => b.shooter), 'shooter retained after shot');
        } finally {
          p.dispose();
        }
      });
      yield test('10 / 30 / 50 / 100 power: isolated rolling, two balls and four-ball chain', () => {
        // Unbounded test floor only: suppress out-of-bounds removal so travel/settling
        // measurements are not confused with a ball being removed at the ring.
        var run = (power, count, old) => {
          var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)();
          m.balls = [];
          m.launch(1, 0, (power - 1) / 99, 0, 0);
          var shooter = m.balls[0];
          if (old) shooter.vx = 380 + (power - 1) / 99 * 820;

          for (var i = 1; i < count; i++) m.balls.push(ball(i, 90 + (i - 1) * 65, 0));

          var starts = m.balls.map(b => b.x),
              distances = m.balls.map(() => 0);
          var quiet = 0,
              time = 0,
              peakTarget = 0,
              previousEnergy = Infinity;

          m.afterPhysics = function (dt, contact) {
            if (contact === void 0) {
              contact = false;
            }

            time += dt;
            check(m.balls.every(b => Number.isFinite(b.x + b.y + b.vx + b.vy)), 'non-finite benchmark');
            var energy = m.balls.reduce((s, b) => s + b.vx * b.vx + b.vy * b.vy, 0);
            check(energy <= previousEnergy + 1, 'collision created energy');
            previousEnergy = energy;
            m.balls.forEach((b, i) => distances[i] = Math.hypot(b.x - starts[i], b.y));
            peakTarget = Math.max(peakTarget, ...m.balls.slice(1).map(b => Math.hypot(b.vx, b.vy)));
            quiet = m.balls.some(b => Math.hypot(b.vx, b.vy) >= 2) || contact ? 0 : quiet + dt;
            if (quiet >= .25) m.phase = 'aim';
          };

          var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
            error: Error()
          }), GuliPhysics) : GuliPhysics)(scene, m, old ? {
            linearDamping: .65,
            restitution: .45
          } : {});

          try {
            finish(p);
            check(m.balls.every(b => Math.hypot(b.vx, b.vy) < 2), 'settled while moving');
            check(shooter.vx >= -.01, 'unexpected reverse velocity');

            for (var _i = 1; _i < m.balls.length; _i++) check(m.balls[_i].x - m.balls[_i - 1].x >= m.balls[_i].r + m.balls[_i - 1].r - 1, 'overlap/tunneling');

            return {
              time,
              distance: distances[0],
              target: Math.max(0, ...distances.slice(1)),
              peakTarget
            };
          } finally {
            p.dispose();
          }
        };

        for (var count of [1, 2, 4]) {
          var previous = -1;

          for (var power of [10, 30, 50, 100]) {
            var before = run(power, count, true),
                after = run(power, count, false);
            write("ROLL " + power + "% " + count + " balls: before=" + JSON.stringify(before) + " after=" + JSON.stringify(after));
            check(after.time < before.time, 'settling did not improve');
            check(after.distance < before.distance, 'travel did not shorten');
            check(after.target <= before.target + .1, 'target travel increased');
            var travel = count === 1 ? after.distance : after.target;
            check(travel > previous, 'power lost meaningful travel ordering');
            previous = travel;
            if (count > 1) check(after.peakTarget > 0, 'collision response lost');
            if (count === 1 && power === 10) check(after.distance < 330 && after.time < 4, 'low power still too long');
          }
        }
      });
      yield test('All five unchanged levels remain completable with slingshot launch positions', /*#__PURE__*/_asyncToGenerator(function* () {
        for (var i = 0; i < (_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
          error: Error()
        }), LEVELS) : LEVELS).length; i++) {
          var m = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)(i);
          var route = [];

          while (m.phase === 'aim') {
            var best = void 0,
                bestScore = -Infinity,
                shot = [];

            for (var target of m.balls) for (var offset of [-20, 0, 20]) for (var power of [.45, .65, .85, 1]) {
              var c = clone(m);
              var dx = target.x + offset,
                  dy = target.y + 350;
              var screenLength = Math.hypot(dx, dy * .87);
              var pull = 8 + 112 * power;
              var x = -dx / screenLength * pull,
                  y = -350 - dy / screenLength * pull;
              c.launch(dx, dy, power, x, y);
              var p = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
                error: Error()
              }), GuliPhysics) : GuliPhysics)(scene, c);

              try {
                finish(p);
              } finally {
                p.dispose();
              }

              var score = c.knocked.length * 10000 + c.balls.reduce((s, b) => s + Math.hypot(b.x, b.y), 0);

              if (score > bestScore) {
                bestScore = score;
                best = c;
                shot = [target.x + offset, target.y, power];
              }
            }

            m = best;
            route.push(shot);
            yield yieldFrame();
          }

          write("Level " + (i + 1) + ": " + m.used + " shots, " + m.knocked.length + " targets, " + m.stars + " stars; route=" + JSON.stringify(route));
          check(m.phase === 'won', 'level ' + (i + 1) + ' has no tested completion route');
        }
      }));
      write("DONE: " + passed + " passed, " + failed + " failed.");
      return {
        passed,
        failed,
        lines
      };
    });
    return _verifyPhysics.apply(this, arguments);
  }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarble(extras) {
    _reporterNs.report("Marble", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLEVELS(extras) {
    _reporterNs.report("LEVELS", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRADIUS(extras) {
    _reporterNs.report("RADIUS", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuliPhysics(extras) {
    _reporterNs.report("GuliPhysics", "./GuliPhysics", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPHYSICS_CONFIG(extras) {
    _reporterNs.report("PHYSICS_CONFIG", "./GuliPhysics", _context.meta, extras);
  }

  _export("verifyPhysics", verifyPhysics);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      PHYSICS_2D_PTM_RATIO = _cc.PHYSICS_2D_PTM_RATIO;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      Vec2 = _cc.Vec2;
      CircleCollider2D = _cc.CircleCollider2D;
    }, function (_unresolved_2) {
      GameModel = _unresolved_2.GameModel;
      LEVELS = _unresolved_2.LEVELS;
      RADIUS = _unresolved_2.RADIUS;
    }, function (_unresolved_3) {
      GuliPhysics = _unresolved_3.GuliPhysics;
      PHYSICS_CONFIG = _unresolved_3.PHYSICS_CONFIG;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9f8dan00G1O+KtvlU7VDQla", "PhysicsVerification", undefined);
      /** Explicit opt-in preview test harness. Runs the real Cocos components/Box2D backend.
       * Open the Guli preview with ?guliPhysicsTest=1. Does not access player saves.
       */


      __checkObsolete__(['Node', 'PHYSICS_2D_PTM_RATIO', 'PhysicsSystem2D', 'Vec2', 'CircleCollider2D']);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b1ae2cd90ab8e560ca7829bd2f506bad1b758dc3.js.map