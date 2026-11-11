System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Slingshot, _crd, SLING_MAX_PULL, SLING_DEAD_ZONE, SLING_HIT_RADIUS, GROUND_Y_SCALE;

  _export("Slingshot", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7ff1bvY2MtOYKK54YR9kO/C", "Slingshot", undefined);

      /** Input state in Canvas design pixels, shared by mouse and touch. No engine/DOM dependency. */
      _export("SLING_MAX_PULL", SLING_MAX_PULL = 120);

      _export("SLING_DEAD_ZONE", SLING_DEAD_ZONE = 8);

      _export("SLING_HIT_RADIUS", SLING_HIT_RADIUS = 44);

      _export("GROUND_Y_SCALE", GROUND_Y_SCALE = 0.87);

      _export("Slingshot", Slingshot = class Slingshot {
        constructor() {
          this.pointer = null;
          this.x = 0;
          this.y = 0;
          this.startX = 0;
          this.startY = 0;
        }

        get distance() {
          return Math.hypot(this.x, this.y);
        }

        get ready() {
          return this.distance >= SLING_DEAD_ZONE;
        }

        get power() {
          return Math.round(1 + 99 * Math.max(0, Math.min(1, (this.distance - SLING_DEAD_ZONE) / (SLING_MAX_PULL - SLING_DEAD_ZONE))));
        }

        begin(pointer, x, y, anchorX, anchorY) {
          if (this.pointer !== null || !Number.isFinite(x + y) || Math.hypot(x - anchorX, y - anchorY) > SLING_HIT_RADIUS) return false;
          this.pointer = pointer;
          this.startX = x;
          this.startY = y;
          this.x = this.y = 0;
          return true;
        }

        move(pointer, x, y) {
          if (pointer !== this.pointer || !Number.isFinite(x + y)) return false;
          var dx = x - this.startX,
              dy = y - this.startY,
              d = Math.hypot(dx, dy);
          var scale = d > SLING_MAX_PULL ? SLING_MAX_PULL / d : 1;
          this.x = dx * scale;
          this.y = dy * scale;
          return true;
        }

        release(pointer, x, y) {
          if (!this.move(pointer, x, y)) return null;
          var result = this.ready ? {
            x: this.x,
            y: this.y,
            power: this.power
          } : null;
          this.cancel();
          return result;
        }

        cancel(pointer) {
          if (pointer !== undefined && pointer !== this.pointer) return false;
          this.pointer = null;
          this.x = this.y = 0;
          return true;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f66d1a6c9783ce9d866c958d2dfd765c9b16d27c.js.map