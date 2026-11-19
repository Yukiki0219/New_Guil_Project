import { REWARDS, rewardById } from './Gacha';

/** Rules only. Position/radius and velocity snapshots use ground-plane pixels and pixels/s.
 * Cocos Box2D owns integration, damping and contact resolution in GuliPhysics. */
export interface Marble { id: number; x: number; y: number; vx: number; vy: number; r: number; shooter: boolean; entered: boolean; gone: boolean }
export interface Level { title: string; target: number; shots: number; three: number; two: number; positions: number[][] }
export const MARBLE_COUNT = 56;
export const RADIUS = 260;
export const SHOOTER_Y = -350;
export const LAUNCH_MIN = 380;
export const LAUNCH_MAX = 1600;
/** Final ground-plane launch speed (pixels/s), shared by launch and aim prediction. */
export function launchSpeed(power: number): number {
    return (LAUNCH_MIN + Math.max(0, Math.min(1, power)) * (LAUNCH_MAX - LAUNCH_MIN)) * 1.1;
}
export const SETTLE_SPEED = 2; // ground pixels/s, NOT Box2D metres/s
export const SETTLE_DURATION = 0.25;
const grid = (...rows: string[]): number[][] => {
    const positions: number[][] = [];
    rows.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] === 'o') positions.push([(x - 2) * 85, (2 - y) * 70]); });
    return positions;
};
export const LEVELS: Level[] = [
    { title: '第一撞', target: 2, shots: 4, three: 2, two: 3, positions: [[0, 190], [0, 120]] },
    { title: '左右选择', target: 2, shots: 5, three: 2, two: 3, positions: grid('.....', '..o..', '.o.o.', '.....', '.....') },
    { title: '轻重之间', target: 2, shots: 5, three: 2, two: 3, positions: grid('.....', '.....', '.o...', '.o.o.', '.....') },
    { title: '初见弹珠', target: 2, shots: 5, three: 2, two: 3, positions: [[-105, 90], [105, 90], [-100, -85], [100, -85]] },
    { title: '小三角', target: 3, shots: 6, three: 3, two: 4, positions: grid('..o..', '.o.o.', '.....', '.o.o.', '.....') },
    { title: '偏心一击', target: 2, shots: 5, three: 2, two: 3, positions: grid('.o...', '..o..', '.....', '...o.', '....o') },
    { title: '斜线', target: 3, shots: 6, three: 2, two: 4, positions: grid('....o', '...o.', '..o..', '.o...', 'o....') },
    { title: '寻找角度', target: 3, shots: 6, three: 3, two: 4, positions: [[-170, 70], [-65, 150], [100, 145], [175, 0], [-110, -100], [65, -90]] },
    { title: '宽 V', target: 3, shots: 7, three: 2, two: 4, positions: grid('o...o', '.o.o.', '.....', '.o.o.', '.....') },
    { title: '双向出口', target: 4, shots: 7, three: 3, two: 5, positions: grid('.o.o.', 'o...o', '..o..', 'o...o', '.....') },
    { title: '短链', target: 3, shots: 6, three: 3, two: 4, positions: grid('.....', '.ooo.', '.....', 'o.o.o', '.....') },
    { title: '交错两列', target: 4, shots: 7, three: 3, two: 5, positions: grid('.o.o.', 'o...o', '..o..', '.o.o.', '.....') },
    { title: '连锁反应', target: 4, shots: 8, three: 3, two: 5, positions: [[-65, -100], [-60, -40], [-55, 20], [-50, 80], [80, -70], [90, 0], [100, 70], [110, 140]] },
    { title: '中心借力', target: 4, shots: 8, three: 4, two: 5, positions: grid('.ooo.', '.o.o.', '..o..', 'o...o', '.....') },
    { title: '两团相接', target: 5, shots: 9, three: 3, two: 5, positions: grid('.o..o', 'o.o.o', '..o..', 'o.o.o', '.....') },
    { title: '近边练习', target: 3, shots: 6, three: 2, two: 4, positions: grid('o...o', 'o...o', '.....', '.o.o.', '.....') },
    { title: '远近混排', target: 4, shots: 8, three: 4, two: 5, positions: grid('.o.o.', '..o..', '.o.o.', 'o...o', '.....') },
    { title: '侧边出口', target: 4, shots: 8, three: 4, two: 5, positions: grid('.ooo.', '.o...', '.o.o.', '..o.o', '.....') },
    { title: '弧线', target: 5, shots: 9, three: 4, two: 6, positions: grid('.ooo.', 'o...o', '..o..', 'o...o', '.o...') },
    { title: '疏密混排', target: 5, shots: 9, three: 5, two: 6, positions: grid('.ooo.', '.o.o.', '..o..', 'o...o', '.o...') },
    { title: '三组小球', target: 4, shots: 8, three: 3, two: 5, positions: grid('.o.o.', 'o...o', '..o..', 'o...o', '.o...') },
    { title: '双层错位', target: 5, shots: 9, three: 5, two: 6, positions: grid('.o.o.', 'o.o.o', '.o.o.', '.....', 'o...o') },
    { title: '两侧接力', target: 5, shots: 9, three: 4, two: 6, positions: grid('.o.o.', 'o.o.o', '..o..', 'o.o.o', '.o...') },
    { title: '半环', target: 6, shots: 10, three: 5, two: 7, positions: grid('.ooo.', 'o...o', '.o.o.', 'o...o', '.o...') },
    { title: '恰到好处', target: 6, shots: 10, three: 6, two: 7, positions: [[-165, 90], [-110, 130], [-55, 170], [40, 180], [100, 135], [160, 80], [-125, -100], [-65, -65], [65, -65], [125, -100]] },
    { title: '分区回顾', target: 5, shots: 9, three: 4, two: 6, positions: grid('.o.o.', 'o...o', '..o..', 'o...o', '.o.o.') },
    { title: '双弧', target: 6, shots: 10, three: 4, two: 6, positions: grid('.ooo.', 'o...o', '..o..', 'o...o', '.o.o.') },
    { title: '错位密阵', target: 7, shots: 10, three: 7, two: 8, positions: grid('.ooo.', 'o.o.o', '.o.o.', 'o...o', '..o..') },
    { title: '双出口', target: 7, shots: 11, three: 5, two: 8, positions: grid('.ooo.', 'o.o.o', '.o.o.', 'o.o.o', '.o...') },
    { title: '庭院大师', target: 8, shots: 11, three: 6, two: 8, positions: [[-165, 40], [-120, 90], [-75, 140], [-25, 190], [35, 180], [95, 140], [145, 90], [175, 30], [-100, -105], [-45, -80], [45, -80], [100, -105]] },
];
export type Phase = 'aim' | 'moving' | 'won' | 'lost';
export class GameModel {
    balls: Marble[] = [];
    phase: Phase = 'aim';
    used = 0;
    knocked: number[] = [];
    elapsed = 0;
    quiet = 0;
    impacts: number[] = [];
    lastShotInvalid = false;
    lastShotReport: { targetsOut: number; shooterExited: boolean; touchingBoundary: boolean; shooter?: { x: number; y: number } } | null = null;
    private shotSnapshot: { balls: Marble[]; knocked: number[] } | null = null;
    private shooterExited = false;
    constructor(public levelIndex = 0, public ids?: number[]) { this.reset(); }
    get level() { return LEVELS[this.levelIndex]; }
    get remaining() { return this.level.shots - this.used; }
    get stars() { return this.phase !== 'won' ? 0 : this.used <= this.level.three ? 3 : this.used <= this.level.two ? 2 : 1; }
    reset() {
        this.lastShotReport = null;
        this.shotSnapshot = null; this.shooterExited = false;
        this.balls = this.level.positions.map(([x, y], i) => ({ id: this.ids ? this.ids[i] : i, x, y, vx: 0, vy: 0, r: 30, shooter: false, entered: true, gone: false }));
        this.lastShotInvalid = false;
        this.used = 0; this.knocked = []; this.phase = 'aim'; this.elapsed = 0; this.quiet = 0;
    }
    shoot(x: number, y: number, power: number): boolean {
        return this.launch(x, Math.max(60, y - SHOOTER_Y), power);
    }
    /** Launch a normalized velocity from the released slingshot position. */
    launch(dx: number, dy: number, power: number, x = 0, y = SHOOTER_Y): boolean {
        if (this.phase !== 'aim' || this.remaining <= 0 || !Number.isFinite(x + y + power)) return false;
        const d = Math.hypot(dx, dy);
        if (!Number.isFinite(d) || d < 0.000001) return false;
        this.shotSnapshot = { balls: this.balls.filter(b => !b.shooter).map(b => ({ ...b })), knocked: [...this.knocked] };
        this.shooterExited = false; this.lastShotInvalid = false;
        this.lastShotReport = null;
        const speed = launchSpeed(power);
        this.balls.push({ id: -1, x, y, vx: dx / d * speed, vy: dy / d * speed, r: 32, shooter: true, entered: Math.hypot(x, y) < RADIUS + 32, gone: false });
        this.used++; this.phase = 'moving'; this.elapsed = 0; this.quiet = 0;
        return true;
    }
    /** Consume a completed engine step, including all contact callbacks. No physics solver here. */
    afterPhysics(dt: number, contactImpulse = false, settleSpeed = SETTLE_SPEED, settleDuration = SETTLE_DURATION) {
        if (this.phase !== 'moving') return;
        this.elapsed += dt;
        const active = this.balls.filter(b => !b.gone);
        for (const b of active) {
            const d = Math.hypot(b.x, b.y);
            if (b.shooter && d < RADIUS + b.r) b.entered = true;
            // Entire disc must clear the circle. The shooter starts outside and is exempt until entry.
            if ((!b.shooter || b.entered) && d > RADIUS + b.r) {
                if (b.shooter) this.shooterExited = true;
                b.gone = true;
            }
            if (b.shooter && d > 650) b.gone = true;
        }
        const moving = this.balls.some(b => !b.gone && Math.hypot(b.vx, b.vy) >= settleSpeed);
        this.quiet = moving || contactImpulse ? 0 : this.quiet + dt;
        // A timeout must never decide a shot that still has moving marbles.
        if (this.quiet >= settleDuration) this.finishShot();
    }
    finishShot() {
        if (this.phase !== 'moving') return;
        this.lastShotInvalid = !!this.shotSnapshot && !this.shooterExited;
        // Capture feedback before rollback removes the evidence. This never changes adjudication.
        this.lastShotReport = {
            targetsOut: this.balls.filter(b => !b.shooter && b.gone).length,
            shooterExited: this.shooterExited,
            touchingBoundary: this.balls.some(b => !b.gone && (!b.shooter || b.entered) && Math.abs(Math.hypot(b.x, b.y) - RADIUS) <= b.r),
            shooter: this.balls.filter(b => b.shooter).map(b => ({ x: b.x, y: b.y }))[0],
        };
        if (this.lastShotInvalid) {
            // Restore independent copies, including targets removed from the physics world.
            // used is deliberately not restored: every accepted launch costs one attempt.
            this.balls = this.shotSnapshot.balls.map(b => ({ ...b }));
            this.knocked = [...this.shotSnapshot.knocked];
        } else {
            this.balls.forEach(b => { if (b.gone && !b.shooter) this.knocked.push(b.id); });
            this.balls = this.balls.filter(b => !b.shooter && !b.gone);
            this.balls.forEach(b => { b.vx = 0; b.vy = 0; });
        }
        this.shotSnapshot = null; this.shooterExited = false;
        // Win takes priority over exhausted shots, after the entire chain has settled.
        this.phase = this.knocked.length >= this.level.target ? 'won' : this.remaining === 0 ? 'lost' : 'aim';
    }
}
export interface SaveData { version: number; stars: number[]; collection: number[]; sound: boolean; musicVolume: number; effectsVolume: number; tuto: boolean; language: 'zh' | 'en'; starBalance: number; rewards: string[]; equipped: { scene: string | null; marble: string | null; trail: string | null } }
export function cleanSave(raw: any): SaveData {
    const oldLevels = [3, 7, 12, 24, 29];
    const stars = LEVELS.map((_, i) => {
        const source = raw?.version === 4 ? i : oldLevels.indexOf(i);
        return Math.max(0, Math.min(3, Math.floor(Number(raw?.stars?.[source]) || 0)));
    });
    const rewards = Array.from(new Set<string>((Array.isArray(raw?.rewards) ? raw.rewards : []).filter((id: any) => typeof id === 'string' && REWARDS.some(reward => reward.id === id))));
    const equipped = (['scene', 'marble', 'trail'] as const).reduce((result, kind) => {
        const id = raw?.equipped?.[kind]; result[kind] = rewards.includes(id) && rewardById(id)?.kind === kind ? id : null; return result;
    }, { scene: null, marble: null, trail: null } as SaveData['equipped']);
    const previousVolume = raw?.sound === false ? 0 : 1;
    const volume = (value: any) => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : previousVolume;
    const musicVolume = volume(raw?.musicVolume), effectsVolume = volume(raw?.effectsVolume);
    return { version: 4, stars,
        collection: Array.from(new Set<number>((Array.isArray(raw?.collection) ? raw.collection : []).filter((n: any) => Number.isInteger(n) && n >= 0 && n < MARBLE_COUNT))),
        sound: musicVolume > 0 || effectsVolume > 0, musicVolume, effectsVolume, tuto: raw?.tuto === true, language: raw?.language === 'en' ? 'en' : 'zh',
        starBalance: raw?.version >= 3 && Number.isFinite(raw?.starBalance) ? Math.max(0, Math.floor(raw.starBalance)) : raw?.version >= 3 ? 0 : stars.reduce((sum, value) => sum + value, 0),
        rewards, equipped };
}
export function award(save: SaveData, game: GameModel): SaveData {
    const next = cleanSave(save);
    if (game.phase === 'won') {
        next.starBalance += Math.max(0, game.stars - next.stars[game.levelIndex]);
        next.stars[game.levelIndex] = Math.max(next.stars[game.levelIndex], game.stars);
        next.collection = Array.from(new Set(next.collection.concat(game.knocked)));
    }
    return next;
}
export function rollMarbles(
    count: number,
    random = Math.random
): number[] {
    return Array.from({ length: count }, () => {
        const roll = random();

        let ids: number[];

        if (roll < 0.50) {
            // Common: 50%
            ids = Array.from({ length: 23 }, (_, i) => i); // 0–22
        } else if (roll < 0.85) {
            // Rare: 35%
            ids = Array.from({ length: 16 }, (_, i) => 23 + i); // 23–38
        } else if (roll < 0.975) {
            // Super Rare: 12.5%
            ids = Array.from({ length: 8 }, (_, i) => 39 + i); // 39–46
        } else if (roll < 0.995) {
            // Collectible: 2%
            ids = Array.from({ length: 5 }, (_, i) => 47 + i); // 47–51
        } else {
            // Legendary: 0.5%
            ids = Array.from({ length: 4 }, (_, i) => 52 + i); // 52–55
        }

        // Duplicate marbles are allowed.
        // Every draw is independent; previously drawn IDs are not excluded.
        return ids[Math.min(
            ids.length - 1,
            Math.floor(random() * ids.length)
        )];
    });
}

const colors = [
    '海蓝', '琥珀', '翡翠', '紫晶', '樱桃',
    '月白', '薄荷', '珊瑚', '靛青', '金橙'
];

const patterns = [
    '流纹', '涟漪', '星砂', '花瓣', '幻彩'
];

const superRareNames = [
    '樱花梦境',
    '蓝莲之光',
    '金盏晨曦',
    '紫藤幻境',
    '翡翠铃兰',
    '樱雪雏菊',
    '烈阳百合',
    '紫雾薰衣草'
];

const collectibleNames = [
    '月影白兔',
    '星瞳灵猫',
    '赤焰小狐',
    '墨玉熊猫',
    '锦鳞金鲤'
];

const legendaryNames = [
    '青龙',
    '白虎',
    '朱雀',
    '玄武'
];

export function marbleName(id: number): string {
    if (!Number.isInteger(id) || id < 0 || id > 55) {
        return '未知弹珠';
    }

    if (id < 23) {
        return colors[id % colors.length] +
            patterns[Math.floor(id / colors.length)];
    }

    if (id < 39) {
        return colors[id % colors.length] +
            patterns[Math.floor((id - 23) / 10)];
    }

    if (id < 47) {
        return superRareNames[id - 39];
    }

    if (id < 52) {
        return collectibleNames[id - 47];
    }

    return legendaryNames[id - 52];
}

export function rarity(id: number): string {
    if (!Number.isInteger(id) || id < 0 || id > 55) {
        return '未知';
    }

    if (id >= 52) return '传奇';
    if (id >= 47) return '珍藏';
    if (id >= 39) return '超级稀有';
    if (id >= 23) return '稀有';

    return '普通';
}

