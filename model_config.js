// ============================================
// 0507新版 - 模型资源配置文件
// 用于替换角色、宠物、BOSS的图片
// ============================================

// 角色模型配置 - 对应 juese 文件夹
var CHARACTER_DB = {
  1: { name: '主角', image: 'juese/player.png' }
};

// ============================================
// 蛋蛋宠物配置 - 12元素系列 x 7进化阶段
// 元素: 火, 水, 草, 冰, 电, 光, 暗, 金, 岩, 星, 风, 机器
// 进化阶段: 普通(1)→宝宝(2)→儿童(3)→少年(4)→成年(5)→精英(6)→传说(7)
// ============================================
var EGGY_DB = {
  // ==================== 火系 ====================
  fire_baby:   { name: '焰焰', element: 'fire', stage: 'baby',   image: 'eggy/火1.png' },
  fire_child:  { name: '小火', element: 'fire', stage: 'child',  image: 'eggy/火2.png' },
  fire_teen:   { name: '烈焰', element: 'fire', stage: 'teen',   image: 'eggy/火3.png' },
  fire_adult:  { name: '炎魂', element: 'fire', stage: 'adult',  image: 'eggy/火4.png' },
  fire_elite:  { name: '炎魔', element: 'fire', stage: 'elite',  image: 'eggy/火5.png' },
  fire_legend: { name: '炎帝', element: 'fire', stage: 'legend', image: 'eggy/火6.png' },
  fire_myth:   { name: '炎神', element: 'fire', stage: 'myth',   image: 'eggy/火7.png' },

  // ==================== 水系 ====================
  water_baby:   { name: '波波', element: 'water', stage: 'baby',   image: 'eggy/水1.png' },
  water_child:  { name: '水水', element: 'water', stage: 'child',  image: 'eggy/水2.png' },
  water_teen:   { name: '蓝鲸', element: 'water', stage: 'teen',   image: 'eggy/水3.png' },
  water_adult:  { name: '海灵', element: 'water', stage: 'adult',  image: 'eggy/水4.png' },
  water_elite:  { name: '海皇', element: 'water', stage: 'elite',  image: 'eggy/水5.png' },
  water_legend: { name: '海神', element: 'water', stage: 'legend', image: 'eggy/水6.png' },
  water_myth:   { name: '水帝', element: 'water', stage: 'myth',   image: 'eggy/水7.png' },

  // ==================== 草系 ====================
  grass_baby:   { name: '芽芽', element: 'grass', stage: 'baby',   image: 'eggy/木1.png' },
  grass_child:  { name: '绿芽', element: 'grass', stage: 'child',  image: 'eggy/木2.png' },
  grass_teen:   { name: '藤蔓', element: 'grass', stage: 'teen',   image: 'eggy/木3.png' },
  grass_adult:  { name: '花仙', element: 'grass', stage: 'adult',  image: 'eggy/木4.png' },
  grass_elite:  { name: '花神', element: 'grass', stage: 'elite',  image: 'eggy/木5.png' },
  grass_legend: { name: '精灵', element: 'grass', stage: 'legend', image: 'eggy/木6.png' },
  grass_myth:   { name: '草帝', element: 'grass', stage: 'myth',   image: 'eggy/木7.png' },

  // ==================== 冰系 ====================
  ice_baby:   { name: '晶晶', element: 'ice', stage: 'baby',   image: 'eggy/水晶1.png' },
  ice_child:  { name: '冰晶', element: 'ice', stage: 'child',  image: 'eggy/水晶2.png' },
  ice_teen:   { name: '雪球', element: 'ice', stage: 'teen',   image: 'eggy/水晶3.png' },
  ice_adult:  { name: '雪女', element: 'ice', stage: 'adult',  image: 'eggy/水晶4.png' },
  ice_elite:  { name: '冰皇', element: 'ice', stage: 'elite',  image: 'eggy/水晶5.png' },
  ice_legend: { name: '冰帝', element: 'ice', stage: 'legend', image: 'eggy/水晶6.png' },
  ice_myth:   { name: '冰神', element: 'ice', stage: 'myth',   image: 'eggy/水晶7.png' },

  // ==================== 电系 ====================
  electric_baby:   { name: '电电', element: 'electric', stage: 'baby',   image: 'eggy/电1.png' },
  electric_child:  { name: '闪电', element: 'electric', stage: 'child',  image: 'eggy/电2.png' },
  electric_teen:   { name: '雷鸣', element: 'electric', stage: 'teen',   image: 'eggy/电3.png' },
  electric_adult:  { name: '雷神', element: 'electric', stage: 'adult',  image: 'eggy/电4.png' },
  electric_elite:  { name: '雷帝', element: 'electric', stage: 'elite',  image: 'eggy/电5.png' },
  electric_legend: { name: '雷魔', element: 'electric', stage: 'legend', image: 'eggy/电6.png' },
  electric_myth:   { name: '雷皇', element: 'electric', stage: 'myth',   image: 'eggy/电7.png' },

  // ==================== 光系 ====================
  light_baby:   { name: '光光', element: 'light', stage: 'baby',   image: 'eggy/光1.png' },
  light_child:  { name: '圣光', element: 'light', stage: 'child',  image: 'eggy/光2.png' },
  light_teen:   { name: '天使', element: 'light', stage: 'teen',   image: 'eggy/光3.png' },
  light_adult:  { name: '光神', element: 'light', stage: 'adult',  image: 'eggy/光4.png' },
  light_elite:  { name: '光帝', element: 'light', stage: 'elite',  image: 'eggy/光5.png' },
  light_legend: { name: '光明', element: 'light', stage: 'legend', image: 'eggy/光6.png' },
  light_myth:   { name: '光皇', element: 'light', stage: 'myth',   image: 'eggy/光7.png' },

  // ==================== 暗系 ====================
  dark_baby:   { name: '暗暗', element: 'dark', stage: 'baby',   image: 'eggy/暗1.png' },
  dark_child:  { name: '暗影', element: 'dark', stage: 'child',  image: 'eggy/暗2.png' },
  dark_teen:   { name: '幽灵', element: 'dark', stage: 'teen',   image: 'eggy/暗3.png' },
  dark_adult:  { name: '暗魔', element: 'dark', stage: 'adult',  image: 'eggy/暗4.png' },
  dark_elite:  { name: '暗皇', element: 'dark', stage: 'elite',  image: 'eggy/暗5.png' },
  dark_legend: { name: '暗帝', element: 'dark', stage: 'legend', image: 'eggy/暗6.png' },
  dark_myth:   { name: '死神', element: 'dark', stage: 'myth',   image: 'eggy/暗7.png' },

  // ==================== 金属系 ====================
  metal_baby:   { name: '金金', element: 'metal', stage: 'baby',   image: 'eggy/金1.png' },
  metal_child:  { name: '金币', element: 'metal', stage: 'child',  image: 'eggy/金2.png' },
  metal_teen:   { name: '金甲', element: 'metal', stage: 'teen',   image: 'eggy/金3.png' },
  metal_adult:  { name: '金兽', element: 'metal', stage: 'adult',  image: 'eggy/金4.png' },
  metal_elite:  { name: '金皇', element: 'metal', stage: 'elite',  image: 'eggy/金5.png' },
  metal_legend: { name: '金帝', element: 'metal', stage: 'legend', image: 'eggy/金6.png' },
  metal_myth:   { name: '金刚', element: 'metal', stage: 'myth',   image: 'eggy/金7.png' },

  // ==================== 岩石系 ====================
  rock_baby:   { name: '岩岩', element: 'rock', stage: 'baby',   image: 'eggy/岩1.png' },
  rock_child:  { name: '石石', element: 'rock', stage: 'child',  image: 'eggy/岩2.png' },
  rock_teen:   { name: '石魔', element: 'rock', stage: 'teen',   image: 'eggy/岩3.png' },
  rock_adult:  { name: '石皇', element: 'rock', stage: 'adult',  image: 'eggy/岩4.png' },
  rock_elite:  { name: '石帝', element: 'rock', stage: 'elite',  image: 'eggy/岩5.png' },
  rock_legend: { name: '石神', element: 'rock', stage: 'legend', image: 'eggy/岩6.png' },
  rock_myth:   { name: '山神', element: 'rock', stage: 'myth',   image: 'eggy/岩7.png' },

  // ==================== 星系 ====================
  star_baby:   { name: '星星', element: 'star', stage: 'baby',   image: 'eggy/宙1.png' },
  star_child:  { name: '星辰', element: 'star', stage: 'child',  image: 'eggy/宙2.png' },
  star_teen:   { name: '星尘', element: 'star', stage: 'teen',   image: 'eggy/宙3.png' },
  star_adult:  { name: '星魂', element: 'star', stage: 'adult',  image: 'eggy/宙4.png' },
  star_elite:  { name: '星皇', element: 'star', stage: 'elite',  image: 'eggy/宙5.png' },
  star_legend: { name: '星帝', element: 'star', stage: 'legend', image: 'eggy/宙6.png' },
  star_myth:   { name: '星神', element: 'star', stage: 'myth',   image: 'eggy/宙7.png' },

  // ==================== 风系 ====================
  wind_baby:   { name: '风风', element: 'wind', stage: 'baby',   image: 'eggy/风1.png' },
  wind_child:  { name: '微风', element: 'wind', stage: 'child',  image: 'eggy/风2.png' },
  wind_teen:   { name: '风暴', element: 'wind', stage: 'teen',   image: 'eggy/风3.png' },
  wind_adult:  { name: '风灵', element: 'wind', stage: 'adult',  image: 'eggy/风4.png' },
  wind_elite:  { name: '风魔', element: 'wind', stage: 'elite',  image: 'eggy/风5.png' },
  wind_legend: { name: '风皇', element: 'wind', stage: 'legend', image: 'eggy/风6.png' },
  wind_myth:   { name: '风帝', element: 'wind', stage: 'myth',   image: 'eggy/风7.png' },

  // ==================== 3D/机械系 ====================
  special_baby:   { name: '机机', element: 'special', stage: 'baby',   image: 'eggy/机器1.png' },
  special_child:  { name: '机器', element: 'special', stage: 'child',  image: 'eggy/机器2.png' },
  special_teen:   { name: '机甲', element: 'special', stage: 'teen',   image: 'eggy/机器3.png' },
  special_adult:  { name: '机械', element: 'special', stage: 'adult',  image: 'eggy/机器4.png' },
  special_elite:  { name: '机皇', element: 'special', stage: 'elite',  image: 'eggy/机器5.png' },
  special_legend: { name: '机帝', element: 'special', stage: 'legend', image: 'eggy/机器6.png' },
  special_myth:   { name: '机神', element: 'special', stage: 'myth',   image: 'eggy/机器7.png' }
};

// ============================================
// 进化阶段定义 - 7个阶段
// ============================================
var EVOLUTION_STAGES = ['baby', 'child', 'teen', 'adult', 'elite', 'legend', 'myth'];

// 进化阶段显示名称
var STAGE_NAMES = {
  baby: '普通(1)',
  child: '宝宝(2)',
  teen: '儿童(3)',
  adult: '少年(4)',
  elite: '成年(5)',
  legend: '精英(6)',
  myth: '传说(7)'
};

// 进化阶段颜色
var STAGE_COLORS = {
  baby: '#90CAF9',    // 浅蓝
  child: '#4FC3F7',   // 天蓝
  teen: '#26C6DA',    // 青色
  adult: '#26A69A',   // 青绿
  elite: '#AB47BC',   // 紫色
  legend: '#FFD700',  // 金色
  myth: '#FF5722'     // 橙红
};

// 进化阶段图标
var STAGE_ICONS = {
  baby: '🥚',
  child: '🐣',
  teen: '🐥',
  adult: '🐤',
  elite: '🦅',
  legend: '🐉',
  myth: '👑'
};

// ============================================
// 元素系统定义 - 12种元素
// ============================================
var ELEMENTS = ['fire', 'water', 'grass', 'ice', 'electric', 'light', 'dark', 'metal', 'rock', 'star', 'wind', 'special'];

// 元素显示名称
var ELEMENT_NAMES = {
  fire: '火',
  water: '水',
  grass: '草',
  ice: '冰',
  electric: '电',
  light: '光',
  dark: '暗',
  metal: '金',
  rock: '岩',
  star: '星',
  wind: '风',
  special: '机器'
};

// 元素图标
var ELEMENT_ICONS = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  ice: '❄️',
  electric: '⚡',
  light: '✨',
  dark: '🌑',
  metal: '🔩',
  rock: '🪨',
  star: '⭐',
  wind: '🌪',
  special: '⚙️'
};

// 元素颜色
var ELEMENT_COLORS = {
  fire: '#FF5722',
  water: '#2196F3',
  grass: '#4CAF50',
  ice: '#00BCD4',
  electric: '#FFEB3B',
  light: '#FFC107',
  dark: '#9C27B0',
  metal: '#607D8B',
  rock: '#795548',
  star: '#E91E63',
  wind: '#00E676',
  special: '#FF4081',
  god: '#FFD700'
};

// ============================================
// 进化材料配置
// ============================================
var EVO_MATERIALS = {
  // 12系进化石
  fireStone: { name: '火之石', element: 'fire', icon: '🔶', desc: '火系进化材料', price: 150 },
  waterStone: { name: '水之石', element: 'water', icon: '🔷', desc: '水系进化材料', price: 150 },
  grassStone: { name: '草之石', element: 'grass', icon: '🟢', desc: '草系进化材料', price: 150 },
  iceStone: { name: '冰之石', element: 'ice', icon: '🧊', desc: '冰系进化材料', price: 150 },
  electricStone: { name: '电之石', element: 'electric', icon: '⚡', desc: '电系进化材料', price: 150 },
  lightStone: { name: '光之石', element: 'light', icon: '💛', desc: '光系进化材料', price: 150 },
  darkStone: { name: '暗之石', element: 'dark', icon: '💜', desc: '暗系进化材料', price: 150 },
  metalStone: { name: '金之石', element: 'metal', icon: '🔩', desc: '金属系进化材料', price: 150 },
  rockStone: { name: '岩之石', element: 'rock', icon: '🪨', desc: '岩石系进化材料', price: 150 },
  starStone: { name: '星之石', element: 'star', icon: '⭐', desc: '星系进化材料', price: 150 },
  windStone: { name: '风之石', element: 'wind', icon: '🌪', desc: '风系进化材料', price: 150 },
  specialStone: { name: '机器核心', element: 'special', icon: '⚙️', desc: '机械系进化材料', price: 150 },

  // 进化碎片（10个可合成1个进化石）
  fireFragment: { name: '火之碎片', element: 'fire', icon: '🔸', desc: '收集10个可合成火之石', price: 20, combineTo: 'fireStone' },
  waterFragment: { name: '水之碎片', element: 'water', icon: '🔹', desc: '收集10个可合成水之石', price: 20, combineTo: 'waterStone' },
  grassFragment: { name: '草之碎片', element: 'grass', icon: '🟢', desc: '收集10个可合成草之石', price: 20, combineTo: 'grassStone' },
  iceFragment: { name: '冰之碎片', element: 'ice', icon: '❄️', desc: '收集10个可合成冰之石', price: 20, combineTo: 'iceStone' },
  electricFragment: { name: '电之碎片', element: 'electric', icon: '🔌', desc: '收集10个可合成电之石', price: 20, combineTo: 'electricStone' },
  lightFragment: { name: '光之碎片', element: 'light', icon: '💫', desc: '收集10个可合成光之石', price: 20, combineTo: 'lightStone' },
  darkFragment: { name: '暗之碎片', element: 'dark', icon: '🌑', desc: '收集10个可合成暗之石', price: 20, combineTo: 'darkStone' },
  metalFragment: { name: '金之碎片', element: 'metal', icon: '🔷', desc: '收集10个可合成金之石', price: 20, combineTo: 'metalStone' },
  rockFragment: { name: '岩之碎片', element: 'rock', icon: '🔶', desc: '收集10个可合成岩之石', price: 20, combineTo: 'rockStone' },
  starFragment: { name: '星之碎片', element: 'star', icon: '⭐', desc: '收集10个可合成星之石', price: 20, combineTo: 'starStone' },
  windFragment: { name: '风之碎片', element: 'wind', icon: '🌀', desc: '收集10个可合成风之石', price: 20, combineTo: 'windStone' },
  specialFragment: { name: '机械碎片', element: 'special', icon: '🔩', desc: '收集10个可合成机器核心', price: 20, combineTo: 'specialStone' }
};

// 碎片ID列表
var FRAGMENT_IDS = [
  'fireFragment', 'waterFragment', 'grassFragment', 'iceFragment',
  'electricFragment', 'lightFragment', 'darkFragment', 'metalFragment',
  'rockFragment', 'starFragment', 'windFragment', 'specialFragment'
];

// 石头的ID列表
var STONE_IDS = [
  'fireStone', 'waterStone', 'grassStone', 'iceStone',
  'electricStone', 'lightStone', 'darkStone', 'metalStone',
  'rockStone', 'starStone', 'windStone', 'specialStone'
];

// ============================================
// 起始宠物配置 - 只包含初始形态（baby阶段）
// ============================================
var STARTER_EGGY = [
  // 火系
  { id: 'fire_baby', name: '焰焰', element: 'fire', stage: 'baby', t: 'fire' },
  // 水系
  { id: 'water_baby', name: '波波', element: 'water', stage: 'baby', t: 'water' },
  // 草系
  { id: 'grass_baby', name: '芽芽', element: 'grass', stage: 'baby', t: 'grass' },
  // 冰系
  { id: 'ice_baby', name: '晶晶', element: 'ice', stage: 'baby', t: 'ice' },
  // 电系
  { id: 'electric_baby', name: '电电', element: 'electric', stage: 'baby', t: 'electric' },
  // 光系
  { id: 'light_baby', name: '光光', element: 'light', stage: 'baby', t: 'light' },
  // 暗系
  { id: 'dark_baby', name: '暗暗', element: 'dark', stage: 'baby', t: 'dark' },
  // 金属系
  { id: 'metal_baby', name: '金金', element: 'metal', stage: 'baby', t: 'metal' },
  // 岩石系
  { id: 'rock_baby', name: '岩岩', element: 'rock', stage: 'baby', t: 'rock' },
  // 星系
  { id: 'star_baby', name: '星星', element: 'star', stage: 'baby', t: 'star' },
  // 风系
  { id: 'wind_baby', name: '风风', element: 'wind', stage: 'baby', t: 'wind' },
  // 机器系
  { id: 'special_baby', name: '机机', element: 'special', stage: 'baby', t: 'special' }
];

// 元素到Pokemon ID的映射（用于兼容旧系统）
var ELEMENT_TO_POKE_ID = {
  fire: 4,
  water: 7,
  grass: 1,
  ice: 55,
  electric: 26,
  light: 36,
  dark: 94,
  metal: 59,
  rock: 59,
  star: 151,
  wind: 35,
  special: 143
};
