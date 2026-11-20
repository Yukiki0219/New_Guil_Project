System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "cc/env", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, translate, LanguageSwitch, _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, input, Input, KeyCode, view, ResolutionPolicy, resources, SpriteFrame, Sprite, Mask, sys, AudioSource, AudioClip, Canvas, Camera, profiler, Prefab, instantiate, Button, BlockInputEvents, UIOpacity, game, Game, GameModel, MARBLE_COUNT, LEVELS, RADIUS, SHOOTER_Y, cleanSave, award, rollMarbles, marbleName, rarity, GuliPhysics, PREVIEW, Slingshot, GROUND_Y_SCALE, predictAim, MARBLE_APPEARANCES, drawMarbleAppearance, Tutorial, TutorialView, GameHints, HINT_TEXT, REWARDS, RARITIES, drawReward, equipReward, rewardById, _dec, _class, _crd, ccclass, CREAM, INK, TEAL, GOLD, RARITY_COLORS, PALETTE, GACHA_MARBLE_SOURCES, GuliGame;

  function col(hex, alpha = 255) {
    const c = new Color();
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
      translate = _unresolved_2.translate;
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
        constructor(...args) {
          super(...args);
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
          this.volumeDrag = null;
          this.volumeSliders = {};
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
          this.trailLast = null;
          this.lastLargeCollision = -Infinity;
          this.trailPreviews = [];
          this.sceneSprite = void 0;
          this.sceneFallback = void 0;
          this.sceneArtId = '';
          this.skinTestMode = false;
          this.testSkinIds = {};
          this.flowerTrailFrame = null;
          this.trailArt = {};
          this.storageWarning = false;
          this.artwork = {};
          this.aimMarker = null;
          this.shotsHud = null;
          this.invalidHud = null;
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

          this.skinTestMode = PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliSceneTest') === '1';
          view.setDesignResolutionSize(720, 1280, ResolutionPolicy.SHOW_ALL);
          view.resizeWithBrowserSize(true);
          view.on('canvas-resize', this.resizeUI, this);
          const camera = (_this$node$getCompone = this.node.getComponent(Canvas)) == null ? void 0 : _this$node$getCompone.cameraComponent;
          if (camera) camera.projection = Camera.ProjectionType.ORTHO;
          profiler.hideStats();

          try {
            let raw = null;

            for (const key of ['guli.save.v4', 'guli.save.v3', 'guli.save.v2', 'guli.save.v1']) {
              try {
                const value = sys.localStorage.getItem(key);

                if (value) {
                  raw = JSON.parse(value);
                  if (raw) break;
                }
              } catch {
                /* Try an older intact save. */
              }
            }

            this.save = (_crd && cleanSave === void 0 ? (_reportPossibleCrUseOfcleanSave({
              error: Error()
            }), cleanSave) : cleanSave)(raw);
            if (raw && raw.version !== 4) this.persist();
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

          for (const name of ['bgm_menu_new', 'bgm_game_new', 'bgm_draw_new']) resources.load('audio/' + name, AudioClip, (err, clip) => {
            if (!this.isValid) return;

            if (err) {
              console.warn('Background music load failed: ' + name, err);
              return;
            }

            this.musicClips[name] = clip;
            this.syncMusic();
          });

          for (const name of ['hit', 'shoot', 'win', 'ui_navigation', 'ui_selection', 'ui_confirm', 'ui_draw', 'ui_reward']) resources.load('audio/' + name, AudioClip, (err, clip) => {
            if (!err) this.clips[name] = clip;
          });

          const back = this.makeNode('Courtyard', this.node, 0, 0, 720, 1280);
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

          for (const [key, name] of [['T08', 'firefly-trail'], ['T09', 'koi-trail'], ['T10', 'phoenix-trail'], ['T09-impact', 'koi-impact'], ['T10-impact', 'phoenix-impact']]) {
            resources.load(`art/trails/${name}/spriteFrame`, SpriteFrame, (err, frame) => {
              if (!err && this.isValid) this.trailArt[key] = frame;
            });
          }

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

        refreshSceneArt() {
          const id = this.screen === 'gacha' ? 'gacha-page' : this.equippedId('scene') || 'default';
          if (id === this.sceneArtId) return;
          this.sceneArtId = id;
          const path = id === 'default' ? 'art/courtyard/spriteFrame' : id === 'gacha-page' ? 'art/gacha-page/spriteFrame' : `art/gacha-scenes/${id}/spriteFrame`;
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

        label(text, x, y, size = 24, color = INK, parent = this.ui, width = 640, height = size * 2.4) {
          const n = this.makeNode(text.slice(0, 24), parent, x, y, width, height);
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

        sceneTextColor(y) {
          const scene = this.equippedId('scene');
          return scene === 'S05' && y >= 470 || scene === 'S03' && y >= 520 ? CREAM : INK;
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

        button(text, x, y, w, h, action, primary = false, parent = this.ui, disabled = false, sound = 'ui_navigation') {
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
          n.on(Button.EventType.CLICK, () => {
            this.sound(sound);
            action();
          }); // Native Button owns click dispatch; global input only uses these rectangles to exclude aiming.

          this.hits.push({
            x,
            y,
            w: partName ? size : w,
            h: partName ? size : h,
            action: () => {}
          });
        }

        starIcon(parent, x, y, radius) {
          const n = this.makeNode('GachaStar', parent, x, y, radius * 2, radius * 2);
          const g = n.addComponent(Graphics);
          g.fillColor = col('#ffca58');
          g.strokeColor = col('#fff6d2');
          g.lineWidth = 2;

          for (let i = 0; i < 10; i++) {
            const a = Math.PI / 2 + i * Math.PI / 5,
                  r = i % 2 ? radius * .46 : radius;
            if (i) g.lineTo(Math.cos(a) * r, Math.sin(a) * r);else g.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          }

          g.close();
          g.fill();
          g.stroke();
          return n;
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

          const levelPage = screen === 'levels' && this.screen === 'game' && this.model ? Math.floor(this.model.levelIndex / 5) : 0;
          this.cancelInput();
          this.screen = screen;
          this.modal = '';
          this.page = levelPage;
          this.render();
        }

        header(title, subtitle) {
          this.label(title, 0, 538, 45, this.sceneTextColor(538), this.ui, 470, 64);
          this.label(subtitle, 0, 487, 18, this.sceneTextColor(487), this.ui, 510, 35);
          this.button('返回', -270, 557, 110, 54, () => this.navigate('home'));
        }

        render() {
          var _this$tutorialView, _this$hintLayer;

          this.refundFlight = null;
          this.volumeSliders = {};
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
          this.trailLast = null;
          this.lastLargeCollision = -Infinity;
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
          const rect = sys.getSafeAreaRect(),
                size = view.getVisibleSize(); // Symmetric margins keep all existing board coordinates and input aligned.

          const insetX = Math.max(0, rect.x, size.width - rect.x - rect.width);
          const insetY = Math.max(0, rect.y, size.height - rect.y - rect.height);
          this.safeScale = Math.min(1, Math.max(1, size.width - insetX * 2) / 720, Math.max(1, size.height - insetY * 2) / 1280);

          for (const root of [this.board, this.trailLayer, this.ballLayer, this.ui, this.overlay, (_this$tutorialView2 = this.tutorialView) == null ? void 0 : _this$tutorialView2.root]) {
            var _this$tutorialView2;

            root == null || root.setScale(this.safeScale, this.safeScale, 1);
          }
        }

        home() {
          if (!this.part('Logo', this.ui, 0, 444, 402, 178)) this.label('GULI GO!', 3, 442, 108, '#00646a');
          this.label('一颗弹珠，一整个童年', 0, 334, 25, INK, this.ui, 470, 46);
          this.label('庭 院 弹 珠', 0, 558, 22, this.equippedId('scene') === 'S04' ? CREAM : this.sceneTextColor(558), this.ui, 340, 36);
          const languageSwitch = this.makeNode('LanguageSwitch', this.ui, 215, 602, 340, 60);
          languageSwitch.setScale(0.65, 0.65, 1);
          languageSwitch.addComponent(_crd && LanguageSwitch === void 0 ? (_reportPossibleCrUseOfLanguageSwitch({
            error: Error()
          }), LanguageSwitch) : LanguageSwitch).setup(this.save.language, language => {
            this.sound('ui_selection');
            this.setLanguage(language);
          });
          const g = this.graphic(this.board);
          g.strokeColor = col(CREAM, 220);
          g.lineWidth = 4;
          g.ellipse(0, 102, 253, 145);
          g.stroke();
          this.marble(this.ballLayer, 0, -111, 100, 51);
          this.marble(this.ballLayer, 2, 111, 110, 51);
          this.marble(this.ballLayer, 33, 12, 40, 51);
          this.button('›', 298, 0, 70, 78, () => this.navigate('gacha'));
          this.button('开始游戏', 0, -152, 386, 88, () => this.play(), true, this.ui, false, 'ui_confirm');
          this.button('收藏图鉴  ' + this.save.collection.length + '/' + (_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT), 0, -258, 386, 76, () => this.navigate('collection'));
          this.button('装扮衣橱', 0, -350, 386, 76, () => this.navigate('skins'));
          this.button('声音设置', 0, -535, 280, 54, () => this.showModal('sound-settings'), false, this.ui, false, 'ui_selection');
          this.button('新手教学 / Help', 0, -442, 386, 64, () => this.startTutorial());
          this.label(this.storageWarning ? '存档不可用：本次进度仅保留在当前会话' : '本地单机  /  进度自动保存', 0, -585, 15, INK, this.ui, 480, 31);
        }

        levels() {
          this.header('庭院挑战', '用更少的射击，留下更好的成绩');
          const highest = this.save.stars.reduce((last, stars, i) => stars ? i : last, -1);
          (_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
            error: Error()
          }), LEVELS) : LEVELS).slice(this.page * 5, this.page * 5 + 5).forEach((level, row) => {
            const i = this.page * 5 + row;
            const y = 345 - row * 168,
                  locked = i > highest + 1;
            this.panel(0, y, 624, 146);
            this.label(String(i + 1).padStart(2, '0'), -243, y + 12, 38, locked ? '#afa38a' : TEAL, this.ui, 85);
            this.label(level.title, -35, y + 35, 26, INK, this.ui, 270);
            this.label(`击出 ${level.target} / ${level.positions.length} 颗 · ${level.shots} 次机会`, -32, y - 4, 18, '#857155', this.ui, 295);
            this.stars(this.save.stars[i], -35, y - 43, 13);
            this.button(locked ? '未解锁' : '挑战', 225, y, 120, 65, () => this.startLevel(i), true, this.ui, locked, 'ui_confirm');
          });
          this.button('上一页', -220, -510, 155, 60, () => {
            this.page--;
            this.render();
          }, false, this.ui, this.page === 0);
          this.label(`${this.page + 1} / ${Math.ceil((_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
            error: Error()
          }), LEVELS) : LEVELS).length / 5)}`, 0, -510, 23);
          this.button('下一页', 220, -510, 155, 60, () => {
            this.page++;
            this.render();
          }, false, this.ui, this.page >= Math.ceil((_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
            error: Error()
          }), LEVELS) : LEVELS).length / 5) - 1);
          this.label('完成前一关即可解锁下一关', 0, -580, 18, INK, this.ui, 440, 34);
        }

        collection() {
          this.header('弹珠图鉴', `已收藏 ${this.save.collection.length} / ${_crd && MARBLE_COUNT === void 0 ? (_reportPossibleCrUseOfMARBLE_COUNT({
            error: Error()
          }), MARBLE_COUNT) : MARBLE_COUNT} · 击出并过关后解锁`);
          this.label('收藏品不会被消耗，也不能装备为发射球', 0, 439, 17, INK, this.ui, 590, 32);

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
            }), marbleName) : marbleName)(id) : '未发现', x + 46, y + 34, 22, INK, this.ui, 170, 62);
            this.label(`#${String(id + 1).padStart(2, '0')}  ·  ${(_crd && rarity === void 0 ? (_reportPossibleCrUseOfrarity({
              error: Error()
            }), rarity) : rarity)(id)}`, x + 46, y - 15, 17, id >= 30 ? '#755080' : '#715b40', this.ui, 170);
            this.label(owned ? '已收藏' : '等待在庭院中相遇', x, y - 51, 14, '#68543a', this.ui, 270);
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
          var _ref;

          this.header('装扮衣橱', this.skinTestMode ? '皮肤测试 · 不保存' : `抽奖收藏 ${this.save.rewards.length} / ${(_crd && REWARDS === void 0 ? (_reportPossibleCrUseOfREWARDS({
            error: Error()
          }), REWARDS) : REWARDS).length}`);
          const tabs = [['marble', '弹珠'], ['scene', '场景'], ['trail', '轨迹']];
          tabs.forEach(([kind, label], i) => this.button(label, -210 + i * 210, 410, 180, 62, () => {
            this.wardrobeKind = kind;
            this.page = 0;
            this.render();
          }, kind === this.wardrobeKind, this.ui, false, 'ui_selection'));
          const equipped = this.equippedId(this.wardrobeKind);
          this.panel(0, 300, 520, 58);
          this.label(`${this.skinTestMode ? '当前预览' : '当前装备'}：${((_ref = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(equipped)) == null ? void 0 : _ref.name) || '默认'}`, 0, 300, 23, TEAL, this.ui, 490, 52);
          const items = (_crd && REWARDS === void 0 ? (_reportPossibleCrUseOfREWARDS({
            error: Error()
          }), REWARDS) : REWARDS).filter(reward => reward.kind === this.wardrobeKind);

          for (let i = 0; i < 6 && this.page * 6 + i < items.length; i++) {
            const reward = items[this.page * 6 + i],
                  x = (i % 2 ? 1 : -1) * 158,
                  y = 175 - Math.floor(i / 2) * 170;
            const owned = this.save.rewards.includes(reward.id);
            const visible = owned || this.skinTestMode;
            this.panel(x, y, 298, 150);

            if (reward.kind === 'marble') {
              if (visible) this.rewardMarble(this.ui, reward, x - 91, y + 10, 32);else this.marble(this.ui, -2, x - 91, y + 10, 32);
            } else if (reward.kind === 'scene') this.scenePreview(reward, x - 92, y + 15, visible);else this.trailPreview(reward, x - 92, y + 15, visible);

            this.label(visible ? reward.name : '未获得', x + 53, y + 34, 20, visible ? INK : '#66615a', this.ui, 174, 62);
            this.label(reward.rarity, x + 53, y - 16, 16, visible ? '#76502f' : '#6b655d', this.ui, 170);
            this.button(this.skinTestMode ? equipped === reward.id ? '试用中' : '试用' : equipped === reward.id ? '已装备' : '装备', x + 54, y - 49, 128, 43, () => {
              if (this.skinTestMode) this.testSkinIds[reward.kind] = reward.id;else {
                this.save = (_crd && equipReward === void 0 ? (_reportPossibleCrUseOfequipReward({
                  error: Error()
                }), equipReward) : equipReward)(this.save, reward.id);
                this.persist();
              }
              this.render();
            }, false, this.ui, !visible || equipped === reward.id, 'ui_selection');
          }

          this.button('上一页', -210, -450, 150, 56, () => {
            this.page--;
            this.render();
          }, false, this.ui, this.page === 0);
          this.label(`${this.page + 1} / ${Math.ceil(items.length / 6)}`, 0, -450, 21);
          this.button('下一页', 210, -450, 150, 56, () => {
            this.page++;
            this.render();
          }, false, this.ui, this.page >= Math.ceil(items.length / 6) - 1);
          if (this.skinTestMode) this.button('恢复正式皮肤', 0, -543, 280, 62, () => {
            delete this.testSkinIds[this.wardrobeKind];
            this.render();
          }, true, this.ui, !this.testSkinIds[this.wardrobeKind]);else this.button('去抽奖', 0, -543, 280, 62, () => this.navigate('gacha'), true);
        }

        equippedId(kind) {
          return this.skinTestMode ? this.testSkinIds[kind] || this.save.equipped[kind] : this.save.equipped[kind];
        }

        scenePreview(reward, x, y, owned, parent = this.ui, size = 76) {
          const k = size / 76;
          const frame = this.makeNode('ScenePreview-' + reward.id, parent, x, y, size, size);
          frame.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          const base = this.graphic(frame);
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
          if (owned) resources.load(`art/gacha-scenes/${reward.id}/spriteFrame`, SpriteFrame, (err, art) => {
            if (err || !frame.isValid) return;
            const picture = this.makeNode('SceneArt', frame, 0, 0, size, size);
            const original = art.originalSize;
            const artScale = Math.max(size / original.width, size / original.height);
            picture.getComponent(UITransform).setContentSize(original.width * artScale, original.height * artScale);
            const sprite = picture.addComponent(Sprite);
            sprite.spriteFrame = art;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          });
          const outline = this.graphic(parent);
          outline.strokeColor = col(owned ? '#b88745' : '#7d7f79');
          outline.lineWidth = 3;
          outline.roundRect(x - size / 2 - 1, y - size / 2 - 1, size + 2, size + 2, 4 * k);
          outline.stroke();
        }

        trailPreview(reward, x, y, owned, parent = this.ui, scale = 1) {
          const frame = this.makeNode('TrailPreview-' + reward.id, parent, x, y, 110 * scale, 90 * scale);
          frame.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          const layer = this.makeNode('TrailPreviewMarks', frame, 0, 0, 110 * scale, 90 * scale);
          const ball = this.marble(frame, owned ? 0 : -2, 0, 5 * scale, 23 * scale);
          const time = Number(reward.id.slice(1)) * .45;
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
          this.label(`剩余 ${this.save.starBalance} 星`, 0, 365, 27, TEAL, this.ui, 238);
          this.button('抽一次 3 星', 0, -394, 475, 87, () => this.drawGacha(), true, this.ui, this.save.starBalance < 3, 'ui_draw');
          this.button('奖励图鉴', -160, -514, 240, 64, () => this.navigate('skins'));
          this.button('概率', 160, -514, 240, 64, () => this.showModal('odds'));
          if (this.save.starBalance < 3) this.label('星星不足', 0, -580, 18, INK, this.ui, 250, 34);
        }

        drawGacha() {
          if (this.gachaAnimation) return;
          const result = (_crd && drawReward === void 0 ? (_reportPossibleCrUseOfdrawReward({
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
          const shade = this.graphic(this.overlay);
          shade.fillColor = col('#173637', 70);
          shade.rect(-360, -640, 720, 1280);
          shade.fill();
          const halo = this.makeNode('GachaHalo', this.overlay, 0, 60, 260, 260);
          const ring = halo.addComponent(Graphics);
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
          const haloOpacity = halo.addComponent(UIOpacity);
          haloOpacity.opacity = 0;
          const flash = this.makeNode('GachaFlash', this.overlay, 0, 60, 260, 260);
          const burst = flash.addComponent(Graphics);
          burst.fillColor = col('#fff6da');
          burst.circle(0, 0, 105);
          burst.fill();
          const flashOpacity = flash.addComponent(UIOpacity);
          flashOpacity.opacity = 0;
          const stars = [-36, 0, 36].map(x => this.starIcon(this.overlay, x, 365, 16));
          const sparks = Array.from({
            length: 12
          }, () => {
            const spark = this.starIcon(this.overlay, 0, 60, 7);
            spark.active = false;
            return spark;
          });
          this.panel(0, -394, 475, 87, this.overlay, '#aaa69c');
          this.label('抽奖中…', 0, -394, 28, CREAM, this.overlay, 450);
          this.label('点击跳过', 0, -578, 18, '#fff0c9', this.overlay);
          const skip = this.makeNode('SkipGachaAnimation', this.overlay);
          const skipArea = skip.addComponent(Graphics);
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
          const animation = this.gachaAnimation;
          if (!animation) return;
          animation.time += Math.min(dt, .05);
          const time = animation.time;
          animation.stars.forEach((star, i) => {
            const t = Math.max(0, Math.min(1, (time - i * .08) / .5));
            star.active = t < 1;
            star.setPosition((i - 1) * 36 * (1 - t) + (i - 1) * 22 * Math.sin(Math.PI * t), 365 - 305 * t + 28 * Math.sin(Math.PI * t));
            star.setScale(1 - t * .5, 1 - t * .5, 1);
          });
          const charge = Math.max(0, Math.min(1, (time - .3) / 1.1));
          animation.haloOpacity.opacity = Math.round(charge * (155 + 45 * Math.sin(time * 19)));
          animation.halo.setScale(.75 + charge * .5, .75 + charge * .5, 1);
          const reveal = Math.max(0, Math.min(1, (time - 1.35) / .45));
          animation.flashOpacity.opacity = Math.round(190 * Math.sin(Math.PI * reveal));
          animation.flash.setScale(.5 + reveal * 1.8, .5 + reveal * 1.8, 1);
          animation.sparks.forEach((spark, i) => {
            spark.active = reveal > 0 && reveal < 1;
            const angle = i * Math.PI / 6,
                  radius = 20 + reveal * 150;
            spark.setPosition(Math.cos(angle) * radius, 60 + Math.sin(angle) * radius);
            spark.setScale(1 - reveal * .7, 1 - reveal * .7, 1);
          });
          if (time >= 1.85) this.finishGachaAnimation();
        }

        finishGachaAnimation() {
          if (!this.gachaAnimation) return;
          this.sound('ui_reward');
          this.gachaAnimation = null;
          this.modal = '';
          this.render();
          this.showModal('gacha-result');
        }

        updateRefundFlight(dt) {
          const flight = this.refundFlight;
          if (!flight) return;

          if (!flight.star.isValid || !flight.balance.isValid) {
            this.refundFlight = null;
            return;
          }

          flight.time += Math.min(dt, .05);
          const t = Math.min(1, flight.time / .75);
          flight.star.setPosition(-120 * (1 - t) - 40 * Math.sin(Math.PI * t), -145 + 540 * t);
          flight.star.setScale(1.15 - .35 * t, 1.15 - .35 * t, 1);

          if (t >= 1) {
            flight.star.destroy();
            this.setText(flight.balance, `剩余 ${this.save.starBalance} 星`);
            this.refundFlight = null;
          }
        }

        rewardMarble(parent, reward, x, y, radius) {
          var _GACHA_MARBLE_SOURCES;

          const n = this.makeNode('Reward-' + reward.id, parent, x, y, radius * 3, radius * 3);
          const index = Number(reward.id.slice(1)) - 1;
          const source = (_crd && MARBLE_APPEARANCES === void 0 ? (_reportPossibleCrUseOfMARBLE_APPEARANCES({
            error: Error()
          }), MARBLE_APPEARANCES) : MARBLE_APPEARANCES)[(_GACHA_MARBLE_SOURCES = GACHA_MARBLE_SOURCES[index]) != null ? _GACHA_MARBLE_SOURCES : 0];
          const style = { ...source,
            base: reward.color,
            light: reward.accent,
            accent: reward.accent
          };
          (_crd && drawMarbleAppearance === void 0 ? (_reportPossibleCrUseOfdrawMarbleAppearance({
            error: Error()
          }), drawMarbleAppearance) : drawMarbleAppearance)(n, radius, style);
          return n;
        }

        shooterMarble(parent, x, y, radius) {
          const reward = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(this.equippedId('marble'));
          return reward ? this.rewardMarble(parent, reward, x, y, radius) : this.marble(parent, 0, x, y, radius);
        }

        startLevel(index, replay = false) {
          var _this$model, _this$physics3;

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
            }), translate) : translate)(text, this.save.language),
            playSound: name => this.sound(name)
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
          this.label(m.level.title, 0, 318, 18, INK, this.ui, 390, 34);
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
            this.shooterPreview = this.shooterMarble(this.ballLayer, 0, this.projectY(_crd && SHOOTER_Y === void 0 ? (_reportPossibleCrUseOfSHOOTER_Y({
              error: Error()
            }), SHOOTER_Y) : SHOOTER_Y), 32);
          }

          const teaching = m.levelIndex === 0;
          this.panel(0, -525, 664, 150);
          this.hint = this.label('', 0, -420, 22, INK, this.ui, 620, 55);
          this.label('力度', -225, -524, 22);
          this.powerG = this.graphic(this.ui);
          this.powerText = this.label('', 220, -524, 22, TEAL, this.ui, 95);
          if (teaching) this.label('拉回起点取消', 200, -566, 16, INK, this.ui, 160);
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
              const n = b.shooter ? this.shooterMarble(this.ballLayer, b.x, this.projectY(b.y), b.r) : this.marble(this.ballLayer, b.id, b.x, this.projectY(b.y), b.r);
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
          const m = this.model;
          this.updateHints(dt);

          if (m.phase === 'moving') {
            const hit = this.physics.advance(dt);

            if (hit) {
              this.sound('hit');
              this.physics.contactPoints.forEach(p => this.emitCollision(p.x, this.projectY(p.y)));
            }

            this.sprites.forEach((n, b) => {
              n.active = !b.gone;
              n.setPosition(b.x, this.projectY(b.y));
            });
            const shooter = m.balls.find(b => b.shooter && !b.gone);
            if (shooter && Math.hypot(shooter.vx, shooter.vy) > 30) this.emitTrail(shooter, dt);
            this.refreshHud();

            if (m.phase !== 'moving') {
              this.render();
              if (m.levelIndex === 0) this.hints.resolved(m);
              this.updateHints(0);
              if (m.lastShotInvalid) this.playInvalidShotHudAnimation();

              if ((m.phase === 'won' || m.phase === 'lost') && !this.resultHandled) {
                this.resultHandled = true;
                const previous = this.save.collection.length;
                const gained = Math.max(0, m.stars - this.save.stars[m.levelIndex]);
                this.save = (_crd && award === void 0 ? (_reportPossibleCrUseOfaward({
                  error: Error()
                }), award) : award)(this.save, m);
                this.newItems = this.save.collection.length - previous;
                this.earnedStars = gained;

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
          const step = Math.min(dt, .05);

          for (const preview of this.trailPreviews) {
            const previous = preview.ball.position.x;
            preview.time += step;
            const x = Math.sin(preview.time * 2.6) * 25 * preview.scale;
            preview.ball.setPosition(x, 5 * preview.scale);
            preview.ball.angle -= (x - previous) / (23 * preview.scale) * 180 / Math.PI;
            preview.stamp += step;
            if (preview.stamp < .1 || Math.abs(Math.cos(preview.time * 2.6)) < .2) continue;
            preview.stamp = 0;
            const direction = Math.sign(Math.cos(preview.time * 2.6));
            this.emitTrailMark(preview.reward, preview.layer, x - direction * 24 * preview.scale, 5 * preview.scale, direction, 0, .55 * preview.scale, !preview.owned);
          }
        }

        emitTrail(shooter, dt) {
          const reward = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(this.equippedId('trail'));
          if (!reward) return;
          this.trailClock += dt;
          if (this.trailClock < .045) return;
          const x = shooter.x,
                y = this.projectY(shooter.y);
          const spacing = [30, 40, 50, 65, 70][(_crd && RARITIES === void 0 ? (_reportPossibleCrUseOfRARITIES({
            error: Error()
          }), RARITIES) : RARITIES).indexOf(reward.rarity)];
          if (this.trailLast && Math.hypot(x - this.trailLast.x, y - this.trailLast.y) < spacing) return;
          this.trailClock = 0;
          this.trailLast = {
            x,
            y
          };
          this.emitTrailMark(reward, this.trailLayer, x, y, shooter.vx, shooter.vy * (_crd && GROUND_Y_SCALE === void 0 ? (_reportPossibleCrUseOfGROUND_Y_SCALE({
            error: Error()
          }), GROUND_Y_SCALE) : GROUND_Y_SCALE));
        }

        emitTrailMark(reward, parent, x, y, vx, vy, scale = 1, muted = false) {
          if (this.trailMarks.length >= 96) {
            const oldest = this.trailMarks.shift();
            oldest.node.destroy();
          }

          const n = this.makeNode('Trail-' + reward.id, parent, x, y, 140, 80);
          n.setScale(scale, scale, 1);
          const index = Number(reward.id.slice(1));
          const tier = (_crd && RARITIES === void 0 ? (_reportPossibleCrUseOfRARITIES({
            error: Error()
          }), RARITIES) : RARITIES).indexOf(reward.rarity);
          const angle = Math.atan2(vy, vx);
          n.angle = angle * 180 / Math.PI;
          const art = !muted && this.trailArt[reward.id];

          if (art) {
            const size = index === 10 ? 140 : index === 9 ? 125 : 137;
            n.angle = 0;
            const sprite = n.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = art;
            n.getComponent(UITransform).setContentSize(size, size * art.originalSize.height / art.originalSize.width);
            const opacity = n.addComponent(UIOpacity);
            opacity.opacity = 255;
            this.trailMarks.push({
              node: n,
              opacity,
              age: 0,
              life: [.45, .65, .8, .95, 1.1][tier]
            });
            return;
          }

          const g = n.addComponent(Graphics);
          const base = muted ? '#737a78' : reward.color;
          const highlight = muted ? '#a3aaa6' : reward.accent;
          const length = Math.min(120, Math.max(26, Math.hypot(vx, vy) * .065));
          g.strokeColor = col(highlight, muted ? 110 : 235);
          g.fillColor = col(base, muted ? 110 : 225);
          g.lineWidth = tier >= 1 ? 3 : 2;

          if (reward.id === 'T05' && this.flowerTrailFrame && !muted) {
            const flower = this.makeNode('Petal', n, -32, 0, 100, 36);
            const sprite = flower.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.flowerTrailFrame;
            flower.getComponent(UITransform).setContentSize(100, 36);
          } else if (!muted) {
            if (index === 1) {
              for (let i = 0; i < 10; i++) {
                const a = Math.PI / 2 + i * Math.PI / 5,
                      r = i % 2 ? 4 : 10;
                if (i) g.lineTo(Math.cos(a) * r, Math.sin(a) * r);else g.moveTo(Math.cos(a) * r, Math.sin(a) * r);
              }

              g.close();
              g.stroke();
            } else if (index === 2) {
              g.moveTo(-11, -4);
              g.quadraticCurveTo(1, 14, 13, 5);
              g.quadraticCurveTo(4, -12, -11, -4);
              g.fill();
            } else if (index === 3) {
              g.moveTo(0, 13);
              g.bezierCurveTo(15, -4, 10, -12, 0, -12);
              g.bezierCurveTo(-10, -12, -15, -4, 0, 13);
              g.fill();
            } else if (index === 4) {
              for (const [px, py, r] of [[-9, 3, 3], [2, -5, 4], [10, 5, 2]]) {
                g.circle(px, py, r);
                g.fill();
              }
            } else if ([3, 6].includes(index)) {
              g.circle(0, 0, 8 + index);
              g.stroke();
            } else if ([5, 8].includes(index)) {
              for (let i = 0; i < 3; i++) {
                const a = i * Math.PI * 2 / 3;
                g.ellipse(Math.cos(a) * 8, Math.sin(a) * 8, 5, 9);
                g.fill();
              }
            } else if (index === 9) {
              for (const side of [-1, 1]) {
                g.moveTo(-length, side * 9);
                g.bezierCurveTo(-length * .65, side * 27, -length * .3, -side * 19, 0, side * 8);
                g.stroke();
              }
            } else if (index === 10) {
              for (let i = 0; i < 3; i++) {
                const px = -length * (i + .25) / 3;
                g.moveTo(px - 13, 0);
                g.quadraticCurveTo(px - 2, 24 + i * 5, px + 10, 1);
                g.quadraticCurveTo(px - 2, 9, px - 13, 0);
                g.fill();
              }
            } else if (index === 7) {
              g.moveTo(-10, -7);
              g.quadraticCurveTo(-3, 10, 2, 18);
              g.quadraticCurveTo(6, 5, 11, -7);
              g.quadraticCurveTo(0, -14, -10, -7);
              g.fill();
            } else {
              for (let i = 0; i < 4; i++) {
                g.circle((i % 2 ? 1 : -1) * (4 + i * 3), (i - 1.5) * 6, 2 + i % 2);
                g.fill();
              }
            }
          }

          const opacity = n.addComponent(UIOpacity);
          opacity.opacity = muted ? 135 : 255;
          this.trailMarks.push({
            node: n,
            opacity,
            age: 0,
            life: muted ? .45 : [.45, .65, .8, .95, 1.1][tier]
          });
        }

        updateTrail(dt) {
          this.trailMarks = this.trailMarks.filter(mark => {
            mark.age += dt;

            if (mark.age >= mark.life || !mark.node.isValid) {
              if (mark.node.isValid) mark.node.destroy();
              return false;
            }

            mark.opacity.opacity = Math.round(mark.opacity.opacity * (1 - dt / (mark.life - mark.age + dt)));
            return true;
          });
        }

        emitCollision(x, y) {
          const reward = (_crd && rewardById === void 0 ? (_reportPossibleCrUseOfrewardById({
            error: Error()
          }), rewardById) : rewardById)(this.equippedId('trail'));
          if (!reward) return;

          if ((_crd && RARITIES === void 0 ? (_reportPossibleCrUseOfRARITIES({
            error: Error()
          }), RARITIES) : RARITIES).indexOf(reward.rarity) >= 3) {
            if (this.clock - this.lastLargeCollision < .3) return;
            this.lastLargeCollision = this.clock;
          }

          if (this.trailMarks.length >= 96) {
            const oldest = this.trailMarks.shift();
            oldest.node.destroy();
          }

          const n = this.makeNode('Collision-' + reward.id, this.trailLayer, x, y, 70, 70);
          const art = this.trailArt[reward.id + '-impact'] || reward.id === 'T08' && this.trailArt.T08;

          if (art) {
            const size = reward.id === 'T10' ? 300 : reward.id === 'T09' ? 240 : 208;
            const sprite = n.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = art;
            n.getComponent(UITransform).setContentSize(size, size * art.originalSize.height / art.originalSize.width);
            const opacity = n.addComponent(UIOpacity);
            opacity.opacity = 255;
            this.trailMarks.push({
              node: n,
              opacity,
              age: 0,
              life: reward.id === 'T10' ? 1.1 : .8
            });
            return;
          }

          const g = n.addComponent(Graphics);
          g.strokeColor = col(reward.accent, 240);
          g.fillColor = col(reward.color, 210);
          g.lineWidth = 4;
          const index = Number(reward.id.slice(1));
          const tier = (_crd && RARITIES === void 0 ? (_reportPossibleCrUseOfRARITIES({
            error: Error()
          }), RARITIES) : RARITIES).indexOf(reward.rarity);

          if (tier >= 2) {
            g.strokeColor = col(reward.accent, tier >= 4 ? 110 : 65);
            g.lineWidth = tier >= 4 ? 13 : 8;
            g.circle(0, 0, tier >= 4 ? 42 : 36);
            g.stroke();
            g.strokeColor = col(reward.accent, 240);
            g.lineWidth = 4;
          }

          if (tier === 0) {
            g.circle(0, 0, 13);
            g.stroke();
          } else if ([3, 6].includes(index)) {
            for (const radius of [15, 29]) {
              g.circle(0, 0, radius);
              g.stroke();
            }
          } else if ([2, 5, 8].includes(index)) {
            for (let i = 0; i < 6; i++) {
              const a = i * Math.PI / 3;
              g.ellipse(Math.cos(a) * 23, Math.sin(a) * 23, 6, 12);
              g.fill();
            }
          } else if ([7, 10].includes(index)) {
            for (let i = 0; i < 6; i++) {
              const a = i * Math.PI / 3;
              g.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
              g.lineTo(Math.cos(a + .22) * 34, Math.sin(a + .22) * 34);
              g.lineTo(Math.cos(a + .45) * 20, Math.sin(a + .45) * 20);
              g.close();
              g.fill();
            }
          } else if (index === 9) {
            for (let i = 0; i < 3; i++) {
              const a = i * Math.PI * 2 / 3;
              g.moveTo(Math.cos(a) * 10, Math.sin(a) * 10);
              g.bezierCurveTo(Math.cos(a + .6) * 38, Math.sin(a + .6) * 38, Math.cos(a - .6) * 38, Math.sin(a - .6) * 38, Math.cos(a) * 26, Math.sin(a) * 26);
              g.stroke();
            }
          } else {
            for (let i = 0; i < 6; i++) {
              const a = i * Math.PI / 3;
              g.moveTo(Math.cos(a) * 14, Math.sin(a) * 14);
              g.lineTo(Math.cos(a) * 29, Math.sin(a) * 29);
              g.stroke();
              g.circle(Math.cos(a) * 32, Math.sin(a) * 32, 3);
              g.fill();
            }
          }

          const opacity = n.addComponent(UIOpacity);
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
            this.label('上次停留位置', previous.x, this.projectY(previous.y) + 52, 18, INK, this.hintLayer, 210, 34);
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
          this.refundFlight = null;
          this.clear(this.overlay);
          this.volumeSliders = {};
          this.ui.getComponentsInChildren(Button).forEach(b => b.interactable = false);
          const shade = this.graphic(this.overlay);
          shade.fillColor = col('#142f32', 150);
          shade.rect(-360, -640, 720, 1280);
          shade.fill();
          shade.node.addComponent(BlockInputEvents);
          const completed = kind === 'result' && ((_this$model2 = this.model) == null ? void 0 : _this$model2.phase) === 'won';
          if (kind !== 'gacha-result') this.panel(0, completed ? -40 : 0, 600, completed ? 730 : 650, this.overlay);

          if (kind === 'sound-settings') {
            this.label('声音设置', 0, 220, 39, INK, this.overlay);
            ['music', 'effects'].forEach((volume, i) => {
              const y = 75 - i * 150;
              this.panel(0, y, 580, 104, this.overlay);
              this.label(volume === 'music' ? '背景音乐' : '音效', volume === 'music' ? -197 : -190, y, volume === 'music' ? 21 : 20, INK, this.overlay, 145);
              const track = this.graphic(this.overlay);
              track.fillColor = col('#cbb797');
              track.roundRect(-95, y - 10, 200, 20, 10);
              track.fill();
              const fill = this.graphic(this.overlay);
              const knob = this.makeNode('VolumeThumb-' + volume, this.overlay, 0, y, 44, 44);
              const g = knob.addComponent(Graphics);
              g.fillColor = col(TEAL);
              g.strokeColor = col('#e0a13d');
              g.lineWidth = 5;
              g.circle(0, 0, 19);
              g.fill();
              g.stroke();
              const value = this.label('', 175, y, 24, TEAL, this.overlay, 65);
              this.volumeSliders[volume] = {
                fill,
                knob,
                value,
                y
              };
              this.paintVolume(volume);
              const inputArea = this.makeNode('VolumeInput-' + volume, this.overlay, 5, y, 270, 70);
              inputArea.on(Node.EventType.TOUCH_START, this.touchDown, this);
              inputArea.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
              inputArea.on(Node.EventType.TOUCH_END, this.touchUp, this);
              inputArea.on(Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
              inputArea.on(Node.EventType.MOUSE_DOWN, this.mouseDown, this);
              inputArea.on(Node.EventType.MOUSE_MOVE, this.mouseMove, this);
              inputArea.on(Node.EventType.MOUSE_UP, this.mouseUp, this);
            });
            this.button('完成', 0, -235, 400, 76, () => {
              this.modal = '';
              this.render();
            }, true, this.overlay, false, 'ui_confirm');
            return;
          }

          const m = this.model;

          if (kind === 'odds') {
            this.label('抽奖概率', 0, 220, 35, INK, this.overlay);
            (_crd && RARITIES === void 0 ? (_reportPossibleCrUseOfRARITIES({
              error: Error()
            }), RARITIES) : RARITIES).forEach((rarity, i) => this.label(`${rarity}  ·  ${['50%', '35%', '12.5%', '2%', '0.5%'][i]}`, 0, 135 - i * 65, 24, INK, this.overlay));
            this.label('可能抽到重复奖励；重复时返还 1 星', 0, -238, 18, '#857155', this.overlay, 510);
            this.button('返回', 0, -310, 260, 65, () => {
              this.modal = '';
              this.render();
            }, true, this.overlay);
            return;
          }

          if (kind === 'gacha-result' && this.lastReward) {
            const reward = this.lastReward;
            const rarityColor = RARITY_COLORS[reward.rarity] || TEAL;
            this.panel(0, 505, 440, 78, this.overlay, TEAL);
            this.label('星星抽奖', 0, 505, 38, CREAM, this.overlay);
            this.panel(0, 395, 250, 56, this.overlay);
            this.starIcon(this.overlay, -91, 395, 15);
            const balance = this.label(`剩余 ${this.save.starBalance - (this.lastDrawDuplicate ? 1 : 0)} 星`, 16, 395, 25, TEAL, this.overlay, 205);
            this.panel(0, -5, 600, 700, this.overlay);
            const border = this.graphic(this.overlay);
            border.strokeColor = col(GOLD);
            border.lineWidth = 3;
            border.roundRect(-291, -347, 582, 684, 26);
            border.stroke();
            this.starIcon(this.overlay, 0, 295, 16);
            this.label(this.lastDrawDuplicate ? '重复奖励' : '获得新奖励！', 0, 245, 36, INK, this.overlay);
            const aura = this.graphic(this.overlay);
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
            }, true, this.overlay, false, 'ui_selection');
            this.button('继续', 140, -265, 245, 68, () => {
              this.modal = '';
              this.render();
            }, false, this.overlay);
            return;
          }

          if (kind === 'result') {
            const won = m.phase === 'won';
            this.label(won ? '漂亮的一击！' : '次数已用完', 0, 236, 38, INK, this.overlay, 520);
            this.stars(m.stars, 0, 148, 32, this.overlay);
            this.label(`击出 ${m.knocked.length} 颗 · 使用 ${m.used} 次射击`, 0, 62, 24, INK, this.overlay, 530);
            this.label(won ? `新收藏 +${this.newItems}  ·  成绩星星 +${this.earnedStars}  ·  最佳 ${this.save.stars[m.levelIndex]} 星` : '目标尚未完成，本次挑战失败。', 0, 0, 20, INK, this.overlay, 540, 58);
            this.button(won && m.levelIndex < (_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
              error: Error()
            }), LEVELS) : LEVELS).length - 1 ? '下一关' : '返回关卡', 0, -87, 440, 75, () => won && m.levelIndex < (_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
              error: Error()
            }), LEVELS) : LEVELS).length - 1 ? this.startLevel(m.levelIndex + 1) : this.navigate('levels'), true, this.overlay, false, won && m.levelIndex < (_crd && LEVELS === void 0 ? (_reportPossibleCrUseOfLEVELS({
              error: Error()
            }), LEVELS) : LEVELS).length - 1 ? 'ui_confirm' : 'ui_navigation');
            this.button('再试一次', 0, -181, 440, 70, () => this.startLevel(m.levelIndex, true), false, this.overlay, false, 'ui_confirm');
            if (won) this.button('回到主菜单', 0, -275, 440, 70, () => this.navigate('home'), false, this.overlay);
            if (!won) this.button('查看教程', 0, -267, 250, 54, () => this.startTutorial(), false, this.overlay);
            if (won) this.label(this.storageWarning ? '存档暂不可用，请勿关闭当前会话' : won ? '星级与收藏已保存' : '调整角度，试试一次撞出多颗', 0, -352, 18, INK, this.overlay, 530);
          } else {
            this.label('休息一下', 0, 220, 39, INK, this.overlay);
            this.label('弹珠已暂停，准备好再继续', 0, 133, 22, '#867053', this.overlay);

            if (!this.tutorial) {
              [['三星', m.level.three], ['两星', m.level.two], ['一星', m.level.shots]].forEach(([tier, limit], i) => {
                const available = m.phase !== 'lost' && m.used <= limit;
                const y = 82 - i * 44;
                this.starIcon(this.overlay, -190, y, 18).addComponent(UIOpacity).opacity = available ? 255 : 70;
                this.label(`${tier}：${limit} 次内完成目标`, 47, y, 22, available ? INK : '#b7aa95', this.overlay, 410);
              });
            }

            const buttonY = this.tutorial ? [15, -85, -184] : [-85, -175, -265];
            this.button('继续游戏', 0, buttonY[0], 430, 80, () => {
              this.modal = '';
              this.render();
            }, true, this.overlay, false, 'ui_confirm');
            this.button('重玩本关', 0, buttonY[1], 430, 74, () => this.showActionConfirmation('restart', () => {
              if (this.tutorial) {
                this.modal = '';
                this.clear(this.overlay);

                if (this.tutorial.step === 'PRACTICE' || this.tutorial.step === 'RETRY') {
                  this.tutorial.step = 'PRACTICE';
                  this.resetTutorialBoard();
                } else this.startTutorial();
              } else this.startLevel(m.levelIndex, true);
            }), false, this.overlay, false, 'ui_confirm');
            this.button('返回主页', 0, buttonY[2], 430, 74, () => this.showActionConfirmation('home', () => this.navigate('home')), false, this.overlay);
          }
        }

        showActionConfirmation(action, confirm) {
          this.overlay.getComponentsInChildren(Button).forEach(b => b.interactable = false);
          const dialog = this.makeNode('ActionConfirmation', this.overlay);
          const shade = this.graphic(dialog);
          shade.fillColor = col('#142f32', 160);
          shade.rect(-360, -640, 720, 1280);
          shade.fill();
          shade.node.addComponent(BlockInputEvents);
          this.panel(0, 0, 600, 310, dialog);
          const border = this.graphic(dialog);
          border.strokeColor = col('#df994a');
          border.lineWidth = 3;
          border.roundRect(-294, -149, 588, 298, 20);
          border.stroke();
          this.label(action === 'home' ? '确定返回主页？' : '确定重玩本关？', 0, 80, 34, INK, dialog, 500);
          this.label('本局未结算的进度不会保存', 0, 10, 22, '#867053', dialog, 500);
          this.button('取消', -142, -88, 270, 66, () => this.showModal(this.modal), true, dialog);
          this.button(action === 'home' ? '确认返回主页' : '确认重玩', 142, -88, 270, 66, confirm, false, dialog, false, 'ui_confirm');
        }

        paintVolume(kind) {
          const row = this.volumeSliders[kind];
          if (!row) return;
          const volume = kind === 'music' ? this.save.musicVolume : this.save.effectsVolume;
          row.fill.clear();

          if (volume > 0) {
            const width = 200 * volume;
            row.fill.fillColor = col(TEAL);
            row.fill.roundRect(-95, row.y - 10, width, 20, Math.min(10, width / 2));
            row.fill.fill();
          }

          row.knob.setPosition(-95 + 200 * volume, row.y);
          this.setText(row.value, `${Math.round(volume * 100)}%`);
        }

        setVolume(kind, x) {
          const volume = Math.round(Math.max(0, Math.min(1, (x + 95) / 200)) * 100) / 100;
          if (kind === 'music') this.save.musicVolume = volume;else this.save.effectsVolume = volume;
          this.save.sound = this.save.musicVolume > 0 || this.save.effectsVolume > 0;
          this.paintVolume(kind);
          if (kind === 'music') this.syncMusic();
        }

        persist() {
          try {
            sys.localStorage.setItem('guli.save.v4', JSON.stringify(this.save));
            this.storageWarning = false;
          } catch {
            this.storageWarning = true;
          }
        }

        sound(name) {
          if (this.save.effectsVolume > 0 && this.clips[name]) this.audio.playOneShot(this.clips[name], (name === 'hit' ? 0.22 : 0.36) * this.save.effectsVolume);
        }

        syncMusic() {
          const source = this.music;
          if (!source) return;

          if (!this.enabledInHierarchy || !this.musicUnlocked || this.musicHidden || this.save.musicVolume <= 0) {
            source.pause();
            return;
          }

          source.volume = (this.screen === 'game' || this.screen === 'gacha' ? 0.22 : 0.5) * this.save.musicVolume;
          const clip = this.musicClips[this.screen === 'game' ? 'bgm_game_new' : this.screen === 'gacha' ? 'bgm_draw_new' : 'bgm_menu_new'];

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

          this.musicUnlocked = true;
          this.syncMusic();

          if (this.modal === 'sound-settings') {
            if (!this.volumeDrag && x >= -120 && x <= 130) {
              const kind = Math.abs(y - 75) <= 52 ? 'music' : Math.abs(y + 75) <= 52 ? 'effects' : null;

              if (kind) {
                this.volumeDrag = {
                  pointer,
                  kind
                };
                this.setVolume(kind, x);
              }
            }

            return;
          }

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
          var _this$volumeDrag;

          if (((_this$volumeDrag = this.volumeDrag) == null ? void 0 : _this$volumeDrag.pointer) === pointer) {
            this.setVolume(this.volumeDrag.kind, x);
            return;
          }

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
          var _this$volumeDrag2, _this$navSwipe, _this$model4;

          if (((_this$volumeDrag2 = this.volumeDrag) == null ? void 0 : _this$volumeDrag2.pointer) === pointer) {
            const kind = this.volumeDrag.kind;
            this.setVolume(kind, x);
            this.volumeDrag = null;
            this.persist();
            if (kind === 'effects') this.sound('ui_selection');
            return;
          }

          if (this.modal === 'sound-settings') return;

          if (this.tutorial) {
            const swipe = this.tutorialSwipe;
            this.tutorialSwipe = null;

            if ((swipe == null ? void 0 : swipe.pointer) === pointer && Math.abs(x - swipe.x) > 70 && Math.abs(x - swipe.x) > Math.abs(y - swipe.y) * 1.5) {
              if (x < swipe.x) this.tutorial.advancePage();else this.tutorial.previous();
              this.refreshTutorial();
            }

            return;
          }

          if (((_this$navSwipe = this.navSwipe) == null ? void 0 : _this$navSwipe.pointer) === pointer) {
            const swipe = this.navSwipe;
            this.navSwipe = null;

            if (!this.modal && Math.abs(x - swipe.x) > 80 && Math.abs(x - swipe.x) > Math.abs(y - swipe.y) * 1.3) {
              if (this.screen === 'home' && x < swipe.x) this.navigate('gacha');else if (this.screen === 'gacha' && x > swipe.x) this.navigate('home');
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

          if (this.volumeDrag) {
            this.volumeDrag = null;
            this.persist();
          }

          this.tutorialSwipe = null;
          this.navSwipe = null;
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
          var _this$volumeDrag3, _this$tutorialSwipe, _this$navSwipe2;

          this.lastTouch = Date.now();

          if (((_this$volumeDrag3 = this.volumeDrag) == null ? void 0 : _this$volumeDrag3.pointer) === 'touch:' + e.getID()) {
            this.volumeDrag = null;
            this.persist();
          }

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

          if (e.keyCode === KeyCode.ESCAPE && this.modal === 'sound-settings') {
            this.cancelInput();
            this.modal = '';
            this.render();
            return;
          }

          if (this.tutorial) return;

          if (e.keyCode === KeyCode.ESCAPE && this.sling.pointer !== null) {
            this.cancelInput();
            return;
          }

          if (e.keyCode === KeyCode.ESCAPE && this.screen === 'game' && ((_this$model6 = this.model) == null ? void 0 : _this$model6.phase) !== 'won' && ((_this$model7 = this.model) == null ? void 0 : _this$model7.phase) !== 'lost') {
            if (this.overlay.getChildByName('ActionConfirmation')) this.showModal(this.modal);else if (this.modal) {
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