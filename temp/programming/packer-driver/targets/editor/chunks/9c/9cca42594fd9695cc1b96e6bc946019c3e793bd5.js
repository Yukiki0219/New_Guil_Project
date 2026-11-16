System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _crd, make, REWARDS, RARITIES, WEIGHTS, rewardById;

  function drawReward(save, random = Math.random) {
    if (save.starBalance < 3) return null;
    let roll = random();
    const selected = RARITIES.find((_, index) => (roll -= WEIGHTS[index]) < 0) || RARITIES[RARITIES.length - 1];
    const candidates = REWARDS.filter(reward => reward.rarity === selected);
    const reward = candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))];
    const duplicate = save.rewards.includes(reward.id);
    return {
      reward,
      duplicate,
      save: { ...save,
        starBalance: save.starBalance - (duplicate ? 2 : 3),
        rewards: duplicate ? save.rewards : [...save.rewards, reward.id]
      }
    };
  }

  function equipReward(save, id) {
    const reward = rewardById(id);
    if (!reward || !save.rewards.includes(id)) return save;
    return { ...save,
      equipped: { ...save.equipped,
        [reward.kind]: id
      }
    };
  }

  function _reportPossibleCrUseOfSaveData(extras) {
    _reporterNs.report("SaveData", "./GameModel", _context.meta, extras);
  }

  _export({
    drawReward: drawReward,
    equipReward: equipReward
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4f62fSvEWFHypbIadB5B87L", "Gacha", undefined);

      make = (kind, rarity, entries) => entries.map(([id, name, colors]) => ({
        id,
        name,
        kind,
        rarity,
        color: colors.split('/')[0],
        accent: colors.split('/')[1]
      }));

      _export("REWARDS", REWARDS = [...make('scene', '普通', [['S01', '竹影小径', '#d6c58c/#73965c']]), ...make('scene', '稀有', [['S02', '雨后青庭', '#8eb4ae/#427c75']]), ...make('scene', '超级稀有', [['S03', '月光花圃', '#7479a9/#e6d5f3']]), ...make('scene', '珍藏', [['S04', '樱花茶庭', '#eab4ae/#ffdfd8']]), ...make('scene', '传奇', [['S05', '星河古庭', '#20365c/#d5bf78']]), ...make('marble', '普通', [['M01', '蜜橘光', '#e49637/#ffe1a5'], ['M02', '青瓷纹', '#338d80/#caf4df'], ['M03', '奶油云', '#ded6c7/#fff7e5'], ['M04', '珊瑚砂', '#d57776/#ffd6b9'], ['M05', '薄荷叶', '#51b69b/#d7ffe8'], ['M06', '海盐蓝', '#258bc3/#c7efff'], ['M07', '石榴红', '#ae435c/#ffc0bd'], ['M08', '琥珀线', '#b27b34/#ffe5a2'], ['M09', '紫藤灰', '#83749f/#e6d7f3']]), ...make('marble', '稀有', [['M10', '雨滴蓝', '#1565a0/#a7e8ff'], ['M11', '暖金涟漪', '#ad7628/#ffdfa0'], ['M12', '夜兰', '#45488e/#f5efff'], ['M13', '翡翠花纹', '#137d72/#b6f8d6'], ['M14', '雪晶', '#6aafe0/#f3ffff'], ['M15', '花庭玻璃', '#039caa/#ffe4e8']]), ...make('marble', '超级稀有', [['M16', '幻彩潮汐', '#5666c9/#f9caff'], ['M17', '赤焰核心', '#a52b36/#ffcd70'], ['M18', '月下蝶影', '#414582/#bce8ff']]), ...make('marble', '珍藏', [['M19', '四季花冠', '#9051a2/#fff1ac']]), ...make('marble', '传奇', [['M20', '凤凰琉璃', '#9c2538/#ffdc73']]), ...make('trail', '普通', [['T01', '粉笔星点', '#eee9d5/#ffffff'], ['T02', '落叶', '#8da65e/#e6ce78'], ['T03', '水珠', '#4ba9cb/#bcefff'], ['T04', '金沙', '#c49a49/#ffedab']]), ...make('trail', '稀有', [['T05', '花瓣轻痕', '#ef9eaa/#fff0e2'], ['T06', '水波环', '#43a5c6/#cefbff'], ['T07', '火星', '#d9643e/#ffd48c']]), ...make('trail', '超级稀有', [['T08', '萤火旋流', '#5eb3a1/#fff1ad']]), ...make('trail', '珍藏', [['T09', '锦鲤流光', '#d95859/#ffffff']]), ...make('trail', '传奇', [['T10', '凤凰焰羽', '#b63a30/#ffe18a']])]);

      _export("RARITIES", RARITIES = ['普通', '稀有', '超级稀有', '珍藏', '传奇']);

      WEIGHTS = [0.5, 0.35, 0.125, 0.02, 0.005];

      _export("rewardById", rewardById = id => REWARDS.find(reward => reward.id === id));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9cca42594fd9695cc1b96e6bc946019c3e793bd5.js.map