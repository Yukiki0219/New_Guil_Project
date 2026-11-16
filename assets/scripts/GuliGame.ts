import { translate, Language } from './Localization';
import { LanguageSwitch } from './LanguageSwitch';
import { _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, input, Input, EventTouch, EventMouse, EventKeyboard, KeyCode, view, ResolutionPolicy, resources, SpriteFrame, Sprite, Mask, sys, AudioSource, AudioClip, Canvas, Camera, profiler, Prefab, instantiate, Button, BlockInputEvents, UIOpacity, game, Game } from 'cc';
import { GameModel, MARBLE_COUNT, LEVELS, RADIUS, SHOOTER_Y, SaveData, cleanSave, award, rollMarbles, marbleName, rarity, Marble } from './GameModel';
import { GuliPhysics } from './GuliPhysics';
import { PREVIEW } from 'cc/env';
import { Slingshot, GROUND_Y_SCALE } from './Slingshot';
import { predictAim } from './AimPrediction';
import { MARBLE_APPEARANCES } from './MarbleAppearance';
import { drawMarbleAppearance } from './MarbleRenderer';
import { Tutorial } from './Tutorial';
import { TutorialView } from './TutorialView';
import { GameHints, HINT_TEXT } from './GameHints';
import { REWARDS, RARITIES, Reward, RewardKind, drawReward, equipReward, rewardById } from './Gacha';
const { ccclass } = _decorator;
const CREAM = '#fff2d7', INK = '#164e54', TEAL = '#008e96', GOLD = '#e0a13d';
const PALETTE = ['#168acb', '#d89516', '#20996b', '#8155bb', '#c44661', '#82becb', '#39b5a3', '#e17d55', '#475bba', '#e7ac30'];
const GACHA_MARBLE_SOURCES = [4, 2, 6, 5, 13, 0, 7, 14, 42, 23, 27, 31, 26, 28, 39, 36, 35, 25, 44, 54];
type Hit = { x: number; y: number; w: number; h: number; action: () => void };
type Screen = 'home' | 'levels' | 'game' | 'collection' | 'skins' | 'gacha';
function col(hex: string, alpha = 255): Color { const c = new Color(); Color.fromHEX(c, hex); c.a = alpha; return c; }

@ccclass('GuliGame')
export class GuliGame extends Component {
    private translatedLabels = new Map<Label, string>();
    private setText(label: Label, text: string) { this.translatedLabels.set(label, text); label.string = translate(text, this.save.language); }
    private setLanguage(language: Language) {
        if (this.save.language === language) return;
        this.save.language = language; this.persist();
        for (const [label, text] of this.translatedLabels) {
            if (label.isValid) label.string = translate(text, language); else this.translatedLabels.delete(label);
        }
        if (this.tutorial) this.refreshTutorial();
    }
    private screen: Screen = 'home';
    private save: SaveData = cleanSave(null);
    private model: GameModel | null = null;
    private tutorial: Tutorial | null = null;
    private tutorialView: TutorialView | null = null;
    private tutorialSwipe: {pointer:string;x:number;y:number}|null=null;
    private tutorialReturnModal = '';
    private hints = new GameHints();
    private hintLayer: Node | null = null;
    private hintReason = '';
    private safeScale = 1;
    private resizeUI = () => { this.cancelInput(); this.scheduleOnce(() => this.applySafeArea(), 0); };
    private ui!: Node;
    private board!: Node;
    private trailLayer!: Node;
    private ballLayer!: Node;
    private overlay!: Node;
    private aimG!: Graphics;
    private powerG!: Graphics;
    private powerText!: Label;
    private hud!: Label;
    private hint!: Label;
    private hits: Hit[] = [];
    private sprites = new Map<Marble, Node>();
    private sling = new Slingshot();
    private shooterPreview: Node | null = null;
    private power = 1;
    private blurHandler = () => this.cancelInput();
    private modal = '';
    private page = 0;
    private physics: GuliPhysics | null = null;
    private resultHandled = false;
    private lastTouch = 0;
    private clock = 0;
    private audio!: AudioSource;
    private music?: AudioSource;
    private musicClips: Record<string, AudioClip> = {};
    private musicUnlocked = false;
    private musicHidden = false;
    private hideMusic = () => { this.musicHidden = true; this.music?.pause(); };
    private showMusic = () => { this.musicHidden = false; this.syncMusic(); };
    private clips: Record<string, AudioClip> = {};
    private newItems = 0;
    private earnedStars = 0;
    private lastReward: Reward | null = null;
    private lastDrawDuplicate = false;
    private wardrobeKind: RewardKind = 'marble';
    private navSwipe: { pointer: string; x: number; y: number } | null = null;
    private trailMarks: { node: Node; opacity: UIOpacity; age: number; life: number }[] = [];
    private trailClock = 0;
    private trailPreviews: { reward: Reward; layer: Node; ball: Node; owned: boolean; time: number; stamp: number }[] = [];
    private sceneSprite!: Sprite;
    private sceneFallback!: Graphics;
    private sceneArtId = '';
    private flowerTrailFrame: SpriteFrame | null = null;
    private storageWarning = false;
    private artwork: Record<string, Prefab> = {};
    private aimMarker: Node | null = null;
    private shotsHud: Label | null = null;
    private invalidHud: { label: Label; color: Color; scale: Vec3; elapsed: number } | null = null;

    onLoad() {
        if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliRollbackTest') === '1') {
            this.scheduleOnce(() => { import('./RollbackVerification').then(m => m.verifyRollback(this.node.scene!)); }, 0);
            return;
        }
        if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliPhysicsTest') === '1') {
            this.scheduleOnce(() => { import('./PhysicsVerification').then(m => m.verifyPhysics(this.node.scene!)); }, 0);
            return;
        }
        view.setDesignResolutionSize(720, 1280, ResolutionPolicy.SHOW_ALL);
        view.resizeWithBrowserSize(true);
        view.on('canvas-resize', this.resizeUI, this);
        const camera = this.node.getComponent(Canvas)?.cameraComponent;
        if (camera) camera.projection = Camera.ProjectionType.ORTHO;
        profiler.hideStats();
        try {
            const raw = JSON.parse(sys.localStorage.getItem('guli.save.v3') || sys.localStorage.getItem('guli.save.v2') || sys.localStorage.getItem('guli.save.v1') || 'null');
            this.save = cleanSave(raw);
            if (raw && raw.version !== 3) this.persist();
        } catch { this.save = cleanSave(null); }
        this.audio = this.node.addComponent(AudioSource);
        const musicNode = new Node('BackgroundMusic'); this.node.addChild(musicNode);
        this.music = musicNode.addComponent(AudioSource);
        this.music.loop = true; this.music.volume = 0.22; this.music.playOnAwake = false;
        for (const name of ['bgm_main_menu', 'bgm_gameplay']) resources.load('audio/' + name, AudioClip, (err, clip) => {
            if (!this.isValid) return;
            if (err) { console.warn('Background music load failed: ' + name, err); return; }
            this.musicClips[name] = clip; this.syncMusic();
        });
        for (const name of ['hit', 'shoot', 'win']) resources.load('audio/' + name, AudioClip, (err, clip) => { if (!err) this.clips[name] = clip; });
        const back = this.makeNode('Courtyard', this.node, 0, 0, 720, 1280);
        this.sceneFallback = back.addComponent(Graphics); this.sceneFallback.fillColor = col('#e8c78f'); this.sceneFallback.rect(-360, -640, 720, 1280); this.sceneFallback.fill();
        this.sceneSprite = this.makeNode('CourtyardArt', back, 0, 0, 720, 1280).addComponent(Sprite);
        this.sceneSprite.sizeMode = Sprite.SizeMode.CUSTOM;
        this.refreshSceneArt();
        resources.load('art/gacha-T05/spriteFrame', SpriteFrame, (err, frame) => { if (!err && this.isValid) this.flowerTrailFrame = frame; });
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
            if (err) { console.warn('HUD artwork load failed', err); return; }
            prefabs.forEach(p => this.artwork[p.name] = p);
            const modal = this.modal;
            this.render();
            if (modal) this.showModal(modal);
            if (PREVIEW && typeof window !== 'undefined') {
                if (new URLSearchParams(window.location.search).get('guliMarbleTest') === '1') {
                    import('./MarbleAppearancePreview').then(m => m.verifyMarbleUpdate(this));
                }
                const mode = new URLSearchParams(window.location.search).get('guliMarblePreview');
                if (mode && ['game','0','10','20','30','40','50'].includes(mode)) {
                    import('./MarbleAppearancePreview').then(m => m.previewMarbleAppearances(this, mode));
                }
            }
            if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliSlingTest') === '1') {
                import('./SlingshotVerification').then(m => m.verifySlingshot(this));
            }
            if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliLanguageTest') === '1') {
                import('./LanguageVerification').then(m => m.verifyLanguage(this));
            }
            if (PREVIEW && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guliTutorialTest') === '1') {
                import('./TutorialVerification').then(m => m.verifyTutorial(this));
            }
        });
    }
    onEnable() { this.syncMusic(); }
    onDisable() { this.cancelInput(); this.stopInvalidShotHudAnimation(); this.music?.pause(); }
    onDestroy() {
        view.off('canvas-resize', this.resizeUI, this);
        this.clearTutorial();
        this.stopInvalidShotHudAnimation();
        game.off(Game.EVENT_HIDE, this.cancelInput, this);
        game.off(Game.EVENT_HIDE, this.hideMusic, this);
        game.off(Game.EVENT_SHOW, this.showMusic, this);
        this.music?.stop();
        if (sys.isBrowser && typeof window !== 'undefined') window.removeEventListener('blur', this.blurHandler);
        this.physics?.dispose();
        input.off(Input.EventType.TOUCH_START, this.touchDown, this); input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
        input.off(Input.EventType.TOUCH_END, this.touchUp, this); input.off(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
        input.off(Input.EventType.MOUSE_DOWN, this.mouseDown, this); input.off(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
        input.off(Input.EventType.MOUSE_UP, this.mouseUp, this); input.off(Input.EventType.KEY_DOWN, this.keyDown, this);
    }
    private makeNode(name: string, parent: Node, x = 0, y = 0, w = 720, h = 1280) {
        const n = new Node(name); n.layer = this.node.layer; parent.addChild(n); n.setPosition(x, y);
        n.addComponent(UITransform).setContentSize(w, h); return n;
    }
    private graphic(parent: Node) { return this.makeNode('Paint', parent).addComponent(Graphics); }
    private refreshSceneArt() {
        const id = this.screen === 'gacha' ? 'gacha-page' : this.save.equipped.scene || 'default';
        if (id === this.sceneArtId) return;
        this.sceneArtId = id;
        const path = id === 'default' ? 'art/courtyard/spriteFrame' : id === 'gacha-page' ? 'art/gacha-page/spriteFrame' : `art/gacha-scenes/${id}/spriteFrame`;
        resources.load(path, SpriteFrame, (err, frame) => {
            if (!this.isValid || this.sceneArtId !== id) return;
            if (err) { console.warn('Scene skin load failed: ' + id, err); return; }
            this.sceneSprite.spriteFrame = frame;
            this.sceneSprite.node.getComponent(UITransform)!.setContentSize(720, 1280);
            this.sceneFallback.enabled = false;
        });
    }
    /** Instantiate the actual editable asset, so future prefab edits appear in the game. */
    private part(name: string, parent: Node, x: number, y: number, w: number, h: number) {
        const prefab = this.artwork[name];
        if (!prefab) return null;
        const n = instantiate(prefab); parent.addChild(n); n.setPosition(x, y); n.layer = this.node.layer;
        n.getComponent(UITransform)!.setContentSize(w, h);
        if (name === 'Logo') {
            // Fit the supplied complete logo inside the existing title area without stretching.
            const size = n.getComponent(Sprite)?.spriteFrame?.originalSize;
            if (size && size.width > 0 && size.height > 0) {
                const scale = Math.min(w / size.width, h / size.height);
                n.getComponent(UITransform)!.setContentSize(size.width * scale, size.height * scale);
            }
        }
        return n;
    }
    private label(text: string, x: number, y: number, size = 24, color = INK, parent = this.ui, width = 640) {
        const n = this.makeNode(text.slice(0, 24), parent, x, y, width, size * 2.4);
        const l = n.addComponent(Label); this.setText(l, text); l.fontSize = size; l.lineHeight = size * 1.4;
        l.color = col(color); l.fontFamily = 'Microsoft YaHei'; l.horizontalAlign = Label.HorizontalAlign.CENTER;
        l.verticalAlign = Label.VerticalAlign.CENTER; l.overflow = Label.Overflow.SHRINK; l.enableWrapText = true; return l;
    }
    private panel(x: number, y: number, w: number, h: number, parent = this.ui, fill = CREAM) {
        if (fill === CREAM && w / h > 2.2 && this.artwork.ControlPanel) {
            const name = w > 500 && h > 160 ? 'ControlPanel' : 'LevelPlate';
            const n = this.part(name, parent, x, y, w, h)!;
            const l = n.getComponentInChildren(Label); if (l) l.string = '';
            return;
        }
        const g = this.graphic(parent); g.fillColor = col('#594122', 45); g.roundRect(x - w / 2, y - h / 2 - 7, w, h, 24); g.fill();
        g.fillColor = col(fill, 248); g.roundRect(x - w / 2, y - h / 2, w, h, 24); g.fill();
        g.strokeColor = col('#ffffff', 185); g.lineWidth = 2; g.roundRect(x - w / 2 + 5, y - h / 2 + 5, w - 10, h - 10, 20); g.stroke(); return g;
    }
    private button(text: string, x: number, y: number, w: number, h: number, action: () => void, primary = false, parent = this.ui, disabled = false) {
        const partName = text === '主页' ? 'HomeButton' : text === '暂停' ? 'PauseButton' : text === '发射' ? 'FireButton' : '';
        const size = text === '发射' ? 116 : 84;
        let n = partName ? this.part(partName, parent, x, y, size, size) : null;
        if (!n) {
            n = this.makeNode('Button-' + text, parent, x, y, w, h);
            this.panel(0, 0, w, h, n, disabled ? '#c8c3ae' : primary ? TEAL : CREAM);
            this.label(text, 0, 0, h > 70 ? 28 : 22, primary ? '#ffffff' : INK, n, w - 20);
        }
        const btn = n.getComponent(Button) || n.addComponent(Button);
        btn.interactable = !disabled; btn.transition = Button.Transition.SCALE; btn.zoomScale = 0.94;
        const sp = n.getComponent(Sprite); if (sp) sp.grayscale = disabled;
        n.on(Button.EventType.CLICK, action);
        // Native Button owns click dispatch; global input only uses these rectangles to exclude aiming.
        this.hits.push({ x, y, w:partName ? size : w, h:partName ? size : h, action: () => {} });
    }
    private stars(count: number, x: number, y: number, size = 20, parent = this.ui) {
        const g = this.graphic(parent);
        for (let s = 0; s < 3; s++) {
            const cx = x + (s - 1) * size * 2.8;
            if (this.artwork.StarEmpty) {
                this.part('StarEmpty', parent, cx, y, size * 2.5, size * 2.6);
                if (s >= count) continue;
            }
            g.fillColor = col(s < count ? GOLD : '#cbb797'); g.strokeColor = col(CREAM); g.lineWidth = 2;
            for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? size * 0.46 : size; const px = cx + Math.cos(a) * r, py = y + Math.sin(a) * r; if (i === 0) g.moveTo(px, py); else g.lineTo(px, py); }
            g.close(); g.fill(); g.stroke();
        }
        g.node.setSiblingIndex(parent.children.length - 1);
    }
    private clear(parent: Node) { parent.children.slice().forEach(c => { c.removeFromParent(); c.destroy(); }); }
    private navigate(screen: Screen) {
        if (screen !== 'game') this.clearTutorial();
        if (screen !== 'game') { this.physics?.dispose(); this.physics = null; }
        this.cancelInput(); this.screen = screen; this.modal = ''; this.page = 0; this.render();
    }
    private header(title: string, subtitle: string) {
        this.label(title, 0, 538, 45); this.label(subtitle, 0, 487, 18, '#726044');
        this.button('返回', -270, 557, 110, 54, () => this.navigate('home'));
    }
    private render() {
        this.tutorialView?.dispose(); this.tutorialView = null;
        this.hintLayer?.destroy();this.hintLayer=null;this.hintReason='';
        this.syncMusic();
        this.stopInvalidShotHudAnimation();
        this.sling.cancel(); this.shooterPreview = null;
        this.clear(this.ui); this.clear(this.board); this.clear(this.trailLayer); this.clear(this.ballLayer); this.clear(this.overlay);
        this.trailMarks = []; this.trailClock = 0; this.trailPreviews = []; this.refreshSceneArt();
        this.translatedLabels.clear();
        this.hits = []; this.sprites.clear(); this.aimMarker = null; this.shotsHud = null;
        if (this.screen === 'home') this.home();
        if (this.screen === 'levels') this.levels();
        if (this.screen === 'collection') this.collection();
        if (this.screen === 'skins') this.skins();
        if (this.screen === 'gacha') this.gacha();
        if (this.screen === 'game') this.gameUI();
        this.refreshTutorial();
        this.applySafeArea();
    }
    private applySafeArea() {
        const rect = sys.getSafeAreaRect(), size = view.getVisibleSize();
        // Symmetric margins keep all existing board coordinates and input aligned.
        const insetX = Math.max(0, rect.x, size.width - rect.x - rect.width);
        const insetY = Math.max(0, rect.y, size.height - rect.y - rect.height);
        this.safeScale = Math.min(1, Math.max(1, size.width - insetX * 2) / 720,
            Math.max(1, size.height - insetY * 2) / 1280);
        for (const root of [this.board, this.trailLayer, this.ballLayer, this.ui, this.overlay, this.tutorialView?.root]) {
            root?.setScale(this.safeScale, this.safeScale, 1);
        }
    }
    private home() {
        if (!this.part('Logo', this.ui, 0, 444, 402, 178)) this.label('GULI GO!', 3, 442, 108, '#00646a');
        this.label('一颗弹珠，一整个童年', 0, 334, 25, '#735537');
        this.label('庭 院 弹 珠', 0, 558, 22, '#81704f');
        const languageSwitch = this.makeNode('LanguageSwitch', this.ui, 215, 602, 340, 60);
        languageSwitch.setScale(0.65, 0.65, 1);
        languageSwitch.addComponent(LanguageSwitch).setup(this.save.language, language => this.setLanguage(language));
        const g = this.graphic(this.board); g.strokeColor = col(CREAM, 220); g.lineWidth = 4; g.ellipse(0, 102, 253, 145); g.stroke();
        this.marble(this.ballLayer, 0, -111, 100, 51); this.marble(this.ballLayer, 2, 111, 110, 51);
        this.marble(this.ballLayer, 33, 12, 40, 51);
        this.button('›', 298, 0, 70, 78, () => this.navigate('gacha'));
        this.button('开始游戏', 0, -152, 386, 88, () => this.play(), true);
        this.button('收藏图鉴  ' + this.save.collection.length + '/' + MARBLE_COUNT, 0, -258, 386, 76, () => this.navigate('collection'));
        this.button('装扮衣橱', 0, -350, 386, 76, () => this.navigate('skins'));
        this.button(this.save.sound ? '音效：开' : '音效：关', 0, -535, 280, 54, () => { this.save.sound = !this.save.sound; this.persist(); this.render(); });
        this.button('新手教学 / Help', 0, -442, 386, 64, () => this.startTutorial());
        this.label(this.storageWarning ? '存档不可用：本次进度仅保留在当前会话' : '本地单机  /  进度自动保存', 0, -585, 15, '#8e7959');
    }
    private levels() {
        this.header('庭院挑战', '用更少的射击，留下更好的成绩');
        LEVELS.forEach((level, i) => {
            const y = 345 - i * 168, locked = i > 0 && !this.save.stars[i - 1];
            this.panel(0, y, 624, 146);
            this.label(('0' + (i + 1)), -243, y + 12, 38, locked ? '#afa38a' : TEAL, this.ui, 85);
            this.label(level.title, -35, y + 35, 26, INK, this.ui, 270);
            this.label(`击出 ${level.target} / ${level.positions.length} 颗 · ${level.shots} 次机会`, -32, y - 4, 18, '#857155', this.ui, 295);
            this.stars(this.save.stars[i], -35, y - 43, 13);
            this.button(locked ? '未解锁' : '挑战', 225, y, 120, 65, () => this.startLevel(i), true, this.ui, locked);
        });
        this.label('完成前一关即可解锁下一关', 0, -558, 18, '#786549');
    }
    private collection() {
        this.header('弹珠图鉴', `已收藏 ${this.save.collection.length} / ${MARBLE_COUNT} · 击出并过关后解锁`);
        this.label('收藏品不会被消耗，也不能装备为发射球', 0, 439, 17, '#795f42');
        for (let i = 0; i < 10 && this.page * 10 + i < MARBLE_COUNT; i++) {
            const id = this.page * 10 + i, x = (i % 2 ? 1 : -1) * 159, y = 330 - Math.floor(i / 2) * 164;
            const owned = this.save.collection.indexOf(id) >= 0;
            this.panel(x, y, 296, 150);
            this.marble(this.ui, owned ? id : -2, x - 91, y + 10, 32);
            this.label(owned ? marbleName(id) : '未发现', x + 46, y + 29, 22, INK, this.ui, 170);
            this.label(`#${String(id + 1).padStart(2, '0')}  ·  ${rarity(id)}`, x + 46, y - 11, 17, id >= 30 ? '#93679d' : '#8f7d61', this.ui, 170);
            this.label(owned ? '已收藏' : '等待在庭院中相遇', x, y - 51, 14, '#968164', this.ui, 270);
        }
        this.button('上一页', -220, -526, 155, 60, () => { this.page--; this.render(); }, false, this.ui, this.page === 0);
        this.label(`${this.page + 1} / ${Math.ceil(MARBLE_COUNT / 10)}`, 0, -526, 23);
        this.button('下一页', 220, -526, 155, 60, () => { this.page++; this.render(); }, false, this.ui, this.page >= Math.ceil(MARBLE_COUNT / 10) - 1);
    }
    private skins() {
        this.header('装扮衣橱', `抽奖收藏 ${this.save.rewards.length} / ${REWARDS.length}`);
        const tabs: [RewardKind, string][] = [['marble','弹珠'],['scene','场景'],['trail','轨迹']];
        tabs.forEach(([kind, label], i) => this.button(label, -210 + i * 210, 410, 180, 62,
            () => { this.wardrobeKind = kind; this.page = 0; this.render(); }, kind === this.wardrobeKind));
        const equipped = this.save.equipped[this.wardrobeKind];
        this.panel(0, 300, 312, 58);
        this.label(`当前装备：${rewardById(equipped)?.name || '默认'}`, 0, 300, 23, TEAL, this.ui, 292);
        const items = REWARDS.filter(reward => reward.kind === this.wardrobeKind);
        for (let i = 0; i < 6 && this.page * 6 + i < items.length; i++) {
            const reward = items[this.page * 6 + i], x = (i % 2 ? 1 : -1) * 158, y = 175 - Math.floor(i / 2) * 170;
            const owned = this.save.rewards.includes(reward.id);
            this.panel(x, y, 298, 150);
            if (reward.kind === 'marble') {
                if (owned) this.rewardMarble(this.ui, reward, x - 91, y + 10, 32);
                else this.marble(this.ui, -2, x - 91, y + 10, 32);
            } else if (reward.kind === 'scene') this.scenePreview(reward, x - 92, y + 15, owned);
            else this.trailPreview(reward, x - 92, y + 15, owned);
            this.label(owned ? reward.name : '未获得', x + 53, y + 28, 20, owned ? INK : '#77756f', this.ui, 174);
            this.label(reward.rarity, x + 53, y - 9, 17, owned ? '#956a44' : '#8b8982', this.ui, 170);
            this.button(equipped === reward.id ? '已装备' : '装备', x + 54, y - 49, 128, 43,
                () => { this.save = equipReward(this.save, reward.id); this.persist(); this.render(); }, false, this.ui,
                !owned || equipped === reward.id);
        }
        this.button('上一页', -210, -450, 150, 56, () => { this.page--; this.render(); }, false, this.ui, this.page === 0);
        this.label(`${this.page + 1} / ${Math.ceil(items.length / 6)}`, 0, -450, 21);
        this.button('下一页', 210, -450, 150, 56, () => { this.page++; this.render(); }, false, this.ui, this.page >= Math.ceil(items.length / 6) - 1);
        this.button('去抽奖', 0, -543, 280, 62, () => this.navigate('gacha'), true);
    }
    private scenePreview(reward: Reward, x: number, y: number, owned: boolean) {
        const frame = this.makeNode('ScenePreview-' + reward.id, this.ui, x, y, 76, 76);
        frame.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
        const base = this.graphic(frame);
        base.fillColor = col('#aaa9a0'); base.rect(-38, -38, 76, 76); base.fill();
        base.fillColor = col('#d5d3c9'); base.circle(21, 18, 9); base.fill();
        base.fillColor = col('#777c78');
        base.moveTo(-38, -12); base.lineTo(-11, 14); base.lineTo(13, -14);
        base.lineTo(38, 10); base.lineTo(38, -38); base.lineTo(-38, -38); base.close(); base.fill();
        if (owned) resources.load(`art/gacha-scenes/${reward.id}/spriteFrame`, SpriteFrame, (err, art) => {
            if (err || !frame.isValid) return;
            const picture = this.makeNode('SceneArt', frame, 0, 0, 76, 76);
            const size = art.originalSize;
            const scale = Math.max(76 / size.width, 76 / size.height);
            picture.getComponent(UITransform)!.setContentSize(size.width * scale, size.height * scale);
            const sprite = picture.addComponent(Sprite);
            sprite.spriteFrame = art; sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        });
        const outline = this.graphic(this.ui);
        outline.strokeColor = col(owned ? '#b88745' : '#7d7f79'); outline.lineWidth = 3;
        outline.roundRect(x - 39, y - 39, 78, 78, 4); outline.stroke();
    }
    private trailPreview(reward: Reward, x: number, y: number, owned: boolean) {
        const frame = this.makeNode('TrailPreview-' + reward.id, this.ui, x, y, 110, 90);
        frame.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
        const layer = this.makeNode('TrailPreviewMarks', frame, 0, 0, 110, 90);
        const ball = this.marble(frame, owned ? 0 : -2, 0, 5, 23);
        const time = Number(reward.id.slice(1)) * .45;
        ball.setPosition(Math.sin(time * 2.6) * 25, 5);
        this.trailPreviews.push({ reward, layer, ball, owned, time, stamp: 0 });
    }
    private gacha() {
        this.panel(0, 485, 460, 92, this.ui, TEAL);
        this.label('星星抽奖', 0, 485, 46, CREAM);
        this.button('‹', -294, 485, 80, 76, () => this.navigate('home'));
        this.label('○  ●', 274, 425, 20, TEAL, this.ui, 90);
        this.panel(0, 365, 258, 60);
        this.label(`剩余 ${this.save.starBalance} 星`, 0, 365, 27, TEAL, this.ui, 238);
        this.button('抽一次 3 星', 0, -394, 475, 87, () => this.drawGacha(), true, this.ui,
            this.save.starBalance < 3);
        this.button('奖励图鉴', -160, -514, 240, 64, () => this.navigate('skins'));
        this.button('概率', 160, -514, 240, 64, () => this.showModal('odds'));
        if (this.save.starBalance < 3) this.label('星星不足', 0, -580, 18, '#865d3e');
    }
    private drawGacha() {
        const result = drawReward(this.save);
        if (!result) return;
        this.save = result.save; this.lastReward = result.reward; this.lastDrawDuplicate = result.duplicate; this.persist();
        this.render(); this.showModal('gacha-result');
    }
    private rewardMarble(parent: Node, reward: Reward, x: number, y: number, radius: number) {
        const n = this.makeNode('Reward-' + reward.id, parent, x, y, radius * 3, radius * 3);
        const index = Number(reward.id.slice(1)) - 1;
        const source = MARBLE_APPEARANCES[GACHA_MARBLE_SOURCES[index] ?? 0];
        const style = {
            ...source,
            base: reward.color, light: reward.accent, accent: reward.accent,
        };
        drawMarbleAppearance(n, radius, style);
        return n;
    }
    private shooterMarble(parent: Node, x: number, y: number, radius: number) {
        const reward = rewardById(this.save.equipped.marble);
        return reward ? this.rewardMarble(parent, reward, x, y, radius) : this.marble(parent, 0, x, y, radius);
    }
    private startLevel(index: number, replay = false) {
        this.clearTutorial();
        const ids = replay && this.model?.levelIndex === index ? this.model.ids : rollMarbles(LEVELS[index].positions.length);
        this.physics?.dispose();
        this.model = new GameModel(index, ids); this.resultHandled = false;
        this.physics = new GuliPhysics(this.node.scene!, this.model);
        this.sling.cancel(); this.power = 1;
        this.hints = new GameHints();
        this.navigate('game');
        if (index === 0 && !this.save.tuto) this.startTutorial();
    }
    private play() { this.navigate('levels'); }
    private clearTutorial() {
        this.tutorialView?.dispose(); this.tutorialView=null; this.tutorial=null; this.tutorialSwipe=null;
        if(this.board) { this.board.active=true; this.ballLayer.active=true; this.ui.active=true; }
    }
    private startTutorial() {
        if(this.screen!=='game'||!this.model){this.startLevel(0);if(this.tutorial)return;}
        this.cancelInput(); this.tutorialReturnModal=this.modal;this.modal='';this.clear(this.overlay);
        this.tutorial=new Tutorial();this.hints.clear();this.refreshTutorial();
    }
    private resetTutorialBoard() { this.refreshTutorial(); }
    private refreshTutorial() {
        if(!this.tutorial||!this.model)return;
        this.board.active=false;this.ballLayer.active=false;this.ui.active=false;
        if(!this.tutorialView)this.tutorialView=new TutorialView(this.node,{
            part:(...args)=>this.part(...args),marble:(...args)=>this.marble(...args),translate:text=>translate(text,this.save.language),
        });
        this.tutorialView.show(this.tutorial.page,this.model.levelIndex,this.model.level.target-this.model.knocked.length,
            this.model.remaining,()=>this.tutorialNext(),()=>{this.tutorial?.previous();this.refreshTutorial();});
        this.applySafeArea();
    }
    private tutorialNext() {
        if(!this.tutorial)return;
        if(this.tutorial.page<2){this.tutorial.advancePage();this.refreshTutorial();return;}
        this.save.tuto=true;this.persist();const modal=this.tutorialReturnModal;
        this.clearTutorial();this.hints.clear();this.render();
        if(modal)this.showModal(modal);
        if(this.storageWarning)this.setText(this.hint, '教程已完成；存档不可用，本次会话有效。');
    }
    private gameUI() {
        const m = this.model!;
        if (!this.part('Logo', this.ui, 0, 549, 258, 114)) this.label('GULI GO!', 0, 549, 57, '#00656c');
        this.button('主页', -272, 549, 110, 61, () => this.showModal('leave'));
        this.button('暂停', 272, 549, 110, 61, () => this.showModal('pause'));
        this.button('?', 284, 345, 62, 62, () => this.startTutorial());
        if (this.artwork.LevelPlate) {
            const level = this.part('LevelPlate', this.ui, -222, 451, 208, 89)!;
            const target = this.part('TargetPlate', this.ui, 0, 451, 224, 89)!;
            const shots = this.part('ShotsPlate', this.ui, 230, 451, 208, 89)!;
            this.setText(level.getComponentInChildren(Label)!, `第 ${m.levelIndex + 1} 关`);
            this.hud = target.getComponentInChildren(Label)!; this.shotsHud = shots.getComponentInChildren(Label)!;
            [level,target,shots].forEach(n => { const l=n.getComponentInChildren(Label)!; l.fontSize=25; l.lineHeight=34; l.node.getComponent(UITransform)!.setContentSize(190,60); });
        } else {
            this.panel(0, 451, 652, 89);
            this.label(`第 ${m.levelIndex + 1} 关`, -230, 451, 25, INK, this.ui, 160);
            this.hud = this.label('', 85, 451, 24, INK, this.ui, 450);
        }
        this.stars(this.save.stars[m.levelIndex], 0, 365, 22);
        this.label(m.level.title, 0, 318, 18, '#82684b');
        const g = this.graphic(this.board);
        g.lineWidth = 4; g.strokeColor = col('#fffaf0', 235); g.ellipse(0, 30, RADIUS, RADIUS * 0.87); g.stroke();
        g.lineWidth = 1.2; g.strokeColor = col('#fffaf0', 150); g.ellipse(0, 30, RADIUS + 5, RADIUS * 0.87 + 4); g.stroke();
        // Chalk flecks are deterministic and remain outside the precision boundary.
        g.fillColor = col('#fffdf0', 130);
        for (let i = 0; i < 160; i++) { const a = i * 2.39996, r = RADIUS + Math.sin(i * 43) * 4; g.circle(Math.cos(a) * r, 30 + Math.sin(a) * r * 0.87, 0.9); g.fill(); }
        if (this.part('ChalkRing', this.board, 0, 30, 540, 470)) g.clear();
        this.aimG = this.graphic(this.ui);
        this.aimMarker = this.makeNode('AimArrow', this.ui, 0, 0, 40, 40);
        const arrow = this.aimMarker.addComponent(Graphics);
        arrow.fillColor = col('#eef8f7'); arrow.strokeColor = col(TEAL); arrow.lineWidth = 2;
        arrow.moveTo(0, 0); arrow.lineTo(-12, -28); arrow.lineTo(0, -21);
        arrow.lineTo(12, -28); arrow.close(); arrow.fill(); arrow.stroke();
        this.syncBalls();
        if (m.phase === 'aim') { this.power = 1; this.shooterPreview = this.shooterMarble(this.ballLayer, 0, this.projectY(SHOOTER_Y), 32); }
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
        this.refreshHud(); this.drawAim(); this.drawPower();
    }
    private projectY(y: number) { return 30 + y * GROUND_Y_SCALE; }
    private syncBalls() {
        this.model!.balls.forEach(b => { if (!this.sprites.has(b)) { const n = b.shooter ? this.shooterMarble(this.ballLayer, b.x, this.projectY(b.y), b.r) : this.marble(this.ballLayer, b.id, b.x, this.projectY(b.y), b.r); n.active = !b.gone; this.sprites.set(b, n); } });
    }
    private refreshHud() {
        if (this.screen !== 'game') return;
        const m = this.model!;
        this.setText(this.hud, this.shotsHud ? `目标 ${m.knocked.length}/${m.level.target}` : `目标 ${m.knocked.length}/${m.level.target}     剩余 ${m.remaining} 次`);
        if (this.shotsHud) this.setText(this.shotsHud, `剩余 ${m.remaining} 次`);
        if (m.levelIndex > 0) {
            this.setText(this.hint, m.phase === 'moving' ? '弹珠滚动中…' : this.sling.pointer !== null ? '蓄力中' : '');
            return;
        }
        this.setText(this.hint, m.phase === 'moving' ? '弹珠滚动中…' : this.sling.pointer !== null ? (this.sling.ready ? '松手发射 · 拉回起点取消' : '继续后拉蓄力 · 松手取消') : '按住自己的弹珠，向后拖拉');
    }
    private playInvalidShotHudAnimation() {
        this.stopInvalidShotHudAnimation();
        const label = this.shotsHud || this.hud;
        this.invalidHud = { label, color: label.color.clone(), scale: label.node.scale.clone(), elapsed: 0 };
        this.updateInvalidShotHudAnimation(0);
    }
    private stopInvalidShotHudAnimation() {
        const saved = this.invalidHud;
        if (saved?.label.isValid && saved.label.node.isValid) {
            saved.label.color = saved.color; saved.label.node.setScale(saved.scale);
        }
        this.invalidHud = null;
    }
    private updateInvalidShotHudAnimation(dt: number) {
        const saved = this.invalidHud;
        if (!saved || !saved.label.isValid) return;
        saved.elapsed += Math.max(0, dt);
        const t = Math.min(.5, saved.elapsed);
        const pulse = t < .13 ? 1 - (1 - t / .13) ** 2 : (1 - (t - .13) / .37) ** 2;
        saved.label.node.setScale(saved.scale.x * (1 + .3 * pulse), saved.scale.y * (1 + .3 * pulse), saved.scale.z);
        saved.label.color = Color.lerp(new Color(), col('#ed3434', saved.color.a), saved.color, Math.max(0, (t - .13) / .37));
        if (t >= .5) this.stopInvalidShotHudAnimation();
    }
    private drawPower() {
        const g = this.powerG; g.clear();
        g.fillColor = col('#d5bc94'); g.roundRect(-110, -537, 220, 26, 13); g.fill();
        const fill = 220 * this.power / 100;
        g.fillColor = col(TEAL); g.rect(-110, -537, fill, 26); g.fill();
        this.powerText.string = this.power + ' / 100';
    }
    private drawAim() {
        const g = this.aimG; g.clear();
        const active = this.model!.phase === 'aim' && this.sling.pointer !== null && this.sling.ready;
        if (this.aimMarker) this.aimMarker.active = active;
        if (!active) return;
        const sx = this.sling.x, sy = this.projectY(SHOOTER_Y) + this.sling.y;
        const groundPull = this.sling.y / GROUND_Y_SCALE;
        const prediction = predictAim(sx, SHOOTER_Y + groundPull, -sx, -groundPull,
            this.power, this.model!.balls, this.physics!.config.linearDamping);
        if (!prediction) { if (this.aimMarker) this.aimMarker.active = false; return; }
        const ex = prediction.x, ey = this.projectY(prediction.y);
        const length = Math.hypot(ex - sx, ey - sy);
        if (length < 1) { if (this.aimMarker) this.aimMarker.active = false; return; }
        const dx = (ex - sx) / length, dy = (ey - sy) / length;
        // Read-only first-contact prediction; Box2D still owns actual motion and collisions.
        g.strokeColor = col(TEAL, 220); g.lineWidth = 5;
        for (let t = 32; t < length - 24; t += 22) {
            const end = Math.min(t + 13, length - 24);
            g.moveTo(sx + dx * t, sy + dy * t); g.lineTo(sx + dx * end, sy + dy * end); g.stroke();
        }
        if (this.aimMarker) {
            this.aimMarker.setPosition(ex, ey);
            this.aimMarker.angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;
            const scale = Math.min(1, length / 32);
            this.aimMarker.setScale(scale, scale, 1);
        }
    }
    private marble(parent: Node, id: number, x: number, y: number, r: number) {
        const appearance = MARBLE_APPEARANCES[id];
        if (appearance) {
            const prototype = this.makeNode('Marble-' + id, parent, x, y, r * 3, r * 3);
            drawMarbleAppearance(prototype, r, appearance);
            return prototype;
        }
        const n = this.makeNode('Marble-' + id, parent, x, y, r * 3, r * 3); const g = n.addComponent(Graphics);
        g.fillColor = col('#604a29', 40); g.ellipse(r * 0.2, -r * 0.52, r * 1.07, r * 0.66); g.fill();
        const base = col(id === -2 ? '#9d9b8e' : PALETTE[Math.max(0, id) % 10]);
        for (let i = 0; i < 18; i++) {
            const t = i / 18;
            g.fillColor = new Color(Math.min(255, base.r * (0.33 + t * 0.84)), Math.min(255, base.g * (0.33 + t * 0.84)), Math.min(255, base.b * (0.33 + t * 0.84)), 255);
            g.circle(-r * t * 0.15, r * t * 0.12, r * (1 - t * 0.36)); g.fill();
        }
        if (id !== -2) {
            const motif = Math.floor(Math.max(id, 0) / 10);
            g.lineWidth = r * 0.14; g.strokeColor = col('#c9f8ff', 130);
            for (let j = 0; j < 2 + motif % 3; j++) {
                const off = (j - 1) * r * 0.25;
                g.moveTo(-r * 0.72, -r * 0.1 + off); g.bezierCurveTo(r * 0.8, -r * 0.9, -r * 0.65, r * 0.9, r * 0.62, r * 0.25 + off); g.stroke();
            }
            if (motif === 2 || motif === 4) { g.fillColor = col('#ffefbe', 190); for (let j = 0; j < 9; j++) { const a = j * 2.4; g.circle(Math.sin(a) * r * 0.57, Math.cos(a) * r * 0.57, r * 0.045); g.fill(); } }
        }
        g.strokeColor = col('#c6f6ff', 165); g.lineWidth = r * 0.045; g.circle(0, 0, r * 0.94); g.stroke();
        g.fillColor = col('#ffffff', 217); g.ellipse(-r * 0.31, r * 0.48, r * 0.28, r * 0.16); g.fill();
        g.fillColor = col('#ffffff', 90); g.ellipse(r * 0.34, -r * 0.47, r * 0.28, r * 0.09); g.fill();
        g.fillColor = col('#ffffff', 240); g.circle(r * 0.35, r * 0.63, r * 0.075); g.fill();
        if (id >= 30) {
            g.strokeColor = col(id >= 45 ? '#fff0a0' : '#ffe0ff'); g.lineWidth = 2;
            const sx = r * 0.87, sy = r * 0.83; g.moveTo(sx - 6, sy); g.lineTo(sx + 6, sy); g.moveTo(sx, sy - 6); g.lineTo(sx, sy + 6); g.stroke();
        }
        return n;
    }
    update(dt: number) {
        this.clock += dt;
        this.updateTrail(dt);
        if (this.screen === 'skins' && this.wardrobeKind === 'trail' && !this.modal) this.updateTrailPreviews(dt);
        if(this.tutorial){if(!this.musicHidden)this.tutorialView?.update(dt);return;}
        this.updateInvalidShotHudAnimation(dt);
        if (this.screen !== 'game' || this.modal || (this.tutorial && this.musicHidden) || !this.model) return;
        this.tutorialView?.update(dt);
        const m = this.model;
        this.updateHints(dt);
        if (m.phase === 'moving') {
            const hit = this.physics!.advance(dt);
            if (hit) {
                this.sound('hit');
                this.physics!.contactPoints.forEach(p => this.emitCollision(p.x, this.projectY(p.y)));
            }
            this.sprites.forEach((n, b) => { n.active = !b.gone; n.setPosition(b.x, this.projectY(b.y)); });
            const shooter = m.balls.find(b => b.shooter && !b.gone);
            if (shooter && Math.hypot(shooter.vx, shooter.vy) > 30) this.emitTrail(shooter, dt);
            this.refreshHud();
            if (m.phase as string !== 'moving') {
                this.render();
                if (m.levelIndex === 0) this.hints.resolved(m);
                this.updateHints(0);
                if (m.lastShotInvalid) this.playInvalidShotHudAnimation();
                if ((m.phase as string === 'won' || m.phase as string === 'lost') && !this.resultHandled) {
                    this.resultHandled = true;
                    const previous = this.save.collection.length;
                    const firstClear = (m.phase as string) === 'won' && this.save.stars[m.levelIndex] === 0;
                    this.save = award(this.save, m); this.newItems = this.save.collection.length - previous;
                    this.earnedStars = firstClear ? m.stars : 0;
                    if (m.phase as string === 'won') { this.persist(); this.sound('win'); }
                    this.showModal('result');
                }
            }
        }
    }
    private updateTrailPreviews(dt: number) {
        const step = Math.min(dt, .05);
        for (const preview of this.trailPreviews) {
            const previous = preview.ball.position.x;
            preview.time += step;
            const x = Math.sin(preview.time * 2.6) * 25;
            preview.ball.setPosition(x, 5);
            preview.ball.angle -= (x - previous) / 23 * 180 / Math.PI;
            preview.stamp += step;
            if (preview.stamp < .1 || Math.abs(Math.cos(preview.time * 2.6)) < .2) continue;
            preview.stamp = 0;
            const direction = Math.sign(Math.cos(preview.time * 2.6));
            this.emitTrailMark(preview.reward, preview.layer, x - direction * 24, 5,
                direction, 0, .55, !preview.owned);
        }
    }
    private emitTrail(shooter: Marble, dt: number) {
        const reward = rewardById(this.save.equipped.trail);
        if (!reward) return;
        this.trailClock += dt;
        if (this.trailClock < .045) return;
        this.trailClock = 0;
        this.emitTrailMark(reward, this.trailLayer, shooter.x, this.projectY(shooter.y),
            shooter.vx, shooter.vy * GROUND_Y_SCALE);
    }
    private emitTrailMark(reward: Reward, parent: Node, x: number, y: number,
        vx: number, vy: number, scale = 1, muted = false) {
        if (this.trailMarks.length >= 28) {
            const oldest = this.trailMarks.shift()!; oldest.node.destroy();
        }
        const n = this.makeNode('Trail-' + reward.id, parent, x, y, 42, 42);
        n.setScale(scale, scale, 1);
        const index = Number(reward.id.slice(1));
        if (reward.id === 'T05' && this.flowerTrailFrame && !muted) {
            const angle = Math.atan2(vy, vx);
            n.setPosition(x - Math.cos(angle) * 32 * scale, y - Math.sin(angle) * 32 * scale);
            n.angle = angle * 180 / Math.PI;
            n.getComponent(UITransform)!.setContentSize(100, 36);
            const sprite = n.addComponent(Sprite); sprite.spriteFrame = this.flowerTrailFrame;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        } else {
            const g = n.addComponent(Graphics);
            g.strokeColor = col(muted ? '#6e7472' : reward.accent, 220);
            g.fillColor = col(muted ? '#7c817d' : reward.color, 210); g.lineWidth = 3;
            if ([3,6].includes(index)) { g.circle(0, 0, 8 + index); g.stroke(); }
            else if ([2,5,8].includes(index)) {
                for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; g.ellipse(Math.cos(a) * 8, Math.sin(a) * 8, 5, 9); g.fill(); }
            } else if (index === 9) {
                g.moveTo(-18, -9); g.bezierCurveTo(-2, 15, 4, -15, 18, 9); g.stroke();
                g.moveTo(-18, 9); g.bezierCurveTo(-2, -15, 4, 15, 18, -9); g.stroke();
            } else if (index === 10) {
                g.moveTo(-12, -10); g.lineTo(1, 18); g.lineTo(12, -6); g.lineTo(0, 2); g.close(); g.fill();
            } else if (index === 7) {
                for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; g.moveTo(Math.cos(a) * 8, Math.sin(a) * 8); g.lineTo(Math.cos(a) * 20, Math.sin(a) * 20); g.stroke(); }
            } else { for (let i = 0; i < 4; i++) { g.circle((i % 2 ? 1 : -1) * (4 + i * 3), (i - 1.5) * 6, 2 + i % 2); g.fill(); } }
        }
        const opacity = n.addComponent(UIOpacity); opacity.opacity = 210;
        this.trailMarks.push({ node: n, opacity, age: 0, life: index >= 8 ? .75 : .5 });
    }
    private updateTrail(dt: number) {
        this.trailMarks = this.trailMarks.filter(mark => {
            mark.age += dt;
            if (mark.age >= mark.life || !mark.node.isValid) { if (mark.node.isValid) mark.node.destroy(); return false; }
            mark.opacity.opacity = Math.round(210 * (1 - mark.age / mark.life)); return true;
        });
    }
    private emitCollision(x: number, y: number) {
        const reward = rewardById(this.save.equipped.trail);
        if (!reward) return;
        if (this.trailMarks.length >= 28) { const oldest = this.trailMarks.shift()!; oldest.node.destroy(); }
        const n = this.makeNode('Collision-' + reward.id, this.trailLayer, x, y, 70, 70);
        const g = n.addComponent(Graphics);
        g.strokeColor = col(reward.accent, 240); g.fillColor = col(reward.color, 210); g.lineWidth = 4;
        const index = Number(reward.id.slice(1));
        if ([3, 6].includes(index)) {
            for (const radius of [15, 29]) { g.circle(0, 0, radius); g.stroke(); }
        } else if ([2, 5, 8].includes(index)) {
            for (let i = 0; i < 6; i++) {
                const a = i * Math.PI / 3;
                g.ellipse(Math.cos(a) * 23, Math.sin(a) * 23, 6, 12); g.fill();
            }
        } else if ([7, 10].includes(index)) {
            for (let i = 0; i < 6; i++) {
                const a = i * Math.PI / 3;
                g.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
                g.lineTo(Math.cos(a + .22) * 34, Math.sin(a + .22) * 34);
                g.lineTo(Math.cos(a + .45) * 20, Math.sin(a + .45) * 20);
                g.close(); g.fill();
            }
        } else if (index === 9) {
            for (let i = 0; i < 3; i++) {
                const a = i * Math.PI * 2 / 3;
                g.moveTo(Math.cos(a) * 10, Math.sin(a) * 10);
                g.bezierCurveTo(Math.cos(a + .6) * 38, Math.sin(a + .6) * 38,
                    Math.cos(a - .6) * 38, Math.sin(a - .6) * 38,
                    Math.cos(a) * 26, Math.sin(a) * 26); g.stroke();
            }
        } else {
            for (let i = 0; i < 6; i++) {
                const a = i * Math.PI / 3;
                g.moveTo(Math.cos(a) * 14, Math.sin(a) * 14);
                g.lineTo(Math.cos(a) * 29, Math.sin(a) * 29); g.stroke();
                g.circle(Math.cos(a) * 32, Math.sin(a) * 32, 3); g.fill();
            }
        }
        const opacity = n.addComponent(UIOpacity); opacity.opacity = 220;
        this.trailMarks.push({ node: n, opacity, age: 0, life: .35 });
    }
    private updateHints(dt:number) {
        const m=this.model;if(!m||this.tutorial)return;
        if (m.levelIndex > 0) { this.hints.clear(); return; }
        const had=this.hints.reason;
        this.hints.tick(dt,m.phase==='aim'&&this.sling.pointer===null);
        if(had&&!this.hints.reason&&m.phase==='aim'&&m.remaining<=2)this.hints.show('low');
        const reason=this.hints.reason;
        if(this.hintReason===(reason||''))return;
        this.hintReason=reason||'';this.hintLayer?.removeFromParent();this.hintLayer?.destroy();this.hintLayer=null;
        this.hits=this.hits.filter(h=>!(h.y===-607&&h.w===180));
        if(!reason)return;
        this.hintLayer=this.makeNode('ContextHint',this.ui);
        this.panel(0,-340,640,104,this.hintLayer);
        this.label(HINT_TEXT[reason],0,-340,22,reason==='success'?TEAL:INK,this.hintLayer,600);
        const g=this.graphic(this.hintLayer);g.strokeColor=col(GOLD);g.lineWidth=3;
        if(['idle','wrong'].includes(reason)) this.drawGuideCircle(g,0,this.projectY(SHOOTER_Y),44,44);
        if(reason==='targetOnly' && m.lastShotReport?.shooter){
            const previous=m.lastShotReport.shooter;
            this.drawGuideCircle(g,previous.x,this.projectY(previous.y),38,38);
            this.label('上次停留位置',previous.x,this.projectY(previous.y)+52,18,INK,this.hintLayer,180);
        }
        if(['targetOnly','boundary'].includes(reason)) this.drawGuideCircle(g,0,30,RADIUS+6,RADIUS*.87+6);
        if(reason==='low'){g.strokeColor=col(GOLD);g.lineWidth=3;g.roundRect(123,407,214,88,18);g.stroke();}
        if(this.hints.repeated>=2&&reason!=='success')this.button('查看提示',0,-607,180,46,()=>this.startTutorial(),false,this.hintLayer);
    }
    private drawGuideCircle(g: Graphics, x: number, y: number, rx: number, ry: number) {
        g.strokeColor = col('#808080'); g.lineWidth = 2;
        const segments = Math.max(16, Math.ceil(2 * Math.PI * Math.max(rx, ry) / 16));
        for (let i = 0; i < segments; i++) {
            const start = i / segments * Math.PI * 2;
            for (let j = 0; j <= 4; j++) {
                const a = start + j / 4 * .58 / segments * Math.PI * 2;
                const px = x + Math.cos(a) * rx, py = y + Math.sin(a) * ry;
                if (j === 0) g.moveTo(px, py); else g.lineTo(px, py);
            }
            g.stroke();
        }
    }
    private showModal(kind: string) {
        if (this.tutorialView) this.tutorialView.root.active = false;
        this.cancelInput(); this.modal = kind; this.hits = []; this.clear(this.overlay);
        this.ui.getComponentsInChildren(Button).forEach(b => b.interactable = false);
        const shade = this.graphic(this.overlay); shade.fillColor = col('#142f32', 150); shade.rect(-360, -640, 720, 1280); shade.fill();
        shade.node.addComponent(BlockInputEvents);
        const completed = kind === 'result' && this.model?.phase === 'won';
        this.panel(0, completed ? -40 : 0, 600, completed ? 730 : 650, this.overlay);
        const m = this.model!;
        if (kind === 'odds') {
            this.label('抽奖概率', 0, 220, 35, INK, this.overlay);
            RARITIES.forEach((rarity, i) => this.label(`${rarity}  ·  ${['50%','35%','12.5%','2%','0.5%'][i]}`, 0, 135 - i * 65, 24, INK, this.overlay));
            this.label('可能抽到重复奖励；重复时返还 1 星', 0, -238, 18, '#857155', this.overlay, 510);
            this.button('返回', 0, -310, 260, 65, () => { this.modal = ''; this.render(); }, true, this.overlay);
            return;
        }
        if (kind === 'gacha-result' && this.lastReward) {
            const reward = this.lastReward;
            this.label(this.lastDrawDuplicate ? '重复奖励 · 返还 1 星' : '获得新奖励！', 0, 235, 35, INK, this.overlay);
            if (reward.kind === 'marble') this.rewardMarble(this.overlay, reward, 0, 100, 70);
            else { const g = this.graphic(this.overlay); g.fillColor = col(reward.color); g.circle(0, 100, 62); g.fill(); }
            this.label(`${reward.name} · ${reward.rarity}`, 0, -10, 27, TEAL, this.overlay);
            this.label(`剩余 ${this.save.starBalance} 星`, 0, -67, 20, '#857155', this.overlay);
            this.button('立即装备', 0, -155, 300, 65, () => {
                this.save = equipReward(this.save, reward.id); this.persist(); this.wardrobeKind = reward.kind; this.navigate('skins');
            }, true, this.overlay);
            this.button('继续', 0, -247, 300, 65, () => { this.modal = ''; this.render(); }, false, this.overlay);
            return;
        }
        if (kind === 'result') {
            const won = m.phase === 'won';
            this.label(won ? '漂亮的一击！' : '次数已用完', 0, 236, 38, INK, this.overlay, 520);
            this.stars(m.stars, 0, 148, 32, this.overlay);
            this.label(`击出 ${m.knocked.length} 颗 · 使用 ${m.used} 次射击`, 0, 62, 24, INK, this.overlay, 530);
            this.label(won ? `新收藏 +${this.newItems}  ·  首通星星 +${this.earnedStars}  ·  最佳 ${this.save.stars[m.levelIndex]} 星` : '目标尚未完成，本次挑战失败。', 0, 7, 20, '#87704f', this.overlay, 540);
            this.button(won && m.levelIndex < 4 ? '下一关' : '返回关卡', 0, -87, 440, 75, () => won && m.levelIndex < 4 ? this.startLevel(m.levelIndex + 1) : this.navigate('levels'), true, this.overlay);
            this.button('再试一次', 0, -181, 440, 70, () => this.startLevel(m.levelIndex, true), false, this.overlay);
            if(won)this.button('回到主菜单', 0, -275, 440, 70, () => this.navigate('home'), false, this.overlay);
            if(!won)this.button('查看教程',0,-267,250,54,()=>this.startTutorial(),false,this.overlay);
            if(won)this.label(this.storageWarning ? '存档暂不可用，请勿关闭当前会话' : won ? '星级与收藏已保存' : '调整角度，试试一次撞出多颗', 0, -352, 17, '#8b795d', this.overlay, 530);
        } else {
            this.label(kind === 'leave' ? '返回主页？' : '休息一下', 0, 220, 39, INK, this.overlay);
            this.label(kind === 'leave' ? '本局未结算的进度不会保存' : '弹珠已暂停，准备好再继续', 0, 133, 22, '#867053', this.overlay);
            this.button('继续游戏', 0, 15, 430, 80, () => { this.modal = ''; this.render(); }, true, this.overlay);
            this.button('重玩本关', 0, -85, 430, 74, () => {
                if (this.tutorial) {
                    if (this.tutorial.step === 'PRACTICE' || this.tutorial.step === 'RETRY') { this.tutorial.step = 'PRACTICE'; this.resetTutorialBoard(); }
                    else this.startTutorial();
                } else this.startLevel(m.levelIndex, true);
            }, false, this.overlay);
            this.button('返回主页', 0, -184, 430, 74, () => this.navigate('home'), false, this.overlay);
        }
    }
    private persist() { try { sys.localStorage.setItem('guli.save.v3', JSON.stringify(this.save)); this.storageWarning = false; } catch { this.storageWarning = true; } }
    private sound(name: string) { if (this.save.sound && this.clips[name]) this.audio.playOneShot(this.clips[name], name === 'hit' ? 0.22 : 0.36); }
    private syncMusic() {
        const source = this.music;
        if (!source) return;
        if (!this.enabledInHierarchy || !this.musicUnlocked || this.musicHidden || !this.save.sound) { source.pause(); return; }
        const clip = this.musicClips[this.screen === 'game' ? 'bgm_gameplay' : 'bgm_main_menu'];
        if (source.clip !== clip) { source.stop(); source.clip = clip || null; }
        if (clip && !source.playing) source.play();
    }
    private point(e: EventTouch | EventMouse) {
        const p = e.getUILocation(), local = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(p.x, p.y, 0));
        return local.multiplyScalar(1 / this.safeScale);
    }
    private contains(h: Hit, x: number, y: number) { return Math.abs(x - h.x) <= h.w / 2 && Math.abs(y - h.y) <= h.h / 2; }
    private down(pointer: string, x: number, y: number) {
        this.musicUnlocked = true; this.syncMusic();
        if(this.tutorial){if(!this.tutorialSwipe&&y>-490&&y<280)this.tutorialSwipe={pointer,x,y};return;}
        if ((this.screen === 'home' || this.screen === 'gacha') && y > -100 && y < 300) {
            this.navSwipe = { pointer, x, y }; return;
        }
        if (this.modal || this.screen !== 'game' || this.model?.phase !== 'aim') return;
        if (this.hits.some(h => this.contains(h, x, y))) return;
        if (this.sling.pointer !== null) return;
        if (this.sling.begin(pointer, x, y, 0, this.projectY(SHOOTER_Y))) {this.hints.clear();this.updateHints(0);this.updatePull();}
        else if(this.model.levelIndex === 0 && this.model.balls.some(b=>!b.gone&&Math.hypot(x-b.x,y-this.projectY(b.y))<b.r+12)){this.hints.show('wrong');this.updateHints(0);}
    }
    private move(pointer: string, x: number, y: number) {
        if(this.tutorial)return;
        if (this.sling.move(pointer, x, y)) this.updatePull();
    }
    private updatePull() {
        this.power = this.sling.power;
        this.shooterPreview?.setPosition(this.sling.x, this.projectY(SHOOTER_Y) + this.sling.y);
        this.drawAim(); this.drawPower(); this.refreshHud();

    }
    private up(pointer: string, x: number, y: number) {
        if(this.tutorial){const swipe=this.tutorialSwipe;this.tutorialSwipe=null;
            if(swipe?.pointer===pointer&&Math.abs(x-swipe.x)>70&&Math.abs(x-swipe.x)>Math.abs(y-swipe.y)*1.5){
                if(x<swipe.x)this.tutorial.advancePage();else this.tutorial.previous();this.refreshTutorial();}return;}
        if (this.navSwipe?.pointer === pointer) {
            const swipe = this.navSwipe; this.navSwipe = null;
            if (!this.modal && Math.abs(x - swipe.x) > 80 && Math.abs(x - swipe.x) > Math.abs(y - swipe.y) * 1.3) {
                if (this.screen === 'home' && x < swipe.x) this.navigate('gacha');
                else if (this.screen === 'gacha' && x > swipe.x) this.navigate('home');
            }
            return;
        }
        if (this.sling.pointer !== pointer) return;
        const shot = this.sling.release(pointer, x, y);
        if (!shot || this.modal || this.screen !== 'game' || this.model?.phase !== 'aim') { this.cancelInput(); return; }
        const groundY = shot.y / GROUND_Y_SCALE;
        this.power = shot.power;
        if (this.model.launch(-shot.x, -groundY, (shot.power - 1) / 99, shot.x, SHOOTER_Y + groundY)) {
            this.sound('shoot'); this.render();
        } else this.cancelInput();
    }
    private cancelInput() {
        this.tutorialSwipe=null;this.navSwipe=null;this.sling.cancel();
        if (this.screen === 'game' && this.model?.phase === 'aim' && this.shooterPreview?.isValid) this.updatePull();
    }
    private touchDown(e: EventTouch) { this.lastTouch = Date.now(); const p = this.point(e); this.down('touch:' + e.getID(), p.x, p.y); }
    private touchMove(e: EventTouch) { this.lastTouch = Date.now(); const p = this.point(e); this.move('touch:' + e.getID(), p.x, p.y); }
    private touchUp(e: EventTouch) { this.lastTouch = Date.now(); const p = this.point(e); this.up('touch:' + e.getID(), p.x, p.y); }
    private touchCancel(e: EventTouch) { this.lastTouch = Date.now(); if(this.tutorialSwipe?.pointer==='touch:'+e.getID())this.tutorialSwipe=null; if(this.navSwipe?.pointer==='touch:'+e.getID())this.navSwipe=null; if (this.sling.pointer === 'touch:' + e.getID()) this.cancelInput(); }
    private mouseDown(e: EventMouse) {
        if (e.getButton() === 2) { this.cancelInput(); return; }
        if (Date.now() - this.lastTouch < 600 || e.getButton() !== 0) return;
        const p = this.point(e); this.down('mouse', p.x, p.y);
    }
    private mouseMove(e: EventMouse) { if (Date.now() - this.lastTouch < 600) return; const p = this.point(e); this.move('mouse', p.x, p.y); }
    private mouseUp(e: EventMouse) { if (Date.now() - this.lastTouch < 600 || e.getButton() !== 0) return; const p = this.point(e); this.up('mouse', p.x, p.y); }
    private keyDown(e: EventKeyboard) {
        this.musicUnlocked = true; this.syncMusic();
        if(this.tutorial)return;
        if (e.keyCode === KeyCode.ESCAPE && this.sling.pointer !== null) { this.cancelInput(); return; }
        if (e.keyCode === KeyCode.ESCAPE && this.screen === 'game' && this.model?.phase !== 'won' && this.model?.phase !== 'lost') {
            if (this.modal) { this.modal = ''; this.render(); } else this.showModal('pause');
        }
    }
}
