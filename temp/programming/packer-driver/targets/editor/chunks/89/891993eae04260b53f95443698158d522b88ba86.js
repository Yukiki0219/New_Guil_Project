System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "cc/env", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, HuaweiLogin, LOGIN_TEXT, translate, LanguageSwitch, _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, input, Input, KeyCode, view, ResolutionPolicy, resources, SpriteFrame, Sprite, sys, AudioSource, AudioClip, Canvas, Camera, profiler, Prefab, instantiate, Button, BlockInputEvents, game, Game, GameModel, MARBLE_COUNT, LEVELS, RADIUS, SHOOTER_Y, cleanSave, award, rollMarbles, marbleName, rarity, GuliPhysics, PREVIEW, HUAWEI, Slingshot, GROUND_Y_SCALE, predictAim, MARBLE_APPEARANCES, drawMarbleAppearance, Tutorial, TutorialView, GameHints, HINT_TEXT, _dec, _class, _crd, ccclass, CREAM, INK, TEAL, GOLD, PALETTE, GuliGame;

  function col(hex, alpha = 255) {
    const c = new Color();
    Color.fromHEX(c, hex);
    c.a = alpha;
    return c;
  }

  function _reportPossibleCrUseOfHuaweiLogin(extras) {
    _reporterNs.report("HuaweiLogin", "./HuaweiLogin", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLOGIN_TEXT(extras) {
    _reporterNs.report("LOGIN_TEXT", "./HuaweiLogin", _context.meta, extras);
  }

  function _reportPossibleCrUseOftranslate(extras) {
    _reporterNs.report("translate", "./Localization", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLanguage(extras) {
    _reporterNs.report("Language", "./Localization", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLanguageSwitch(extras) {
    _reporterNs.report("LanguageSwitch", "./LanguageSwitch", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMARBLE_COUNT(extras) {
    _reporterNs.report("MARBLE_COUNT", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLEVELS(extras) {
    _reporterNs.report("LEVELS", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRADIUS(extras) {
    _reporterNs.report("RADIUS", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSHOOTER_Y(extras) {
    _reporterNs.report("SHOOTER_Y", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSaveData(extras) {
    _reporterNs.report("SaveData", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcleanSave(extras) {
    _reporterNs.report("cleanSave", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfaward(extras) {
    _reporterNs.report("award", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrollMarbles(extras) {
    _reporterNs.report("rollMarbles", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmarbleName(extras) {
    _reporterNs.report("marbleName", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrarity(extras) {
    _reporterNs.report("rarity", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarble(extras) {
    _reporterNs.report("Marble", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuliPhysics(extras) {
    _reporterNs.report("GuliPhysics", "./GuliPhysics", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSlingshot(extras) {
    _reporterNs.report("Slingshot", "./Slingshot", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGROUND_Y_SCALE(extras) {
    _reporterNs.report("GROUND_Y_SCALE", "./Slingshot", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpredictAim(extras) {
    _reporterNs.report("predictAim", "./AimPrediction", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMARBLE_APPEARANCES(extras) {
    _reporterNs.report("MARBLE_APPEARANCES", "./MarbleAppearance", _context.meta, extras);
  }

  function _reportPossibleCrUseOfdrawMarbleAppearance(extras) {
    _reporterNs.report("drawMarbleAppearance", "./MarbleRenderer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTutorial(extras) {
    _reporterNs.report("Tutorial", "./Tutorial", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTutorialView(extras) {
    _reporterNs.report("TutorialView", "./TutorialView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameHints(extras) {
    _reporterNs.report("GameHints", "./GameHints", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHINT_TEXT(extras) {
    _reporterNs.report("HINT_TEXT", "./GameHints", _context.meta, extras);
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
      KeyCode = _cc.KeyCode;
      view = _cc.view;
      ResolutionPolicy = _cc.ResolutionPolicy;
      resources = _cc.resources;
      SpriteFrame = _cc.SpriteFrame;
      Sprite = _cc.Sprite;
      sys = _cc.sys;
      AudioSource = _cc.AudioSource;
      AudioClip = _cc.AudioClip;
      Canvas = _cc.Canvas;
      Camera = _cc.Camera;
      profiler = _cc.profiler;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Button = _cc.Button;
      BlockInputEvents = _cc.BlockInputEvents;
      game = _cc.game;
      Game = _cc.Game;
    }, function (_unresolved_2) {
      HuaweiLogin = _unresolved_2.HuaweiLogin;
      LOGIN_TEXT = _unresolved_2.LOGIN_TEXT;
    }, function (_unresolved_3) {
      translate = _unresolved_3.translate;
    }, function (_unresolved_4) {
      LanguageSwitch = _unresolved_4.LanguageSwitch;
    }, function (_unresolved_5) {
      GameModel = _unresolved_5.GameModel;
      MARBLE_COUNT = _unresolved_5.MARBLE_COUNT;
      LEVELS = _unresolved_5.LEVELS;
      RADIUS = _unresolved_5.RADIUS;
      SHOOTER_Y = _unresolved_5.SHOOTER_Y;
      cleanSave = _unresolved_5.cleanSave;
      award = _unresolved_5.award;
      rollMarbles = _unresolved_5.rollMarbles;
      marbleName = _unresolved_5.marbleName;
      rarity = _unresolved_5.rarity;
    }, function (_unresolved_6) {
      GuliPhysics = _unresolved_6.GuliPhysics;
    }, function (_ccEnv) {
      PREVIEW = _ccEnv.PREVIEW;
      HUAWEI = _ccEnv.HUAWEI;
    }, function (_unresolved_7) {
      Slingshot = _unresolved_7.Slingshot;
      GROUND_Y_SCALE = _unresolved_7.GROUND_Y_SCALE;
    }, function (_unresolved_8) {
      predictAim = _unresolved_8.predictAim;
    }, function (_unresolved_9) {
      MARBLE_APPEARANCES = _unresolved_9.MARBLE_APPEARANCES;
    }, function (_unresolved_10) {
      drawMarbleAppearance = _unresolved_10.drawMarbleAppearance;
    }, function (_unresolved_11) {
      Tutorial = _unresolved_11.Tutorial;
    }, function (_unresolved_12) {
      TutorialView = _unresolved_12.TutorialView;
    }, function (_unresolved_13) {
      GameHints = _unresolved_13.GameHints;
      HINT_TEXT = _unresolved_13.HINT_TEXT;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9f327wByUVCf5emlKuSSWzp", "GuliGame", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Graphics', 'Color', 'Label', 'Vec3', 'input', 'Input', 'EventTouch', 'EventMouse', 'EventKeyboard', 'KeyCode', 'view', 'ResolutionPolicy', 'resources', 'SpriteFrame', 'Sprite', 'sys', 'AudioSource', 'AudioClip', 'Canvas', 'Camera', 'profiler', 'Prefab', 'instantiate', 'Button', 'BlockInputEvents', 'game', 'Game']);

      ({
        ccclass
      } = _decorator);
      CREAM = '#fff2d7';
      INK = '#164e54';
      TEAL = '#008e96';
      GOLD = '#e0a13d';
      PALETTE = ['#168acb', '#d89516', '#20996b', '#8155bb', '#c44661', '#82becb', '#39b5a3', '#e17d55', '#475bba', '#e7ac30'];

      _export("GuliGame", GuliGame = (_dec = ccclass('GuliGame'), _dec(_class = class GuliGame extends Component {
        constructor(...args) {
          super(...args);
          this.huaweiLogin = new (_crd && HuaweiLogin === void 0 ? (_reportPossibleCrUseOfHuaweiLogin({
            error: Error()
          }), HuaweiLogin) : HuaweiLogin)(HUAWEI && !PREVIEW);
          this.hmsButton = null;
          this.hmsNotice = null;
          this.translatedLabels = new Map();
          this.screen = 'home';
          this.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
            error: Error()
          }), cleanSave) : cleanSave)(null);
          this.model = null;
          this.tutorial = null;
          this.tutorialView = null;
          this.tutorialSwipe = null;
          this.tutorialReturnModal = '';
          this.hints = new (_crd && GameHints === void 0 ? (_reportPossibleCrUseOfGameHints({
            error: Error()
          }), GameHints) : GameHints)();
          this.hintLayer = null;
          this.hintReason = '';
          this.safeScale = 1;

          this.resizeUI = () => {
            this.cancelInput();
            this.scheduleOnce(() => this.applySafeArea(), 0);
          };

          this.ui = void 0;
          this.board = void 0;
          this.ballLayer = void 0;
          this.overlay = void 0;
          this.aimG = void 0;
          this.powerG = void 0;
          this.powerText = void 0;
          this.hud = void 0;
          this.hint = void 0;
          this.hits = [];
          this.sprites = new Map();
          this.sling = new (_crd && Slingshot === void 0 ? (_reportPossibleCrUseOfSlingshot({
            error: Error()
          }), Slingshot) : Slingshot)();
          this.shooterPreview = null;
          this.power = 1;

          this.blurHandler = () => this.cancelInput();

          this.modal = '';
          this.page = 0;
          this.physics = null;
          this.resultHandled = false;
          this.lastTouch = 0;
          this.clock = 0;
          this.audio = void 0;
          this.music = void 0;
          this.musicClips = {};
          this.musicUnlocked = false;
          this.musicHidden = false;

          this.hideMusic = () => {
            var _this$music;

            this.musicHidden = true;
            (_this$music = this.music) == null || _this$music.pause();
          };

          this.showMusic = () => {
            this.musicHidden = false;
            this.syncMusic();
          };

          this.clips = {};
          this.newItems = 0;
          this.storageWarning = false;
          this.artwork = {};
          this.aimMarker = null;
          this.shotsHud = null;
          this.invalidHud = null;
        }

        ensureHuaweiLogin() {
          return this.huaweiLogin.canPlay;
        }

        beginHuaweiLogin(interactive = true) {
          this.huaweiLogin.onChange = () => {
            if (!this.isValid) return; // Stop an active pull when the platform explicitly restricts play; keep progress intact.

            if (!this.huaweiLogin.canPlay) this.cancelInput();
            this.refreshHuaweiLoginUI();
          };

          this.huaweiLogin.login(interactive);
        }

        renderHuaweiLoginUI() {
          this.hmsButton = null;
          this.hmsNotice = null;
          if (!this.huaweiLogin.required || this.screen !== 'home' && this.screen !== 'game') return;
          this.button('登录HMS', -255, 615, 170, 38, () => this.beginHuaweiLogin());
          this.hmsButton = this.ui.children[this.ui.children.length - 1];
          this.hmsNotice = this.label((_crd && LOGIN_TEXT === void 0 ? (_reportPossibleCrUseOfLOGIN_TEXT({
            error: Error()
          }), LOGIN_TEXT) : LOGIN_TEXT).idle, this.screen === 'home' ? 0 : 90, this.screen === 'home' ? -620 : 615, 15, INK, this.ui, this.screen === 'home' ? 650 : 440);
          this.refreshHuaweiLoginUI();
        }

        refreshHuaweiLoginUI() {
          var _this$hmsButton, _this$hmsNotice;

          // Update only account UI: callbacks must not cancel a drag, reset physics or dismiss a result panel.
          const visible = !this.huaweiLogin.isAuthenticated;

          if ((_this$hmsButton = this.hmsButton) != null && _this$hmsButton.isValid) {
            this.hmsButton.active = visible;
            const pending = this.huaweiLogin.state === 'pending';
            this.hmsButton.getComponent(Button).interactable = visible && !pending && !this.modal; // The plate prefab also contains a label. Keep it empty and update the button caption only.

            const labels = this.hmsButton.getComponentsInChildren(Label);
            const label = labels[labels.length - 1];
            labels.slice(0, -1).forEach(l => this.setText(l, ''));
            if (label) this.setText(label, pending ? '登录中…' : '登录HMS');
          }

          if ((_this$hmsNotice = this.hmsNotice) != null && _this$hmsNotice.isValid) {
            this.hmsNotice.node.active = visible;
            this.setText(this.hmsNotice, this.huaweiLogin.canPlay ? (_crd && LOGIN_TEXT === void 0 ? (_reportPossibleCrUseOfLOGIN_TEXT({
              error: Error()
            }), LOGIN_TEXT) : LOGIN_TEXT)[this.huaweiLogin.state] : (_crd && LOGIN_TEXT === void 0 ? (_reportPossibleCrUseOfLOGIN_TEXT({
              error: Error()
            }), LOGIN_TEXT) : LOGIN_TEXT).blocked);
          }
        }

        setText(label, text) {
          this.translatedLabels.set(label, text);
          label.string = (_crd && translate === void 0 ? (_reportPossibleCrUseOftranslate({
            error: Error()
          }), translate) : translate)(text, this.save.language);
        }

        setLanguage(language) {
          if (this.save.language === language) return;
          this.save.language = language;
          this.persist();

          for (const [label, text] of this.translatedLabels) {
            if (label.isValid) label.string = (_crd && translate === void 0 ? (_reportPossibleCrUseOftranslate({
              error: Error()
            }), translate) : translate)(text, language);else this.translatedLabels.delete(label);
          }

          if (this.tutorial) this.refreshTutorial();
        }

        onLoad() {
          var _this$node$getCompone;

          if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliRollbackTest') === '1') {
            this.scheduleOnce(() => {
              _context.import("__unresolved_13").then(m => m.verifyRollback(this.node.scene));
            }, 0);
            return;
          }

          if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliPhysicsTest') === '1') {
            this.scheduleOnce(() => {
              _context.import("__unresolved_14").then(m => m.verifyPhysics(this.node.scene));
            }, 0);
            return;
          }

          view.setDesignResolutionSize(720, 1280, ResolutionPolicy.SHOW_ALL);
          view.resizeWithBrowserSize(true);
          view.on('canvas-resize', this.resizeUI, this);
          const camera = (_this$node$getCompone = this.node.getComponent(Canvas)) == null ? void 0 : _this$node$getCompone.cameraComponent;
          if (camera) camera.projection = Camera.ProjectionType.ORTHO;
          profiler.hideStats();

          try {
            this.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
              error: Error()
            }), cleanSave) : cleanSave)(JSON.parse(sys.localStorage.getItem('guli.save.v2') || sys.localStorage.getItem('guli.save.v1') || 'null'));
          } catch {
            this.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
              error: Error()
            }), cleanSave) : cleanSave)(null);
          }

          this.audio = this.node.addComponent(AudioSource);
          const musicNode = new Node('BackgroundMusic');
          this.node.addChild(musicNode);
          this.music = musicNode.addComponent(AudioSource);
          this.music.loop = true;
          this.music.volume = 0.22;
          this.music.playOnAwake = false;

          for (const name of ['bgm_main_menu', 'bgm_gameplay']) resources.load('audio/' + name, AudioClip, (err, clip) => {
            if (!this.isValid) return;

            if (err) {
              console.warn('Background music load failed: ' + name, err);
              return;
            }

            this.musicClips[name] = clip;
            this.syncMusic();
          });

          for (const name of ['hit', 'shoot', 'win']) resources.load('audio/' + name, AudioClip, (err, clip) => {
            if (!err) this.clips[name] = clip;
          });

          const back = this.makeNode('Courtyard', this.node, 0, 0, 720, 1280);
          const fallback = back.addComponent(Graphics);
          fallback.fillColor = col('#e8c78f');
          fallback.rect(-360, -640, 720, 1280);
          fallback.fill();
          resources.load('art/courtyard/spriteFrame', SpriteFrame, (err, frame) => {
            if (err || !this.isValid) return;
            const art = this.makeNode('CourtyardArt', back, 0, 0, 720, 1280);
            const s = art.addComponent(Sprite);
            s.spriteFrame = frame;
            s.sizeMode = Sprite.SizeMode.CUSTOM;
            art.getComponent(UITransform).setContentSize(720, 1280);
            fallback.enabled = false;
          });
          this.board = this.makeNode('Board', this.node);
          this.ballLayer = this.makeNode('Marbles', this.node);
          this.ui = this.makeNode('Interface', this.node);
          this.overlay = this.makeNode('Overlay', this.node);
          input.on(Input.EventType.TOUCH_START, this.touchDown, this);
          input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
          input.on(Input.EventType.TOUCH_END, this.touchUp, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
          input.on(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
          input.on(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          input.on(Input.EventType.MOUSE_UP, this.mouseUp, this);
          input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
          game.on(Game.EVENT_HIDE, this.cancelInput, this);
          game.on(Game.EVENT_HIDE, this.hideMusic, this);
          game.on(Game.EVENT_SHOW, this.showMusic, this);
          if (sys.isBrowser && typeof window !== 'undefined') window.addEventListener('blur', this.blurHandler);
          this.render();
          if (this.huaweiLogin.required) this.beginHuaweiLogin(false);
          resources.loadDir('hud/prefabs', Prefab, (err, prefabs) => {
            if (!this.isValid) return;

            if (err) {
              console.warn('HUD artwork load failed', err);
              return;
            }

            prefabs.forEach(p => this.artwork[p.name] = p);
            const modal = this.modal;
            this.render();
            if (modal) this.showModal(modal);

            if (PREVIEW && typeof window !== 'undefined') {
              if (new URLSearchParams(window.location.search).get('guliMarbleTest') === '1') {
                _context.import("__unresolved_15").then(m => m.verifyMarbleUpdate(this));
              }

              const mode = new URLSearchParams(window.location.search).get('guliMarblePreview');

              if (mode && ['game', '0', '10', '20', '30', '40', '50'].includes(mode)) {
                _context.import("__unresolved_16").then(m => m.previewMarbleAppearances(this, mode));
              }
            }

            if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliSlingTest') === '1') {
              _context.import("__unresolved_17").then(m => m.verifySlingshot(this));
            }

            if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliLanguageTest') === '1') {
              _context.import("__unresolved_18").then(m => m.verifyLanguage(this));
            }

            if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliTutorialTest') === '1') {
              _context.import("__unresolved_19").then(m => m.verifyTutorial(this));
            }
          });
        }

        onEnable() {
          this.syncMusic();
        }

        onDisable() {
          var _this$music2;

          this.cancelInput();
          this.stopInvalidShotHudAnimation();
          (_this$music2 = this.music) == null || _this$music2.pause();
        }

        onDestroy() {
          var _this$music3, _this$physics;

          this.huaweiLogin.dispose();
          view.off('canvas-resize', this.resizeUI, this);
          this.clearTutorial();
          this.stopInvalidShotHudAnimation();
          game.off(Game.EVENT_HIDE, this.cancelInput, this);
          game.off(Game.EVENT_HIDE, this.hideMusic, this);
          game.off(Game.EVENT_SHOW, this.showMusic, this);
          (_this$music3 = this.music) == null || _this$music3.stop();
          if (sys.isBrowser && typeof window !== 'undefined') window.removeEventListener('blur', this.blurHandler);
          (_this$physics = this.physics) == null || _this$physics.dispose();
          input.off(Input.EventType.TOUCH_START, this.touchDown, this);
          input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
          input.off(Input.EventType.TOUCH_END, this.touchUp, this);
          input.off(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
          input.off(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
          input.off(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          input.off(Input.EventType.MOUSE_UP, this.mouseUp, this);
          input.off(Input.EventType.KEY_DOWN, this.keyDown, this);
        }

        makeNode(name, parent, x = 0, y = 0, w = 720, h = 1280) {
          const n = new Node(name);
          n.layer = this.node.layer;
          parent.addChild(n);
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        }

        graphic(parent) {
          return this.makeNode('Paint', parent).addComponent(Graphics);
        }
        /** Instantiate the actual editable asset, so future prefab edits appear in the game. */


        part(name, parent, x, y, w, h) {
          const prefab = this.artwork[name];
          if (!prefab) return null;
          const n = instantiate(prefab);
          parent.addChild(n);
          n.setPosition(x, y);
          n.layer = this.node.layer;
          n.getComponent(UITransform).setContentSize(w, h);

          if (name === 'Logo') {
            var _n$getComponent;

            // Fit the supplied complete logo inside the existing title area without stretching.
            const size = (_n$getComponent = n.getComponent(Sprite)) == null || (_n$getComponent = _n$getComponent.spriteFrame) == null ? void 0 : _n$getComponent.originalSize;

            if (size && size.width > 0 && size.height > 0) {
              const scale = Math.min(w / size.width, h / size.height);
              n.getComponent(UITransform).setContentSize(size.width * scale, size.height * scale);
            }
          }

          return n;
        }

        label(text, x, y, size = 24, color = INK, parent = this.ui, width = 640) {
          const n = this.makeNode(text.slice(0, 24), parent, x, y, width, size * 2.4);
          const l = n.addComponent(Label);
          this.setText(l, text);
          l.fontSize = size;
          l.lineHeight = size * 1.4;
          l.color = col(color);
          l.fontFamily = 'Microsoft YaHei';
          l.horizontalAlign = Label.HorizontalAlign.CENTER;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          l.enableWrapText = true;
          return l;
        }

        panel(x, y, w, h, parent = this.ui, fill = CREAM) {
          if (fill === CREAM && w / h > 2.2 && this.artwork.ControlPanel) {
            const name = w > 500 && h > 160 ? 'ControlPanel' : 'LevelPlate';
            const n = this.part(name, parent, x, y, w, h);
            const l = n.getComponentInChildren(Label);
            if (l) l.string = '';
            return;
          }

          const g = this.graphic(parent);
          g.fillColor = col('#594122', 45);
          g.roundRect(x - w / 2, y - h / 2 - 7, w, h, 24);
          g.fill();
          g.fillColor = col(fill, 248);
          g.roundRect(x - w / 2, y - h / 2, w, h, 24);
          g.fill();
          g.strokeColor = col('#ffffff', 185);
          g.lineWidth = 2;
          g.roundRect(x - w / 2 + 5, y - h / 2 + 5, w - 10, h - 10, 20);
          g.stroke();
          return g;
        }

        button(text, x, y, w, h, action, primary = false, parent = this.ui, disabled = false) {
          const partName = text === '主页' ? 'HomeButton' : text === '暂停' ? 'PauseButton' : text === '发射' ? 'FireButton' : '';
          const size = text === '发射' ? 116 : 84;
          let n = partName ? this.part(partName, parent, x, y, size, size) : null;

          if (!n) {
            n = this.makeNode('Button-' + text, parent, x, y, w, h);
            this.panel(0, 0, w, h, n, disabled ? '#c8c3ae' : primary ? TEAL : CREAM);
            this.label(text, 0, 0, h > 70 ? 28 : 22, primary ? '#ffffff' : INK, n, w - 20);
          }

          const btn = n.getComponent(Button) || n.addComponent(Button);
          btn.interactable = !disabled;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.94;
          const sp = n.getComponent(Sprite);
          if (sp) sp.grayscale = disabled;
          n.on(Button.EventType.CLICK, action); // Native Button owns click dispatch; global input only uses these rectangles to exclude aiming.

          this.hits.push({
            x,
            y,
            w: partName ? size : w,
            h: partName ? size : h,
            action: () => {}
          });
        }

        stars(count, x, y, size = 20, parent = this.ui) {
          const g = this.graphic(parent);

          for (let s = 0; s < 3; s++) {
            const cx = x + (s - 1) * size * 2.8;

            if (this.artwork.StarEmpty) {
              this.part('StarEmpty', parent, cx, y, size * 2.5, size * 2.6);
              if (s >= count) continue;
            }

            g.fillColor = col(s < count ? GOLD : '#cbb797');
            g.strokeColor = col(CREAM);
            g.lineWidth = 2;

            for (let i = 0; i < 10; i++) {
              const a = Math.PI / 2 + i * Math.PI / 5,
                    r = i % 2 ? size * 0.46 : size;
              const px = cx + Math.cos(a) * r,
                    py = y + Math.sin(a) * r;
              if (i === 0) g.moveTo(px, py);else g.lineTo(px, py);
            }

            g.close();
            g.fill();
            g.stroke();
          }

          g.node.setSiblingIndex(parent.children.length - 1);
        }

        clear(parent) {
          parent.children.slice().forEach(c => {
            c.removeFromParent();
            c.destroy();
          });
        }

        navigate(screen) {
          if (screen !== 'game') this.clearTutorial();

          if (screen !== 'game') {
            var _this$physics2;

            (_this$physics2 = this.physics) == null || _this$physics2.dispose();
            this.physics = null;
          }

          this.cancelInput();
          this.screen = screen;
          this.modal = '';
          this.render();
        }

        header(title, subtitle) {
          this.label(title, 0, 538, 45);
          this.label(subtitle, 0, 487, 18, '#726044');
          this.button('返回', -270, 557, 110, 54, () => this.navigate('home'));
        }

        render() {
          var _this$tutorialView, _this$hintLayer;

          (_this$tutorialView = this.tutorialView) == null || _this$tutorialView.dispose();
          this.tutorialView = null;
          (_this$hintLayer = this.hintLayer) == null || _this$hintLayer.destroy();
          this.hintLayer = null;
          this.hintReason = '';
          this.syncMusic();
          this.stopInvalidShotHudAnimation();
          this.sling.cancel();
          this.shooterPreview = null;
          this.clear(this.ui);
          this.clear(this.board);
          this.clear(this.ballLayer);
          this.clear(this.overlay);
          this.translatedLabels.clear();
          this.hits = [];
          this.sprites.clear();
          this.aimMarker = null;
          this.shotsHud = null;
          if (this.screen === 'home') this.home();
          if (this.screen === 'levels') this.levels();
          if (this.screen === 'collection') this.collection();
          if (this.screen === 'skins') this.skins();
          if (this.screen === 'game') this.gameUI();
          this.renderHuaweiLoginUI();
          this.refreshTutorial();
          this.applySafeArea();
        }

        applySafeArea() {
          const rect = sys.getSafeAreaRect(),
                size = view.getVisibleSize(); // Symmetric margins keep all existing board coordinates and input aligned.

          const insetX = Math.max(0, rect.x, size.width - rect.x - rect.width);
          const insetY = Math.max(0, rect.y, size.height - rect.y - rect.height);
          this.safeScale = Math.min(1, Math.max(1, size.width - insetX * 2) / 720, Math.max(1, size.height - insetY * 2) / 1280);

          for (const root of [this.board, this.ballLayer, this.ui, this.overlay, (_this$tutorialView2 = this.tutorialView) == null ? void 0 : _this$tutorialView2.root]) {
            var _this$tutorialView2;

            root == null || root.setScale(this.safeScale, this.safeScale, 1);
          }
        }

        home() {
          if (!this.part('Logo', this.ui, 0, 444, 402, 178)) this.label('GULI GO!', 3, 442, 108, '#00646a');
          this.label('一颗弹珠，一整个童年', 0, 334, 25, '#735537');
          this.label('庭 院 弹 珠', 0, 558, 22, '#81704f');
          const languageSwitch = this.makeNode('LanguageSwitch', this.ui, 215, 602, 340, 60);
          languageSwitch.setScale(0.65, 0.65, 1);
          languageSwitch.addComponent(_crd && LanguageSwitch === void 0 ? (_reportPossibleCrUseOfLanguageSwitch({
            error: Error()
          }), LanguageSwitch) : LanguageSwitch).setup(this.save.language, language => this.setLanguage(language));
          const g = this.graphic(this.board);
          g.strokeColor = col(CREAM, 220);
          g.lineWidth = 4;
          g.ellipse(0, 102, 253, 145);
          g.stroke();
          this.marble(this.ballLayer, 0, -111, 100, 51);
          this.marble(this.ballLayer, 2, 111, 110, 47);
          this.marble(this.ballLayer, 33, 12, 40, 57);
          this.button('开始游戏', 0, -152, 386, 88, () => this.play(), true);
          this.button('收藏图鉴  ' + this.save.collection.length + '/' + (_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT), 0, -258, 386, 76, () => this.navigate('collection'));
          this.button('发射球皮肤', 0, -350, 386, 76, () => this.navigate('skins'));
          this.button(this.save.sound ? '音效：开' : '音效：关', 0, -535, 280, 54, () => {
            this.save.sound = !this.save.sound;
            this.persist();
            this.render();
          });
          this.button('新手教学 / Help', 0, -442, 386, 64, () => this.startTutorial());
          this.label(this.storageWarning ? '存档不可用：本次进度仅保留在当前会话' : '本地单机  /  进度自动保存', 0, -585, 15, '#8e7959');
        }

        levels() {
          this.header('庭院挑战', '用更少的射击，留下更好的成绩');
          (_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
            error: Error()
          }), LEVELS) : LEVELS).forEach((level, i) => {
            const y = 345 - i * 168,
                  locked = i > 0 && !this.save.stars[i - 1];
            this.panel(0, y, 624, 146);
            this.label('0' + (i + 1), -243, y + 12, 38, locked ? '#afa38a' : TEAL, this.ui, 85);
            this.label(level.title, -35, y + 35, 26, INK, this.ui, 270);
            this.label(`击出 ${level.target} / ${level.positions.length} 颗 · ${level.shots} 次机会`, -32, y - 4, 18, '#857155', this.ui, 295);
            this.stars(this.save.stars[i], -35, y - 43, 13);
            this.button(locked ? '未解锁' : '挑战', 225, y, 120, 65, () => this.startLevel(i), true, this.ui, locked);
          });
          this.label('完成前一关即可解锁下一关', 0, -558, 18, '#786549');
        }

        collection() {
          this.header('弹珠图鉴', `已收藏 ${this.save.collection.length} / ${_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT} · 击出并过关后解锁`);
          this.label('收藏品不会被消耗，也不能装备为发射球', 0, 439, 17, '#795f42');

          for (let i = 0; i < 10 && this.page * 10 + i < (_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT); i++) {
            const id = this.page * 10 + i,
                  x = (i % 2 ? 1 : -1) * 159,
                  y = 330 - Math.floor(i / 2) * 164;
            const owned = this.save.collection.indexOf(id) >= 0;
            this.panel(x, y, 296, 150);
            this.marble(this.ui, owned ? id : -2, x - 91, y + 10, 32);
            this.label(owned ? (_crd && marbleName === void 0 ? (_reportPossibleCrUseOfmarbleName({
              error: Error()
            }), marbleName) : marbleName)(id) : '未发现', x + 46, y + 29, 22, INK, this.ui, 170);
            this.label(`#${String(id + 1).padStart(2, '0')}  ·  ${(_crd && rarity === void 0 ? (_reportPossibleCrUseOfrarity({
              error: Error()
            }), rarity) : rarity)(id)}`, x + 46, y - 11, 17, id >= 30 ? '#93679d' : '#8f7d61', this.ui, 170);
            this.label(owned ? '已收藏' : '等待在庭院中相遇', x, y - 51, 14, '#968164', this.ui, 270);
          }

          this.button('上一页', -220, -526, 155, 60, () => {
            this.page--;
            this.render();
          }, false, this.ui, this.page === 0);
          this.label(`${this.page + 1} / ${Math.ceil((_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT) / 10)}`, 0, -526, 23);
          this.button('下一页', 220, -526, 155, 60, () => {
            this.page++;
            this.render();
          }, false, this.ui, this.page >= Math.ceil((_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT) / 10) - 1);
        }

        skins() {
          this.header('发射球皮肤', '专属于你的发射球外观');
          this.panel(0, 20, 568, 610);
          this.marble(this.ui, 0, 0, 156, 88);
          this.label('原始玻璃弹珠', 0, -13, 32);
          this.label('已装备', 0, -71, 22, TEAL);
          this.label('统一的重量与力度，纯粹的技巧挑战。\n更多皮肤将在后续版本加入。', 0, -162, 21, '#7b684e', this.ui, 490);
          this.button('返回主页', 0, -405, 320, 78, () => this.navigate('home'), true);
        }

        startLevel(index, replay = false) {
          var _this$model, _this$physics3;

          if (!this.ensureHuaweiLogin()) return;
          this.clearTutorial();
          const ids = replay && ((_this$model = this.model) == null ? void 0 : _this$model.levelIndex) === index ? this.model.ids : (_crd && rollMarbles === void 0 ? (_reportPossibleCrUseOfrollMarbles({
            error: Error()
          }), rollMarbles) : rollMarbles)((_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
            error: Error()
          }), LEVELS) : LEVELS)[index].positions.length);
          (_this$physics3 = this.physics) == null || _this$physics3.dispose();
          this.model = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)(index, ids);
          this.resultHandled = false;
          this.physics = new (_crd && GuliPhysics === void 0 ? (_reportPossibleCrUseOfGuliPhysics({
            error: Error()
          }), GuliPhysics) : GuliPhysics)(this.node.scene, this.model);
          this.sling.cancel();
          this.power = 1;
          this.hints = new (_crd && GameHints === void 0 ? (_reportPossibleCrUseOfGameHints({
            error: Error()
          }), GameHints) : GameHints)();
          this.navigate('game');
          if (index === 0 && !this.save.tuto) this.startTutorial();
        }

        play() {
          if (this.ensureHuaweiLogin()) this.navigate('levels');
        }

        clearTutorial() {
          var _this$tutorialView3;

          (_this$tutorialView3 = this.tutorialView) == null || _this$tutorialView3.dispose();
          this.tutorialView = null;
          this.tutorial = null;
          this.tutorialSwipe = null;

          if (this.board) {
            this.board.active = true;
            this.ballLayer.active = true;
            this.ui.active = true;
          }
        }

        startTutorial() {
          if (!this.ensureHuaweiLogin()) return;

          if (this.screen !== 'game' || !this.model) {
            this.startLevel(0);
            if (this.tutorial) return;
          }

          this.cancelInput();
          this.tutorialReturnModal = this.modal;
          this.modal = '';
          this.clear(this.overlay);
          this.tutorial = new (_crd && Tutorial === void 0 ? (_reportPossibleCrUseOfTutorial({
            error: Error()
          }), Tutorial) : Tutorial)();
          this.hints.clear();
          this.refreshTutorial();
        }

        resetTutorialBoard() {
          this.refreshTutorial();
        }

        refreshTutorial() {
          if (!this.tutorial || !this.model) return;
          this.board.active = false;
          this.ballLayer.active = false;
          this.ui.active = false;
          if (!this.tutorialView) this.tutorialView = new (_crd && TutorialView === void 0 ? (_reportPossibleCrUseOfTutorialView({
            error: Error()
          }), TutorialView) : TutorialView)(this.node, {
            part: (...args) => this.part(...args),
            marble: (...args) => this.marble(...args),
            translate: text => (_crd && translate === void 0 ? (_reportPossibleCrUseOftranslate({
              error: Error()
            }), translate) : translate)(text, this.save.language)
          });
          this.tutorialView.show(this.tutorial.page, this.model.levelIndex, this.model.level.target - this.model.knocked.length, this.model.remaining, () => this.tutorialNext(), () => {
            var _this$tutorial;

            (_this$tutorial = this.tutorial) == null || _this$tutorial.previous();
            this.refreshTutorial();
          });
          this.applySafeArea();
        }

        tutorialNext() {
          if (!this.tutorial) return;

          if (this.tutorial.page < 2) {
            this.tutorial.advancePage();
            this.refreshTutorial();
            return;
          }

          this.save.tuto = true;
          this.persist();
          const modal = this.tutorialReturnModal;
          this.clearTutorial();
          this.hints.clear();
          this.render();
          if (modal) this.showModal(modal);
          if (this.storageWarning) this.setText(this.hint, '教程已完成；存档不可用，本次会话有效。');
        }

        gameUI() {
          const m = this.model;
          if (!this.part('Logo', this.ui, 0, 549, 258, 114)) this.label('GULI GO!', 0, 549, 57, '#00656c');
          this.button('主页', -272, 549, 110, 61, () => this.showModal('leave'));
          this.button('暂停', 272, 549, 110, 61, () => this.showModal('pause'));
          this.button('?', 284, 345, 62, 62, () => this.startTutorial());

          if (this.artwork.LevelPlate) {
            const level = this.part('LevelPlate', this.ui, -222, 451, 208, 89);
            const target = this.part('TargetPlate', this.ui, 0, 451, 224, 89);
            const shots = this.part('ShotsPlate', this.ui, 230, 451, 208, 89);
            this.setText(level.getComponentInChildren(Label), `第 ${m.levelIndex + 1} 关`);
            this.hud = target.getComponentInChildren(Label);
            this.shotsHud = shots.getComponentInChildren(Label);
            [level, target, shots].forEach(n => {
              const l = n.getComponentInChildren(Label);
              l.fontSize = 25;
              l.lineHeight = 34;
              l.node.getComponent(UITransform).setContentSize(190, 60);
            });
          } else {
            this.panel(0, 451, 652, 89);
            this.label(`第 ${m.levelIndex + 1} 关`, -230, 451, 25, INK, this.ui, 160);
            this.hud = this.label('', 85, 451, 24, INK, this.ui, 450);
          }

          this.stars(this.save.stars[m.levelIndex], 0, 365, 22);
          this.label(m.level.title, 0, 318, 18, '#82684b');
          const g = this.graphic(this.board);
          g.lineWidth = 4;
          g.strokeColor = col('#fffaf0', 235);
          g.ellipse(0, 30, _crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
            error: Error()
          }), RADIUS) : RADIUS, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
            error: Error()
          }), RADIUS) : RADIUS) * 0.87);
          g.stroke();
          g.lineWidth = 1.2;
          g.strokeColor = col('#fffaf0', 150);
          g.ellipse(0, 30, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
            error: Error()
          }), RADIUS) : RADIUS) + 5, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
            error: Error()
          }), RADIUS) : RADIUS) * 0.87 + 4);
          g.stroke(); // Chalk flecks are deterministic and remain outside the precision boundary.

          g.fillColor = col('#fffdf0', 130);

          for (let i = 0; i < 160; i++) {
            const a = i * 2.39996,
                  r = (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
              error: Error()
            }), RADIUS) : RADIUS) + Math.sin(i * 43) * 4;
            g.circle(Math.cos(a) * r, 30 + Math.sin(a) * r * 0.87, 0.9);
            g.fill();
          }

          if (this.part('ChalkRing', this.board, 0, 30, 540, 470)) g.clear();
          this.aimG = this.graphic(this.ui);
          this.aimMarker = this.makeNode('AimArrow', this.ui, 0, 0, 40, 40);
          const arrow = this.aimMarker.addComponent(Graphics);
          arrow.fillColor = col('#eef8f7');
          arrow.strokeColor = col(TEAL);
          arrow.lineWidth = 2;
          arrow.moveTo(0, 0);
          arrow.lineTo(-12, -28);
          arrow.lineTo(0, -21);
          arrow.lineTo(12, -28);
          arrow.close();
          arrow.fill();
          arrow.stroke();
          this.syncBalls();

          if (m.phase === 'aim') {
            this.power = 1;
            this.shooterPreview = this.marble(this.ballLayer, 0, 0, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
              error: Error()
            }), SHOOTER_Y) : SHOOTER_Y), 32);
          }

          if (m.levelIndex === 0) this.label('按住自己的弹珠后拉', 0, -220, 16, '#7c6448');
          const teaching = m.levelIndex === 0;
          this.panel(0, -525, 664, 150);
          this.hint = this.label('', 0, -420, 22);
          this.label('力度', -225, -524, 22);
          this.powerG = this.graphic(this.ui);
          this.powerText = this.label('', 220, -524, 22, TEAL, this.ui, 95);
          if (teaching) this.label('拉回起点取消', 200, -566, 16, INK, this.ui, 160);
          this.label(`三星 ≤ ${m.level.three} 次  ·  两星 ≤ ${m.level.two} 次`, teaching ? -100 : 0, -566, 16, '#8c7657', this.ui, teaching ? 350 : 450);
          if (teaching) this.label('目标整颗离开白圈才算击出', 0, -607, 17, '#7b6445');
          this.refreshHud();
          this.drawAim();
          this.drawPower();
        }

        projectY(y) {
          return 30 + y * (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
            error: Error()
          }), GROUND_Y_SCALE) : GROUND_Y_SCALE);
        }

        syncBalls() {
          this.model.balls.forEach(b => {
            if (!this.sprites.has(b)) {
              const n = this.marble(this.ballLayer, b.shooter ? 0 : b.id, b.x, this.projectY(b.y), b.r);
              n.active = !b.gone;
              this.sprites.set(b, n);
            }
          });
        }

        refreshHud() {
          if (this.screen !== 'game') return;
          const m = this.model;
          this.setText(this.hud, this.shotsHud ? `目标 ${m.knocked.length}/${m.level.target}` : `目标 ${m.knocked.length}/${m.level.target}     剩余 ${m.remaining} 次`);
          if (this.shotsHud) this.setText(this.shotsHud, `剩余 ${m.remaining} 次`);

          if (m.levelIndex > 0) {
            this.setText(this.hint, m.phase === 'moving' ? '弹珠滚动中…' : this.sling.pointer !== null ? '蓄力中' : '');
            return;
          }

          this.setText(this.hint, m.phase === 'moving' ? '弹珠滚动中…' : this.sling.pointer !== null ? this.sling.ready ? '松手发射 · 拉回起点取消' : '继续后拉蓄力 · 松手取消' : '按住自己的弹珠，向后拖拉');
        }

        playInvalidShotHudAnimation() {
          this.stopInvalidShotHudAnimation();
          const label = this.shotsHud || this.hud;
          this.invalidHud = {
            label,
            color: label.color.clone(),
            scale: label.node.scale.clone(),
            elapsed: 0
          };
          this.updateInvalidShotHudAnimation(0);
        }

        stopInvalidShotHudAnimation() {
          const saved = this.invalidHud;

          if (saved != null && saved.label.isValid && saved.label.node.isValid) {
            saved.label.color = saved.color;
            saved.label.node.setScale(saved.scale);
          }

          this.invalidHud = null;
        }

        updateInvalidShotHudAnimation(dt) {
          const saved = this.invalidHud;
          if (!saved || !saved.label.isValid) return;
          saved.elapsed += Math.max(0, dt);
          const t = Math.min(.5, saved.elapsed);
          const pulse = t < .13 ? 1 - (1 - t / .13) ** 2 : (1 - (t - .13) / .37) ** 2;
          saved.label.node.setScale(saved.scale.x * (1 + .3 * pulse), saved.scale.y * (1 + .3 * pulse), saved.scale.z);
          saved.label.color = Color.lerp(new Color(), col('#ed3434', saved.color.a), saved.color, Math.max(0, (t - .13) / .37));
          if (t >= .5) this.stopInvalidShotHudAnimation();
        }

        drawPower() {
          const g = this.powerG;
          g.clear();
          g.fillColor = col('#d5bc94');
          g.roundRect(-110, -537, 220, 26, 13);
          g.fill();
          const fill = 220 * this.power / 100;
          g.fillColor = col(TEAL);
          g.rect(-110, -537, fill, 26);
          g.fill();
          this.powerText.string = this.power + ' / 100';
        }

        drawAim() {
          const g = this.aimG;
          g.clear();
          const active = this.model.phase === 'aim' && this.sling.pointer !== null && this.sling.ready;
          if (this.aimMarker) this.aimMarker.active = active;
          if (!active) return;
          const sx = this.sling.x,
                sy = this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y) + this.sling.y;
          const groundPull = this.sling.y / (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
            error: Error()
          }), GROUND_Y_SCALE) : GROUND_Y_SCALE);
          const prediction = (_crd && predictAim === void 0 ? (_reportPossibleCrUseOfpredictAim({
            error: Error()
          }), predictAim) : predictAim)(sx, (_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y) + groundPull, -sx, -groundPull, this.power, this.model.balls, this.physics.config.linearDamping);

          if (!prediction) {
            if (this.aimMarker) this.aimMarker.active = false;
            return;
          }

          const ex = prediction.x,
                ey = this.projectY(prediction.y);
          const length = Math.hypot(ex - sx, ey - sy);

          if (length < 1) {
            if (this.aimMarker) this.aimMarker.active = false;
            return;
          }

          const dx = (ex - sx) / length,
                dy = (ey - sy) / length; // Read-only first-contact prediction; Box2D still owns actual motion and collisions.

          g.strokeColor = col(TEAL, 220);
          g.lineWidth = 5;

          for (let t = 32; t < length - 24; t += 22) {
            const end = Math.min(t + 13, length - 24);
            g.moveTo(sx + dx * t, sy + dy * t);
            g.lineTo(sx + dx * end, sy + dy * end);
            g.stroke();
          }

          if (this.aimMarker) {
            this.aimMarker.setPosition(ex, ey);
            this.aimMarker.angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;
            const scale = Math.min(1, length / 32);
            this.aimMarker.setScale(scale, scale, 1);
          }
        }

        marble(parent, id, x, y, r) {
          const appearance = (_crd && MARBLE_APPEARANCES === void 0 ? (_reportPossibleCrUseOfMARBLE_APPEARANCES({
            error: Error()
          }), MARBLE_APPEARANCES) : MARBLE_APPEARANCES)[id];

          if (appearance) {
            const prototype = this.makeNode('Marble-' + id, parent, x, y, r * 3, r * 3);
            (_crd && drawMarbleAppearance === void 0 ? (_reportPossibleCrUseOfdrawMarbleAppearance({
              error: Error()
            }), drawMarbleAppearance) : drawMarbleAppearance)(prototype, r, appearance);
            return prototype;
          }

          const n = this.makeNode('Marble-' + id, parent, x, y, r * 3, r * 3);
          const g = n.addComponent(Graphics);
          g.fillColor = col('#604a29', 40);
          g.ellipse(r * 0.2, -r * 0.52, r * 1.07, r * 0.66);
          g.fill();
          const base = col(id === -2 ? '#9d9b8e' : PALETTE[Math.max(0, id) % 10]);

          for (let i = 0; i < 18; i++) {
            const t = i / 18;
            g.fillColor = new Color(Math.min(255, base.r * (0.33 + t * 0.84)), Math.min(255, base.g * (0.33 + t * 0.84)), Math.min(255, base.b * (0.33 + t * 0.84)), 255);
            g.circle(-r * t * 0.15, r * t * 0.12, r * (1 - t * 0.36));
            g.fill();
          }

          if (id !== -2) {
            const motif = Math.floor(Math.max(id, 0) / 10);
            g.lineWidth = r * 0.14;
            g.strokeColor = col('#c9f8ff', 130);

            for (let j = 0; j < 2 + motif % 3; j++) {
              const off = (j - 1) * r * 0.25;
              g.moveTo(-r * 0.72, -r * 0.1 + off);
              g.bezierCurveTo(r * 0.8, -r * 0.9, -r * 0.65, r * 0.9, r * 0.62, r * 0.25 + off);
              g.stroke();
            }

            if (motif === 2 || motif === 4) {
              g.fillColor = col('#ffefbe', 190);

              for (let j = 0; j < 9; j++) {
                const a = j * 2.4;
                g.circle(Math.sin(a) * r * 0.57, Math.cos(a) * r * 0.57, r * 0.045);
                g.fill();
              }
            }
          }

          g.strokeColor = col('#c6f6ff', 165);
          g.lineWidth = r * 0.045;
          g.circle(0, 0, r * 0.94);
          g.stroke();
          g.fillColor = col('#ffffff', 217);
          g.ellipse(-r * 0.31, r * 0.48, r * 0.28, r * 0.16);
          g.fill();
          g.fillColor = col('#ffffff', 90);
          g.ellipse(r * 0.34, -r * 0.47, r * 0.28, r * 0.09);
          g.fill();
          g.fillColor = col('#ffffff', 240);
          g.circle(r * 0.35, r * 0.63, r * 0.075);
          g.fill();

          if (id >= 30) {
            g.strokeColor = col(id >= 45 ? '#fff0a0' : '#ffe0ff');
            g.lineWidth = 2;
            const sx = r * 0.87,
                  sy = r * 0.83;
            g.moveTo(sx - 6, sy);
            g.lineTo(sx + 6, sy);
            g.moveTo(sx, sy - 6);
            g.lineTo(sx, sy + 6);
            g.stroke();
          }

          return n;
        }

        update(dt) {
          var _this$tutorialView5;

          if (!this.huaweiLogin.canPlay) return;
          this.clock += dt;

          if (this.tutorial) {
            var _this$tutorialView4;

            if (!this.musicHidden) (_this$tutorialView4 = this.tutorialView) == null || _this$tutorialView4.update(dt);
            return;
          }

          this.updateInvalidShotHudAnimation(dt);
          if (this.screen !== 'game' || this.modal || this.tutorial && this.musicHidden || !this.model) return;
          (_this$tutorialView5 = this.tutorialView) == null || _this$tutorialView5.update(dt);
          const m = this.model;
          this.updateHints(dt);

          if (m.phase === 'moving') {
            const hit = this.physics.advance(dt);
            if (hit) this.sound('hit');
            this.sprites.forEach((n, b) => {
              n.active = !b.gone;
              n.setPosition(b.x, this.projectY(b.y));
            });
            this.refreshHud();

            if (m.phase !== 'moving') {
              this.render();
              if (m.levelIndex === 0) this.hints.resolved(m);
              this.updateHints(0);
              if (m.lastShotInvalid) this.playInvalidShotHudAnimation();

              if ((m.phase === 'won' || m.phase === 'lost') && !this.resultHandled) {
                this.resultHandled = true;
                const previous = this.save.collection.length;
                this.save = (_crd && award === void 0 ? (_reportPossibleCrUseOfaward({
                  error: Error()
                }), award) : award)(this.save, m);
                this.newItems = this.save.collection.length - previous;

                if (m.phase === 'won') {
                  this.persist();
                  this.sound('win');
                }

                this.showModal('result');
              }
            }
          }
        }

        updateHints(dt) {
          var _this$hintLayer2, _this$hintLayer3, _m$lastShotReport;

          const m = this.model;
          if (!m || this.tutorial) return;

          if (m.levelIndex > 0) {
            this.hints.clear();
            return;
          }

          const had = this.hints.reason;
          this.hints.tick(dt, m.phase === 'aim' && this.sling.pointer === null);
          if (had && !this.hints.reason && m.phase === 'aim' && m.remaining <= 2) this.hints.show('low');
          const reason = this.hints.reason;
          if (this.hintReason === (reason || '')) return;
          this.hintReason = reason || '';
          (_this$hintLayer2 = this.hintLayer) == null || _this$hintLayer2.removeFromParent();
          (_this$hintLayer3 = this.hintLayer) == null || _this$hintLayer3.destroy();
          this.hintLayer = null;
          this.hits = this.hits.filter(h => !(h.y === -607 && h.w === 180));
          if (!reason) return;
          this.hintLayer = this.makeNode('ContextHint', this.ui);
          this.panel(0, -340, 640, 104, this.hintLayer);
          this.label((_crd && HINT_TEXT === void 0 ? (_reportPossibleCrUseOfHINT_TEXT({
            error: Error()
          }), HINT_TEXT) : HINT_TEXT)[reason], 0, -340, 22, reason === 'success' ? TEAL : INK, this.hintLayer, 600);
          const g = this.graphic(this.hintLayer);
          g.strokeColor = col(GOLD);
          g.lineWidth = 3;
          if (['idle', 'wrong'].includes(reason)) this.drawGuideCircle(g, 0, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y), 44, 44);

          if (reason === 'targetOnly' && (_m$lastShotReport = m.lastShotReport) != null && _m$lastShotReport.shooter) {
            const previous = m.lastShotReport.shooter;
            this.drawGuideCircle(g, previous.x, this.projectY(previous.y), 38, 38);
            this.label('上次停留位置', previous.x, this.projectY(previous.y) + 52, 18, INK, this.hintLayer, 180);
          }

          if (['targetOnly', 'boundary'].includes(reason)) this.drawGuideCircle(g, 0, 30, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
            error: Error()
          }), RADIUS) : RADIUS) + 6, (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
            error: Error()
          }), RADIUS) : RADIUS) * .87 + 6);

          if (reason === 'low') {
            g.strokeColor = col(GOLD);
            g.lineWidth = 3;
            g.roundRect(123, 407, 214, 88, 18);
            g.stroke();
          }

          if (this.hints.repeated >= 2 && reason !== 'success') this.button('查看提示', 0, -607, 180, 46, () => this.startTutorial(), false, this.hintLayer);
        }

        drawGuideCircle(g, x, y, rx, ry) {
          g.strokeColor = col('#808080');
          g.lineWidth = 2;
          const segments = Math.max(16, Math.ceil(2 * Math.PI * Math.max(rx, ry) / 16));

          for (let i = 0; i < segments; i++) {
            const start = i / segments * Math.PI * 2;

            for (let j = 0; j <= 4; j++) {
              const a = start + j / 4 * .58 / segments * Math.PI * 2;
              const px = x + Math.cos(a) * rx,
                    py = y + Math.sin(a) * ry;
              if (j === 0) g.moveTo(px, py);else g.lineTo(px, py);
            }

            g.stroke();
          }
        }

        showModal(kind) {
          var _this$model2;

          if (this.tutorialView) this.tutorialView.root.active = false;
          this.cancelInput();
          this.modal = kind;
          this.hits = [];
          this.clear(this.overlay);
          this.ui.getComponentsInChildren(Button).forEach(b => b.interactable = false);
          const shade = this.graphic(this.overlay);
          shade.fillColor = col('#142f32', 150);
          shade.rect(-360, -640, 720, 1280);
          shade.fill();
          shade.node.addComponent(BlockInputEvents);
          const completed = kind === 'result' && ((_this$model2 = this.model) == null ? void 0 : _this$model2.phase) === 'won';
          this.panel(0, completed ? -40 : 0, 600, completed ? 730 : 650, this.overlay);
          const m = this.model;

          if (kind === 'login') {
            this.label('华为帐号登录', 0, 205, 34, INK, this.overlay, 530);
            this.label((_crd && LOGIN_TEXT === void 0 ? (_reportPossibleCrUseOfLOGIN_TEXT({
              error: Error()
            }), LOGIN_TEXT) : LOGIN_TEXT)[this.huaweiLogin.state], 0, 60, 24, INK, this.overlay, 510);
            const pending = this.huaweiLogin.state === 'pending';
            this.button(pending ? '登录中…' : '重新登录', 0, -105, 430, 76, () => this.beginHuaweiLogin(), true, this.overlay, pending);
            this.button('回到主菜单', 0, -205, 430, 70, () => this.navigate('home'), false, this.overlay);
            return;
          }

          if (kind === 'result') {
            const won = m.phase === 'won';
            this.label(won ? '漂亮的一击！' : '次数已用完', 0, 236, 38, INK, this.overlay, 520);
            this.stars(m.stars, 0, 148, 32, this.overlay);
            this.label(`击出 ${m.knocked.length} 颗 · 使用 ${m.used} 次射击`, 0, 62, 24, INK, this.overlay, 530);
            this.label(won ? `新收藏 +${this.newItems}  ·  最佳 ${this.save.stars[m.levelIndex]} 星` : '目标尚未完成，本次挑战失败。', 0, 7, 20, '#87704f', this.overlay, 540);
            this.button(won && m.levelIndex < 4 ? '下一关' : '返回关卡', 0, -87, 440, 75, () => won && m.levelIndex < 4 ? this.startLevel(m.levelIndex + 1) : this.navigate('levels'), true, this.overlay);
            this.button('再试一次', 0, -181, 440, 70, () => this.startLevel(m.levelIndex, true), false, this.overlay);
            if (won) this.button('回到主菜单', 0, -275, 440, 70, () => this.navigate('home'), false, this.overlay);
            if (!won) this.button('查看教程', 0, -267, 250, 54, () => this.startTutorial(), false, this.overlay);
            if (won) this.label(this.storageWarning ? '存档暂不可用，请勿关闭当前会话' : won ? '星级与收藏已保存' : '调整角度，试试一次撞出多颗', 0, -352, 17, '#8b795d', this.overlay, 530);
          } else {
            this.label(kind === 'leave' ? '返回主页？' : '休息一下', 0, 220, 39, INK, this.overlay);
            this.label(kind === 'leave' ? '本局未结算的进度不会保存' : '弹珠已暂停，准备好再继续', 0, 133, 22, '#867053', this.overlay);
            this.button('继续游戏', 0, 15, 430, 80, () => {
              this.modal = '';
              this.render();
            }, true, this.overlay);
            this.button('重玩本关', 0, -85, 430, 74, () => {
              if (this.tutorial) {
                if (this.tutorial.step === 'PRACTICE' || this.tutorial.step === 'RETRY') {
                  this.tutorial.step = 'PRACTICE';
                  this.resetTutorialBoard();
                } else this.startTutorial();
              } else this.startLevel(m.levelIndex, true);
            }, false, this.overlay);
            this.button('返回主页', 0, -184, 430, 74, () => this.navigate('home'), false, this.overlay);
          }
        }

        persist() {
          try {
            sys.localStorage.setItem('guli.save.v2', JSON.stringify(this.save));
            this.storageWarning = false;
          } catch {
            this.storageWarning = true;
          }
        }

        sound(name) {
          if (this.save.sound && this.clips[name]) this.audio.playOneShot(this.clips[name], name === 'hit' ? 0.22 : 0.36);
        }

        syncMusic() {
          const source = this.music;
          if (!source) return;

          if (!this.enabledInHierarchy || !this.musicUnlocked || this.musicHidden || !this.save.sound) {
            source.pause();
            return;
          }

          const clip = this.musicClips[this.screen === 'game' ? 'bgm_gameplay' : 'bgm_main_menu'];

          if (source.clip !== clip) {
            source.stop();
            source.clip = clip || null;
          }

          if (clip && !source.playing) source.play();
        }

        point(e) {
          const p = e.getUILocation(),
                local = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(p.x, p.y, 0));
          return local.multiplyScalar(1 / this.safeScale);
        }

        contains(h, x, y) {
          return Math.abs(x - h.x) <= h.w / 2 && Math.abs(y - h.y) <= h.h / 2;
        }

        down(pointer, x, y) {
          var _this$model3;

          if (!this.huaweiLogin.canPlay) return;
          this.musicUnlocked = true;
          this.syncMusic();

          if (this.tutorial) {
            if (!this.tutorialSwipe && y > -490 && y < 280) this.tutorialSwipe = {
              pointer,
              x,
              y
            };
            return;
          }

          if (this.modal || this.screen !== 'game' || ((_this$model3 = this.model) == null ? void 0 : _this$model3.phase) !== 'aim') return;
          if (this.hits.some(h => this.contains(h, x, y))) return;
          if (this.sling.pointer !== null) return;

          if (this.sling.begin(pointer, x, y, 0, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y))) {
            this.hints.clear();
            this.updateHints(0);
            this.updatePull();
          } else if (this.model.levelIndex === 0 && this.model.balls.some(b => !b.gone && Math.hypot(x - b.x, y - this.projectY(b.y)) < b.r + 12)) {
            this.hints.show('wrong');
            this.updateHints(0);
          }
        }

        move(pointer, x, y) {
          if (this.tutorial) return;
          if (this.sling.move(pointer, x, y)) this.updatePull();
        }

        updatePull() {
          var _this$shooterPreview;

          this.power = this.sling.power;
          (_this$shooterPreview = this.shooterPreview) == null || _this$shooterPreview.setPosition(this.sling.x, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y) + this.sling.y);
          this.drawAim();
          this.drawPower();
          this.refreshHud();
        }

        up(pointer, x, y) {
          var _this$model4;

          if (this.tutorial) {
            const swipe = this.tutorialSwipe;
            this.tutorialSwipe = null;

            if ((swipe == null ? void 0 : swipe.pointer) === pointer && Math.abs(x - swipe.x) > 70 && Math.abs(x - swipe.x) > Math.abs(y - swipe.y) * 1.5) {
              if (x < swipe.x) this.tutorial.advancePage();else this.tutorial.previous();
              this.refreshTutorial();
            }

            return;
          }

          if (this.sling.pointer !== pointer) return;
          const shot = this.sling.release(pointer, x, y);

          if (!shot || this.modal || this.screen !== 'game' || ((_this$model4 = this.model) == null ? void 0 : _this$model4.phase) !== 'aim') {
            this.cancelInput();
            return;
          }

          const groundY = shot.y / (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
            error: Error()
          }), GROUND_Y_SCALE) : GROUND_Y_SCALE);
          this.power = shot.power;

          if (this.model.launch(-shot.x, -groundY, (shot.power - 1) / 99, shot.x, (_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y) + groundY)) {
            this.sound('shoot');
            this.render();
          } else this.cancelInput();
        }

        cancelInput() {
          var _this$model5, _this$shooterPreview2;

          this.tutorialSwipe = null;
          this.sling.cancel();
          if (this.screen === 'game' && ((_this$model5 = this.model) == null ? void 0 : _this$model5.phase) === 'aim' && (_this$shooterPreview2 = this.shooterPreview) != null && _this$shooterPreview2.isValid) this.updatePull();
        }

        touchDown(e) {
          this.lastTouch = Date.now();
          const p = this.point(e);
          this.down('touch:' + e.getID(), p.x, p.y);
        }

        touchMove(e) {
          this.lastTouch = Date.now();
          const p = this.point(e);
          this.move('touch:' + e.getID(), p.x, p.y);
        }

        touchUp(e) {
          this.lastTouch = Date.now();
          const p = this.point(e);
          this.up('touch:' + e.getID(), p.x, p.y);
        }

        touchCancel(e) {
          var _this$tutorialSwipe;

          this.lastTouch = Date.now();
          if (((_this$tutorialSwipe = this.tutorialSwipe) == null ? void 0 : _this$tutorialSwipe.pointer) === 'touch:' + e.getID()) this.tutorialSwipe = null;
          if (this.sling.pointer === 'touch:' + e.getID()) this.cancelInput();
        }

        mouseDown(e) {
          if (e.getButton() === 2) {
            this.cancelInput();
            return;
          }

          if (Date.now() - this.lastTouch < 600 || e.getButton() !== 0) return;
          const p = this.point(e);
          this.down('mouse', p.x, p.y);
        }

        mouseMove(e) {
          if (Date.now() - this.lastTouch < 600) return;
          const p = this.point(e);
          this.move('mouse', p.x, p.y);
        }

        mouseUp(e) {
          if (Date.now() - this.lastTouch < 600 || e.getButton() !== 0) return;
          const p = this.point(e);
          this.up('mouse', p.x, p.y);
        }

        keyDown(e) {
          var _this$model6, _this$model7;

          this.musicUnlocked = true;
          this.syncMusic();
          if (this.tutorial) return;

          if (e.keyCode === KeyCode.ESCAPE && this.sling.pointer !== null) {
            this.cancelInput();
            return;
          }

          if (e.keyCode === KeyCode.ESCAPE && this.screen === 'game' && ((_this$model6 = this.model) == null ? void 0 : _this$model6.phase) !== 'won' && ((_this$model7 = this.model) == null ? void 0 : _this$model7.phase) !== 'lost') {
            if (this.modal) {
              this.modal = '';
              this.render();
            } else this.showModal('pause');
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=891993eae04260b53f95443698158d522b88ba86.js.map