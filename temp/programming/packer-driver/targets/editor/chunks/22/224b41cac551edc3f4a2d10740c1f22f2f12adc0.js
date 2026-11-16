System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, EN, colors, colorsEn, patterns, patternsEn, plural, templates;

  function translate(text, language) {
    if (language === 'zh' || !text) return text;
    if (EN[text]) return EN[text];

    for (const [pattern, format] of templates) {
      const match = text.match(pattern);
      if (match) return format(...match.slice(1));
    }

    return text;
  }

  _export("translate", translate);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d230a79V4VPnZcUxynEy2pO", "Localization", undefined);
      /** Chinese source strings are stable translation keys; game data remains language-neutral. */


      EN = {
        '装扮衣橱': 'Wardrobe',
        '弹珠': 'Marble',
        '场景': 'Scene',
        '轨迹': 'Trail',
        '当前装备': 'Equipped',
        '默认': 'Default',
        '未获得': 'Not Owned',
        '装备': 'Equip',
        '去抽奖': 'Go to Draw',
        '星星抽奖': 'Star Draw',
        '庭院珍藏': 'Courtyard Treasures',
        '弹珠 · 场景 · 轨迹': 'Marbles · Scenes · Trails',
        '抽一次 3 星': 'Draw Once · 3 Stars',
        '奖励图鉴': 'Prize Collection',
        '概率': 'Odds',
        '抽奖概率': 'Draw Odds',
        '可能抽到重复奖励；重复时返还 1 星': 'Duplicates refund 1 star.',
        '获得新奖励！': 'New Prize!',
        '重复奖励 · 返还 1 星': 'Duplicate Prize · 1 Star Refunded',
        '重复奖励': 'Duplicate Prize',
        '已返还 1 星': '1 Star Refunded',
        '抽奖中…': 'Drawing…',
        '点击跳过': 'Tap to Skip',
        '立即装备': 'Equip Now',
        '继续': 'Continue',
        '星星不足': 'Not Enough Stars',
        '开始游戏': 'Play',
        '关卡选择': 'Level Select',
        '庭院挑战': 'Level Select',
        '弹珠图鉴': 'Collection',
        '收藏图鉴': 'Collection',
        '发射球皮肤': 'Shooter Skins',
        '新手教学 / Help': 'Tutorial',
        '音效：开': 'Sound Effects: On',
        '音效：关': 'Sound Effects: Off',
        '下一关': 'Next Level',
        '再试一次': 'Try Again',
        '回到主菜单': 'Main Menu',
        '返回主页': 'Main Menu',
        '返回关卡': 'Level Select',
        '查看提示': 'Show Hint',
        '查看教程': 'Tutorial',
        '继续游戏': 'Resume',
        '返回': 'Back',
        '主页': 'Main Menu',
        '暂停': 'Pause',
        '发射': 'Shoot',
        '重玩本关': 'Restart Level',
        '力度': 'Power',
        '星级与收藏已保存': 'Stars and collection saved',
        '一颗弹珠，一整个童年': 'A marble. A childhood of memories.',
        '庭 院 弹 珠': 'COURTYARD MARBLES',
        '本地单机  /  进度自动保存': 'Offline play / Progress saved automatically',
        '存档不可用：本次进度仅保留在当前会话': 'Saving unavailable: progress lasts for this session only',
        '用更少的射击，留下更好的成绩': 'Fewer shots. Better scores.',
        '未解锁': 'Locked',
        '挑战': 'Play',
        '完成前一关即可解锁下一关': 'Complete the previous level to unlock the next.',
        '收藏品不会被消耗，也不能装备为发射球': 'Collected marbles are kept, but cannot be equipped as shooters.',
        '未发现': 'Undiscovered',
        '已收藏': 'Collected',
        '等待在庭院中相遇': 'Find it in the courtyard',
        '上一页': 'Previous',
        '下一页': 'Next',
        '专属于你的发射球外观': 'Make your shooter your own',
        '原始玻璃弹珠': 'Classic Glass Marble',
        '已装备': 'Equipped',
        '统一的重量与力度，纯粹的技巧挑战。\n更多皮肤将在后续版本加入。': 'Same weight and power. Pure skill.\nMore skins are coming in future updates.',
        '教程已完成；存档不可用，本次会话有效。': 'Tutorial complete. Saving unavailable; remembered for this session.',
        '按住自己的弹珠后拉': 'Hold your marble and pull back',
        '拉回起点取消': 'Return to start to cancel',
        '目标整颗离开白圈才算击出': 'Targets must fully clear the white circle.',
        '弹珠滚动中…': 'Marbles rolling…',
        '蓄力中': 'Charging',
        '松手发射 · 拉回起点取消': 'Release to shoot · Return to start to cancel',
        '继续后拉蓄力 · 松手取消': 'Pull farther to charge · Release to cancel',
        '按住自己的弹珠，向后拖拉': 'Hold your marble and pull back',
        '上次停留位置': 'Last resting position',
        '漂亮的一击！': 'Great shot!',
        '次数已用完': 'No shots left',
        '目标尚未完成，本次挑战失败。': 'Target not reached. Try again.',
        '存档暂不可用，请勿关闭当前会话': 'Saving unavailable. Keep this session open.',
        '调整角度，试试一次撞出多颗': 'Adjust your angle to knock out more marbles.',
        '返回主页？': 'Return to the main menu?',
        '休息一下': 'Paused',
        '本局未结算的进度不会保存': 'Unfinished level progress will not be saved.',
        '弹珠已暂停，准备好再继续': 'Marbles paused. Resume when ready.',
        '拖动并发射': 'Pull back and release',
        '两颗都出圈才有效': 'Both marbles must clear the circle',
        '用完次数前完成目标': 'Reach the target before shots run out',
        '目标弹珠': 'Target marble',
        '你的弹珠': 'Your marble',
        '向后拉': 'Pull back',
        '按住自己的弹珠，向后拖动，\n松开发射！': 'Hold your marble, pull back,\nthen release to shoot!',
        '× 无效': '× Invalid',
        '✓ 有效': '✓ Valid',
        '目标出圈，\n自己仍在圈内': 'Target is out,\nyour marble is still inside',
        '两颗弹珠都完全\n出圈，才算有效。': 'Both marbles must\nfully clear the circle.',
        '仍消耗 1 次机会': 'Still costs 1 shot',
        '在次数用完前完成全部目标。': 'Reach the target before shots run out.',
        '无效也扣次数，每一发都算！': 'Invalid shots count too. Every shot counts!',
        '‹ 上一步': '‹ Back',
        '下一步 ›': 'Next ›',
        '开始挑战 ›': 'Play ›',
        '按住你的弹珠，向后拖动，再松开发射。': 'Hold your marble, pull back, then release to shoot.',
        '从你的弹珠开始拖动。': 'Start dragging from your own marble.',
        '目标已经出圈，你的弹珠也要完全出圈。\n本次已消耗 1 次。': 'Target is out. Your marble must fully leave too.\nThis attempt cost 1 shot.',
        '需要整颗弹珠完全离开白圈。': 'The entire marble must clear the white circle.',
        '试着调整方向和力度，\n让两颗弹珠都完全出圈。': 'Adjust direction and power\nso both marbles fully clear the circle.',
        '有效击出！': 'Valid hit!',
        '留意剩余次数，调整方向后再发射。': 'Watch your remaining shots. Adjust your aim.',
        '初见弹珠': 'First Marbles',
        '寻找角度': 'Find the Angle',
        '连锁反应': 'Chain Reaction',
        '恰到好处': 'Just Enough',
        '庭院大师': 'Courtyard Master',
        '普通': 'Common',
        '稀有': 'Rare',
        '超级稀有': 'Super Rare',
        '珍藏': 'Collectible',
        '传奇': 'Legendary',
        '未知': 'Unknown',
        '未知弹珠': 'Unknown Marble',
        '樱花梦境': 'Sakura Dream',
        '蓝莲之光': 'Blue Lotus Light',
        '金盏晨曦': 'Marigold Dawn',
        '紫藤幻境': 'Wisteria Dream',
        '翡翠铃兰': 'Jade Lily of the Valley',
        '樱雪雏菊': 'Snow Daisy',
        '烈阳百合': 'Sunfire Lily',
        '紫雾薰衣草': 'Lavender Mist',
        '月影白兔': 'Moonshadow Rabbit',
        '星瞳灵猫': 'Star-eyed Cat',
        '赤焰小狐': 'Flame Fox',
        '墨玉熊猫': 'Jade Panda',
        '锦鳞金鲤': 'Golden Koi',
        '青龙': 'Azure Dragon',
        '白虎': 'White Tiger',
        '朱雀': 'Vermilion Bird',
        '玄武': 'Black Tortoise'
      };
      colors = ['海蓝', '琥珀', '翡翠', '紫晶', '樱桃', '月白', '薄荷', '珊瑚', '靛青', '金橙'];
      Object.assign(EN, {
        '竹影小径': 'Bamboo Path',
        '雨后青庭': 'Rainwashed Garden',
        '月光花圃': 'Moonlit Flower Garden',
        '樱花茶庭': 'Cherry Tea Garden',
        '星河古庭': 'Starlit Ancient Court',
        '蜜橘光': 'Tangerine Glow',
        '青瓷纹': 'Celadon Ring',
        '奶油云': 'Cream Cloud',
        '珊瑚砂': 'Coral Sand',
        '薄荷叶': 'Mint Leaf',
        '海盐蓝': 'Sea Salt Blue',
        '石榴红': 'Pomegranate Red',
        '琥珀线': 'Amber Swirl',
        '紫藤灰': 'Wisteria Grey',
        '雨滴蓝': 'Raindrop Blue',
        '暖金涟漪': 'Golden Ripples',
        '夜兰': 'Night Orchid',
        '翡翠花纹': 'Jade Blossom',
        '雪晶': 'Snow Crystal',
        '花庭玻璃': 'Flower Garden Glass',
        '幻彩潮汐': 'Iridescent Tide',
        '赤焰核心': 'Ember Core',
        '月下蝶影': 'Moonlit Butterfly',
        '四季花冠': 'Four Seasons Crown',
        '凤凰琉璃': 'Phoenix Glass',
        '粉笔星点': 'Chalk Sparks',
        '落叶': 'Falling Leaves',
        '水珠': 'Water Drops',
        '金沙': 'Golden Sand',
        '花瓣轻痕': 'Petal Trail',
        '水波环': 'Water Rings',
        '火星': 'Fire Sparks',
        '萤火旋流': 'Firefly Swirl',
        '锦鲤流光': 'Koi Glow',
        '凤凰焰羽': 'Phoenix Feathers'
      });
      colorsEn = ['Ocean Blue', 'Amber', 'Jade', 'Amethyst', 'Cherry', 'Moon White', 'Mint', 'Coral', 'Indigo', 'Golden Orange'];
      patterns = ['流纹', '涟漪', '星砂', '花瓣', '幻彩'];
      patternsEn = ['Swirl', 'Ripple', 'Stardust', 'Petals', 'Iridescence'];
      colors.forEach((c, i) => patterns.forEach((p, j) => {
        EN[c + p] = `${colorsEn[i]} ${patternsEn[j]}`;
      }));

      plural = (n, word) => `${n} ${word}${Number(n) === 1 ? '' : 's'}`;

      templates = [[/^抽奖收藏 (\d+) \/ (\d+)$/, (n, total) => `Draw Collection ${n}/${total}`], [/^当前装备：(.+)$/, name => `Equipped: ${EN[name] || name}`], [/^剩余 (\d+) 星$/, n => `${n} stars left`], [/^可用星星 (\d+)$/, n => `Available Stars: ${n}`], [/^(.+) · (普通|稀有|超级稀有|珍藏|传奇)$/, (name, rarity) => `${EN[name] || name} · ${EN[rarity] || rarity}`], [/^(普通|稀有|超级稀有|珍藏|传奇)  ·  (.+)$/, (rarity, odds) => `${EN[rarity] || rarity} · ${odds}`], [/^新收藏 \+(\d+)  ·  首通星星 \+(\d+)  ·  最佳 (\d+) 星$/, (items, stars, best) => `New +${items} · First-clear stars +${stars} · Best: ${best} stars`], [/^第 (\d+) 关$/, n => `Level ${n}`], [/^目标 (\d+)\/(\d+)(?:\s+剩余 (\d+) 次)?$/, (n, total, shots) => `Target ${n}/${total}${shots === undefined ? '' : `   Shots Left: ${shots}`}`], [/^剩余 (\d+) 次(?:机会)?$/, n => `Shots Left: ${n}`], [/^目标 (\d+) 颗$/, n => `Target: ${n}`], [/^完成 (\d+) 个目标$/, n => `Knock out ${plural(n, 'target')}`], [/^收藏图鉴\s+(\d+)\/(\d+)$/, (n, total) => `Collection ${n}/${total}`], [/^已收藏 (\d+) \/ (\d+) · 击出并过关后解锁$/, (n, total) => `Collected ${n}/${total} · Knock out and win to collect`], [/^击出 (\d+) \/ (\d+) 颗 · (\d+) 次机会$/, (n, total, shots) => `Target ${n}/${total} · ${plural(shots, 'shot')}`], [/^三星 ≤ (\d+) 次  ·  两星 ≤ (\d+) 次$/, (a, b) => `3 stars ≤ ${plural(a, 'shot')} · 2 stars ≤ ${plural(b, 'shot')}`], [/^击出 (\d+) 颗 · 使用 (\d+) 次射击$/, (n, shots) => `${plural(n, 'marble')} out · ${plural(shots, 'shot')} used`], [/^新收藏 \+(\d+)  ·  最佳 (\d+) 星$/, (n, stars) => `New +${n} · Best: ${plural(stars, 'star')}`], [/^(#\d+\s+·\s+)(.+)$/, (prefix, r) => prefix + (EN[r] || r)], [/^(.+)  ([123]\/3)$/, (title, page) => (EN[title] || title) + `  ${page}`]];

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=224b41cac551edc3f4a2d10740c1f22f2f12adc0.js.map