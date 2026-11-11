System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, GameModel, _crd, MARBLE_COUNT, RADIUS, SHOOTER_Y, LAUNCH_MIN, LAUNCH_MAX, SETTLE_SPEED, SETTLE_DURATION, LEVELS, colors, patterns, superRareNames, collectibleNames, legendaryNames;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  /** Final ground-plane launch speed (pixels/s), shared by launch and aim prediction. */
  function launchSpeed(power) {
    return (LAUNCH_MIN + Math.max(0, Math.min(1, power)) * (LAUNCH_MAX - LAUNCH_MIN)) * 1.1;
  }

  function cleanSave(raw) {
    return {
      version: 2,
      stars: LEVELS.map((_, i) => {
        var _raw$stars;

        return Math.max(0, Math.min(3, Math.floor(Number(raw == null || (_raw$stars = raw.stars) == null ? void 0 : _raw$stars[i]) || 0)));
      }),
      collection: Array.from(new Set((Array.isArray(raw == null ? void 0 : raw.collection) ? raw.collection : []).filter(n => Number.isInteger(n) && n >= 0 && n < MARBLE_COUNT))),
      sound: (raw == null ? void 0 : raw.sound) !== false,
      tuto: (raw == null ? void 0 : raw.tuto) === true,
      language: (raw == null ? void 0 : raw.language) === 'en' ? 'en' : 'zh'
    };
  }

  function award(save, game) {
    var next = cleanSave(save);

    if (game.phase === 'won') {
      next.stars[game.levelIndex] = Math.max(next.stars[game.levelIndex], game.stars);
      next.collection = Array.from(new Set(next.collection.concat(game.knocked)));
    }

    return next;
  }

  function rollMarbles(count, random) {
    if (random === void 0) {
      random = Math.random;
    }

    return Array.from({
      length: count
    }, () => {
      var roll = random();
      var ids;

      if (roll < 0.50) {
        // Common: 50%
        ids = Array.from({
          length: 23
        }, (_, i) => i); // 0–22
      } else if (roll < 0.85) {
        // Rare: 35%
        ids = Array.from({
          length: 16
        }, (_, i) => 23 + i); // 23–38
      } else if (roll < 0.975) {
        // Super Rare: 12.5%
        ids = Array.from({
          length: 8
        }, (_, i) => 39 + i); // 39–46
      } else if (roll < 0.995) {
        // Collectible: 2%
        ids = Array.from({
          length: 5
        }, (_, i) => 47 + i); // 47–51
      } else {
        // Legendary: 0.5%
        ids = Array.from({
          length: 4
        }, (_, i) => 52 + i); // 52–55
      } // Duplicate marbles are allowed.
      // Every draw is independent; previously drawn IDs are not excluded.


      return ids[Math.min(ids.length - 1, Math.floor(random() * ids.length))];
    });
  }

  function marbleName(id) {
    if (!Number.isInteger(id) || id < 0 || id > 55) {
      return '未知弹珠';
    }

    if (id < 23) {
      return colors[id % colors.length] + patterns[Math.floor(id / colors.length)];
    }

    if (id < 39) {
      return colors[id % colors.length] + patterns[Math.floor((id - 23) / 10)];
    }

    if (id < 47) {
      return superRareNames[id - 39];
    }

    if (id < 52) {
      return collectibleNames[id - 47];
    }

    return legendaryNames[id - 52];
  }

  function rarity(id) {
    if (!Number.isInteger(id) || id < 0 || id > 55) {
      return '未知';
    }

    if (id >= 52) return '传奇';
    if (id >= 47) return '珍藏';
    if (id >= 39) return '超级稀有';
    if (id >= 23) return '稀有';
    return '普通';
  }

  _export({
    launchSpeed: launchSpeed,
    GameModel: void 0,
    cleanSave: cleanSave,
    award: award,
    rollMarbles: rollMarbles,
    marbleName: marbleName,
    rarity: rarity
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7954fJLsd5Hjb6Ickwgf2a3", "GameModel", undefined);
      /** Rules only. Position/radius and velocity snapshots use ground-plane pixels and pixels/s.
       * Cocos Box2D owns integration, damping and contact resolution in GuliPhysics. */


      _export("MARBLE_COUNT", MARBLE_COUNT = 56);

      _export("RADIUS", RADIUS = 260);

      _export("SHOOTER_Y", SHOOTER_Y = -350);

      _export("LAUNCH_MIN", LAUNCH_MIN = 380);

      _export("LAUNCH_MAX", LAUNCH_MAX = 1600);

      _export("SETTLE_SPEED", SETTLE_SPEED = 2); // ground pixels/s, NOT Box2D metres/s


      _export("SETTLE_DURATION", SETTLE_DURATION = 0.25);

      _export("LEVELS", LEVELS = [{
        title: '初见弹珠',
        target: 2,
        shots: 5,
        three: 2,
        two: 3,
        positions: [[-105, 90], [105, 90], [-100, -85], [100, -85]]
      }, {
        title: '寻找角度',
        target: 3,
        shots: 6,
        three: 3,
        two: 4,
        positions: [[-170, 70], [-65, 150], [100, 145], [175, 0], [-110, -100], [65, -90]]
      }, {
        title: '连锁反应',
        target: 4,
        shots: 7,
        three: 3,
        two: 5,
        positions: [[-65, -100], [-60, -40], [-55, 20], [-50, 80], [80, -70], [90, 0], [100, 70], [110, 140]]
      }, {
        title: '恰到好处',
        target: 6,
        shots: 8,
        three: 4,
        two: 6,
        positions: [[-165, 90], [-110, 130], [-55, 170], [40, 180], [100, 135], [160, 80], [-125, -100], [-65, -65], [65, -65], [125, -100]]
      }, {
        title: '庭院大师',
        target: 8,
        shots: 9,
        three: 5,
        two: 7,
        positions: [[-165, 40], [-120, 90], [-75, 140], [-25, 190], [35, 180], [95, 140], [145, 90], [175, 30], [-100, -105], [-45, -80], [45, -80], [100, -105]]
      }]);

      _export("GameModel", GameModel = class GameModel {
        constructor(levelIndex, ids) {
          if (levelIndex === void 0) {
            levelIndex = 0;
          }

          this.balls = [];
          this.phase = 'aim';
          this.used = 0;
          this.knocked = [];
          this.elapsed = 0;
          this.quiet = 0;
          this.impacts = [];
          this.lastShotInvalid = false;
          this.lastShotReport = null;
          this.shotSnapshot = null;
          this.shooterExited = false;
          this.levelIndex = levelIndex;
          this.ids = ids;
          this.reset();
        }

        get level() {
          return LEVELS[this.levelIndex];
        }

        get remaining() {
          return this.level.shots - this.used;
        }

        get stars() {
          return this.phase !== 'won' ? 0 : this.used <= this.level.three ? 3 : this.used <= this.level.two ? 2 : 1;
        }

        reset() {
          this.lastShotReport = null;
          this.shotSnapshot = null;
          this.shooterExited = false;
          this.balls = this.level.positions.map((_ref, i) => {
            var [x, y] = _ref;
            return {
              id: this.ids ? this.ids[i] : i,
              x,
              y,
              vx: 0,
              vy: 0,
              r: 30,
              shooter: false,
              entered: true,
              gone: false
            };
          });
          this.lastShotInvalid = false;
          this.used = 0;
          this.knocked = [];
          this.phase = 'aim';
          this.elapsed = 0;
          this.quiet = 0;
        }

        shoot(x, y, power) {
          return this.launch(x, Math.max(60, y - SHOOTER_Y), power);
        }
        /** Launch a normalized velocity from the released slingshot position. */


        launch(dx, dy, power, x, y) {
          if (x === void 0) {
            x = 0;
          }

          if (y === void 0) {
            y = SHOOTER_Y;
          }

          if (this.phase !== 'aim' || this.remaining <= 0 || !Number.isFinite(x + y + power)) return false;
          var d = Math.hypot(dx, dy);
          if (!Number.isFinite(d) || d < 0.000001) return false;
          this.shotSnapshot = {
            balls: this.balls.filter(b => !b.shooter).map(b => _extends({}, b)),
            knocked: [...this.knocked]
          };
          this.shooterExited = false;
          this.lastShotInvalid = false;
          this.lastShotReport = null;
          var speed = launchSpeed(power);
          this.balls.push({
            id: -1,
            x,
            y,
            vx: dx / d * speed,
            vy: dy / d * speed,
            r: 32,
            shooter: true,
            entered: Math.hypot(x, y) < RADIUS + 32,
            gone: false
          });
          this.used++;
          this.phase = 'moving';
          this.elapsed = 0;
          this.quiet = 0;
          return true;
        }
        /** Consume a completed engine step, including all contact callbacks. No physics solver here. */


        afterPhysics(dt, contactImpulse, settleSpeed, settleDuration) {
          if (contactImpulse === void 0) {
            contactImpulse = false;
          }

          if (settleSpeed === void 0) {
            settleSpeed = SETTLE_SPEED;
          }

          if (settleDuration === void 0) {
            settleDuration = SETTLE_DURATION;
          }

          if (this.phase !== 'moving') return;
          this.elapsed += dt;
          var active = this.balls.filter(b => !b.gone);

          for (var b of active) {
            var d = Math.hypot(b.x, b.y);
            if (b.shooter && d < RADIUS + b.r) b.entered = true; // Entire disc must clear the circle. The shooter starts outside and is exempt until entry.

            if ((!b.shooter || b.entered) && d > RADIUS + b.r) {
              if (b.shooter) this.shooterExited = true;
              b.gone = true;
            }

            if (b.shooter && d > 650) b.gone = true;
          }

          var moving = this.balls.some(b => !b.gone && Math.hypot(b.vx, b.vy) >= settleSpeed);
          this.quiet = moving || contactImpulse ? 0 : this.quiet + dt; // A timeout must never decide a shot that still has moving marbles.

          if (this.quiet >= settleDuration) this.finishShot();
        }

        finishShot() {
          if (this.phase !== 'moving') return;
          this.lastShotInvalid = !!this.shotSnapshot && !this.shooterExited; // Capture feedback before rollback removes the evidence. This never changes adjudication.

          this.lastShotReport = {
            targetsOut: this.balls.filter(b => !b.shooter && b.gone).length,
            shooterExited: this.shooterExited,
            touchingBoundary: this.balls.some(b => !b.gone && (!b.shooter || b.entered) && Math.abs(Math.hypot(b.x, b.y) - RADIUS) <= b.r),
            shooter: this.balls.filter(b => b.shooter).map(b => ({
              x: b.x,
              y: b.y
            }))[0]
          };

          if (this.lastShotInvalid) {
            // Restore independent copies, including targets removed from the physics world.
            // used is deliberately not restored: every accepted launch costs one attempt.
            this.balls = this.shotSnapshot.balls.map(b => _extends({}, b));
            this.knocked = [...this.shotSnapshot.knocked];
          } else {
            this.balls.forEach(b => {
              if (b.gone && !b.shooter) this.knocked.push(b.id);
            });
            this.balls = this.balls.filter(b => !b.shooter && !b.gone);
            this.balls.forEach(b => {
              b.vx = 0;
              b.vy = 0;
            });
          }

          this.shotSnapshot = null;
          this.shooterExited = false; // Win takes priority over exhausted shots, after the entire chain has settled.

          this.phase = this.knocked.length >= this.level.target ? 'won' : this.remaining === 0 ? 'lost' : 'aim';
        }

      });

      colors = ['海蓝', '琥珀', '翡翠', '紫晶', '樱桃', '月白', '薄荷', '珊瑚', '靛青', '金橙'];
      patterns = ['流纹', '涟漪', '星砂', '花瓣', '幻彩'];
      superRareNames = ['樱花梦境', '蓝莲之光', '金盏晨曦', '紫藤幻境', '翡翠铃兰', '樱雪雏菊', '烈阳百合', '紫雾薰衣草'];
      collectibleNames = ['月影白兔', '星瞳灵猫', '赤焰小狐', '墨玉熊猫', '锦鳞金鲤'];
      legendaryNames = ['青龙', '白虎', '朱雀', '玄武'];

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=58880a8083b2f07e7c855faf195f25fd943fc1c0.js.map