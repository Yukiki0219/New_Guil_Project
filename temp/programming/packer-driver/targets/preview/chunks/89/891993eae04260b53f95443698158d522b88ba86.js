System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "cc/env", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _translate, LanguageSwitch, _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, input, Input, KeyCode, view, ResolutionPolicy, resources, SpriteFrame, Sprite, Mask, sys, AudioSource, AudioClip, Canvas, Camera, profiler, Prefab, instantiate, Button, BlockInputEvents, UIOpacity, game, Game, GameModel, MARBLE_COUNT, LEVELS, RADIUS, SHOOTER_Y, cleanSave, award, rollMarbles, marbleName, rarity, GuliPhysics, PREVIEW, Slingshot, GROUND_Y_SCALE, predictAim, MARBLE_APPEARANCES, drawMarbleAppearance, Tutorial, TutorialView, GameHints, HINT_TEXT, REWARDS, RARITIES, drawReward, equipReward, rewardById, _dec, _class, _crd, ccclass, CREAM, INK, TEAL, GOLD, RARITY_COLORS, PALETTE, GACHA_MARBLE_SOURCES, GuliGame;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function col(hex, alpha) {
    if (alpha === void 0) {
      alpha = 255;
    }

    var c = new Color();
    Color.fromHEX(c, hex);
    c.a = alpha;
    return c;
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

  function _reportPossibleCrUseOfREWARDS(extras) {
    _reporterNs.report("REWARDS", "./Gacha", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRARITIES(extras) {
    _reporterNs.report("RARITIES", "./Gacha", _context.meta, extras);
  }

  function _reportPossibleCrUseOfReward(extras) {
    _reporterNs.report("Reward", "./Gacha", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRewardKind(extras) {
    _reporterNs.report("RewardKind", "./Gacha", _context.meta, extras);
  }

  function _reportPossibleCrUseOfdrawReward(extras) {
    _reporterNs.report("drawReward", "./Gacha", _context.meta, extras);
  }

  function _reportPossibleCrUseOfequipReward(extras) {
    _reporterNs.report("equipReward", "./Gacha", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrewardById(extras) {
    _reporterNs.report("rewardById", "./Gacha", _context.meta, extras);
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
      Mask = _cc.Mask;
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
      UIOpacity = _cc.UIOpacity;
      game = _cc.game;
      Game = _cc.Game;
    }, function (_unresolved_2) {
      _translate = _unresolved_2.translate;
    }, function (_unresolved_3) {
      LanguageSwitch = _unresolved_3.LanguageSwitch;
    }, function (_unresolved_4) {
      GameModel = _unresolved_4.GameModel;
      MARBLE_COUNT = _unresolved_4.MARBLE_COUNT;
      LEVELS = _unresolved_4.LEVELS;
      RADIUS = _unresolved_4.RADIUS;
      SHOOTER_Y = _unresolved_4.SHOOTER_Y;
      cleanSave = _unresolved_4.cleanSave;
      award = _unresolved_4.award;
      rollMarbles = _unresolved_4.rollMarbles;
      marbleName = _unresolved_4.marbleName;
      rarity = _unresolved_4.rarity;
    }, function (_unresolved_5) {
      GuliPhysics = _unresolved_5.GuliPhysics;
    }, function (_ccEnv) {
      PREVIEW = _ccEnv.PREVIEW;
    }, function (_unresolved_6) {
      Slingshot = _unresolved_6.Slingshot;
      GROUND_Y_SCALE = _unresolved_6.GROUND_Y_SCALE;
    }, function (_unresolved_7) {
      predictAim = _unresolved_7.predictAim;
    }, function (_unresolved_8) {
      MARBLE_APPEARANCES = _unresolved_8.MARBLE_APPEARANCES;
    }, function (_unresolved_9) {
      drawMarbleAppearance = _unresolved_9.drawMarbleAppearance;
    }, function (_unresolved_10) {
      Tutorial = _unresolved_10.Tutorial;
    }, function (_unresolved_11) {
      TutorialView = _unresolved_11.TutorialView;
    }, function (_unresolved_12) {
      GameHints = _unresolved_12.GameHints;
      HINT_TEXT = _unresolved_12.HINT_TEXT;
    }, function (_unresolved_13) {
      REWARDS = _unresolved_13.REWARDS;
      RARITIES = _unresolved_13.RARITIES;
      drawReward = _unresolved_13.drawReward;
      equipReward = _unresolved_13.equipReward;
      rewardById = _unresolved_13.rewardById;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9f327wByUVCf5emlKuSSWzp", "GuliGame", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Graphics', 'Color', 'Label', 'Vec3', 'input', 'Input', 'EventTouch', 'EventMouse', 'EventKeyboard', 'KeyCode', 'view', 'ResolutionPolicy', 'resources', 'SpriteFrame', 'Sprite', 'Mask', 'sys', 'AudioSource', 'AudioClip', 'Canvas', 'Camera', 'profiler', 'Prefab', 'instantiate', 'Button', 'BlockInputEvents', 'UIOpacity', 'game', 'Game']);

      ({
        ccclass
      } = _decorator);
      CREAM = '#fff2d7';
      INK = '#164e54';
      TEAL = '#008e96';
      GOLD = '#e0a13d';
      RARITY_COLORS = {
        '普通': '#a7a49a',
        '稀有': '#4bb8bd',
        '超级稀有': '#a26bd7',
        '珍藏': '#d99178',
        '传奇': '#e5b943'
      };
      PALETTE = ['#168acb', '#d89516', '#20996b', '#8155bb', '#c44661', '#82becb', '#39b5a3', '#e17d55', '#475bba', '#e7ac30'];
      GACHA_MARBLE_SOURCES = [4, 2, 6, 5, 13, 0, 7, 14, 42, 23, 27, 31, 26, 28, 39, 36, 35, 25, 44, 54];

      _export("GuliGame", GuliGame = (_dec = ccclass('GuliGame'), _dec(_class = class GuliGame extends Component {
        constructor() {
          super(...arguments);
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
          this.trailLayer = void 0;
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
          this.earnedStars = 0;
          this.lastReward = null;
          this.lastDrawDuplicate = false;
          this.gachaAnimation = null;
          this.refundFlight = null;
          this.wardrobeKind = 'marble';
          this.navSwipe = null;
          this.trailMarks = [];
          this.trailClock = 0;
          this.trailPreviews = [];
          this.sceneSprite = void 0;
          this.sceneFallback = void 0;
          this.sceneArtId = '';
          this.flowerTrailFrame = null;
          this.storageWarning = false;
          this.artwork = {};
          this.aimMarker = null;
          this.shotsHud = null;
          this.invalidHud = null;
        }

        setText(label, text) {
          this.translatedLabels.set(label, text);
          label.string = (_crd && _translate === void 0 ? (_reportPossibleCrUseOftranslate({
            error: Error()
          }), _translate) : _translate)(text, this.save.language);
        }

        setLanguage(language) {
          if (this.save.language === language) return;
          this.save.language = language;
          this.persist();

          for (var [label, text] of this.translatedLabels) {
            if (label.isValid) label.string = (_crd && _translate === void 0 ? (_reportPossibleCrUseOftranslate({
              error: Error()
            }), _translate) : _translate)(text, language);else this.translatedLabels.delete(label);
          }

          if (this.tutorial) this.refreshTutorial();
        }

        onLoad() {
          var _this$node$getCompone,
              _this = this;

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
          var camera = (_this$node$getCompone = this.node.getComponent(Canvas)) == null ? void 0 : _this$node$getCompone.cameraComponent;
          if (camera) camera.projection = Camera.ProjectionType.ORTHO;
          profiler.hideStats();

          try {
            var raw = JSON.parse(sys.localStorage.getItem('guli.save.v3') || sys.localStorage.getItem('guli.save.v2') || sys.localStorage.getItem('guli.save.v1') || 'null');
            this.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
              error: Error()
            }), cleanSave) : cleanSave)(raw);
            if (raw && raw.version !== 3) this.persist();
          } catch (_unused) {
            this.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
              error: Error()
            }), cleanSave) : cleanSave)(null);
          }

          this.audio = this.node.addComponent(AudioSource);
          var musicNode = new Node('BackgroundMusic');
          this.node.addChild(musicNode);
          this.music = musicNode.addComponent(AudioSource);
          this.music.loop = true;
          this.music.volume = 0.22;
          this.music.playOnAwake = false;

          var _loop = function _loop(name) {
            resources.load('audio/' + name, AudioClip, (err, clip) => {
              if (!_this.isValid) return;

              if (err) {
                console.warn('Background music load failed: ' + name, err);
                return;
              }

              _this.musicClips[name] = clip;

              _this.syncMusic();
            });
          };

          for (var name of ['bgm_main_menu', 'bgm_gameplay']) {
            _loop(name);
          }

          var _loop2 = function _loop2(_name) {
            resources.load('audio/' + _name, AudioClip, (err, clip) => {
              if (!err) _this.clips[_name] = clip;
            });
          };

          for (var _name of ['hit', 'shoot', 'win']) {
            _loop2(_name);
          }

          var back = this.makeNode('Courtyard', this.node, 0, 0, 720, 1280);
          this.sceneFallback = back.addComponent(Graphics);
          this.sceneFallback.fillColor = col('#e8c78f');
          this.sceneFallback.rect(-360, -640, 720, 1280);
          this.sceneFallback.fill();
          this.sceneSprite = this.makeNode('CourtyardArt', back, 0, 0, 720, 1280).addComponent(Sprite);
          this.sceneSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          this.refreshSceneArt();
          resources.load('art/gacha-T05/spriteFrame', SpriteFrame, (err, frame) => {
            if (!err && this.isValid) this.flowerTrailFrame = frame;
          });
          this.board = this.makeNode('Board', this.node);
          this.trailLayer = this.makeNode('Trails', this.node);
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
          resources.loadDir('hud/prefabs', Prefab, (err, prefabs) => {
            if (!this.isValid) return;

            if (err) {
              console.warn('HUD artwork load failed', err);
              return;
            }

            prefabs.forEach(p => this.artwork[p.name] = p);
            if (this.gachaAnimation) return;
            var modal = this.modal;
            this.render();
            if (modal) this.showModal(modal);

            if (PREVIEW && typeof window !== 'undefined') {
              if (new URLSearchParams(window.location.search).get('guliMarbleTest') === '1') {
                _context.import("__unresolved_15").then(m => m.verifyMarbleUpdate(this));
              }

              var mode = new URLSearchParams(window.location.search).get('guliMarblePreview');

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

        makeNode(name, parent, x, y, w, h) {
          if (x === void 0) {
            x = 0;
          }

          if (y === void 0) {
            y = 0;
          }

          if (w === void 0) {
            w = 720;
          }

          if (h === void 0) {
            h = 1280;
          }

          var n = new Node(name);
          n.layer = this.node.layer;
          parent.addChild(n);
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        }

        graphic(parent) {
          return this.makeNode('Paint', parent).addComponent(Graphics);
        }

        refreshSceneArt() {
          var id = this.screen === 'gacha' ? 'gacha-page' : this.save.equipped.scene || 'default';
          if (id === this.sceneArtId) return;
          this.sceneArtId = id;
          var path = id === 'default' ? 'art/courtyard/spriteFrame' : id === 'gacha-page' ? 'art/gacha-page/spriteFrame' : "art/gacha-scenes/" + id + "/spriteFrame";
          resources.load(path, SpriteFrame, (err, frame) => {
            if (!this.isValid || this.sceneArtId !== id) return;

            if (err) {
              console.warn('Scene skin load failed: ' + id, err);
              return;
            }

            this.sceneSprite.spriteFrame = frame;
            this.sceneSprite.node.getComponent(UITransform).setContentSize(720, 1280);
            this.sceneFallback.enabled = false;
          });
        }
        /** Instantiate the actual editable asset, so future prefab edits appear in the game. */


        part(name, parent, x, y, w, h) {
          var prefab = this.artwork[name];
          if (!prefab) return null;
          var n = instantiate(prefab);
          parent.addChild(n);
          n.setPosition(x, y);
          n.layer = this.node.layer;
          n.getComponent(UITransform).setContentSize(w, h);

          if (name === 'Logo') {
            var _n$getComponent;

            // Fit the supplied complete logo inside the existing title area without stretching.
            var size = (_n$getComponent = n.getComponent(Sprite)) == null || (_n$getComponent = _n$getComponent.spriteFrame) == null ? void 0 : _n$getComponent.originalSize;

            if (size && size.width > 0 && size.height > 0) {
              var scale = Math.min(w / size.width, h / size.height);
              n.getComponent(UITransform).setContentSize(size.width * scale, size.height * scale);
            }
          }

          return n;
        }

        label(text, x, y, size, color, parent, width) {
          if (size === void 0) {
            size = 24;
          }

          if (color === void 0) {
            color = INK;
          }

          if (parent === void 0) {
            parent = this.ui;
          }

          if (width === void 0) {
            width = 640;
          }

          var n = this.makeNode(text.slice(0, 24), parent, x, y, width, size * 2.4);
          var l = n.addComponent(Label);
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

        panel(x, y, w, h, parent, fill) {
          if (parent === void 0) {
            parent = this.ui;
          }

          if (fill === void 0) {
            fill = CREAM;
          }

          if (fill === CREAM && w / h > 2.2 && this.artwork.ControlPanel) {
            var name = w > 500 && h > 160 ? 'ControlPanel' : 'LevelPlate';
            var n = this.part(name, parent, x, y, w, h);
            var l = n.getComponentInChildren(Label);
            if (l) l.string = '';
            return;
          }

          var g = this.graphic(parent);
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

        button(text, x, y, w, h, action, primary, parent, disabled) {
          if (primary === void 0) {
            primary = false;
          }

          if (parent === void 0) {
            parent = this.ui;
          }

          if (disabled === void 0) {
            disabled = false;
          }

          var partName = text === '主页' ? 'HomeButton' : text === '暂停' ? 'PauseButton' : text === '发射' ? 'FireButton' : '';
          var size = text === '发射' ? 116 : 84;
          var n = partName ? this.part(partName, parent, x, y, size, size) : null;

          if (!n) {
            n = this.makeNode('Button-' + text, parent, x, y, w, h);
            this.panel(0, 0, w, h, n, disabled ? '#c8c3ae' : primary ? TEAL : CREAM);
            this.label(text, 0, 0, h > 70 ? 28 : 22, primary ? '#ffffff' : INK, n, w - 20);
          }

          var btn = n.getComponent(Button) || n.addComponent(Button);
          btn.interactable = !disabled;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.94;
          var sp = n.getComponent(Sprite);
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

        starIcon(parent, x, y, radius) {
          var n = this.makeNode('GachaStar', parent, x, y, radius * 2, radius * 2);
          var g = n.addComponent(Graphics);
          g.fillColor = col('#ffca58');
          g.strokeColor = col('#fff6d2');
          g.lineWidth = 2;

          for (var i = 0; i < 10; i++) {
            var a = Math.PI / 2 + i * Math.PI / 5,
                r = i % 2 ? radius * .46 : radius;
            if (i) g.lineTo(Math.cos(a) * r, Math.sin(a) * r);else g.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          }

          g.close();
          g.fill();
          g.stroke();
          return n;
        }

        stars(count, x, y, size, parent) {
          if (size === void 0) {
            size = 20;
          }

          if (parent === void 0) {
            parent = this.ui;
          }

          var g = this.graphic(parent);

          for (var s = 0; s < 3; s++) {
            var cx = x + (s - 1) * size * 2.8;

            if (this.artwork.StarEmpty) {
              this.part('StarEmpty', parent, cx, y, size * 2.5, size * 2.6);
              if (s >= count) continue;
            }

            g.fillColor = col(s < count ? GOLD : '#cbb797');
            g.strokeColor = col(CREAM);
            g.lineWidth = 2;

            for (var i = 0; i < 10; i++) {
              var a = Math.PI / 2 + i * Math.PI / 5,
                  r = i % 2 ? size * 0.46 : size;
              var px = cx + Math.cos(a) * r,
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
          this.page = 0;
          this.render();
        }

        header(title, subtitle) {
          this.label(title, 0, 538, 45);
          this.label(subtitle, 0, 487, 18, '#726044');
          this.button('返回', -270, 557, 110, 54, () => this.navigate('home'));
        }

        render() {
          var _this$tutorialView, _this$hintLayer;

          this.refundFlight = null;
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
          this.clear(this.trailLayer);
          this.clear(this.ballLayer);
          this.clear(this.overlay);
          this.trailMarks = [];
          this.trailClock = 0;
          this.trailPreviews = [];
          this.refreshSceneArt();
          this.translatedLabels.clear();
          this.hits = [];
          this.sprites.clear();
          this.aimMarker = null;
          this.shotsHud = null;
          if (this.screen === 'home') this.home();
          if (this.screen === 'levels') this.levels();
          if (this.screen === 'collection') this.collection();
          if (this.screen === 'skins') this.skins();
          if (this.screen === 'gacha') this.gacha();
          if (this.screen === 'game') this.gameUI();
          this.refreshTutorial();
          this.applySafeArea();
        }

        applySafeArea() {
          var rect = sys.getSafeAreaRect(),
              size = view.getVisibleSize(); // Symmetric margins keep all existing board coordinates and input aligned.

          var insetX = Math.max(0, rect.x, size.width - rect.x - rect.width);
          var insetY = Math.max(0, rect.y, size.height - rect.y - rect.height);
          this.safeScale = Math.min(1, Math.max(1, size.width - insetX * 2) / 720, Math.max(1, size.height - insetY * 2) / 1280);

          for (var root of [this.board, this.trailLayer, this.ballLayer, this.ui, this.overlay, (_this$tutorialView2 = this.tutorialView) == null ? void 0 : _this$tutorialView2.root]) {
            var _this$tutorialView2;

            root == null || root.setScale(this.safeScale, this.safeScale, 1);
          }
        }

        home() {
          if (!this.part('Logo', this.ui, 0, 444, 402, 178)) this.label('GULI GO!', 3, 442, 108, '#00646a');
          this.label('一颗弹珠，一整个童年', 0, 334, 25, '#735537');
          this.label('庭 院 弹 珠', 0, 558, 22, '#81704f');
          var languageSwitch = this.makeNode('LanguageSwitch', this.ui, 215, 602, 340, 60);
          languageSwitch.setScale(0.65, 0.65, 1);
          languageSwitch.addComponent(_crd && LanguageSwitch === void 0 ? (_reportPossibleCrUseOfLanguageSwitch({
            error: Error()
          }), LanguageSwitch) : LanguageSwitch).setup(this.save.language, language => this.setLanguage(language));
          var g = this.graphic(this.board);
          g.strokeColor = col(CREAM, 220);
          g.lineWidth = 4;
          g.ellipse(0, 102, 253, 145);
          g.stroke();
          this.marble(this.ballLayer, 0, -111, 100, 51);
          this.marble(this.ballLayer, 2, 111, 110, 51);
          this.marble(this.ballLayer, 33, 12, 40, 51);
          this.button('›', 298, 0, 70, 78, () => this.navigate('gacha'));
          this.button('开始游戏', 0, -152, 386, 88, () => this.play(), true);
          this.button('收藏图鉴  ' + this.save.collection.length + '/' + (_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT), 0, -258, 386, 76, () => this.navigate('collection'));
          this.button('装扮衣橱', 0, -350, 386, 76, () => this.navigate('skins'));
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
            var y = 345 - i * 168,
                locked = i > 0 && !this.save.stars[i - 1];
            this.panel(0, y, 624, 146);
            this.label('0' + (i + 1), -243, y + 12, 38, locked ? '#afa38a' : TEAL, this.ui, 85);
            this.label(level.title, -35, y + 35, 26, INK, this.ui, 270);
            this.label("\u51FB\u51FA " + level.target + " / " + level.positions.length + " \u9897 \xB7 " + level.shots + " \u6B21\u673A\u4F1A", -32, y - 4, 18, '#857155', this.ui, 295);
            this.stars(this.save.stars[i], -35, y - 43, 13);
            this.button(locked ? '未解锁' : '挑战', 225, y, 120, 65, () => this.startLevel(i), true, this.ui, locked);
          });
          this.label('完成前一关即可解锁下一关', 0, -558, 18, '#786549');
        }

        collection() {
          this.header('弹珠图鉴', "\u5DF2\u6536\u85CF " + this.save.collection.length + " / " + (_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT) + " \xB7 \u51FB\u51FA\u5E76\u8FC7\u5173\u540E\u89E3\u9501");
          this.label('收藏品不会被消耗，也不能装备为发射球', 0, 439, 17, '#795f42');

          for (var i = 0; i < 10 && this.page * 10 + i < (_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT); i++) {
            var id = this.page * 10 + i,
                x = (i % 2 ? 1 : -1) * 159,
                y = 330 - Math.floor(i / 2) * 164;
            var owned = this.save.collection.indexOf(id) >= 0;
            this.panel(x, y, 296, 150);
            this.marble(this.ui, owned ? id : -2, x - 91, y + 10, 32);
            this.label(owned ? (_crd && marbleName === void 0 ? (_reportPossibleCrUseOfmarbleName({
              error: Error()
            }), marbleName) : marbleName)(id) : '未发现', x + 46, y + 29, 22, INK, this.ui, 170);
            this.label("#" + String(id + 1).padStart(2, '0') + "  \xB7  " + (_crd && rarity === void 0 ? (_reportPossibleCrUseOfrarity({
              error: Error()
            }), rarity) : rarity)(id), x + 46, y - 11, 17, id >= 30 ? '#93679d' : '#8f7d61', this.ui, 170);
            this.label(owned ? '已收藏' : '等待在庭院中相遇', x, y - 51, 14, '#968164', this.ui, 270);
          }

          this.button('上一页', -220, -526, 155, 60, () => {
            this.page--;
            this.render();
          }, false, this.ui, this.page === 0);
          this.label(this.page + 1 + " / " + Math.ceil((_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT) / 10), 0, -526, 23);
          this.button('下一页', 220, -526, 155, 60, () => {
            this.page++;
            this.render();
          }, false, this.ui, this.page >= Math.ceil((_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT) / 10) - 1);
        }

        skins() {
          var _ref2,
              _this2 = this;

          this.header('装扮衣橱', "\u62BD\u5956\u6536\u85CF " + this.save.rewards.length + " / " + (_crd && REWARDS === void 0 ? (_reportPossibleCrUseOfREWARDS({
            error: Error()
          }), REWARDS) : REWARDS).length);
          var tabs = [['marble', '弹珠'], ['scene', '场景'], ['trail', '轨迹']];
          tabs.forEach((_ref, i) => {
            var [kind, label] = _ref;
            return this.button(label, -210 + i * 210, 410, 180, 62, () => {
              this.wardrobeKind = kind;
              this.page = 0;
              this.render();
            }, kind === this.wardrobeKind);
          });
          var equipped = this.save.equipped[this.wardrobeKind];
          this.panel(0, 300, 312, 58);
          this.label("\u5F53\u524D\u88C5\u5907\uFF1A" + (((_ref2 = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(equipped)) == null ? void 0 : _ref2.name) || '默认'), 0, 300, 23, TEAL, this.ui, 292);
          var items = (_crd && REWARDS === void 0 ? (_reportPossibleCrUseOfREWARDS({
            error: Error()
          }), REWARDS) : REWARDS).filter(reward => reward.kind === this.wardrobeKind);

          var _loop3 = function _loop3() {
            var reward = items[_this2.page * 6 + i],
                x = (i % 2 ? 1 : -1) * 158,
                y = 175 - Math.floor(i / 2) * 170;

            var owned = _this2.save.rewards.includes(reward.id);

            _this2.panel(x, y, 298, 150);

            if (reward.kind === 'marble') {
              if (owned) _this2.rewardMarble(_this2.ui, reward, x - 91, y + 10, 32);else _this2.marble(_this2.ui, -2, x - 91, y + 10, 32);
            } else if (reward.kind === 'scene') _this2.scenePreview(reward, x - 92, y + 15, owned);else _this2.trailPreview(reward, x - 92, y + 15, owned);

            _this2.label(owned ? reward.name : '未获得', x + 53, y + 28, 20, owned ? INK : '#77756f', _this2.ui, 174);

            _this2.label(reward.rarity, x + 53, y - 9, 17, owned ? '#956a44' : '#8b8982', _this2.ui, 170);

            _this2.button(equipped === reward.id ? '已装备' : '装备', x + 54, y - 49, 128, 43, () => {
              _this2.save = (_crd && equipReward === void 0 ? (_reportPossibleCrUseOfequipReward({
                error: Error()
              }), equipReward) : equipReward)(_this2.save, reward.id);

              _this2.persist();

              _this2.render();
            }, false, _this2.ui, !owned || equipped === reward.id);
          };

          for (var i = 0; i < 6 && this.page * 6 + i < items.length; i++) {
            _loop3();
          }

          this.button('上一页', -210, -450, 150, 56, () => {
            this.page--;
            this.render();
          }, false, this.ui, this.page === 0);
          this.label(this.page + 1 + " / " + Math.ceil(items.length / 6), 0, -450, 21);
          this.button('下一页', 210, -450, 150, 56, () => {
            this.page++;
            this.render();
          }, false, this.ui, this.page >= Math.ceil(items.length / 6) - 1);
          this.button('去抽奖', 0, -543, 280, 62, () => this.navigate('gacha'), true);
        }

        scenePreview(reward, x, y, owned, parent, size) {
          if (parent === void 0) {
            parent = this.ui;
          }

          if (size === void 0) {
            size = 76;
          }

          var k = size / 76;
          var frame = this.makeNode('ScenePreview-' + reward.id, parent, x, y, size, size);
          frame.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          var base = this.graphic(frame);
          base.fillColor = col('#aaa9a0');
          base.rect(-size / 2, -size / 2, size, size);
          base.fill();
          base.fillColor = col('#d5d3c9');
          base.circle(21 * k, 18 * k, 9 * k);
          base.fill();
          base.fillColor = col('#777c78');
          base.moveTo(-38 * k, -12 * k);
          base.lineTo(-11 * k, 14 * k);
          base.lineTo(13 * k, -14 * k);
          base.lineTo(38 * k, 10 * k);
          base.lineTo(38 * k, -38 * k);
          base.lineTo(-38 * k, -38 * k);
          base.close();
          base.fill();
          if (owned) resources.load("art/gacha-scenes/" + reward.id + "/spriteFrame", SpriteFrame, (err, art) => {
            if (err || !frame.isValid) return;
            var picture = this.makeNode('SceneArt', frame, 0, 0, size, size);
            var original = art.originalSize;
            var artScale = Math.max(size / original.width, size / original.height);
            picture.getComponent(UITransform).setContentSize(original.width * artScale, original.height * artScale);
            var sprite = picture.addComponent(Sprite);
            sprite.spriteFrame = art;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          });
          var outline = this.graphic(parent);
          outline.strokeColor = col(owned ? '#b88745' : '#7d7f79');
          outline.lineWidth = 3;
          outline.roundRect(x - size / 2 - 1, y - size / 2 - 1, size + 2, size + 2, 4 * k);
          outline.stroke();
        }

        trailPreview(reward, x, y, owned, parent, scale) {
          if (parent === void 0) {
            parent = this.ui;
          }

          if (scale === void 0) {
            scale = 1;
          }

          var frame = this.makeNode('TrailPreview-' + reward.id, parent, x, y, 110 * scale, 90 * scale);
          frame.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          var layer = this.makeNode('TrailPreviewMarks', frame, 0, 0, 110 * scale, 90 * scale);
          var ball = this.marble(frame, owned ? 0 : -2, 0, 5 * scale, 23 * scale);
          var time = Number(reward.id.slice(1)) * .45;
          ball.setPosition(Math.sin(time * 2.6) * 25 * scale, 5 * scale);
          this.trailPreviews.push({
            reward,
            layer,
            ball,
            owned,
            time,
            stamp: 0,
            scale
          });
        }

        gacha() {
          this.panel(0, 485, 460, 92, this.ui, TEAL);
          this.label('星星抽奖', 0, 485, 46, CREAM);
          this.button('‹', -294, 485, 80, 76, () => this.navigate('home'));
          this.label('○  ●', 274, 425, 20, TEAL, this.ui, 90);
          this.panel(0, 365, 258, 60);
          this.label("\u5269\u4F59 " + this.save.starBalance + " \u661F", 0, 365, 27, TEAL, this.ui, 238);
          this.button('抽一次 3 星', 0, -394, 475, 87, () => this.drawGacha(), true, this.ui, this.save.starBalance < 3);
          this.button('奖励图鉴', -160, -514, 240, 64, () => this.navigate('skins'));
          this.button('概率', 160, -514, 240, 64, () => this.showModal('odds'));
          if (this.save.starBalance < 3) this.label('星星不足', 0, -580, 18, '#865d3e');
        }

        drawGacha() {
          if (this.gachaAnimation) return;
          var result = (_crd && drawReward === void 0 ? (_reportPossibleCrUseOfdrawReward({
            error: Error()
          }), drawReward) : drawReward)(this.save);
          if (!result) return;
          this.save = result.save;
          this.lastReward = result.reward;
          this.lastDrawDuplicate = result.duplicate;
          this.persist();
          this.startGachaAnimation();
        }

        startGachaAnimation() {
          this.cancelInput();
          this.modal = 'gacha-animation';
          this.hits = [];
          this.ui.getComponentsInChildren(Button).forEach(button => button.interactable = false);
          this.clear(this.overlay);
          var shade = this.graphic(this.overlay);
          shade.fillColor = col('#173637', 70);
          shade.rect(-360, -640, 720, 1280);
          shade.fill();
          var halo = this.makeNode('GachaHalo', this.overlay, 0, 60, 260, 260);
          var ring = halo.addComponent(Graphics);
          ring.fillColor = col('#ffe7a4', 55);
          ring.circle(0, 0, 103);
          ring.fill();
          ring.strokeColor = col('#ffe7a4');
          ring.lineWidth = 5;
          ring.circle(0, 0, 89);
          ring.stroke();
          ring.strokeColor = col('#85e7e2');
          ring.lineWidth = 3;
          ring.circle(0, 0, 112);
          ring.stroke();
          var haloOpacity = halo.addComponent(UIOpacity);
          haloOpacity.opacity = 0;
          var flash = this.makeNode('GachaFlash', this.overlay, 0, 60, 260, 260);
          var burst = flash.addComponent(Graphics);
          burst.fillColor = col('#fff6da');
          burst.circle(0, 0, 105);
          burst.fill();
          var flashOpacity = flash.addComponent(UIOpacity);
          flashOpacity.opacity = 0;
          var stars = [-36, 0, 36].map(x => this.starIcon(this.overlay, x, 365, 16));
          var sparks = Array.from({
            length: 12
          }, () => {
            var spark = this.starIcon(this.overlay, 0, 60, 7);
            spark.active = false;
            return spark;
          });
          this.panel(0, -394, 475, 87, this.overlay, '#aaa69c');
          this.label('抽奖中…', 0, -394, 28, CREAM, this.overlay, 450);
          this.label('点击跳过', 0, -578, 18, '#fff0c9', this.overlay);
          var skip = this.makeNode('SkipGachaAnimation', this.overlay);
          var skipArea = skip.addComponent(Graphics);
          skipArea.fillColor = col('#ffffff', 1);
          skipArea.rect(-360, -640, 720, 1280);
          skipArea.fill();
          skip.addComponent(Button).node.on(Button.EventType.CLICK, () => this.finishGachaAnimation());
          this.gachaAnimation = {
            time: 0,
            halo,
            haloOpacity,
            flash,
            flashOpacity,
            stars,
            sparks
          };
        }

        updateGachaAnimation(dt) {
          var animation = this.gachaAnimation;
          if (!animation) return;
          animation.time += Math.min(dt, .05);
          var time = animation.time;
          animation.stars.forEach((star, i) => {
            var t = Math.max(0, Math.min(1, (time - i * .08) / .5));
            star.active = t < 1;
            star.setPosition((i - 1) * 36 * (1 - t) + (i - 1) * 22 * Math.sin(Math.PI * t), 365 - 305 * t + 28 * Math.sin(Math.PI * t));
            star.setScale(1 - t * .5, 1 - t * .5, 1);
          });
          var charge = Math.max(0, Math.min(1, (time - .3) / 1.1));
          animation.haloOpacity.opacity = Math.round(charge * (155 + 45 * Math.sin(time * 19)));
          animation.halo.setScale(.75 + charge * .5, .75 + charge * .5, 1);
          var reveal = Math.max(0, Math.min(1, (time - 1.35) / .45));
          animation.flashOpacity.opacity = Math.round(190 * Math.sin(Math.PI * reveal));
          animation.flash.setScale(.5 + reveal * 1.8, .5 + reveal * 1.8, 1);
          animation.sparks.forEach((spark, i) => {
            spark.active = reveal > 0 && reveal < 1;
            var angle = i * Math.PI / 6,
                radius = 20 + reveal * 150;
            spark.setPosition(Math.cos(angle) * radius, 60 + Math.sin(angle) * radius);
            spark.setScale(1 - reveal * .7, 1 - reveal * .7, 1);
          });
          if (time >= 1.85) this.finishGachaAnimation();
        }

        finishGachaAnimation() {
          if (!this.gachaAnimation) return;
          this.gachaAnimation = null;
          this.modal = '';
          this.render();
          this.showModal('gacha-result');
        }

        updateRefundFlight(dt) {
          var flight = this.refundFlight;
          if (!flight) return;

          if (!flight.star.isValid || !flight.balance.isValid) {
            this.refundFlight = null;
            return;
          }

          flight.time += Math.min(dt, .05);
          var t = Math.min(1, flight.time / .75);
          flight.star.setPosition(-120 * (1 - t) - 40 * Math.sin(Math.PI * t), -145 + 540 * t);
          flight.star.setScale(1.15 - .35 * t, 1.15 - .35 * t, 1);

          if (t >= 1) {
            flight.star.destroy();
            this.setText(flight.balance, "\u5269\u4F59 " + this.save.starBalance + " \u661F");
            this.refundFlight = null;
          }
        }

        rewardMarble(parent, reward, x, y, radius) {
          var _GACHA_MARBLE_SOURCES;

          var n = this.makeNode('Reward-' + reward.id, parent, x, y, radius * 3, radius * 3);
          var index = Number(reward.id.slice(1)) - 1;
          var source = (_crd && MARBLE_APPEARANCES === void 0 ? (_reportPossibleCrUseOfMARBLE_APPEARANCES({
            error: Error()
          }), MARBLE_APPEARANCES) : MARBLE_APPEARANCES)[(_GACHA_MARBLE_SOURCES = GACHA_MARBLE_SOURCES[index]) != null ? _GACHA_MARBLE_SOURCES : 0];

          var style = _extends({}, source, {
            base: reward.color,
            light: reward.accent,
            accent: reward.accent
          });

          (_crd && drawMarbleAppearance === void 0 ? (_reportPossibleCrUseOfdrawMarbleAppearance({
            error: Error()
          }), drawMarbleAppearance) : drawMarbleAppearance)(n, radius, style);
          return n;
        }

        shooterMarble(parent, x, y, radius) {
          var reward = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(this.save.equipped.marble);
          return reward ? this.rewardMarble(parent, reward, x, y, radius) : this.marble(parent, 0, x, y, radius);
        }

        startLevel(index, replay) {
          var _this$model, _this$physics3;

          if (replay === void 0) {
            replay = false;
          }

          this.clearTutorial();
          var ids = replay && ((_this$model = this.model) == null ? void 0 : _this$model.levelIndex) === index ? this.model.ids : (_crd && rollMarbles === void 0 ? (_reportPossibleCrUseOfrollMarbles({
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
          this.navigate('levels');
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
          var _this3 = this;

          if (!this.tutorial || !this.model) return;
          this.board.active = false;
          this.ballLayer.active = false;
          this.ui.active = false;
          if (!this.tutorialView) this.tutorialView = new (_crd && TutorialView === void 0 ? (_reportPossibleCrUseOfTutorialView({
            error: Error()
          }), TutorialView) : TutorialView)(this.node, {
            part: function part() {
              return _this3.part(...arguments);
            },
            marble: function marble() {
              return _this3.marble(...arguments);
            },
            translate: text => (_crd && _translate === void 0 ? (_reportPossibleCrUseOftranslate({
              error: Error()
            }), _translate) : _translate)(text, this.save.language)
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
          var modal = this.tutorialReturnModal;
          this.clearTutorial();
          this.hints.clear();
          this.render();
          if (modal) this.showModal(modal);
          if (this.storageWarning) this.setText(this.hint, '教程已完成；存档不可用，本次会话有效。');
        }

        gameUI() {
          var m = this.model;
          if (!this.part('Logo', this.ui, 0, 549, 258, 114)) this.label('GULI GO!', 0, 549, 57, '#00656c');
          this.button('主页', -272, 549, 110, 61, () => this.showModal('leave'));
          this.button('暂停', 272, 549, 110, 61, () => this.showModal('pause'));
          this.button('?', 284, 345, 62, 62, () => this.startTutorial());

          if (this.artwork.LevelPlate) {
            var level = this.part('LevelPlate', this.ui, -222, 451, 208, 89);
            var target = this.part('TargetPlate', this.ui, 0, 451, 224, 89);
            var shots = this.part('ShotsPlate', this.ui, 230, 451, 208, 89);
            this.setText(level.getComponentInChildren(Label), "\u7B2C " + (m.levelIndex + 1) + " \u5173");
            this.hud = target.getComponentInChildren(Label);
            this.shotsHud = shots.getComponentInChildren(Label);
            [level, target, shots].forEach(n => {
              var l = n.getComponentInChildren(Label);
              l.fontSize = 25;
              l.lineHeight = 34;
              l.node.getComponent(UITransform).setContentSize(190, 60);
            });
          } else {
            this.panel(0, 451, 652, 89);
            this.label("\u7B2C " + (m.levelIndex + 1) + " \u5173", -230, 451, 25, INK, this.ui, 160);
            this.hud = this.label('', 85, 451, 24, INK, this.ui, 450);
          }

          this.stars(this.save.stars[m.levelIndex], 0, 365, 22);
          this.label(m.level.title, 0, 318, 18, '#82684b');
          var g = this.graphic(this.board);
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

          for (var i = 0; i < 160; i++) {
            var a = i * 2.39996,
                r = (_crd && RADIUS === void 0 ? (_reportPossibleCrUseOfRADIUS({
              error: Error()
            }), RADIUS) : RADIUS) + Math.sin(i * 43) * 4;
            g.circle(Math.cos(a) * r, 30 + Math.sin(a) * r * 0.87, 0.9);
            g.fill();
          }

          if (this.part('ChalkRing', this.board, 0, 30, 540, 470)) g.clear();
          this.aimG = this.graphic(this.ui);
          this.aimMarker = this.makeNode('AimArrow', this.ui, 0, 0, 40, 40);
          var arrow = this.aimMarker.addComponent(Graphics);
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
            this.shooterPreview = this.shooterMarble(this.ballLayer, 0, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
              error: Error()
            }), SHOOTER_Y) : SHOOTER_Y), 32);
          }

          if (m.levelIndex === 0) this.label('按住自己的弹珠后拉', 0, -220, 16, '#7c6448');
          var teaching = m.levelIndex === 0;
          this.panel(0, -525, 664, 150);
          this.hint = this.label('', 0, -420, 22);
          this.label('力度', -225, -524, 22);
          this.powerG = this.graphic(this.ui);
          this.powerText = this.label('', 220, -524, 22, TEAL, this.ui, 95);
          if (teaching) this.label('拉回起点取消', 200, -566, 16, INK, this.ui, 160);
          this.label("\u4E09\u661F \u2264 " + m.level.three + " \u6B21  \xB7  \u4E24\u661F \u2264 " + m.level.two + " \u6B21", teaching ? -100 : 0, -566, 16, '#8c7657', this.ui, teaching ? 350 : 450);
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
              var n = b.shooter ? this.shooterMarble(this.ballLayer, b.x, this.projectY(b.y), b.r) : this.marble(this.ballLayer, b.id, b.x, this.projectY(b.y), b.r);
              n.active = !b.gone;
              this.sprites.set(b, n);
            }
          });
        }

        refreshHud() {
          if (this.screen !== 'game') return;
          var m = this.model;
          this.setText(this.hud, this.shotsHud ? "\u76EE\u6807 " + m.knocked.length + "/" + m.level.target : "\u76EE\u6807 " + m.knocked.length + "/" + m.level.target + "     \u5269\u4F59 " + m.remaining + " \u6B21");
          if (this.shotsHud) this.setText(this.shotsHud, "\u5269\u4F59 " + m.remaining + " \u6B21");

          if (m.levelIndex > 0) {
            this.setText(this.hint, m.phase === 'moving' ? '弹珠滚动中…' : this.sling.pointer !== null ? '蓄力中' : '');
            return;
          }

          this.setText(this.hint, m.phase === 'moving' ? '弹珠滚动中…' : this.sling.pointer !== null ? this.sling.ready ? '松手发射 · 拉回起点取消' : '继续后拉蓄力 · 松手取消' : '按住自己的弹珠，向后拖拉');
        }

        playInvalidShotHudAnimation() {
          this.stopInvalidShotHudAnimation();
          var label = this.shotsHud || this.hud;
          this.invalidHud = {
            label,
            color: label.color.clone(),
            scale: label.node.scale.clone(),
            elapsed: 0
          };
          this.updateInvalidShotHudAnimation(0);
        }

        stopInvalidShotHudAnimation() {
          var saved = this.invalidHud;

          if (saved != null && saved.label.isValid && saved.label.node.isValid) {
            saved.label.color = saved.color;
            saved.label.node.setScale(saved.scale);
          }

          this.invalidHud = null;
        }

        updateInvalidShotHudAnimation(dt) {
          var saved = this.invalidHud;
          if (!saved || !saved.label.isValid) return;
          saved.elapsed += Math.max(0, dt);
          var t = Math.min(.5, saved.elapsed);
          var pulse = t < .13 ? 1 - (1 - t / .13) ** 2 : (1 - (t - .13) / .37) ** 2;
          saved.label.node.setScale(saved.scale.x * (1 + .3 * pulse), saved.scale.y * (1 + .3 * pulse), saved.scale.z);
          saved.label.color = Color.lerp(new Color(), col('#ed3434', saved.color.a), saved.color, Math.max(0, (t - .13) / .37));
          if (t >= .5) this.stopInvalidShotHudAnimation();
        }

        drawPower() {
          var g = this.powerG;
          g.clear();
          g.fillColor = col('#d5bc94');
          g.roundRect(-110, -537, 220, 26, 13);
          g.fill();
          var fill = 220 * this.power / 100;
          g.fillColor = col(TEAL);
          g.rect(-110, -537, fill, 26);
          g.fill();
          this.powerText.string = this.power + ' / 100';
        }

        drawAim() {
          var g = this.aimG;
          g.clear();
          var active = this.model.phase === 'aim' && this.sling.pointer !== null && this.sling.ready;
          if (this.aimMarker) this.aimMarker.active = active;
          if (!active) return;
          var sx = this.sling.x,
              sy = this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y) + this.sling.y;
          var groundPull = this.sling.y / (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
            error: Error()
          }), GROUND_Y_SCALE) : GROUND_Y_SCALE);
          var prediction = (_crd && predictAim === void 0 ? (_reportPossibleCrUseOfpredictAim({
            error: Error()
          }), predictAim) : predictAim)(sx, (_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y) + groundPull, -sx, -groundPull, this.power, this.model.balls, this.physics.config.linearDamping);

          if (!prediction) {
            if (this.aimMarker) this.aimMarker.active = false;
            return;
          }

          var ex = prediction.x,
              ey = this.projectY(prediction.y);
          var length = Math.hypot(ex - sx, ey - sy);

          if (length < 1) {
            if (this.aimMarker) this.aimMarker.active = false;
            return;
          }

          var dx = (ex - sx) / length,
              dy = (ey - sy) / length; // Read-only first-contact prediction; Box2D still owns actual motion and collisions.

          g.strokeColor = col(TEAL, 220);
          g.lineWidth = 5;

          for (var t = 32; t < length - 24; t += 22) {
            var end = Math.min(t + 13, length - 24);
            g.moveTo(sx + dx * t, sy + dy * t);
            g.lineTo(sx + dx * end, sy + dy * end);
            g.stroke();
          }

          if (this.aimMarker) {
            this.aimMarker.setPosition(ex, ey);
            this.aimMarker.angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;
            var scale = Math.min(1, length / 32);
            this.aimMarker.setScale(scale, scale, 1);
          }
        }

        marble(parent, id, x, y, r) {
          var appearance = (_crd && MARBLE_APPEARANCES === void 0 ? (_reportPossibleCrUseOfMARBLE_APPEARANCES({
            error: Error()
          }), MARBLE_APPEARANCES) : MARBLE_APPEARANCES)[id];

          if (appearance) {
            var prototype = this.makeNode('Marble-' + id, parent, x, y, r * 3, r * 3);
            (_crd && drawMarbleAppearance === void 0 ? (_reportPossibleCrUseOfdrawMarbleAppearance({
              error: Error()
            }), drawMarbleAppearance) : drawMarbleAppearance)(prototype, r, appearance);
            return prototype;
          }

          var n = this.makeNode('Marble-' + id, parent, x, y, r * 3, r * 3);
          var g = n.addComponent(Graphics);
          g.fillColor = col('#604a29', 40);
          g.ellipse(r * 0.2, -r * 0.52, r * 1.07, r * 0.66);
          g.fill();
          var base = col(id === -2 ? '#9d9b8e' : PALETTE[Math.max(0, id) % 10]);

          for (var i = 0; i < 18; i++) {
            var t = i / 18;
            g.fillColor = new Color(Math.min(255, base.r * (0.33 + t * 0.84)), Math.min(255, base.g * (0.33 + t * 0.84)), Math.min(255, base.b * (0.33 + t * 0.84)), 255);
            g.circle(-r * t * 0.15, r * t * 0.12, r * (1 - t * 0.36));
            g.fill();
          }

          if (id !== -2) {
            var motif = Math.floor(Math.max(id, 0) / 10);
            g.lineWidth = r * 0.14;
            g.strokeColor = col('#c9f8ff', 130);

            for (var j = 0; j < 2 + motif % 3; j++) {
              var off = (j - 1) * r * 0.25;
              g.moveTo(-r * 0.72, -r * 0.1 + off);
              g.bezierCurveTo(r * 0.8, -r * 0.9, -r * 0.65, r * 0.9, r * 0.62, r * 0.25 + off);
              g.stroke();
            }

            if (motif === 2 || motif === 4) {
              g.fillColor = col('#ffefbe', 190);

              for (var _j = 0; _j < 9; _j++) {
                var a = _j * 2.4;
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
            var sx = r * 0.87,
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

          this.clock += dt;
          this.updateTrail(dt);
          if (this.gachaAnimation) this.updateGachaAnimation(dt);
          if (this.refundFlight) this.updateRefundFlight(dt);
          if (this.screen === 'skins' && this.wardrobeKind === 'trail' && !this.modal || this.modal === 'gacha-result') this.updateTrailPreviews(dt);

          if (this.tutorial) {
            var _this$tutorialView4;

            if (!this.musicHidden) (_this$tutorialView4 = this.tutorialView) == null || _this$tutorialView4.update(dt);
            return;
          }

          this.updateInvalidShotHudAnimation(dt);
          if (this.screen !== 'game' || this.modal || this.tutorial && this.musicHidden || !this.model) return;
          (_this$tutorialView5 = this.tutorialView) == null || _this$tutorialView5.update(dt);
          var m = this.model;
          this.updateHints(dt);

          if (m.phase === 'moving') {
            var hit = this.physics.advance(dt);

            if (hit) {
              this.sound('hit');
              this.physics.contactPoints.forEach(p => this.emitCollision(p.x, this.projectY(p.y)));
            }

            this.sprites.forEach((n, b) => {
              n.active = !b.gone;
              n.setPosition(b.x, this.projectY(b.y));
            });
            var shooter = m.balls.find(b => b.shooter && !b.gone);
            if (shooter && Math.hypot(shooter.vx, shooter.vy) > 30) this.emitTrail(shooter, dt);
            this.refreshHud();

            if (m.phase !== 'moving') {
              this.render();
              if (m.levelIndex === 0) this.hints.resolved(m);
              this.updateHints(0);
              if (m.lastShotInvalid) this.playInvalidShotHudAnimation();

              if ((m.phase === 'won' || m.phase === 'lost') && !this.resultHandled) {
                this.resultHandled = true;
                var previous = this.save.collection.length;
                var firstClear = m.phase === 'won' && this.save.stars[m.levelIndex] === 0;
                this.save = (_crd && award === void 0 ? (_reportPossibleCrUseOfaward({
                  error: Error()
                }), award) : award)(this.save, m);
                this.newItems = this.save.collection.length - previous;
                this.earnedStars = firstClear ? m.stars : 0;

                if (m.phase === 'won') {
                  this.persist();
                  this.sound('win');
                }

                this.showModal('result');
              }
            }
          }
        }

        updateTrailPreviews(dt) {
          var step = Math.min(dt, .05);

          for (var preview of this.trailPreviews) {
            var previous = preview.ball.position.x;
            preview.time += step;
            var x = Math.sin(preview.time * 2.6) * 25 * preview.scale;
            preview.ball.setPosition(x, 5 * preview.scale);
            preview.ball.angle -= (x - previous) / (23 * preview.scale) * 180 / Math.PI;
            preview.stamp += step;
            if (preview.stamp < .1 || Math.abs(Math.cos(preview.time * 2.6)) < .2) continue;
            preview.stamp = 0;
            var direction = Math.sign(Math.cos(preview.time * 2.6));
            this.emitTrailMark(preview.reward, preview.layer, x - direction * 24 * preview.scale, 5 * preview.scale, direction, 0, .55 * preview.scale, !preview.owned);
          }
        }

        emitTrail(shooter, dt) {
          var reward = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(this.save.equipped.trail);
          if (!reward) return;
          this.trailClock += dt;
          if (this.trailClock < .045) return;
          this.trailClock = 0;
          this.emitTrailMark(reward, this.trailLayer, shooter.x, this.projectY(shooter.y), shooter.vx, shooter.vy * (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
            error: Error()
          }), GROUND_Y_SCALE) : GROUND_Y_SCALE));
        }

        emitTrailMark(reward, parent, x, y, vx, vy, scale, muted) {
          if (scale === void 0) {
            scale = 1;
          }

          if (muted === void 0) {
            muted = false;
          }

          if (this.trailMarks.length >= 28) {
            var oldest = this.trailMarks.shift();
            oldest.node.destroy();
          }

          var n = this.makeNode('Trail-' + reward.id, parent, x, y, 42, 42);
          n.setScale(scale, scale, 1);
          var index = Number(reward.id.slice(1));

          if (reward.id === 'T05' && this.flowerTrailFrame && !muted) {
            var angle = Math.atan2(vy, vx);
            n.setPosition(x - Math.cos(angle) * 32 * scale, y - Math.sin(angle) * 32 * scale);
            n.angle = angle * 180 / Math.PI;
            n.getComponent(UITransform).setContentSize(100, 36);
            var sprite = n.addComponent(Sprite);
            sprite.spriteFrame = this.flowerTrailFrame;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          } else {
            var g = n.addComponent(Graphics);
            g.strokeColor = col(muted ? '#6e7472' : reward.accent, 220);
            g.fillColor = col(muted ? '#7c817d' : reward.color, 210);
            g.lineWidth = 3;

            if ([3, 6].includes(index)) {
              g.circle(0, 0, 8 + index);
              g.stroke();
            } else if ([2, 5, 8].includes(index)) {
              for (var i = 0; i < 3; i++) {
                var a = i * Math.PI * 2 / 3;
                g.ellipse(Math.cos(a) * 8, Math.sin(a) * 8, 5, 9);
                g.fill();
              }
            } else if (index === 9) {
              g.moveTo(-18, -9);
              g.bezierCurveTo(-2, 15, 4, -15, 18, 9);
              g.stroke();
              g.moveTo(-18, 9);
              g.bezierCurveTo(-2, -15, 4, 15, 18, -9);
              g.stroke();
            } else if (index === 10) {
              g.moveTo(-12, -10);
              g.lineTo(1, 18);
              g.lineTo(12, -6);
              g.lineTo(0, 2);
              g.close();
              g.fill();
            } else if (index === 7) {
              for (var _i = 0; _i < 4; _i++) {
                var _a = _i * Math.PI / 2;

                g.moveTo(Math.cos(_a) * 8, Math.sin(_a) * 8);
                g.lineTo(Math.cos(_a) * 20, Math.sin(_a) * 20);
                g.stroke();
              }
            } else {
              for (var _i2 = 0; _i2 < 4; _i2++) {
                g.circle((_i2 % 2 ? 1 : -1) * (4 + _i2 * 3), (_i2 - 1.5) * 6, 2 + _i2 % 2);
                g.fill();
              }
            }
          }

          var opacity = n.addComponent(UIOpacity);
          opacity.opacity = 210;
          this.trailMarks.push({
            node: n,
            opacity,
            age: 0,
            life: index >= 8 ? .75 : .5
          });
        }

        updateTrail(dt) {
          this.trailMarks = this.trailMarks.filter(mark => {
            mark.age += dt;

            if (mark.age >= mark.life || !mark.node.isValid) {
              if (mark.node.isValid) mark.node.destroy();
              return false;
            }

            mark.opacity.opacity = Math.round(210 * (1 - mark.age / mark.life));
            return true;
          });
        }

        emitCollision(x, y) {
          var reward = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(this.save.equipped.trail);
          if (!reward) return;

          if (this.trailMarks.length >= 28) {
            var oldest = this.trailMarks.shift();
            oldest.node.destroy();
          }

          var n = this.makeNode('Collision-' + reward.id, this.trailLayer, x, y, 70, 70);
          var g = n.addComponent(Graphics);
          g.strokeColor = col(reward.accent, 240);
          g.fillColor = col(reward.color, 210);
          g.lineWidth = 4;
          var index = Number(reward.id.slice(1));

          if ([3, 6].includes(index)) {
            for (var radius of [15, 29]) {
              g.circle(0, 0, radius);
              g.stroke();
            }
          } else if ([2, 5, 8].includes(index)) {
            for (var i = 0; i < 6; i++) {
              var a = i * Math.PI / 3;
              g.ellipse(Math.cos(a) * 23, Math.sin(a) * 23, 6, 12);
              g.fill();
            }
          } else if ([7, 10].includes(index)) {
            for (var _i3 = 0; _i3 < 6; _i3++) {
              var _a2 = _i3 * Math.PI / 3;

              g.moveTo(Math.cos(_a2) * 12, Math.sin(_a2) * 12);
              g.lineTo(Math.cos(_a2 + .22) * 34, Math.sin(_a2 + .22) * 34);
              g.lineTo(Math.cos(_a2 + .45) * 20, Math.sin(_a2 + .45) * 20);
              g.close();
              g.fill();
            }
          } else if (index === 9) {
            for (var _i4 = 0; _i4 < 3; _i4++) {
              var _a3 = _i4 * Math.PI * 2 / 3;

              g.moveTo(Math.cos(_a3) * 10, Math.sin(_a3) * 10);
              g.bezierCurveTo(Math.cos(_a3 + .6) * 38, Math.sin(_a3 + .6) * 38, Math.cos(_a3 - .6) * 38, Math.sin(_a3 - .6) * 38, Math.cos(_a3) * 26, Math.sin(_a3) * 26);
              g.stroke();
            }
          } else {
            for (var _i5 = 0; _i5 < 6; _i5++) {
              var _a4 = _i5 * Math.PI / 3;

              g.moveTo(Math.cos(_a4) * 14, Math.sin(_a4) * 14);
              g.lineTo(Math.cos(_a4) * 29, Math.sin(_a4) * 29);
              g.stroke();
              g.circle(Math.cos(_a4) * 32, Math.sin(_a4) * 32, 3);
              g.fill();
            }
          }

          var opacity = n.addComponent(UIOpacity);
          opacity.opacity = 220;
          this.trailMarks.push({
            node: n,
            opacity,
            age: 0,
            life: .35
          });
        }

        updateHints(dt) {
          var _this$hintLayer2, _this$hintLayer3, _m$lastShotReport;

          var m = this.model;
          if (!m || this.tutorial) return;

          if (m.levelIndex > 0) {
            this.hints.clear();
            return;
          }

          var had = this.hints.reason;
          this.hints.tick(dt, m.phase === 'aim' && this.sling.pointer === null);
          if (had && !this.hints.reason && m.phase === 'aim' && m.remaining <= 2) this.hints.show('low');
          var reason = this.hints.reason;
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
          var g = this.graphic(this.hintLayer);
          g.strokeColor = col(GOLD);
          g.lineWidth = 3;
          if (['idle', 'wrong'].includes(reason)) this.drawGuideCircle(g, 0, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
            error: Error()
          }), SHOOTER_Y) : SHOOTER_Y), 44, 44);

          if (reason === 'targetOnly' && (_m$lastShotReport = m.lastShotReport) != null && _m$lastShotReport.shooter) {
            var previous = m.lastShotReport.shooter;
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
          var segments = Math.max(16, Math.ceil(2 * Math.PI * Math.max(rx, ry) / 16));

          for (var i = 0; i < segments; i++) {
            var start = i / segments * Math.PI * 2;

            for (var j = 0; j <= 4; j++) {
              var a = start + j / 4 * .58 / segments * Math.PI * 2;
              var px = x + Math.cos(a) * rx,
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
          this.refundFlight = null;
          this.clear(this.overlay);
          this.ui.getComponentsInChildren(Button).forEach(b => b.interactable = false);
          var shade = this.graphic(this.overlay);
          shade.fillColor = col('#142f32', 150);
          shade.rect(-360, -640, 720, 1280);
          shade.fill();
          shade.node.addComponent(BlockInputEvents);
          var completed = kind === 'result' && ((_this$model2 = this.model) == null ? void 0 : _this$model2.phase) === 'won';
          if (kind !== 'gacha-result') this.panel(0, completed ? -40 : 0, 600, completed ? 730 : 650, this.overlay);
          var m = this.model;

          if (kind === 'odds') {
            this.label('抽奖概率', 0, 220, 35, INK, this.overlay);
            (_crd && RARITIES === void 0 ? (_reportPossibleCrUseOfRARITIES({
              error: Error()
            }), RARITIES) : RARITIES).forEach((rarity, i) => this.label(rarity + "  \xB7  " + ['50%', '35%', '12.5%', '2%', '0.5%'][i], 0, 135 - i * 65, 24, INK, this.overlay));
            this.label('可能抽到重复奖励；重复时返还 1 星', 0, -238, 18, '#857155', this.overlay, 510);
            this.button('返回', 0, -310, 260, 65, () => {
              this.modal = '';
              this.render();
            }, true, this.overlay);
            return;
          }

          if (kind === 'gacha-result' && this.lastReward) {
            var reward = this.lastReward;
            var rarityColor = RARITY_COLORS[reward.rarity] || TEAL;
            this.panel(0, 505, 440, 78, this.overlay, TEAL);
            this.label('星星抽奖', 0, 505, 38, CREAM, this.overlay);
            this.panel(0, 395, 250, 56, this.overlay);
            this.starIcon(this.overlay, -91, 395, 15);
            var balance = this.label("\u5269\u4F59 " + (this.save.starBalance - (this.lastDrawDuplicate ? 1 : 0)) + " \u661F", 16, 395, 25, TEAL, this.overlay, 205);
            this.panel(0, -5, 600, 700, this.overlay);
            var border = this.graphic(this.overlay);
            border.strokeColor = col(GOLD);
            border.lineWidth = 3;
            border.roundRect(-291, -347, 582, 684, 26);
            border.stroke();
            this.starIcon(this.overlay, 0, 295, 16);
            this.label(this.lastDrawDuplicate ? '重复奖励' : '获得新奖励！', 0, 245, 36, INK, this.overlay);
            var aura = this.graphic(this.overlay);
            aura.fillColor = col(rarityColor, 30);
            aura.circle(0, 95, 105);
            aura.fill();
            aura.strokeColor = col(rarityColor);
            aura.lineWidth = 4;
            aura.circle(0, 95, 91);
            aura.stroke();
            if (reward.kind === 'marble') this.rewardMarble(this.overlay, reward, 0, 95, 68);
            if (reward.kind === 'scene') this.scenePreview(reward, 0, 95, true, this.overlay, 145);
            if (reward.kind === 'trail') this.trailPreview(reward, 0, 95, true, this.overlay, 1.7);
            this.label(reward.name, 0, -35, 30, TEAL, this.overlay, 510);
            this.label(reward.rarity, 0, -87, 24, rarityColor, this.overlay);

            if (this.lastDrawDuplicate) {
              this.label('已返还 1 星', 0, -145, 23, '#936b33', this.overlay);
              this.refundFlight = {
                time: 0,
                star: this.starIcon(this.overlay, -120, -145, 16),
                balance
              };
            }

            this.button('立即装备', -140, -265, 245, 68, () => {
              this.save = (_crd && equipReward === void 0 ? (_reportPossibleCrUseOfequipReward({
                error: Error()
              }), equipReward) : equipReward)(this.save, reward.id);
              this.persist();
              this.wardrobeKind = reward.kind;
              this.navigate('skins');
            }, true, this.overlay);
            this.button('继续', 140, -265, 245, 68, () => {
              this.modal = '';
              this.render();
            }, false, this.overlay);
            return;
          }

          if (kind === 'result') {
            var won = m.phase === 'won';
            this.label(won ? '漂亮的一击！' : '次数已用完', 0, 236, 38, INK, this.overlay, 520);
            this.stars(m.stars, 0, 148, 32, this.overlay);
            this.label("\u51FB\u51FA " + m.knocked.length + " \u9897 \xB7 \u4F7F\u7528 " + m.used + " \u6B21\u5C04\u51FB", 0, 62, 24, INK, this.overlay, 530);
            this.label(won ? "\u65B0\u6536\u85CF +" + this.newItems + "  \xB7  \u9996\u901A\u661F\u661F +" + this.earnedStars + "  \xB7  \u6700\u4F73 " + this.save.stars[m.levelIndex] + " \u661F" : '目标尚未完成，本次挑战失败。', 0, 7, 20, '#87704f', this.overlay, 540);
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
            sys.localStorage.setItem('guli.save.v3', JSON.stringify(this.save));
            this.storageWarning = false;
          } catch (_unused2) {
            this.storageWarning = true;
          }
        }

        sound(name) {
          if (this.save.sound && this.clips[name]) this.audio.playOneShot(this.clips[name], name === 'hit' ? 0.22 : 0.36);
        }

        syncMusic() {
          var source = this.music;
          if (!source) return;

          if (!this.enabledInHierarchy || !this.musicUnlocked || this.musicHidden || !this.save.sound) {
            source.pause();
            return;
          }

          var clip = this.musicClips[this.screen === 'game' ? 'bgm_gameplay' : 'bgm_main_menu'];

          if (source.clip !== clip) {
            source.stop();
            source.clip = clip || null;
          }

          if (clip && !source.playing) source.play();
        }

        point(e) {
          var p = e.getUILocation(),
              local = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(p.x, p.y, 0));
          return local.multiplyScalar(1 / this.safeScale);
        }

        contains(h, x, y) {
          return Math.abs(x - h.x) <= h.w / 2 && Math.abs(y - h.y) <= h.h / 2;
        }

        down(pointer, x, y) {
          var _this$model3;

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

          if ((this.screen === 'home' || this.screen === 'gacha') && y > -100 && y < 300) {
            this.navSwipe = {
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
          var _this$navSwipe, _this$model4;

          if (this.tutorial) {
            var swipe = this.tutorialSwipe;
            this.tutorialSwipe = null;

            if ((swipe == null ? void 0 : swipe.pointer) === pointer && Math.abs(x - swipe.x) > 70 && Math.abs(x - swipe.x) > Math.abs(y - swipe.y) * 1.5) {
              if (x < swipe.x) this.tutorial.advancePage();else this.tutorial.previous();
              this.refreshTutorial();
            }

            return;
          }

          if (((_this$navSwipe = this.navSwipe) == null ? void 0 : _this$navSwipe.pointer) === pointer) {
            var _swipe = this.navSwipe;
            this.navSwipe = null;

            if (!this.modal && Math.abs(x - _swipe.x) > 80 && Math.abs(x - _swipe.x) > Math.abs(y - _swipe.y) * 1.3) {
              if (this.screen === 'home' && x < _swipe.x) this.navigate('gacha');else if (this.screen === 'gacha' && x > _swipe.x) this.navigate('home');
            }

            return;
          }

          if (this.sling.pointer !== pointer) return;
          var shot = this.sling.release(pointer, x, y);

          if (!shot || this.modal || this.screen !== 'game' || ((_this$model4 = this.model) == null ? void 0 : _this$model4.phase) !== 'aim') {
            this.cancelInput();
            return;
          }

          var groundY = shot.y / (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
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
          this.navSwipe = null;
          this.sling.cancel();
          if (this.screen === 'game' && ((_this$model5 = this.model) == null ? void 0 : _this$model5.phase) === 'aim' && (_this$shooterPreview2 = this.shooterPreview) != null && _this$shooterPreview2.isValid) this.updatePull();
        }

        touchDown(e) {
          this.lastTouch = Date.now();
          var p = this.point(e);
          this.down('touch:' + e.getID(), p.x, p.y);
        }

        touchMove(e) {
          this.lastTouch = Date.now();
          var p = this.point(e);
          this.move('touch:' + e.getID(), p.x, p.y);
        }

        touchUp(e) {
          this.lastTouch = Date.now();
          var p = this.point(e);
          this.up('touch:' + e.getID(), p.x, p.y);
        }

        touchCancel(e) {
          var _this$tutorialSwipe, _this$navSwipe2;

          this.lastTouch = Date.now();
          if (((_this$tutorialSwipe = this.tutorialSwipe) == null ? void 0 : _this$tutorialSwipe.pointer) === 'touch:' + e.getID()) this.tutorialSwipe = null;
          if (((_this$navSwipe2 = this.navSwipe) == null ? void 0 : _this$navSwipe2.pointer) === 'touch:' + e.getID()) this.navSwipe = null;
          if (this.sling.pointer === 'touch:' + e.getID()) this.cancelInput();
        }

        mouseDown(e) {
          if (e.getButton() === 2) {
            this.cancelInput();
            return;
          }

          if (Date.now() - this.lastTouch < 600 || e.getButton() !== 0) return;
          var p = this.point(e);
          this.down('mouse', p.x, p.y);
        }

        mouseMove(e) {
          if (Date.now() - this.lastTouch < 600) return;
          var p = this.point(e);
          this.move('mouse', p.x, p.y);
        }

        mouseUp(e) {
          if (Date.now() - this.lastTouch < 600 || e.getButton() !== 0) return;
          var p = this.point(e);
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