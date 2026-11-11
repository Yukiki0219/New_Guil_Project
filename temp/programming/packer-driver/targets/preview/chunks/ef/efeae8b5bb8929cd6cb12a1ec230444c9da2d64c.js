System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, launchSpeed, RADIUS, _crd;

  /** Read-only straight sweep before the first contact. Ground-plane pixels throughout.
   * The ring is a preview limit, not a physical wall. An outside launch may enter it.
   * Damping estimates the next 0.8 seconds, not the complete stopping distance.
   */
  function predictAim(x, y, dx, dy, power, balls, damping, radius) {
    if (radius === void 0) {
      radius = 32;
    }

    var magnitude = Math.hypot(dx, dy);
    if (!Number.isFinite(x + y + magnitude + power) || magnitude < 1e-6) return null;
    dx /= magnitude;
    dy /= magnitude;
    var speed = (_crd && launchSpeed === void 0 ? (_reportPossibleCrUseOflaunchSpeed({
      error: Error()
    }), launchSpeed) : launchSpeed)((power - 1) / 99);
    var distance = damping > 0 ? speed * (1 - Math.exp(-damping * .8)) / damping : speed * .8;
    var hit = 'range';

    var roots = (cx, cy, r) => {
      var ox = x - cx,
          oy = y - cy,
          projection = ox * dx + oy * dy;
      var discriminant = projection * projection - (ox * ox + oy * oy - r * r);
      return discriminant < -1e-7 ? null : [-projection - Math.sqrt(Math.max(0, discriminant)), -projection + Math.sqrt(Math.max(0, discriminant))];
    };

    var limit = (t, kind) => {
      if (t >= 0 && t <= distance) {
        distance = t;
        hit = kind;
      }
    }; // Swept disc: enlarge each target by the shooter's collision radius.


    for (var ball of balls) {
      if (ball.gone || ball.shooter) continue;

      if (Math.hypot(x - ball.x, y - ball.y) <= radius + ball.r) {
        limit(0, 'marble');
        continue;
      }

      var contact = roots(ball.x, ball.y, radius + ball.r);
      if (contact) limit(contact[0], 'marble');
    } // Allow entry from the launch area; stop at the far edge when the leading rim exits.


    var inner = roots(0, 0, Math.max(0, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
      error: Error()
    }), RADIUS) : RADIUS) - radius));
    if (inner && inner[1] >= 0) limit(inner[1], 'boundary');else {
      // A grazing shot that never fits inside the ring stops at its first rim contact.
      var outer = roots(0, 0, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
        error: Error()
      }), RADIUS) : RADIUS) + radius);
      if (outer) limit(outer[0], 'boundary');
    }
    return {
      x: x + dx * distance,
      y: y + dy * distance,
      distance,
      hit
    };
  }

  function _reportPossibleCrUseOflaunchSpeed(extras) {
    _reporterNs.report("launchSpeed", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarble(extras) {
    _reporterNs.report("Marble", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRADIUS(extras) {
    _reporterNs.report("RADIUS", "./GameModel", _context.meta, extras);
  }

  _export("predictAim", predictAim);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      launchSpeed = _unresolved_2.launchSpeed;
      RADIUS = _unresolved_2.RADIUS;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "04305U49yJDG4yYKN1jUl7d", "AimPrediction", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=efeae8b5bb8929cd6cb12a1ec230444c9da2d64c.js.map