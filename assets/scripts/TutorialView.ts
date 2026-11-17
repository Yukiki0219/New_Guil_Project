import { Node, UITransform, Graphics, Color, Label, Button } from 'cc';

export interface TutorialArt {
    translate?(text: string): string;
    playSound?(name: string): void;
    part(name: string, parent: Node, x: number, y: number, w: number, h: number): Node | null;
    marble(parent: Node, id: number, x: number, y: number, r: number): Node;
}
/** Independent presentation only: no physics bodies, model mutations or global listeners. */
export class TutorialView {
    readonly root: Node;
    private time = 0;
    private demo: Node | null = null;
    private hand: Node | null = null;
    private power: Graphics | null = null;
    constructor(parent: Node, private art: TutorialArt) { this.root = this.node('TutorialOverlay', parent, 0, 0, 720, 1280); }
    private node(name: string, parent: Node, x: number, y: number, w = 720, h = 1280) {
        const n = new Node(name); n.layer = parent.layer; parent.addChild(n); n.setPosition(x,y);
        n.addComponent(UITransform).setContentSize(w,h); return n;
    }
    private color(hex: string) { const c = new Color(); Color.fromHEX(c,hex); return c; }
    private text(text: string, x: number, y: number, size = 26, width = 620, parent = this.root, color = '#164e54') {
        const n = this.node(text, parent, x,y,width,size*3.5), l = n.addComponent(Label);
        l.string=this.art.translate?.(text) ?? text; l.fontSize=size; l.lineHeight=size*1.35; l.fontFamily='Microsoft YaHei'; l.color=this.color(color);
        l.horizontalAlign=Label.HorizontalAlign.CENTER; l.verticalAlign=Label.VerticalAlign.CENTER; l.overflow=Label.Overflow.SHRINK; return n;
    }
    private box(x: number,y: number,w: number,h: number,fill='#fff2d7') {
        const n=this.node('TutorialCard',this.root,x,y,w,h),g=n.addComponent(Graphics);
        g.fillColor=this.color(fill); g.roundRect(-w/2,-h/2,w,h,26);g.fill();
        g.strokeColor=this.color('#e0a13d');g.lineWidth=3;g.stroke();
        g.strokeColor=this.color('#ffffff');g.lineWidth=2;g.roundRect(-w/2+6,-h/2+6,w-12,h-12,21);g.stroke();return n;
    }
    private ring(x:number,y:number,r:number) {
        if(this.art.part('ChalkRing',this.root,x,y,r*2+10,r*2+10))return;
        const g=this.node('WhiteCircle',this.root,x,y).addComponent(Graphics);g.strokeColor=Color.WHITE;g.lineWidth=5;g.circle(0,0,r);g.stroke();
    }
    private arrow(x:number,y:number,dx:number,dy:number,color:string) {
        const n=this.node('DirectionArrow',this.root,x,y),g=n.addComponent(Graphics);n.angle=Math.atan2(dy,dx)*180/Math.PI-90;
        const length=Math.hypot(dx,dy);g.strokeColor=this.color(color);g.fillColor=this.color(color);g.lineWidth=7;
        g.moveTo(0,0);g.lineTo(0,length-15);g.stroke();g.moveTo(0,length);g.lineTo(-12,length-20);g.lineTo(12,length-20);g.close();g.fill();
    }
    private button(text:string,x:number,action:()=>void) {
        const n=this.box(x,-550,285,76,'#008e96');n.name='Tutorial-'+text;
        this.text(text,0,0,27,260,n,'#ffffff');n.addComponent(Button);n.on(Button.EventType.CLICK,()=>{this.art.playSound?.(text==='开始挑战 ›'?'ui_confirm':'ui_navigation');action();});
    }
    contains(_x:number,_y:number){return true;}
    show(page:number, level:number, target:number, remaining:number, next:()=>void, previous:()=>void) {
        this.root.children.slice().forEach(n=>{n.removeFromParent();n.destroy();});this.demo=null;this.hand=null;this.power=null;this.time=0;
        this.art.part('Logo',this.root,0,535,280,124);
        const values=[`第 ${level+1} 关`,`目标 ${target} 颗`,`剩余 ${remaining} 次`];
        values.forEach((v,i)=>{const n=this.box((i-1)*222,430,214,78);this.text(v,0,0,24,200,n);});
        const dots=this.node('ProgressDots',this.root,0,365).addComponent(Graphics);
        for(let i=0;i<3;i++){dots.fillColor=this.color(i===page?'#008e96':'#fff2d7');dots.strokeColor=this.color('#b47a27');dots.lineWidth=2;dots.circle((i-1)*34,0,9);dots.fill();dots.stroke();}
        this.box(0,310,640,66);this.text(['拖动并发射','两颗都出圈才有效','用完次数前完成目标'][page]+`  ${page+1}/3`,0,310,28);
        if(page===0){
            this.ring(0,30,220);this.art.marble(this.root,47,0,90,38);
            const targetLabel=this.box(170,140,180,52,'#008e96');this.text('目标弹珠',0,0,23,170,targetLabel,'#ffffff');this.arrow(80,130,-43,-27,'#008e96');
            const g=this.node('AimDots',this.root,0,0).addComponent(Graphics);g.fillColor=this.color('#008e96');
            for(let y=-155;y<50;y+=27){g.circle(0,y,5);g.fill();}this.arrow(0,25,0,35,'#008e96');
            this.demo=this.art.marble(this.root,0,0,-200,38);
            const own=this.box(173,-170,180,52,'#008e96');this.text('你的弹珠',0,0,23,170,own,'#ffffff');
            this.arrow(-65,-205,0,-90,'#bd7e19');this.text('向后拉',-125,-255,20,110);
            this.hand=this.node('AnimatedHand',this.root,20,-195,100,100);
            const h=this.hand.addComponent(Graphics);h.fillColor=Color.WHITE;h.strokeColor=this.color('#164e54');h.lineWidth=3;
            h.roundRect(0,-45,50,48,16);h.fill();h.stroke();h.roundRect(2,-14,15,57,7);h.fill();h.stroke();
            this.box(0,-405,650,142);this.text('按住自己的弹珠，向后拖动，\n松开发射！',0,-385,27);
            this.power=this.node('DemoPower',this.root,0,-452).addComponent(Graphics);
        }else if(page===1){
            for(let i=0;i<2;i++){
                const y=100-i*345;this.box(0,y,660,325);this.box(-126,y,388,307,'#eac78d');this.ring(-130,y-28,94);
                this.art.marble(this.root,47,0,y+90,27);
                this.art.marble(this.root,0,i===0?-130:-265,i===0?y-28:y-112,27);
                this.text(i===0?'× 无效':'✓ 有效',-210,y+120,30,180,this.root,i===0?'#b92724':'#00864a');
                this.arrow(0,y+120,27,27,i===0?'#c63228':'#00864a');
                if(i===1)this.arrow(-281,y-133,-22,-22,'#008e96');
                this.text(i===0?'目标出圈，\n自己仍在圈内':'两颗弹珠都完全\n出圈，才算有效。',205,y+18,25,235);
                if(i===0)this.text('仍消耗 1 次机会',205,y-90,23,230,this.root,'#b92724');
            }
        }else{
            this.box(-155,205,290,83,'#008e96');this.text(`完成 ${target} 个目标`,-155,205,24,280,this.root,'#ffffff');
            this.box(155,205,290,83,'#008e96');this.text(`剩余 ${remaining} 次机会`,155,205,24,280,this.root,'#ffffff');
            const glow=this.node('ObjectiveShotsHighlight',this.root,0,0).addComponent(Graphics);
            glow.strokeColor=this.color('#fff45c');glow.lineWidth=4;
            for(const x of [0,222]){glow.roundRect(x-107,391,214,78,26);glow.stroke();}
            this.ring(0,-40,190);this.art.marble(this.root,47,-52,10,37);this.art.marble(this.root,1,70,-85,37);this.art.marble(this.root,0,0,-290,37);
            this.box(0,-415,650,140);this.text('在次数用完前完成全部目标。',0,-385,27);this.text('无效也扣次数，每一发都算！',0,-444,25,620,this.root,'#bb3925');
        }
        if(page>0)this.button('‹ 上一步',-163,previous);
        this.button(page===2?'开始挑战 ›':'下一步 ›',163,next);
    }
    update(dt:number){
        this.time+=dt;const t=this.time%3.6;
        if(this.demo){const pull=t<1.6?Math.max(0,t-.4)/1.2:t<2?1:0;
            this.demo.setPosition(0,t<2?-200-pull*88:Math.min(45,-288+(t-2)*600));
            if(this.hand){this.hand.active=t<2;this.hand.setPosition(20,-195-pull*88);}
            if(this.power){const g=this.power;g.clear();g.fillColor=this.color('#d5bc94');g.roundRect(-230,0,460,16,8);g.fill();g.fillColor=this.color('#008e96');g.rect(-230,0,460*pull,16);g.fill();}
        }
    }
    dispose(){this.root.removeFromParent();this.root.destroy();}
}
