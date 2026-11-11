System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, GameModel, TutorialGameModel, Tutorial, _crd, PRACTICE_LEVEL;

  function tutorialText(step, remaining) {
    const copy = {
      WELCOME: ['Welcome to Guli!', 'Aim, pull back and release.\nLet’s learn with a real marble!', "Let's Go!"],
      IDENTIFY: ['Meet Your Shooter', 'Your blue marble is below the circle.\nKnock the target out with it.', 'Got it!'],
      AIM: ['Aim Carefully', 'Hold your marble and pull backwards.\nThe arrow points where it will go.', ''],
      POWER: ['Nice aim! Choose Your Power', 'Keep holding. Pull farther or closer\nto change power by at least 15.', ''],
      SHOOT: ['Great! Take Your Shot', 'Release to shoot.\nPull back again if you let go early.', ''],
      RESOLVING: ['Watch Your Shot', 'Wait for every marble to stop.\nEach release uses one shot.', ''],
      OBJECTIVE: ['Knock It Out!', 'Both shooter and target must fully exit.\nShooter stays in? Targets reset; shot spent.', 'Continue'],
      LIMITED: ['Make Every Shot Count', `${remaining} shots left in this demonstration.\nNo shots left? Retry the challenge.`, 'Practice'],
      PRACTICE: ['Your Turn!', 'Knock the target fully out; your shooter too.\nTry a strong, slightly off-centre hit.', ''],
      RETRY: ['Try Again!', 'No shots left. Aim slightly beside the target\nso your shooter can keep rolling out.', 'Retry'],
      COMPLETED: ['You Did It!', 'Tutorial complete!\nYour real adventure starts at Level 1.', 'Play Level 1']
    };
    return copy[step];
  }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevel(extras) {
    _reporterNs.report("Level", "./GameModel", _context.meta, extras);
  }

  _export({
    TutorialGameModel: void 0,
    Tutorial: void 0,
    tutorialText: tutorialText
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      GameModel = _unresolved_2.GameModel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "87381hxaGJHCLF6xy04L4yZ", "Tutorial", undefined);

      /** Isolated layout, same engine and full-disc exit rules as normal levels. */
      PRACTICE_LEVEL = {
        title: 'Practice — no collection rewards',
        target: 1,
        shots: 5,
        three: 2,
        two: 3,
        positions: [[70, 150]]
      };

      _export("TutorialGameModel", TutorialGameModel = class TutorialGameModel extends (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
        error: Error()
      }), GameModel) : GameModel) {
        get level() {
          return PRACTICE_LEVEL;
        }

      });
      /** Transient step state only. SaveData.tuto is the sole persistent completion flag. */


      _export("Tutorial", Tutorial = class Tutorial {
        constructor() {
          this.page = 0;
          this.step = 'WELCOME';
          this.aimPower = 1;
        }

        previous() {
          this.page = Math.max(0, this.page - 1);
        }

        advancePage() {
          this.page = Math.min(2, this.page + 1);
        }

        get allowsPull() {
          return ['AIM', 'POWER', 'SHOOT', 'PRACTICE'].includes(this.step);
        }

        get allowsShot() {
          return this.step === 'SHOOT' || this.step === 'PRACTICE';
        }

        next() {
          const next = {
            WELCOME: 'IDENTIFY',
            IDENTIFY: 'AIM',
            OBJECTIVE: 'LIMITED',
            LIMITED: 'PRACTICE',
            RETRY: 'PRACTICE'
          };
          if (next[this.step]) this.step = next[this.step];
        }

        observePull(distance, power) {
          if (this.step === 'AIM' && distance >= 24) {
            this.aimPower = power;
            this.step = 'POWER';
          } else if (this.step === 'POWER' && distance >= 24 && Math.abs(power - this.aimPower) >= 15) this.step = 'SHOOT';
        }

        shotStarted() {
          if (this.step === 'SHOOT') this.step = 'RESOLVING';
        }

        shotResolved(phase) {
          if (phase === 'moving') return;
          if (this.step === 'RESOLVING') this.step = 'OBJECTIVE';else if (this.step === 'PRACTICE') {
            if (phase === 'won') this.step = 'COMPLETED';else if (phase === 'lost') this.step = 'RETRY';
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2e22cb0681c1eda0c2d62b8079a8385a13375c26.js.map