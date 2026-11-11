System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, GameHints, _crd, HINT_TEXT;

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  _export("GameHints", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "83d30cYIgtCBaiToC+IORam", "GameHints", undefined);

      _export("HINT_TEXT", HINT_TEXT = {
        idle: '按住你的弹珠，向后拖动，再松开发射。',
        wrong: '从你的弹珠开始拖动。',
        targetOnly: '目标已经出圈，你的弹珠也要完全出圈。\n本次已消耗 1 次。',
        boundary: '需要整颗弹珠完全离开白圈。',
        miss: '试着调整方向和力度，\n让两颗弹珠都完全出圈。',
        success: '有效击出！',
        low: '留意剩余次数，调整方向后再发射。'
      });
      /** Feedback policy uses settled results only; timers never adjudicate a shot. */


      _export("GameHints", GameHints = class GameHints {
        constructor() {
          this.reason = null;
          this.remaining = 0;
          this.idle = 0;
          this.repeated = 0;
          this.time = 0;
          this.seen = new Map();
          this.last = null;
        }

        clear() {
          this.reason = null;
          this.remaining = 0;
          this.idle = 0;
        }

        show(reason) {
          var _this$seen$get;

          if (this.time - ((_this$seen$get = this.seen.get(reason)) != null ? _this$seen$get : -100) < 12) return;
          this.seen.set(reason, this.time);
          this.repeated = this.last === reason ? this.repeated + 1 : 1;
          this.last = reason;
          this.reason = reason;
          this.remaining = 6;
          this.idle = 0;
        }

        tick(dt, aiming) {
          this.time += dt;
          this.remaining -= dt;
          if (this.remaining <= 0) this.reason = null;

          if (aiming) {
            this.idle += dt;
            if (this.idle >= 10) this.show('idle');
          } else this.idle = 0;
        }

        resolved(m) {
          this.clear();
          const r = m.lastShotReport;
          if (!r) return;
          if (r.shooterExited && r.targetsOut > 0) this.show('success');else if (!r.shooterExited && r.targetsOut > 0) this.show('targetOnly');else if (r.touchingBoundary) this.show('boundary');else this.show('miss');
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b994cf97bc4b6bff9b7cf45a79f7e91a3aaf04c8.js.map