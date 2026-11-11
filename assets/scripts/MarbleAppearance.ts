/** Visual data only. Existing IDs/names remain owned by GameModel. */
export interface MarbleAppearance {
    base: string; light: string; accent: string;
    glass: 'clear' | 'pearl' | 'iridescent';
    motif: 'ripples' | 'petals' | 'moonRabbit' | 'spiral' | 'dots' | 'wave' | 'split' | 'stars' | 'galaxy' | 'rings' | 'cat' | 'fox' | 'panda' | 'fish' | 'dragon' | 'tiger' | 'phoenix' | 'tortoise';
    variant?: number; title?: string;
}
const palettes = [
 ['#064f9a','#40d9ff','#c8faff'],['#99335f','#ffb0db','#fff2fc'],['#086b5c','#6cecb1','#d5ffe1'],
 ['#422080','#bd76ff','#f9caff'],['#956000','#ffe86c','#fff7ce'],['#9e340b','#ff9b4a','#ffe1a4'],
 ['#6b7083','#f5f4ff','#ffe4ef'],['#881e3d','#ff6780','#ffccae'],['#00556d','#54edee','#b3ffdf'],
 ['#202c43','#9aacc8','#eaf9ff'],['#134a90','#b6e9ff','#ffffff'],['#392059','#bf9aff','#ffc5e4']
];
const common: MarbleAppearance['motif'][]=['wave','split','rings','spiral','ripples','wave','dots','split','rings','ripples','spiral','wave','split','ripples','dots','spiral','dots','spiral','stars','wave','split','split','split'];
const rare: MarbleAppearance['motif'][]=['wave','dots','galaxy','spiral','wave','stars','rings','spiral','galaxy','split','dots','rings','wave','stars','spiral','galaxy'];
const names=['晴空流光','草莓双色','薄荷圆环','葡萄旋纹','阳光涟漪','珊瑚波纹','珍珠圆点','樱桃双色','海洋圆环','烟灰涟漪','冰晶旋纹','紫雾波纹','粉雾双色','绿芽涟漪','金沙','蓝色漩涡','粉色圆点','紫色细旋','绿点星','橙色波纹','蓝白双色','粉紫双色','青绿双色','极光蓝','珍珠粉','银河紫','翡翠光','琥珀金','冰川之心','玫瑰幻彩','深海蓝','紫晶光','日落渐变','薄荷星尘','银月玻璃','火焰纹','彩虹核心','蓝金螺旋','极夜之眼'];
export const MARBLE_APPEARANCES: Readonly<Record<number, Readonly<MarbleAppearance>>> = (
 Array.from({length:56},(_,id)=>{
   const p=palettes[id%palettes.length];
   let motif:MarbleAppearance['motif']=id<23?common[id]:id<39?rare[id-23]:'petals';
   if(id>=45&&id<50)motif=(['moonRabbit','cat','fox','panda','fish'] as const)[id-45];
   if(id>=52)motif=(['dragon','tiger','phoenix','tortoise'] as const)[id-52];
   const variant=id===50?6:id===51?7:id>=39&&id<45?id-39:id;
   const title=names[id]||({39:'樱花',40:'蓝莲',41:'金盏',42:'紫藤',43:'铃兰',44:'玫瑰',45:'月兔',46:'星猫',47:'赤狐',48:'熊猫',49:'锦鲤',50:'雪莲',51:'向日葵',52:'青龙',53:'白虎',54:'朱雀',55:'玄武'} as Record<number,string>)[id];
   const special:Record<number,string[]>={39:palettes[1],40:palettes[0],41:palettes[4],42:palettes[3],43:palettes[2],44:palettes[7],45:palettes[3],46:palettes[3],47:palettes[5],48:palettes[2],49:palettes[0],50:palettes[6],51:palettes[4],52:['#004b67','#28dfda','#ffd66a'],53:['#123f82','#a5e4ff','#ffffff'],54:['#7e1330','#ff7757','#ffe370'],55:['#092f57','#37c9bb','#e7ca64']};
   const c=special[id]||p;
   return [id,{base:c[0],light:c[1],accent:c[2],glass:id<23?'clear':id<39?'pearl':'iridescent',motif,variant,title}];
 })
).reduce((out, [id, style]) => { out[id as number] = style as MarbleAppearance; return out; }, {} as Record<number, Readonly<MarbleAppearance>>);
