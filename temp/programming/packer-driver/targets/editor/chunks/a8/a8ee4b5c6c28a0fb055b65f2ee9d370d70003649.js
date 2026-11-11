System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, HuaweiLogin, _crd, HUAWEI_APP_ID, LOGIN_TEXT;

  _export("HuaweiLogin", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4303dCcDoVNfI0QGLHeqjnV", "HuaweiLogin", undefined);

      /** Huawei Runtime Quick Game login. No storage access or gameplay state mutations. */
      _export("HUAWEI_APP_ID", HUAWEI_APP_ID = '119547855');

      _export("HuaweiLogin", HuaweiLogin = class HuaweiLogin {
        constructor(required, runtime = () => typeof qg === 'undefined' ? undefined : qg, timeoutMs = 120000) {
          this.state = 'idle';
          this.player = null;
          this.errorCode = null;
          this.onChange = null;
          this.generation = 0;
          this.disposed = false;
          this.identityRestricted = false;
          this.timer = null;
          this.required = required;
          this.runtime = runtime;
          this.timeoutMs = timeoutMs;
        }

        get canPlay() {
          return !this.required || !this.identityRestricted;
        }
        /** Account status only; local saves remain independent of login. */


        get isAuthenticated() {
          var _this$player;

          return !this.disposed && this.state === 'authenticated' && !!((_this$player = this.player) != null && _this$player.playerId);
        }
        /** One native request at a time. Retrying requires an explicit player action. */


        login(interactive = false) {
          var _this$onChange2;

          if (this.disposed || !this.required || this.state === 'pending' || this.state === 'authenticated') return;
          const generation = ++this.generation;
          this.player = null;
          this.errorCode = null;

          const finish = (state, player = null, code = null, reason = 'none') => {
            var _this$onChange;

            if (this.disposed || generation !== this.generation) return;
            ++this.generation;
            this.clearTimer();
            this.player = player;
            this.errorCode = code; // A retry, timeout or network failure must not bypass a platform identity restriction.

            if (state === 'blocked') this.identityRestricted = true;
            if (state === 'authenticated') this.identityRestricted = false; // Diagnostic metadata only: never serialize the native result, player ID or signature.

            const diagnostic = '[GULI HMS] qg.gameLoginWithReal forceLogin=' + (interactive ? 1 : 0) + ' result=' + state + ' code=' + (code != null ? code : 'none') + ' reason=' + reason;
            if (state === 'authenticated') console.info(diagnostic);else console.error(diagnostic);
            this.state = state;
            (_this$onChange = this.onChange) == null || _this$onChange.call(this);
          };

          this.state = 'pending';
          (_this$onChange2 = this.onChange) == null || _this$onChange2.call(this);

          try {
            const api = this.runtime();

            if (!api || typeof api.gameLoginWithReal !== 'function') {
              finish('unsupported');
              return;
            }

            console.info('[GULI HMS] qg.gameLoginWithReal appid=' + HUAWEI_APP_ID + ' forceLogin=' + (interactive ? 1 : 0));
            this.timer = setTimeout(() => finish('timeout'), this.timeoutMs);
            api.gameLoginWithReal({
              appid: HUAWEI_APP_ID,
              forceLogin: interactive ? 1 : 0,
              success: data => {
                if (!data || typeof data.playerId !== 'string' || !data.playerId.trim()) {
                  finish('invalid-result');
                  return;
                } // Account data stays in memory. Do not log credentials or use it to replace local saves.


                finish('authenticated', {
                  playerId: data.playerId,
                  displayName: data.displayName,
                  imageUri: data.imageUri
                });
              },
              fail: (data, rawCode) => {
                var _message, _message$match$, _message$match;

                const value = rawCode != null ? rawCode : data && typeof data === 'object' ? data.code : undefined;
                const code = value === undefined || value === null ? NaN : Number(value);
                const message = typeof data === 'string' ? data : data && typeof data === 'object' ? (_message = data.message) != null ? _message : data.errMsg : ''; // Only known error phrases may enter logs; arbitrary native payloads stay private.

                const reason = typeof message === 'string' ? (_message$match$ = (_message$match = message.match(/auth fail(?:\s*-1)?|login fail|network error|timeout|cancelled|canceled/i)) == null ? void 0 : _message$match[0]) != null ? _message$match$ : 'native error' : 'native error';
                finish(code === 7004 || code === 2012 ? 'cancelled' : code === 7021 ? 'blocked' : 'failed', null, Number.isFinite(code) ? code : null, reason);
              }
            });
          } catch {
            finish('failed');
          }
        }

        clearTimer() {
          if (this.timer !== null) clearTimeout(this.timer);
          this.timer = null;
        }

        dispose() {
          this.disposed = true;
          ++this.generation;
          this.clearTimer();
          this.onChange = null;
          this.player = null;
        }

      });

      _export("LOGIN_TEXT", LOGIN_TEXT = {
        idle: '未登录 HMS，仍可正常游玩，记录保存在本地。',
        pending: '正在登录华为帐号，请稍候…',
        authenticated: '登录成功',
        cancelled: '已取消登录，可继续游玩或稍后重试。',
        blocked: '实名认证未完成，请重新登录完成认证后继续。',
        unsupported: '当前环境不支持华为游戏登录，请使用受支持的华为快游戏环境。',
        timeout: '登录等待超时，请检查网络后重试。',
        failed: '华为登录失败，请检查网络与帐号后重试。',
        'invalid-result': '未获取到有效玩家信息，请重试登录。'
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a8ee4b5c6c28a0fb055b65f2ee9d370d70003649.js.map