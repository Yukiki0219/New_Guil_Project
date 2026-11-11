import { Node, UITransform, Graphics, Color, Mask, resources, Texture2D, SpriteFrame, Sprite, Rect } from 'cc';
import { MarbleAppearance } from './MarbleAppearance';

function color(hex: string, alpha = 255) { const c = new Color(); Color.fromHEX(c, hex); c.a = alpha; return c; }
function layer(parent: Node, name: string, r: number) {
    const n = new Node(name); n.layer = parent.layer; parent.addChild(n);
    n.addComponent(UITransform).setContentSize(r * 2, r * 2);
    return n;
}
/** Static layered glass approximation. No physical refraction or per-frame redraw. */
export function drawMarbleAppearance(root: Node, r: number, style: Readonly<MarbleAppearance>) {
    const body = layer(root, 'GlassBody', r).addComponent(Graphics);
    body.fillColor = color('#16353f', 45); body.ellipse(r * .12, -r * .58, r * 1.02, r * .47); body.fill();
    const dark = color(style.base), bright = color(style.light);
    for (let i = 0; i < 12; i++) {
        const t = i / 11;
        body.fillColor = new Color(dark.r + (bright.r-dark.r)*t*.85, dark.g+(bright.g-dark.g)*t*.85, dark.b+(bright.b-dark.b)*t*.85, 255);
        body.circle(-r*t*.13, r*t*.12, r*(1-t*.52)); body.fill();
    }
    const clip = layer(root, 'GlassInteriorClip', r*.9);
    const mask = clip.addComponent(Mask); mask.type = Mask.Type.GRAPHICS_ELLIPSE; mask.segments = 48;
    const inside = layer(clip, 'GlassInterior', r).addComponent(Graphics);
    inside.lineWidth = r*.075;
    if (style.variant !== undefined && style.motif !== 'moonRabbit') {
        drawConfiguredInterior(inside, r, style);
    } else if (style.motif === 'ripples') {
        for (let i=0;i<3;i++) {
            inside.strokeColor = color(style.accent, 100+i*38);
            inside.ellipse(r*.18, -r*.12, r*(.28+i*.23), r*(.15+i*.15)); inside.stroke();
        }
        inside.strokeColor=color('#1688d8',160); inside.lineWidth=r*.12;
        inside.moveTo(-r,-r*.4); inside.bezierCurveTo(-r*.2,r*.5,r*.2,-r*.6,r,r*.25); inside.stroke();
    } else if (style.motif === 'petals') {
        // Offset translucent petals sit below the glass reflections, not on its surface.
        for(let i=0;i<5;i++) {
            const a=i*Math.PI*2/5+.2, dx=Math.cos(a),dy=Math.sin(a),px=-dy,py=dx;
            inside.fillColor=color(i%2?'#d1baff':style.accent,180);
            inside.moveTo(0,0);
            inside.bezierCurveTo(r*(dx*.3+px*.35),r*(dy*.3+py*.35),r*(dx*.72+px*.2),r*(dy*.72+py*.2),r*dx*.72,r*dy*.72);
            inside.bezierCurveTo(r*(dx*.72-px*.2),r*(dy*.72-py*.2),r*(dx*.3-px*.35),r*(dy*.3-py*.35),0,0); inside.fill();
        }
        inside.fillColor=color('#fff1ba'); inside.circle(0,0,r*.13); inside.fill();
    } else {
        inside.strokeColor=color('#e8aef7',125); inside.lineWidth=r*.2;
        inside.moveTo(-r,-r*.45); inside.bezierCurveTo(-r*.3,r*.8,r*.35,-r*.8,r,r*.5); inside.stroke();
        inside.strokeColor=color('#a0ffdf',145); inside.lineWidth=r*.11;
        inside.moveTo(-r,-r*.6); inside.bezierCurveTo(-r*.4,r*.6,r*.4,-r*.6,r,r*.65); inside.stroke();
        // Large connected silhouette remains legible at the game's 60-pixel design diameter.
        inside.fillColor=color(style.accent,235);
        inside.ellipse(0,-r*.23,r*.34,r*.32); inside.fill();
        inside.circle(-r*.04,r*.12,r*.24); inside.fill();
        inside.ellipse(-r*.18,r*.42,r*.105,r*.3); inside.fill();
        inside.ellipse(r*.07,r*.46,r*.1,r*.32); inside.fill();
        inside.circle(r*.32,-r*.18,r*.13); inside.fill();
        inside.fillColor=color(style.base); inside.circle(-r*.115,r*.16,r*.037); inside.fill();
        for(const [x,y] of [[-.56,.35],[.48,.5],[.56,-.47]]) {
            inside.fillColor=color('#ffffff',220);
            inside.moveTo(r*x,r*(y+.09)); inside.lineTo(r*(x+.035),r*(y+.025)); inside.lineTo(r*(x+.09),r*y);
            inside.lineTo(r*(x+.025),r*(y-.025)); inside.lineTo(r*x,r*(y-.09)); inside.lineTo(r*(x-.035),r*y); inside.close(); inside.fill();
        }
    }
    const animal = ['moonRabbit','cat','fox','panda','fish','dragon','tiger','phoenix','tortoise'].indexOf(style.motif);
    if (animal >= 0) loadMotifFrames().then(frames => {
        if (!root.isValid || !clip.isValid) return;
        inside.clear();
        const image = layer(clip, 'GlassInclusion', r * .8).addComponent(Sprite);
        image.spriteFrame = frames[animal]; image.sizeMode = Sprite.SizeMode.CUSTOM;
        image.node.getComponent(UITransform)!.setContentSize(r * 1.6, r * 1.6);
        // The shared circular mask and foreground reflections keep art inside the glass.
        image.color = new Color(255,255,255,235);
    }).catch(() => { /* Procedural motifs remain visible if loading fails. */ });
    const reflection = layer(root,'GlassReflections',r).addComponent(Graphics);
    reflection.strokeColor=color(style.light,210); reflection.lineWidth=r*.045; reflection.circle(0,0,r*.94); reflection.stroke();
    if(style.glass!=='clear') {
        reflection.strokeColor=color(style.glass==='pearl'?'#ffe9ff':'#c5ffdf',150); reflection.lineWidth=r*.065;
        reflection.arc(0,0,r*.82,Math.PI*1.1,Math.PI*1.85,false); reflection.stroke();
    }
    reflection.fillColor=color('#ffffff',215); reflection.ellipse(-r*.3,r*.48,r*.28,r*.13); reflection.fill();
    reflection.fillColor=color('#ffffff',65); reflection.ellipse(r*.25,-r*.5,r*.25,r*.09); reflection.fill();
    reflection.fillColor=color('#ffffff',245); reflection.circle(r*.29,r*.65,r*.065); reflection.fill();
}

/** Bounded static geometry; circular parent mask clips every interior motif. */
function drawConfiguredInterior(g: Graphics, r: number, s: Readonly<MarbleAppearance>) {
    const v=s.variant||0,m=s.motif;
    const disc=(x:number,y:number,rx:number,ry:number,c:string,a=220)=>{g.fillColor=color(c,a);g.ellipse(x*r,y*r,rx*r,ry*r);g.fill();};
    const line=(points:number[][],c:string,width=.035)=>{g.strokeColor=color(c,220);g.lineWidth=r*width;points.forEach(([x,y],i)=>i?g.lineTo(x*r,y*r):g.moveTo(x*r,y*r));g.stroke();};
    const polygon=(points:number[][],c:string,a=230)=>{g.fillColor=color(c,a);points.forEach(([x,y],i)=>i?g.lineTo(x*r,y*r):g.moveTo(x*r,y*r));g.close();g.fill();};
    const star=(x:number,y:number,size:number,c:string)=>polygon(Array.from({length:10},(_,i)=>{const a=i*Math.PI/5+Math.PI/2,rr=size*(i%2?.42:1);return [x+Math.cos(a)*rr,y+Math.sin(a)*rr];}),c);
    const specks=(n:number)=>{for(let i=0;i<n;i++){const a=i*2.39996+v*.3,d=.75*Math.sqrt((i+.5)/n);disc(Math.cos(a)*d,Math.sin(a)*d,.012+(i%3)*.008,.012+(i%3)*.008,s.accent,130+i%100);}};
    if(['wave','split','spiral','rings','ripples','dots','stars','galaxy'].includes(m)) {
        if(m==='dots'||m==='galaxy')specks(m==='galaxy'?24:10+v%7);
        if(m==='stars'){for(let i=0;i<5;i++){const a=i*2.4+v;star(Math.cos(a)*.53,Math.sin(a)*.53,.08+i*.012,s.accent);}specks(12);}
        if(m==='rings'||m==='ripples')for(let i=0;i<3;i++){g.strokeColor=color(s.accent,100+i*40);g.lineWidth=r*(.025+(v%3)*.012);g.ellipse(r*.12,r*-.15,r*(.25+i*.22),r*(.12+i*.13));g.stroke();}
        if(m==='spiral'||m==='galaxy')for(let arm=0;arm<(m==='galaxy'?3:2);arm++){
            const points=[];for(let i=0;i<=48;i++){const a=i*.16+arm*Math.PI+v*.4,d=.05+i*.014;points.push([Math.cos(a)*d,Math.sin(a)*d]);}
            line(points,arm%2?s.light:s.accent,m==='galaxy'?.04:.075);
        }
        if(m==='wave'||m==='split')for(let i=0;i<(m==='split'?1:3);i++){
            g.strokeColor=color(i%2?s.light:s.accent,170);g.lineWidth=r*(m==='split'?.48:.12);
            const off=(i-1)*.28;g.moveTo(-r,r*(-.5+off));g.bezierCurveTo(-r*.3,r*(.75+off+v%3*.1),r*.2,r*(-.8+off),r,r*(.5+off));g.stroke();
        }
        return;
    }
    if(m==='petals') {
        if(v===3||v===4){ // Hanging wisteria or lily-of-the-valley clusters.
            for(let stem=0;stem<3;stem++){
                const x=(stem-1)*.4;line([[x,.65],[x+.1,0],[x,-.65]],s.light,.025);
                for(let j=0;j<4;j++){const y=.45-j*.25;disc(x+(j%2?.12:-.12),y,v===4?.12:.1,v===4?.1:.17,s.accent);}
            }
        } else {
            const petals=[5,8,12,0,0,7,6,14][v%8],layers=v===1||v===5||v===6?2:1;
            for(let layerIndex=0;layerIndex<layers;layerIndex++)for(let i=0;i<petals;i++){
                const a=i*Math.PI*2/petals+layerIndex*.3,dx=Math.cos(a),dy=Math.sin(a),px=-dy,py=dx;
                const length=(layerIndex?.49:.76),width=v===7?.12:v===0?.3:.22;
                g.fillColor=color(layerIndex?s.light:s.accent,layerIndex?220:190);g.moveTo(0,0);
                g.bezierCurveTo(r*(dx*.25+px*width),r*(dy*.25+py*width),r*(dx*length+px*width),r*(dy*length+py*width),r*dx*length,r*dy*length);
                g.bezierCurveTo(r*(dx*length-px*width),r*(dy*length-py*width),r*(dx*.25-px*width),r*(dy*.25-py*width),0,0);g.fill();
            }
            disc(0,0,v===7?.24:.12,v===7?.24:.12,v===7?'#794b25':'#ffe99c');
            if(v===7)for(let i=0;i<9;i++){const a=i*2.4;disc(Math.cos(a)*.14,Math.sin(a)*.14,.022,.022,'#ffe99c');}
        }
        return;
    }
    specks(10);
    if(m==='cat'||m==='fox'||m==='panda'||m==='tiger') {
        const fur=m==='fox'?'#ffab56':m==='cat'?'#b892fa':'#f1f5ff';
        if(m==='panda'){disc(-.37,.38,.18,.18,'#18334a');disc(.37,.38,.18,.18,'#18334a');}
        else{polygon([[-.47,.12],[-.48,.64],[-.12,.4]],fur);polygon([[.47,.12],[.48,.64],[.12,.4]],fur);}
        disc(0,0,.49,.43,fur);if(m==='fox'){polygon([[-.46,.02],[0,-.43],[.46,.02],[.16,-.1],[0,-.02],[-.16,-.1]],'#fff4df');}
        if(m==='panda'){disc(-.21,.08,.14,.18,'#18334a');disc(.21,.08,.14,.18,'#18334a');}
        for(const x of [-.2,.2]){disc(x,.1,.065,.09,m==='cat'?'#adff77':'#173654');disc(x-.015,.13,.018,.025,'#ffffff');}
        polygon([[-.065,-.12],[.065,-.12],[0,-.19]],'#71446e');line([[0,-.19],[-.08,-.24]],'#71446e',.02);line([[0,-.19],[.08,-.24]],'#71446e',.02);
        if(m==='tiger')for(const sign of [-1,1])for(let i=0;i<3;i++)polygon([[sign*.46,.24-i*.17],[sign*.24,.15-i*.15],[sign*.43,.11-i*.17]],'#2878b0');
        if(m==='cat')star(0,.34,.09,'#ffe899');
        return;
    }
    if(m==='fish'){
        polygon([[-.35,.05],[-.75,.4],[-.62,-.27]],'#ffad5c');disc(.05,.02,.5,.27,'#ff9444');
        polygon([[-.12,.26],[.02,.5],[.3,.22]],'#ffe8af');disc(.34,.1,.06,.07,'#18334a');
        for(let i=0;i<3;i++)line([[-.15+i*.17,.22],[-.23+i*.17,.02],[-.13+i*.17,-.2]],'#fff2b5',.045);return;
    }
    if(m==='dragon'){
        const points=[];for(let i=0;i<=35;i++){const a=i*.19,d=.62-i*.009;points.push([Math.cos(a)*d,Math.sin(a)*d]);}
        line(points,s.accent,.2);line(points,s.light,.12);
        for(let i=0;i<points.length;i+=4){const [x,y]=points[i];polygon([[x-.06,y],[x,y+.12],[x+.06,y]],s.accent);}
        disc(.45,.25,.22,.14,s.light);polygon([[.45,.36],[.35,.66],[.55,.4]],s.accent);
        line([[.53,.28],[.75,.35],[.68,.52]],s.accent,.025);disc(.49,.3,.035,.035,'#ffffff');return;
    }
    if(m==='phoenix'){
        for(const sign of [-1,1])for(let i=0;i<5;i++){
            polygon([[0,.04],[sign*(.36+i*.09),.67-i*.12],[sign*.48,-.15-i*.07]],i%2?s.accent:'#ffab4c',220);
        }
        for(let i=0;i<3;i++)line([[0,.1],[(i-1)*.19,-.35],[(i-1)*.32,-.72]],s.accent,.08);
        disc(0,.24,.12,.23,s.accent);disc(.03,.48,.12,.1,s.accent);polygon([[.12,.5],[.28,.45],[.1,.42]],'#fff1ad');return;
    }
    if(m==='tortoise'){
        for(const x of [-.37,.37])for(const y of [-.3,.3])disc(x,y,.15,.13,s.light);
        disc(.03,.57,.13,.18,s.light);disc(0,0,.46,.48,s.base);g.strokeColor=color(s.accent);g.lineWidth=r*.035;g.ellipse(0,0,r*.46,r*.48);g.stroke();
        const hex=Array.from({length:7},(_,i)=>[Math.cos(i*Math.PI/3)*.23,Math.sin(i*Math.PI/3)*.25]);line(hex,s.accent);
        for(let i=0;i<6;i++)line([hex[i],[hex[i][0]*1.9,hex[i][1]*1.8]],s.accent);
        line([[-.6,-.5],[-.65,.1],[-.5,.58],[0,.77],[.5,.6],[.67,.1]],s.light,.06);disc(.67,.1,.1,.065,s.light);
    }
}

/** One texture and nine cached frames shared by every game/collection instance. */
let motifFrames: Promise<SpriteFrame[]> | null = null;
function loadMotifFrames(): Promise<SpriteFrame[]> {
    if (!motifFrames) motifFrames = new Promise((resolve,reject) => {
        resources.load('art/marble-motifs/texture', Texture2D, (err, texture) => {
            if (err) { motifFrames = null; reject(err); return; }
            const cell = texture.width / 3;
            resolve(Array.from({length:9}, (_,i) => {
                const frame = new SpriteFrame(); frame.texture = texture;
                frame.rect = new Rect((i%3)*cell, Math.floor(i/3)*cell, cell, cell);
                return frame;
            }));
        });
    });
    return motifFrames;
}
