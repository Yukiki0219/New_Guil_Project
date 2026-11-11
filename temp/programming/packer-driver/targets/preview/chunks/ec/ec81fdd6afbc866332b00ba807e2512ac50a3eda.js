System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, UITransform, Graphics, Color, Mask, resources, Texture2D, SpriteFrame, Sprite, Rect, _crd, motifFrames;

  function color(hex, alpha) {
    if (alpha === void 0) {
      alpha = 255;
    }

    var c = new Color();
    Color.fromHEX(c, hex);
    c.a = alpha;
    return c;
  }

  function layer(parent, name, r) {
    var n = new Node(name);
    n.layer = parent.layer;
    parent.addChild(n);
    n.addComponent(UITransform).setContentSize(r * 2, r * 2);
    return n;
  }
  /** Static layered glass approximation. No physical refraction or per-frame redraw. */


  /** Bounded static geometry; circular parent mask clips every interior motif. */
  function drawMarbleAppearance(root, r, style) {
    var body = layer(root, 'GlassBody', r).addComponent(Graphics);
    body.fillColor = color('#16353f', 45);
    body.ellipse(r * .12, -r * .58, r * 1.02, r * .47);
    body.fill();
    var dark = color(style.base),
        bright = color(style.light);

    for (var i = 0; i < 12; i++) {
      var t = i / 11;
      body.fillColor = new Color(dark.r + (bright.r - dark.r) * t * .85, dark.g + (bright.g - dark.g) * t * .85, dark.b + (bright.b - dark.b) * t * .85, 255);
      body.circle(-r * t * .13, r * t * .12, r * (1 - t * .52));
      body.fill();
    }

    var clip = layer(root, 'GlassInteriorClip', r * .9);
    var mask = clip.addComponent(Mask);
    mask.type = Mask.Type.GRAPHICS_ELLIPSE;
    mask.segments = 48;
    var inside = layer(clip, 'GlassInterior', r).addComponent(Graphics);
    inside.lineWidth = r * .075;

    if (style.variant !== undefined && style.motif !== 'moonRabbit') {
      drawConfiguredInterior(inside, r, style);
    } else if (style.motif === 'ripples') {
      for (var _i = 0; _i < 3; _i++) {
        inside.strokeColor = color(style.accent, 100 + _i * 38);
        inside.ellipse(r * .18, -r * .12, r * (.28 + _i * .23), r * (.15 + _i * .15));
        inside.stroke();
      }

      inside.strokeColor = color('#1688d8', 160);
      inside.lineWidth = r * .12;
      inside.moveTo(-r, -r * .4);
      inside.bezierCurveTo(-r * .2, r * .5, r * .2, -r * .6, r, r * .25);
      inside.stroke();
    } else if (style.motif === 'petals') {
      // Offset translucent petals sit below the glass reflections, not on its surface.
      for (var _i2 = 0; _i2 < 5; _i2++) {
        var a = _i2 * Math.PI * 2 / 5 + .2,
            dx = Math.cos(a),
            dy = Math.sin(a),
            px = -dy,
            py = dx;
        inside.fillColor = color(_i2 % 2 ? '#d1baff' : style.accent, 180);
        inside.moveTo(0, 0);
        inside.bezierCurveTo(r * (dx * .3 + px * .35), r * (dy * .3 + py * .35), r * (dx * .72 + px * .2), r * (dy * .72 + py * .2), r * dx * .72, r * dy * .72);
        inside.bezierCurveTo(r * (dx * .72 - px * .2), r * (dy * .72 - py * .2), r * (dx * .3 - px * .35), r * (dy * .3 - py * .35), 0, 0);
        inside.fill();
      }

      inside.fillColor = color('#fff1ba');
      inside.circle(0, 0, r * .13);
      inside.fill();
    } else {
      inside.strokeColor = color('#e8aef7', 125);
      inside.lineWidth = r * .2;
      inside.moveTo(-r, -r * .45);
      inside.bezierCurveTo(-r * .3, r * .8, r * .35, -r * .8, r, r * .5);
      inside.stroke();
      inside.strokeColor = color('#a0ffdf', 145);
      inside.lineWidth = r * .11;
      inside.moveTo(-r, -r * .6);
      inside.bezierCurveTo(-r * .4, r * .6, r * .4, -r * .6, r, r * .65);
      inside.stroke(); // Large connected silhouette remains legible at the game's 60-pixel design diameter.

      inside.fillColor = color(style.accent, 235);
      inside.ellipse(0, -r * .23, r * .34, r * .32);
      inside.fill();
      inside.circle(-r * .04, r * .12, r * .24);
      inside.fill();
      inside.ellipse(-r * .18, r * .42, r * .105, r * .3);
      inside.fill();
      inside.ellipse(r * .07, r * .46, r * .1, r * .32);
      inside.fill();
      inside.circle(r * .32, -r * .18, r * .13);
      inside.fill();
      inside.fillColor = color(style.base);
      inside.circle(-r * .115, r * .16, r * .037);
      inside.fill();

      for (var [x, y] of [[-.56, .35], [.48, .5], [.56, -.47]]) {
        inside.fillColor = color('#ffffff', 220);
        inside.moveTo(r * x, r * (y + .09));
        inside.lineTo(r * (x + .035), r * (y + .025));
        inside.lineTo(r * (x + .09), r * y);
        inside.lineTo(r * (x + .025), r * (y - .025));
        inside.lineTo(r * x, r * (y - .09));
        inside.lineTo(r * (x - .035), r * y);
        inside.close();
        inside.fill();
      }
    }

    var animal = ['moonRabbit', 'cat', 'fox', 'panda', 'fish', 'dragon', 'tiger', 'phoenix', 'tortoise'].indexOf(style.motif);
    if (animal >= 0) loadMotifFrames().then(frames => {
      if (!root.isValid || !clip.isValid) return;
      inside.clear();
      var image = layer(clip, 'GlassInclusion', r * .8).addComponent(Sprite);
      image.spriteFrame = frames[animal];
      image.sizeMode = Sprite.SizeMode.CUSTOM;
      image.node.getComponent(UITransform).setContentSize(r * 1.6, r * 1.6); // The shared circular mask and foreground reflections keep art inside the glass.

      image.color = new Color(255, 255, 255, 235);
    }).catch(() => {
      /* Procedural motifs remain visible if loading fails. */
    });
    var reflection = layer(root, 'GlassReflections', r).addComponent(Graphics);
    reflection.strokeColor = color(style.light, 210);
    reflection.lineWidth = r * .045;
    reflection.circle(0, 0, r * .94);
    reflection.stroke();

    if (style.glass !== 'clear') {
      reflection.strokeColor = color(style.glass === 'pearl' ? '#ffe9ff' : '#c5ffdf', 150);
      reflection.lineWidth = r * .065;
      reflection.arc(0, 0, r * .82, Math.PI * 1.1, Math.PI * 1.85, false);
      reflection.stroke();
    }

    reflection.fillColor = color('#ffffff', 215);
    reflection.ellipse(-r * .3, r * .48, r * .28, r * .13);
    reflection.fill();
    reflection.fillColor = color('#ffffff', 65);
    reflection.ellipse(r * .25, -r * .5, r * .25, r * .09);
    reflection.fill();
    reflection.fillColor = color('#ffffff', 245);
    reflection.circle(r * .29, r * .65, r * .065);
    reflection.fill();
  }

  function drawConfiguredInterior(g, r, s) {
    var v = s.variant || 0,
        m = s.motif;

    var disc = function disc(x, y, rx, ry, c, a) {
      if (a === void 0) {
        a = 220;
      }

      g.fillColor = color(c, a);
      g.ellipse(x * r, y * r, rx * r, ry * r);
      g.fill();
    };

    var line = function line(points, c, width) {
      if (width === void 0) {
        width = .035;
      }

      g.strokeColor = color(c, 220);
      g.lineWidth = r * width;
      points.forEach((_ref, i) => {
        var [x, y] = _ref;
        return i ? g.lineTo(x * r, y * r) : g.moveTo(x * r, y * r);
      });
      g.stroke();
    };

    var polygon = function polygon(points, c, a) {
      if (a === void 0) {
        a = 230;
      }

      g.fillColor = color(c, a);
      points.forEach((_ref2, i) => {
        var [x, y] = _ref2;
        return i ? g.lineTo(x * r, y * r) : g.moveTo(x * r, y * r);
      });
      g.close();
      g.fill();
    };

    var star = (x, y, size, c) => polygon(Array.from({
      length: 10
    }, (_, i) => {
      var a = i * Math.PI / 5 + Math.PI / 2,
          rr = size * (i % 2 ? .42 : 1);
      return [x + Math.cos(a) * rr, y + Math.sin(a) * rr];
    }), c);

    var specks = n => {
      for (var i = 0; i < n; i++) {
        var a = i * 2.39996 + v * .3,
            d = .75 * Math.sqrt((i + .5) / n);
        disc(Math.cos(a) * d, Math.sin(a) * d, .012 + i % 3 * .008, .012 + i % 3 * .008, s.accent, 130 + i % 100);
      }
    };

    if (['wave', 'split', 'spiral', 'rings', 'ripples', 'dots', 'stars', 'galaxy'].includes(m)) {
      if (m === 'dots' || m === 'galaxy') specks(m === 'galaxy' ? 24 : 10 + v % 7);

      if (m === 'stars') {
        for (var i = 0; i < 5; i++) {
          var a = i * 2.4 + v;
          star(Math.cos(a) * .53, Math.sin(a) * .53, .08 + i * .012, s.accent);
        }

        specks(12);
      }

      if (m === 'rings' || m === 'ripples') for (var _i3 = 0; _i3 < 3; _i3++) {
        g.strokeColor = color(s.accent, 100 + _i3 * 40);
        g.lineWidth = r * (.025 + v % 3 * .012);
        g.ellipse(r * .12, r * -.15, r * (.25 + _i3 * .22), r * (.12 + _i3 * .13));
        g.stroke();
      }
      if (m === 'spiral' || m === 'galaxy') for (var arm = 0; arm < (m === 'galaxy' ? 3 : 2); arm++) {
        var points = [];

        for (var _i4 = 0; _i4 <= 48; _i4++) {
          var _a = _i4 * .16 + arm * Math.PI + v * .4,
              d = .05 + _i4 * .014;

          points.push([Math.cos(_a) * d, Math.sin(_a) * d]);
        }

        line(points, arm % 2 ? s.light : s.accent, m === 'galaxy' ? .04 : .075);
      }
      if (m === 'wave' || m === 'split') for (var _i5 = 0; _i5 < (m === 'split' ? 1 : 3); _i5++) {
        g.strokeColor = color(_i5 % 2 ? s.light : s.accent, 170);
        g.lineWidth = r * (m === 'split' ? .48 : .12);
        var off = (_i5 - 1) * .28;
        g.moveTo(-r, r * (-.5 + off));
        g.bezierCurveTo(-r * .3, r * (.75 + off + v % 3 * .1), r * .2, r * (-.8 + off), r, r * (.5 + off));
        g.stroke();
      }
      return;
    }

    if (m === 'petals') {
      if (v === 3 || v === 4) {
        // Hanging wisteria or lily-of-the-valley clusters.
        for (var stem = 0; stem < 3; stem++) {
          var x = (stem - 1) * .4;
          line([[x, .65], [x + .1, 0], [x, -.65]], s.light, .025);

          for (var j = 0; j < 4; j++) {
            var y = .45 - j * .25;
            disc(x + (j % 2 ? .12 : -.12), y, v === 4 ? .12 : .1, v === 4 ? .1 : .17, s.accent);
          }
        }
      } else {
        var petals = [5, 8, 12, 0, 0, 7, 6, 14][v % 8],
            layers = v === 1 || v === 5 || v === 6 ? 2 : 1;

        for (var layerIndex = 0; layerIndex < layers; layerIndex++) for (var _i6 = 0; _i6 < petals; _i6++) {
          var _a2 = _i6 * Math.PI * 2 / petals + layerIndex * .3,
              dx = Math.cos(_a2),
              dy = Math.sin(_a2),
              px = -dy,
              py = dx;

          var length = layerIndex ? .49 : .76,
              width = v === 7 ? .12 : v === 0 ? .3 : .22;
          g.fillColor = color(layerIndex ? s.light : s.accent, layerIndex ? 220 : 190);
          g.moveTo(0, 0);
          g.bezierCurveTo(r * (dx * .25 + px * width), r * (dy * .25 + py * width), r * (dx * length + px * width), r * (dy * length + py * width), r * dx * length, r * dy * length);
          g.bezierCurveTo(r * (dx * length - px * width), r * (dy * length - py * width), r * (dx * .25 - px * width), r * (dy * .25 - py * width), 0, 0);
          g.fill();
        }

        disc(0, 0, v === 7 ? .24 : .12, v === 7 ? .24 : .12, v === 7 ? '#794b25' : '#ffe99c');
        if (v === 7) for (var _i7 = 0; _i7 < 9; _i7++) {
          var _a3 = _i7 * 2.4;

          disc(Math.cos(_a3) * .14, Math.sin(_a3) * .14, .022, .022, '#ffe99c');
        }
      }

      return;
    }

    specks(10);

    if (m === 'cat' || m === 'fox' || m === 'panda' || m === 'tiger') {
      var fur = m === 'fox' ? '#ffab56' : m === 'cat' ? '#b892fa' : '#f1f5ff';

      if (m === 'panda') {
        disc(-.37, .38, .18, .18, '#18334a');
        disc(.37, .38, .18, .18, '#18334a');
      } else {
        polygon([[-.47, .12], [-.48, .64], [-.12, .4]], fur);
        polygon([[.47, .12], [.48, .64], [.12, .4]], fur);
      }

      disc(0, 0, .49, .43, fur);

      if (m === 'fox') {
        polygon([[-.46, .02], [0, -.43], [.46, .02], [.16, -.1], [0, -.02], [-.16, -.1]], '#fff4df');
      }

      if (m === 'panda') {
        disc(-.21, .08, .14, .18, '#18334a');
        disc(.21, .08, .14, .18, '#18334a');
      }

      for (var _x of [-.2, .2]) {
        disc(_x, .1, .065, .09, m === 'cat' ? '#adff77' : '#173654');
        disc(_x - .015, .13, .018, .025, '#ffffff');
      }

      polygon([[-.065, -.12], [.065, -.12], [0, -.19]], '#71446e');
      line([[0, -.19], [-.08, -.24]], '#71446e', .02);
      line([[0, -.19], [.08, -.24]], '#71446e', .02);
      if (m === 'tiger') for (var sign of [-1, 1]) for (var _i8 = 0; _i8 < 3; _i8++) polygon([[sign * .46, .24 - _i8 * .17], [sign * .24, .15 - _i8 * .15], [sign * .43, .11 - _i8 * .17]], '#2878b0');
      if (m === 'cat') star(0, .34, .09, '#ffe899');
      return;
    }

    if (m === 'fish') {
      polygon([[-.35, .05], [-.75, .4], [-.62, -.27]], '#ffad5c');
      disc(.05, .02, .5, .27, '#ff9444');
      polygon([[-.12, .26], [.02, .5], [.3, .22]], '#ffe8af');
      disc(.34, .1, .06, .07, '#18334a');

      for (var _i9 = 0; _i9 < 3; _i9++) line([[-.15 + _i9 * .17, .22], [-.23 + _i9 * .17, .02], [-.13 + _i9 * .17, -.2]], '#fff2b5', .045);

      return;
    }

    if (m === 'dragon') {
      var _points = [];

      for (var _i10 = 0; _i10 <= 35; _i10++) {
        var _a4 = _i10 * .19,
            _d = .62 - _i10 * .009;

        _points.push([Math.cos(_a4) * _d, Math.sin(_a4) * _d]);
      }

      line(_points, s.accent, .2);
      line(_points, s.light, .12);

      for (var _i11 = 0; _i11 < _points.length; _i11 += 4) {
        var [_x2, _y] = _points[_i11];
        polygon([[_x2 - .06, _y], [_x2, _y + .12], [_x2 + .06, _y]], s.accent);
      }

      disc(.45, .25, .22, .14, s.light);
      polygon([[.45, .36], [.35, .66], [.55, .4]], s.accent);
      line([[.53, .28], [.75, .35], [.68, .52]], s.accent, .025);
      disc(.49, .3, .035, .035, '#ffffff');
      return;
    }

    if (m === 'phoenix') {
      for (var _sign of [-1, 1]) for (var _i12 = 0; _i12 < 5; _i12++) {
        polygon([[0, .04], [_sign * (.36 + _i12 * .09), .67 - _i12 * .12], [_sign * .48, -.15 - _i12 * .07]], _i12 % 2 ? s.accent : '#ffab4c', 220);
      }

      for (var _i13 = 0; _i13 < 3; _i13++) line([[0, .1], [(_i13 - 1) * .19, -.35], [(_i13 - 1) * .32, -.72]], s.accent, .08);

      disc(0, .24, .12, .23, s.accent);
      disc(.03, .48, .12, .1, s.accent);
      polygon([[.12, .5], [.28, .45], [.1, .42]], '#fff1ad');
      return;
    }

    if (m === 'tortoise') {
      for (var _x3 of [-.37, .37]) for (var _y2 of [-.3, .3]) disc(_x3, _y2, .15, .13, s.light);

      disc(.03, .57, .13, .18, s.light);
      disc(0, 0, .46, .48, s.base);
      g.strokeColor = color(s.accent);
      g.lineWidth = r * .035;
      g.ellipse(0, 0, r * .46, r * .48);
      g.stroke();
      var hex = Array.from({
        length: 7
      }, (_, i) => [Math.cos(i * Math.PI / 3) * .23, Math.sin(i * Math.PI / 3) * .25]);
      line(hex, s.accent);

      for (var _i14 = 0; _i14 < 6; _i14++) line([hex[_i14], [hex[_i14][0] * 1.9, hex[_i14][1] * 1.8]], s.accent);

      line([[-.6, -.5], [-.65, .1], [-.5, .58], [0, .77], [.5, .6], [.67, .1]], s.light, .06);
      disc(.67, .1, .1, .065, s.light);
    }
  }
  /** One texture and nine cached frames shared by every game/collection instance. */


  function loadMotifFrames() {
    if (!motifFrames) motifFrames = new Promise((resolve, reject) => {
      resources.load('art/marble-motifs/texture', Texture2D, (err, texture) => {
        if (err) {
          motifFrames = null;
          reject(err);
          return;
        }

        var cell = texture.width / 3;
        resolve(Array.from({
          length: 9
        }, (_, i) => {
          var frame = new SpriteFrame();
          frame.texture = texture;
          frame.rect = new Rect(i % 3 * cell, Math.floor(i / 3) * cell, cell, cell);
          return frame;
        }));
      });
    });
    return motifFrames;
  }

  function _reportPossibleCrUseOfMarbleAppearance(extras) {
    _reporterNs.report("MarbleAppearance", "./MarbleAppearance", _context.meta, extras);
  }

  _export("drawMarbleAppearance", drawMarbleAppearance);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Graphics = _cc.Graphics;
      Color = _cc.Color;
      Mask = _cc.Mask;
      resources = _cc.resources;
      Texture2D = _cc.Texture2D;
      SpriteFrame = _cc.SpriteFrame;
      Sprite = _cc.Sprite;
      Rect = _cc.Rect;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e9705bCaDxKR62f8p6hS5hj", "MarbleRenderer", undefined);

      __checkObsolete__(['Node', 'UITransform', 'Graphics', 'Color', 'Mask', 'resources', 'Texture2D', 'SpriteFrame', 'Sprite', 'Rect']);

      motifFrames = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ec81fdd6afbc866332b00ba807e2512ac50a3eda.js.map