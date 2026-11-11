/** Huawei Runtime Quick Game login. No storage access or gameplay state mutations. */
export const HUAWEI_APP_ID = '119547855';
export type LoginState = 'idle' | 'pending' | 'authenticated' | 'cancelled' | 'blocked' | 'unsupported' | 'timeout' | 'failed' | 'invalid-result';
export interface HuaweiPlayer { playerId: string; displayName?: string; imageUri?: string }
export interface HuaweiQuickGame {
    gameLoginWithReal(options: {
        appid: string; forceLogin: number;
        success(data: HuaweiPlayer): void;
        fail(data: unknown, code?: number | string): void;
    }): void;
}
declare const qg: HuaweiQuickGame | undefined;
export class HuaweiLogin {
    state: LoginState = 'idle';
    player: HuaweiPlayer | null = null;
    errorCode: number | null = null;
    onChange: (() => void) | null = null;
    private generation = 0;
    private disposed = false;
    private identityRestricted = false;
    private timer: ReturnType<typeof setTimeout> | null = null;
    constructor(readonly required: boolean,
        private runtime: () => HuaweiQuickGame | undefined = () => typeof qg === 'undefined' ? undefined : qg,
        private timeoutMs = 120000) {}
    get canPlay() { return !this.required || !this.identityRestricted; }
    /** Account status only; local saves remain independent of login. */
    get isAuthenticated() { return !this.disposed && this.state === 'authenticated' && !!this.player?.playerId; }
    /** One native request at a time. Retrying requires an explicit player action. */
    login(interactive = false) {
        if (this.disposed || !this.required || this.state === 'pending' || this.state === 'authenticated') return;
        const generation = ++this.generation;
        this.player = null; this.errorCode = null;
        const finish = (state: LoginState, player: HuaweiPlayer | null = null, code: number | null = null, reason = 'none') => {
            if (this.disposed || generation !== this.generation) return;
            ++this.generation; this.clearTimer(); this.player = player; this.errorCode = code;
            // A retry, timeout or network failure must not bypass a platform identity restriction.
            if (state === 'blocked') this.identityRestricted = true;
            if (state === 'authenticated') this.identityRestricted = false;
            // Diagnostic metadata only: never serialize the native result, player ID or signature.
            const diagnostic = '[GULI HMS] qg.gameLoginWithReal forceLogin=' + (interactive ? 1 : 0) + ' result=' + state + ' code=' + (code ?? 'none') + ' reason=' + reason;
            if (state === 'authenticated') console.info(diagnostic); else console.error(diagnostic);
            this.state = state; this.onChange?.();
        };
        this.state = 'pending'; this.onChange?.();
        try {
            const api = this.runtime();
            if (!api || typeof api.gameLoginWithReal !== 'function') { finish('unsupported'); return; }
            console.info('[GULI HMS] qg.gameLoginWithReal appid=' + HUAWEI_APP_ID + ' forceLogin=' + (interactive ? 1 : 0));
            this.timer = setTimeout(() => finish('timeout'), this.timeoutMs);
            api.gameLoginWithReal({
                appid: HUAWEI_APP_ID, forceLogin: interactive ? 1 : 0,
                success: data => {
                    if (!data || typeof data.playerId !== 'string' || !data.playerId.trim()) { finish('invalid-result'); return; }
                    // Account data stays in memory. Do not log credentials or use it to replace local saves.
                    finish('authenticated', { playerId: data.playerId, displayName: data.displayName, imageUri: data.imageUri });
                },
                fail: (data, rawCode) => {
                    const value = rawCode ?? (data && typeof data === 'object' ? (data as { code?: unknown }).code : undefined);
                    const code = value === undefined || value === null ? NaN : Number(value);
                    const message = typeof data === 'string' ? data : data && typeof data === 'object' ? (data as { message?: unknown; errMsg?: unknown }).message ?? (data as { errMsg?: unknown }).errMsg : '';
                    // Only known error phrases may enter logs; arbitrary native payloads stay private.
                    const reason = typeof message === 'string' ? message.match(/auth fail(?:\s*-1)?|login fail|network error|timeout|cancelled|canceled/i)?.[0] ?? 'native error' : 'native error';
                    finish(code === 7004 || code === 2012 ? 'cancelled' : code === 7021 ? 'blocked' : 'failed', null, Number.isFinite(code) ? code : null, reason);
                },
            });
        } catch { finish('failed'); }
    }
    private clearTimer() { if (this.timer !== null) clearTimeout(this.timer); this.timer = null; }
    dispose() { this.disposed = true; ++this.generation; this.clearTimer(); this.onChange = null; this.player = null; }
}

export const LOGIN_TEXT: Record<LoginState, string> = {
    idle: '未登录 HMS，仍可正常游玩，记录保存在本地。', pending: '正在登录华为帐号，请稍候…', authenticated: '登录成功',
    cancelled: '已取消登录，可继续游玩或稍后重试。', blocked: '实名认证未完成，请重新登录完成认证后继续。',
    unsupported: '当前环境不支持华为游戏登录，请使用受支持的华为快游戏环境。',
    timeout: '登录等待超时，请检查网络后重试。', failed: '华为登录失败，请检查网络与帐号后重试。',
    'invalid-result': '未获取到有效玩家信息，请重试登录。',
};
