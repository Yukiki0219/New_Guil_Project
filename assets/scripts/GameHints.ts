import { GameModel } from './GameModel';
export type HintReason = 'idle'|'wrong'|'targetOnly'|'boundary'|'miss'|'success'|'low';
export const HINT_TEXT: Record<HintReason,string> = {
    idle:'按住你的弹珠，向后拖动，再松开发射。', wrong:'从你的弹珠开始拖动。',
    targetOnly:'目标已经出圈，你的弹珠也要完全出圈。\n本次已消耗 1 次。',
    boundary:'需要整颗弹珠完全离开白圈。', miss:'试着调整方向和力度，\n让两颗弹珠都完全出圈。',
    success:'有效击出！', low:'留意剩余次数，调整方向后再发射。',
};
/** Feedback policy uses settled results only; timers never adjudicate a shot. */
export class GameHints {
    reason: HintReason|null=null;
    remaining=0;
    idle=0;
    repeated=0;
    private time=0;
    private seen=new Map<HintReason,number>();
    private last:HintReason|null=null;
    clear(){this.reason=null;this.remaining=0;this.idle=0;}
    show(reason:HintReason){
        if(this.time-(this.seen.get(reason)??-100)<12)return;
        this.seen.set(reason,this.time);this.repeated=this.last===reason?this.repeated+1:1;this.last=reason;
        this.reason=reason;this.remaining=6;this.idle=0;
    }
    tick(dt:number, aiming:boolean){this.time+=dt;this.remaining-=dt;if(this.remaining<=0)this.reason=null;
        if(aiming){this.idle+=dt;if(this.idle>=10)this.show('idle');}else this.idle=0;
    }
    resolved(m:GameModel){
        this.clear();const r=m.lastShotReport;if(!r)return;
        if(r.shooterExited&&r.targetsOut>0)this.show('success');
        else if(!r.shooterExited&&r.targetsOut>0)this.show('targetOnly');
        else if(r.touchingBoundary)this.show('boundary');
        else this.show('miss');
    }
}
