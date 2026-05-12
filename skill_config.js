// ============================================
// 0509新版 - 宠物技能配置文件
// 4种类型 x 7种颜色 x 4种技能 = 112种技能
// ============================================

// 技能类型
var SKILL_TYPES = {
    MAGIC: 'magic',      // 远程法术（主动）
    PHYSICAL: 'physical', // 远程物理（主动）
    DEFEND: 'defend',    // 防御技能（主动）
    PASSIVE: 'passive'   // 被动技能
};

// 技能类型显示名称和图标
var SKILL_TYPE_NAMES = {
    magic: { name: '🔮 法术', icon: '🔮', color: '#9b59b6', iconPath: 'assets/skill-icons/magic-skill.png' },
    physical: { name: '🏹 物理', icon: '🏹', color: '#e74c3c', iconPath: 'assets/skill-icons/physical-skill.png' },
    defend: { name: '🛡️ 防御', icon: '🛡️', color: '#3498db', iconPath: 'assets/skill-icons/defend-skill.png' },
    passive: { name: '✨ 被动', icon: '✨', color: '#f39c12', iconPath: 'assets/skill-icons/passive-skill.png' }
};

// 技能颜色/稀有度
var SKILL_RARITIES = {
    0: { name: '白色', color: '#CCCCCC', bgColor: 'rgba(200,200,200,0.15)', power: 1.0, desc: '普通' },
    1: { name: '绿色', color: '#26de81', bgColor: 'rgba(38,222,129,0.15)', power: 1.5, desc: '优秀' },
    2: { name: '蓝色', color: '#4A90E2', bgColor: 'rgba(74,144,226,0.15)', power: 2.0, desc: '稀有' },
    3: { name: '紫色', color: '#9b59b6', bgColor: 'rgba(155,89,182,0.15)', power: 3.0, desc: '史诗' },
    4: { name: '橙色', color: '#e67e22', bgColor: 'rgba(230,126,34,0.15)', power: 4.5, desc: '传说' },
    5: { name: '金色', color: '#FFD700', bgColor: 'rgba(255,215,0,0.15)', power: 6.0, desc: '神话' },
    6: { name: '红色', color: '#e74c3c', bgColor: 'rgba(231,76,60,0.15)', power: 8.0, desc: '终极' }
};

// ============================================
// 远程法术技能（主动）
// ============================================
var MAGIC_SKILLS = {
    // 白色 - 普通
    white: [
        { id: 'magic_w1', name: '火花', icon: '💫', desc: '发射小型火球', power: 0.8, mpCost: 5, effect: 'fire' },
        { id: 'magic_w2', name: '霜冻', icon: '❄️', desc: '发射冰霜攻击', power: 0.8, mpCost: 5, effect: 'ice' },
        { id: 'magic_w3', name: '充电', icon: '⚡', desc: '释放电能攻击', power: 0.8, mpCost: 5, effect: 'electric' },
        { id: 'magic_w4', name: '引力', icon: '🌀', desc: '制造引力波动', power: 0.8, mpCost: 5, effect: 'gravity' }
    ],
    // 绿色 - 优秀
    green: [
        { id: 'magic_g1', name: '烈焰', icon: '🔥', desc: '释放强烈火焰', power: 1.5, mpCost: 12, effect: 'fire' },
        { id: 'magic_g2', name: '暴风雪', icon: '🌨️', desc: '召唤冰霜风暴', power: 1.5, mpCost: 12, effect: 'ice' },
        { id: 'magic_g3', name: '闪电链', icon: '⚡', desc: '闪电连锁攻击', power: 1.5, mpCost: 12, effect: 'electric' },
        { id: 'magic_g4', name: '扭曲空间', icon: '🕳️', desc: '扭曲周围空间', power: 1.5, mpCost: 12, effect: 'space' }
    ],
    // 蓝色 - 稀有
    blue: [
        { id: 'magic_b1', name: '地狱烈焰', icon: '🌋', desc: '来自地狱的火焰', power: 2.5, mpCost: 20, effect: 'fire' },
        { id: 'magic_b2', name: '冰霜风暴', icon: '🌀', desc: '极寒风暴侵袭', power: 2.5, mpCost: 20, effect: 'ice' },
        { id: 'magic_b3', name: '雷云', icon: '⛈️', desc: '召唤雷霆之云', power: 2.5, mpCost: 20, effect: 'electric' },
        { id: 'magic_b4', name: '时空裂隙', icon: '💫', desc: '撕裂时空屏障', power: 2.5, mpCost: 20, effect: 'space' }
    ],
    // 紫色 - 史诗
    purple: [
        { id: 'magic_p1', name: '虚空脉冲', icon: '🌑', desc: '虚空能量脉冲', power: 3.5, mpCost: 30, effect: 'void' },
        { id: 'magic_p2', name: '极寒领域', icon: '🥶', desc: '绝对零度领域', power: 3.5, mpCost: 30, effect: 'ice' },
        { id: 'magic_p3', name: '雷霆万钧', icon: '⚡', desc: '万雷轰顶', power: 3.5, mpCost: 30, effect: 'electric' },
        { id: 'magic_p4', name: '混沌之球', icon: '🔮', desc: '混沌魔法球', power: 3.5, mpCost: 30, effect: 'chaos' }
    ],
    // 橙色 - 传说
    orange: [
        { id: 'magic_o1', name: '星陨', icon: '☄️', desc: '星辰坠落之术', power: 5.0, mpCost: 45, effect: 'star' },
        { id: 'magic_o2', name: '天罚', icon: '⚡', desc: '神明制裁之雷', power: 5.0, mpCost: 45, effect: 'divine' },
        { id: 'magic_o3', name: '冰龙吐息', icon: '🐉', desc: '冰龙喷吐寒息', power: 5.0, mpCost: 45, effect: 'dragon' },
        { id: 'magic_o4', name: '火焰风暴', icon: '🌪️', desc: '烈焰风暴席卷', power: 5.0, mpCost: 45, effect: 'fire' }
    ],
    // 金色 - 神话
    gold: [
        { id: 'magic_gold1', name: '神圣审判', icon: '👼', desc: '神圣之光审判', power: 7.0, mpCost: 60, effect: 'divine' },
        { id: 'magic_gold2', name: '陨石术', icon: '🪨', desc: '召唤巨大陨石', power: 7.0, mpCost: 60, effect: 'meteor' },
        { id: 'magic_gold3', name: '末日降临', icon: '💀', desc: '末日浩劫降临', power: 7.0, mpCost: 60, effect: 'doom' },
        { id: 'magic_gold4', name: '奥术轰炸', icon: '✨', desc: '奥术能量轰炸', power: 7.0, mpCost: 60, effect: 'arcane' }
    ],
    // 红色 - 终极
    red: [
        { id: 'magic_r1', name: '万法归宗', icon: '🔱', desc: '万法归于本源', power: 10.0, mpCost: 80, effect: 'origin' },
        { id: 'magic_r2', name: '奥术真理', icon: '📜', desc: '掌握奥术真理', power: 10.0, mpCost: 80, effect: 'truth' },
        { id: 'magic_r3', name: '时间静止', icon: '⏰', desc: '凝固时空法则', power: 10.0, mpCost: 80, effect: 'time' },
        { id: 'magic_r4', name: '世界终结', icon: '🌍', desc: '终结一切的力量', power: 10.0, mpCost: 80, effect: 'end' }
    ]
};

// ============================================
// 远程物理技能（主动）
// ============================================
var PHYSICAL_SKILLS = {
    // 白色 - 普通
    white: [
        { id: 'phys_w1', name: '投掷', icon: '🎯', desc: '精准投掷攻击', power: 0.8, mpCost: 5, effect: 'throw' },
        { id: 'phys_w2', name: '射箭', icon: '🏹', desc: '射出一支箭', power: 0.8, mpCost: 5, effect: 'arrow' },
        { id: 'phys_w3', name: '飞刀', icon: '🔪', desc: '投掷飞刀攻击', power: 0.8, mpCost: 5, effect: 'knife' },
        { id: 'phys_w4', name: '投石', icon: '🪨', desc: '投掷石块攻击', power: 0.8, mpCost: 5, effect: 'rock' }
    ],
    // 绿色 - 优秀
    green: [
        { id: 'phys_g1', name: '穿刺箭', icon: '➡️', desc: '穿透力强的箭', power: 1.5, mpCost: 12, effect: 'pierce' },
        { id: 'phys_g2', name: '三连射', icon: '🔱', desc: '连续射出三箭', power: 1.5, mpCost: 12, effect: 'multi' },
        { id: 'phys_g3', name: '回旋镖', icon: '🔄', desc: '旋转返回攻击', power: 1.5, mpCost: 12, effect: 'boomerang' },
        { id: 'phys_g4', name: '毒刃', icon: '☠️', desc: '涂毒飞刀攻击', power: 1.5, mpCost: 12, effect: 'poison' }
    ],
    // 蓝色 - 稀有
    blue: [
        { id: 'phys_b1', name: '爆炸箭', icon: '💥', desc: '爆炸性箭矢', power: 2.5, mpCost: 20, effect: 'explosion' },
        { id: 'phys_b2', name: '散射', icon: '🎆', desc: '箭雨散射攻击', power: 2.5, mpCost: 20, effect: 'spread' },
        { id: 'phys_b3', name: '锁链投掷', icon: '⛓️', desc: '锁链束缚攻击', power: 2.5, mpCost: 20, effect: 'chain' },
        { id: 'phys_b4', name: '致命投掷', icon: '🗡️', desc: '致命投掷技', power: 2.5, mpCost: 20, effect: 'lethal' }
    ],
    // 紫色 - 史诗
    purple: [
        { id: 'phys_p1', name: '幻影箭', icon: '👻', desc: '幻影追踪之箭', power: 3.5, mpCost: 30, effect: 'phantom' },
        { id: 'phys_p2', name: '雷霆之箭', icon: '⚡', desc: '雷电附魔箭矢', power: 3.5, mpCost: 30, effect: 'thunder' },
        { id: 'phys_p3', name: '穿刺风暴', icon: '🌪️', desc: '箭矢风暴席卷', power: 3.5, mpCost: 30, effect: 'storm' },
        { id: 'phys_p4', name: '死亡标记', icon: '💀', desc: '标记必死之箭', power: 3.5, mpCost: 30, effect: 'death' }
    ],
    // 橙色 - 传说
    orange: [
        { id: 'phys_o1', name: '穿甲箭', icon: '🛡️', desc: '无视防御之箭', power: 5.0, mpCost: 45, effect: 'armor' },
        { id: 'phys_o2', name: '龙息箭', icon: '🐲', desc: '龙之吐息之箭', power: 5.0, mpCost: 45, effect: 'dragon' },
        { id: 'phys_o3', name: '冰霜之箭', icon: '❄️', desc: '极寒箭矢攻击', power: 5.0, mpCost: 45, effect: 'freeze' },
        { id: 'phys_o4', name: '雷霆一击', icon: '⚡', desc: '雷霆万钧一击', power: 5.0, mpCost: 45, effect: 'thunder' }
    ],
    // 金色 - 神话
    gold: [
        { id: 'phys_gold1', name: '神圣之箭', icon: '👼', desc: '神圣祝福之箭', power: 7.0, mpCost: 60, effect: 'divine' },
        { id: 'phys_gold2', name: '毁灭之箭', icon: '💫', desc: '毁灭一切之箭', power: 7.0, mpCost: 60, effect: 'destroy' },
        { id: 'phys_gold3', name: '冥魂之矢', icon: '👻', desc: '冥界灵魂之矢', power: 7.0, mpCost: 60, effect: 'soul' },
        { id: 'phys_gold4', name: '灭世之矢', icon: '🌍', desc: '毁灭世界之矢', power: 7.0, mpCost: 60, effect: 'world' }
    ],
    // 红色 - 终极
    red: [
        { id: 'phys_r1', name: '究极贯穿', icon: '➡️', desc: '贯穿一切之力', power: 10.0, mpCost: 80, effect: 'ultimate' },
        { id: 'phys_r2', name: '毁灭射线', icon: '⚡', desc: '毁灭光线攻击', power: 10.0, mpCost: 80, effect: 'ray' },
        { id: 'phys_r3', name: '永恒猎杀', icon: '🎯', desc: '永恒追杀之力', power: 10.0, mpCost: 80, effect: 'eternal' },
        { id: 'phys_r4', name: '终极裁决', icon: '⚖️', desc: '终极审判之箭', power: 10.0, mpCost: 80, effect: 'judge' }
    ]
};

// ============================================
// 防御技能（主动）
// ============================================
var DEFEND_SKILLS = {
    // 白色 - 普通
    white: [
        { id: 'def_w1', name: '护盾', icon: '🛡️', desc: '生成基础护盾', power: 0.5, mpCost: 5, effect: 'shield' },
        { id: 'def_w2', name: '格挡', icon: '🤺', desc: '格挡下次攻击', power: 0.5, mpCost: 5, effect: 'block' },
        { id: 'def_w3', name: '治愈', icon: '💚', desc: '恢复少量HP', power: 0.3, mpCost: 5, effect: 'heal' },
        { id: 'def_w4', name: '轻击', icon: '👊', desc: '轻攻击敌人', power: 0.6, mpCost: 5, effect: 'light' }
    ],
    // 绿色 - 优秀
    green: [
        { id: 'def_g1', name: '屏障', icon: '🔷', desc: '生成魔法屏障', power: 1.0, mpCost: 12, effect: 'barrier' },
        { id: 'def_g2', name: '闪避', icon: '💨', desc: '提升闪避率', power: 0.8, mpCost: 12, effect: 'dodge' },
        { id: 'def_g3', name: '治疗波', icon: '🌊', desc: '治疗波恢复HP', power: 0.6, mpCost: 12, effect: 'heal' },
        { id: 'def_g4', name: '护甲增强', icon: '🛡️', desc: '增强自身防御', power: 1.0, mpCost: 12, effect: 'armor' }
    ],
    // 蓝色 - 稀有
    blue: [
        { id: 'def_b1', name: '反射盾', icon: '🔄', desc: '反弹部分伤害', power: 1.5, mpCost: 20, effect: 'reflect' },
        { id: 'def_b2', name: '疾风步', icon: '🌪️', desc: '大幅提升速度', power: 1.5, mpCost: 20, effect: 'speed' },
        { id: 'def_b3', name: '治疗链', icon: '⛓️', desc: '连锁治疗友军', power: 1.0, mpCost: 20, effect: 'heal' },
        { id: 'def_b4', name: '生命链接', icon: '🔗', desc: '链接生命值', power: 1.5, mpCost: 20, effect: 'link' }
    ],
    // 紫色 - 史诗
    purple: [
        { id: 'def_p1', name: '魔法盾', icon: '🔮', desc: '强力魔法护盾', power: 2.5, mpCost: 30, effect: 'magicShield' },
        { id: 'def_p2', name: '幻影步', icon: '👻', desc: '化作幻影闪避', power: 2.5, mpCost: 30, effect: 'phantom' },
        { id: 'def_p3', name: '生命涌动', icon: '💗', desc: '大量恢复HP', power: 2.0, mpCost: 30, effect: 'heal' },
        { id: 'def_p4', name: '能量护甲', icon: '⚡', desc: '能量构成护甲', power: 2.5, mpCost: 30, effect: 'energy' }
    ],
    // 橙色 - 传说
    orange: [
        { id: 'def_o1', name: '神圣护盾', icon: '👼', desc: '神圣之力护盾', power: 4.0, mpCost: 45, effect: 'holy' },
        { id: 'def_o2', name: '幽灵守护', icon: '👻', desc: '幽灵守护自身', power: 4.0, mpCost: 45, effect: 'ghost' },
        { id: 'def_o3', name: '群体治疗', icon: '✨', desc: '治疗所有队友', power: 3.0, mpCost: 45, effect: 'groupHeal' },
        { id: 'def_o4', name: '反魔法外壳', icon: '🔮', desc: '免疫魔法伤害', power: 4.0, mpCost: 45, effect: 'antiMagic' }
    ],
    // 金色 - 神话
    gold: [
        { id: 'def_gold1', name: '神圣庇护', icon: '⛪', desc: '神圣全面庇护', power: 5.5, mpCost: 60, effect: 'divine' },
        { id: 'def_gold2', name: '永恒守护', icon: '🛡️', desc: '永恒存在护盾', power: 5.5, mpCost: 60, effect: 'eternal' },
        { id: 'def_gold3', name: '复活', icon: '💫', desc: '复活死亡队友', power: 0, mpCost: 60, effect: 'revive' },
        { id: 'def_gold4', name: '神圣干预', icon: '⚡', desc: '神圣力量干预', power: 5.5, mpCost: 60, effect: 'intervene' }
    ],
    // 红色 - 终极
    red: [
        { id: 'def_r1', name: '绝对防御', icon: '🏰', desc: '绝对无法被破', power: 8.0, mpCost: 80, effect: 'absolute' },
        { id: 'def_r2', name: '不死不灭', icon: '💀', desc: '短时间内不死', power: 8.0, mpCost: 80, effect: 'immortal' },
        { id: 'def_r3', name: '生命汲取', icon: '🩸', desc: '汲取敌人生命', power: 6.0, mpCost: 80, effect: 'drain' },
        { id: 'def_r4', name: '万物归一', icon: '🌍', desc: '与万物合一', power: 8.0, mpCost: 80, effect: 'unity' }
    ]
};

// ============================================
// 被动技能
// ============================================
var PASSIVE_SKILLS = {
    // 白色 - 普通
    white: [
        { id: 'pass_w1', name: '警觉', icon: '👁️', desc: '永久+5%闪避', effect: 'dodge', value: 5 },
        { id: 'pass_w2', name: '坚韧', icon: '💪', desc: '永久+5%防御', effect: 'defense', value: 5 },
        { id: 'pass_w3', name: '敏锐', icon: '🔍', desc: '永久+5%攻击', effect: 'attack', value: 5 },
        { id: 'pass_w4', name: '再生', icon: '💚', desc: '每回合+3%HP', effect: 'regen', value: 3 }
    ],
    // 绿色 - 优秀
    green: [
        { id: 'pass_g1', name: '灵活', icon: '🏃', desc: '永久+10%闪避', effect: 'dodge', value: 10 },
        { id: 'pass_g2', name: '铁壁', icon: '🛡️', desc: '永久+10%防御', effect: 'defense', value: 10 },
        { id: 'pass_g3', name: '狂暴', icon: '😤', desc: '永久+10%攻击', effect: 'attack', value: 10 },
        { id: 'pass_g4', name: '生命回复', icon: '💖', desc: '每回合+6%HP', effect: 'regen', value: 6 }
    ],
    // 蓝色 - 稀有
    blue: [
        { id: 'pass_b1', name: '幻影', icon: '👻', desc: '永久+15%闪避', effect: 'dodge', value: 15 },
        { id: 'pass_b2', name: '钢铁', icon: '⚙️', desc: '永久+15%防御', effect: 'defense', value: 15 },
        { id: 'pass_b3', name: '狂战士', icon: '⚔️', desc: '永久+15%攻击', effect: 'attack', value: 15 },
        { id: 'pass_b4', name: '生命涌动', icon: '💗', desc: '每回合+10%HP', effect: 'regen', value: 10 }
    ],
    // 紫色 - 史诗
    purple: [
        { id: 'pass_p1', name: '鬼魅', icon: '🌫️', desc: '永久+20%闪避', effect: 'dodge', value: 20 },
        { id: 'pass_p2', name: '金刚不坏', icon: '🗿', desc: '永久+20%防御', effect: 'defense', value: 20 },
        { id: 'pass_p3', name: '毁灭打击', icon: '💥', desc: '永久+20%攻击', effect: 'attack', value: 20 },
        { id: 'pass_p4', name: '不死之身', icon: '🧬', desc: '每回合+15%HP', effect: 'regen', value: 15 }
    ],
    // 橙色 - 传说
    orange: [
        { id: 'pass_o1', name: '虚空行者', icon: '🕳️', desc: '永久+25%闪避', effect: 'dodge', value: 25 },
        { id: 'pass_o2', name: '神圣护体', icon: '👼', desc: '永久+25%防御', effect: 'defense', value: 25 },
        { id: 'pass_o3', name: '战神之力', icon: '🏆', desc: '永久+25%攻击', effect: 'attack', value: 25 },
        { id: 'pass_o4', name: '永恒生命', icon: '♾️', desc: '每回合+20%HP', effect: 'regen', value: 20 }
    ],
    // 金色 - 神话
    gold: [
        { id: 'pass_gold1', name: '相位移动', icon: '⚡', desc: '永久+30%闪避', effect: 'dodge', value: 30 },
        { id: 'pass_gold2', name: '绝对防御', icon: '🏰', desc: '永久+30%防御', effect: 'defense', value: 30 },
        { id: 'pass_gold3', name: '湮灭之力', icon: '💫', desc: '永久+30%攻击', effect: 'attack', value: 30 },
        { id: 'pass_gold4', name: '生命源泉', icon: '🌊', desc: '每回合+25%HP', effect: 'regen', value: 25 }
    ],
    // 红色 - 终极
    red: [
        { id: 'pass_r1', name: '虚无法则', icon: '🌌', desc: '永久+40%闪避', effect: 'dodge', value: 40 },
        { id: 'pass_r2', name: '不朽之躯', icon: '👑', desc: '永久+40%防御', effect: 'defense', value: 40 },
        { id: 'pass_r3', name: '毁灭本源', icon: '🔥', desc: '永久+40%攻击', effect: 'attack', value: 40 },
        { id: 'pass_r4', name: '生命无限', icon: '♾️', desc: '每回合+30%HP', effect: 'regen', value: 30 }
    ]
};

// ============================================
// 获取所有技能数据
// ============================================
function getAllSkills() {
    var all = [];
    var rarityMap = { white: 0, green: 1, blue: 2, purple: 3, orange: 4, gold: 5, red: 6 };
    
    // 法术技能
    for (var rarity in MAGIC_SKILLS) {
        MAGIC_SKILLS[rarity].forEach(function(skill) {
            skill.rarity = rarityMap[rarity];
            skill.type = SKILL_TYPES.MAGIC;
            all.push(skill);
        });
    }
    
    // 物理技能
    for (var rarity in PHYSICAL_SKILLS) {
        PHYSICAL_SKILLS[rarity].forEach(function(skill) {
            skill.rarity = rarityMap[rarity];
            skill.type = SKILL_TYPES.PHYSICAL;
            all.push(skill);
        });
    }
    
    // 防御技能
    for (var rarity in DEFEND_SKILLS) {
        DEFEND_SKILLS[rarity].forEach(function(skill) {
            skill.rarity = rarityMap[rarity];
            skill.type = SKILL_TYPES.DEFEND;
            all.push(skill);
        });
    }
    
    // 被动技能
    for (var rarity in PASSIVE_SKILLS) {
        PASSIVE_SKILLS[rarity].forEach(function(skill) {
            skill.rarity = rarityMap[rarity];
            skill.type = SKILL_TYPES.PASSIVE;
            skill.mpCost = 0; // 被动不消耗MP
            all.push(skill);
        });
    }
    
    return all;
}

// ============================================
// 根据类型和稀有度获取技能
// ============================================
function getSkillsByTypeAndRarity(type, rarityIndex) {
    var rarityMap = ['white', 'green', 'blue', 'purple', 'orange', 'gold', 'red'];
    var rarity = rarityMap[rarityIndex];
    
    switch(type) {
        case SKILL_TYPES.MAGIC:
            return MAGIC_SKILLS[rarity] || [];
        case SKILL_TYPES.PHYSICAL:
            return PHYSICAL_SKILLS[rarity] || [];
        case SKILL_TYPES.DEFEND:
            return DEFEND_SKILLS[rarity] || [];
        case SKILL_TYPES.PASSIVE:
            return PASSIVE_SKILLS[rarity] || [];
        default:
            return [];
    }
}

// ============================================
// 随机获取一个技能
// ============================================
function getRandomSkill(minRarity = 0, maxRarity = 3, types = null) {
    var allSkills = getAllSkills();
    var filtered = allSkills.filter(function(s) {
        if (s.rarity < minRarity || s.rarity > maxRarity) return false;
        if (types && types.length > 0 && !types.includes(s.type)) return false;
        return true;
    });
    
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
}

// ============================================
// 获取技能图标颜色
// ============================================
function getSkillColor(rarity) {
    return SKILL_RARITIES[rarity] ? SKILL_RARITIES[rarity].color : '#CCCCCC';
}
