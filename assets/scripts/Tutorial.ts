import { GameModel, Level } from './GameModel';

export type TutorialStep = 'WELCOME' | 'IDENTIFY' | 'AIM' | 'POWER' | 'SHOOT' | 'RESOLVING' | 'OBJECTIVE' | 'LIMITED' | 'PRACTICE' | 'RETRY' | 'COMPLETED';

/** Isolated layout, same engine and full-disc exit rules as normal levels. */
const PRACTICE_LEVEL: Level = {
    title: 'Practice — no collection rewards', target: 1, shots: 5, three: 2, two: 3,
    positions: [[70, 150]],
};
export class TutorialGameModel extends GameModel {
    get level() { return PRACTICE_LEVEL; }
}

/** Transient step state only. SaveData.tuto is the sole persistent completion flag. */
export class Tutorial {
    page = 0;
    previous() { this.page = Math.max(0, this.page - 1); }
    advancePage() { this.page = Math.min(2, this.page + 1); }
    step: TutorialStep = 'WELCOME';
    private aimPower = 1;
    get allowsPull() { return ['AIM', 'POWER', 'SHOOT', 'PRACTICE'].includes(this.step); }
    get allowsShot() { return this.step === 'SHOOT' || this.step === 'PRACTICE'; }
    next() {
        const next: Partial<Record<TutorialStep, TutorialStep>> = {
            WELCOME: 'IDENTIFY', IDENTIFY: 'AIM', OBJECTIVE: 'LIMITED', LIMITED: 'PRACTICE', RETRY: 'PRACTICE',
        };
        if (next[this.step]) this.step = next[this.step]!;
    }
    observePull(distance: number, power: number) {
        if (this.step === 'AIM' && distance >= 24) { this.aimPower = power; this.step = 'POWER'; }
        else if (this.step === 'POWER' && distance >= 24 && Math.abs(power - this.aimPower) >= 15) this.step = 'SHOOT';
    }
    shotStarted() { if (this.step === 'SHOOT') this.step = 'RESOLVING'; }
    shotResolved(phase: GameModel['phase']) {
        if (phase === 'moving') return;
        if (this.step === 'RESOLVING') this.step = 'OBJECTIVE';
        else if (this.step === 'PRACTICE') {
            if (phase === 'won') this.step = 'COMPLETED';
            else if (phase === 'lost') this.step = 'RETRY';
        }
    }
}

export function tutorialText(step: TutorialStep, remaining: number): [string, string, string] {
    const copy: Record<TutorialStep, [string, string, string]> = {
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
        COMPLETED: ['You Did It!', 'Tutorial complete!\nYour real adventure starts at Level 1.', 'Play Level 1'],
    };
    return copy[step];
}
