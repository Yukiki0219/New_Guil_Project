import { _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, input, Input, EventMouse, EventTouch } from 'cc';
import { Language } from './Localization';
const { ccclass } = _decorator;
/** Captures one pointer; cancellation restores the saved selection without changing it. */
@ccclass('LanguageSwitch')
export class LanguageSwitch extends Component {
 private selected:Language='zh';
 private position=0;
 private target=0;
 private pointer:string|null=null;
 private lastTouch=0;
 private startX=0;
 private dragging=false;
 private slider!:Node;
 private labels:Label[]=[];
 private changed:(language:Language)=>void=()=>{};
 setup(language:Language, changed:(language:Language)=>void) {
  this.selected=language;this.position=this.target=language==='en'?1:0;this.changed=changed;
  const bg=this.node.addComponent(Graphics);bg.fillColor=new Color('#fff2d7');bg.strokeColor=new Color('#e0a13d');bg.lineWidth=3;
  bg.roundRect(-170,-30,340,60,29);bg.fill();bg.stroke();
  this.slider=new Node('LanguageSlider');this.slider.layer=this.node.layer;this.node.addChild(this.slider);
  this.slider.addComponent(UITransform).setContentSize(164,52);
  const g=this.slider.addComponent(Graphics);g.fillColor=new Color('#008e96');g.roundRect(-82,-26,164,52,25);g.fill();
  ['中文','English'].forEach((text,i)=>{const n=new Node(text);n.layer=this.node.layer;this.node.addChild(n);n.setPosition(i?84:-84,0);n.addComponent(UITransform).setContentSize(158,46);
   const l=n.addComponent(Label);l.string=text;l.fontSize=23;l.lineHeight=28;l.fontFamily='Microsoft YaHei';l.horizontalAlign=Label.HorizontalAlign.CENTER;l.verticalAlign=Label.VerticalAlign.CENTER;this.labels.push(l);
  });
  this.paint();
  this.node.on(Node.EventType.TOUCH_START,this.touchStart,this);this.node.on(Node.EventType.TOUCH_MOVE,this.touchMove,this);this.node.on(Node.EventType.TOUCH_END,this.touchEnd,this);this.node.on(Node.EventType.TOUCH_CANCEL,this.cancel,this);
  this.node.on(Node.EventType.MOUSE_DOWN,this.mouseStart,this);
  input.on(Input.EventType.MOUSE_MOVE,this.mouseMove,this);input.on(Input.EventType.MOUSE_UP,this.mouseEnd,this);
 }
 private localX(e:EventMouse|EventTouch){const p=e.getUILocation();return this.node.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(p.x,p.y,0)).x;}
 private moveTo(x:number){this.position=Math.max(0,Math.min(1,(x+84)/168));this.paint();}
 private begin(x:number){this.startX=x;this.dragging=false;}
 private drag(x:number){if(Math.abs(x-this.startX)>6)this.dragging=true;if(this.dragging)this.moveTo(x);}
 private touchStart(e:EventTouch){if(this.pointer!==null)return;this.lastTouch=Date.now();this.pointer='t'+e.getID();this.begin(this.localX(e));e.propagationStopped=true;}
 private touchMove(e:EventTouch){if(this.pointer==='t'+e.getID()){this.drag(this.localX(e));e.propagationStopped=true;}}
 private touchEnd(e:EventTouch){if(this.pointer==='t'+e.getID()){this.finish(this.localX(e));e.propagationStopped=true;}}
 private mouseStart(e:EventMouse){if(e.getButton()!==0||Date.now()-this.lastTouch<600||this.pointer!==null)return;this.pointer='mouse';this.begin(this.localX(e));}
 private mouseMove(e:EventMouse){if(this.pointer==='mouse')this.drag(this.localX(e));}
 private mouseEnd(e:EventMouse){if(this.pointer==='mouse'&&e.getButton()===0){this.finish(this.localX(e));}}
 private finish(x:number){if(this.dragging)this.moveTo(x);this.pointer=null;const next:Language=x>=0?'en':'zh';this.target=next==='en'?1:0;if(next!==this.selected){this.selected=next;this.changed(next);}this.paint();}
 private cancel(){this.pointer=null;this.target=this.selected==='en'?1:0;}
 private paint(){if(!this.slider)return;this.slider.setPosition(-84+168*this.position,0);this.labels.forEach((l,i)=>{l.color=new Color((this.selected==='en'?1:0)===i?'#ffffff':'#164e54');});}
 update(dt:number){if(this.pointer!==null)return;this.position+=(this.target-this.position)*Math.min(1,dt*18);if(Math.abs(this.position-this.target)<.001)this.position=this.target;this.paint();}
 onDisable(){this.cancel();}
 onDestroy(){input.off(Input.EventType.MOUSE_MOVE,this.mouseMove,this);input.off(Input.EventType.MOUSE_UP,this.mouseEnd,this);}
}
