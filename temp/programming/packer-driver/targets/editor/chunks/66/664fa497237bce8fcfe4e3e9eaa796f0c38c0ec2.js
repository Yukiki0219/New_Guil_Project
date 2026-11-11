System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, input, Input, _dec, _class, _crd, ccclass, LanguageSwitch;

  function _reportPossibleCrUseOfLanguage(extras) {
    _reporterNs.report("Language", "./Localization", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Graphics = _cc.Graphics;
      Color = _cc.Color;
      Label = _cc.Label;
      Vec3 = _cc.Vec3;
      input = _cc.input;
      Input = _cc.Input;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e5c8eI6fKxPV6W4/acChSRg", "LanguageSwitch", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Graphics', 'Color', 'Label', 'Vec3', 'input', 'Input', 'EventMouse', 'EventTouch']);

      ({
        ccclass
      } = _decorator);
      /** Captures one pointer; cancellation restores the saved selection without changing it. */

      _export("LanguageSwitch", LanguageSwitch = (_dec = ccclass('LanguageSwitch'), _dec(_class = class LanguageSwitch extends Component {
        constructor(...args) {
          super(...args);
          this.selected = 'zh';
          this.position = 0;
          this.target = 0;
          this.pointer = null;
          this.lastTouch = 0;
          this.startX = 0;
          this.dragging = false;
          this.slider = void 0;
          this.labels = [];

          this.changed = () => {};
        }

        setup(language, changed) {
          this.selected = language;
          this.position = this.target = language === 'en' ? 1 : 0;
          this.changed = changed;
          const bg = this.node.addComponent(Graphics);
          bg.fillColor = new Color('#fff2d7');
          bg.strokeColor = new Color('#e0a13d');
          bg.lineWidth = 3;
          bg.roundRect(-170, -30, 340, 60, 29);
          bg.fill();
          bg.stroke();
          this.slider = new Node('LanguageSlider');
          this.slider.layer = this.node.layer;
          this.node.addChild(this.slider);
          this.slider.addComponent(UITransform).setContentSize(164, 52);
          const g = this.slider.addComponent(Graphics);
          g.fillColor = new Color('#008e96');
          g.roundRect(-82, -26, 164, 52, 25);
          g.fill();
          ['中文', 'English'].forEach((text, i) => {
            const n = new Node(text);
            n.layer = this.node.layer;
            this.node.addChild(n);
            n.setPosition(i ? 84 : -84, 0);
            n.addComponent(UITransform).setContentSize(158, 46);
            const l = n.addComponent(Label);
            l.string = text;
            l.fontSize = 23;
            l.lineHeight = 28;
            l.fontFamily = 'Microsoft YaHei';
            l.horizontalAlign = Label.HorizontalAlign.CENTER;
            l.verticalAlign = Label.VerticalAlign.CENTER;
            this.labels.push(l);
          });
          this.paint();
          this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.cancel, this);
          this.node.on(Node.EventType.MOUSE_DOWN, this.mouseStart, this);
          input.on(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          input.on(Input.EventType.MOUSE_UP, this.mouseEnd, this);
        }

        localX(e) {
          const p = e.getUILocation();
          return this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(p.x, p.y, 0)).x;
        }

        moveTo(x) {
          this.position = Math.max(0, Math.min(1, (x + 84) / 168));
          this.paint();
        }

        begin(x) {
          this.startX = x;
          this.dragging = false;
        }

        drag(x) {
          if (Math.abs(x - this.startX) > 6) this.dragging = true;
          if (this.dragging) this.moveTo(x);
        }

        touchStart(e) {
          if (this.pointer !== null) return;
          this.lastTouch = Date.now();
          this.pointer = 't' + e.getID();
          this.begin(this.localX(e));
          e.propagationStopped = true;
        }

        touchMove(e) {
          if (this.pointer === 't' + e.getID()) {
            this.drag(this.localX(e));
            e.propagationStopped = true;
          }
        }

        touchEnd(e) {
          if (this.pointer === 't' + e.getID()) {
            this.finish(this.localX(e));
            e.propagationStopped = true;
          }
        }

        mouseStart(e) {
          if (e.getButton() !== 0 || Date.now() - this.lastTouch < 600 || this.pointer !== null) return;
          this.pointer = 'mouse';
          this.begin(this.localX(e));
        }

        mouseMove(e) {
          if (this.pointer === 'mouse') this.drag(this.localX(e));
        }

        mouseEnd(e) {
          if (this.pointer === 'mouse' && e.getButton() === 0) {
            this.finish(this.localX(e));
          }
        }

        finish(x) {
          if (this.dragging) this.moveTo(x);
          this.pointer = null;
          const next = x >= 0 ? 'en' : 'zh';
          this.target = next === 'en' ? 1 : 0;

          if (next !== this.selected) {
            this.selected = next;
            this.changed(next);
          }

          this.paint();
        }

        cancel() {
          this.pointer = null;
          this.target = this.selected === 'en' ? 1 : 0;
        }

        paint() {
          if (!this.slider) return;
          this.slider.setPosition(-84 + 168 * this.position, 0);
          this.labels.forEach((l, i) => {
            l.color = new Color((this.selected === 'en' ? 1 : 0) === i ? '#ffffff' : '#164e54');
          });
        }

        update(dt) {
          if (this.pointer !== null) return;
          this.position += (this.target - this.position) * Math.min(1, dt * 18);
          if (Math.abs(this.position - this.target) < .001) this.position = this.target;
          this.paint();
        }

        onDisable() {
          this.cancel();
        }

        onDestroy() {
          input.off(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          input.off(Input.EventType.MOUSE_UP, this.mouseEnd, this);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=664fa497237bce8fcfe4e3e9eaa796f0c38c0ec2.js.map