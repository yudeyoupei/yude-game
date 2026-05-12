// ============================================
//  角色穿戴效果展示系统
// ============================================

// 更新角色展示区 - 显示穿戴的装备
function updateCharDisplay() {
  console.log('[角色展示] 更新角色穿戴显示');
  
  if (!state || !state.equipped) {
    console.log('[角色展示] 无装备数据');
    return;
  }
  
  // 获取各部位装备
  var weapon = state.equipped.weapon;
  var helmet = state.equipped.helmet;
  var clothes = state.equipped.clothes;
  var shoes = state.equipped.shoes;
  var accessory = state.equipped.necklace || state.equipped.ring || state.equipped.earring || state.equipped.bracelet;
  
  // 更新角色展示区的装备显示
  updateCharEquipSlot('charWeapon', weapon, '武器');
  updateCharEquipSlot('charHelmet', helmet, '头盔');
  updateCharEquipSlot('charClothes', clothes, '衣服');
  updateCharEquipSlot('charShoes', shoes, '鞋子');
  updateCharEquipSlot('charNecklace', accessory, '饰品');
  
  // 更新装备信息文字
  updateCharEquipInfo(weapon, helmet, clothes, shoes, accessory);
  
  // 更新装备光效
  updateCharRarityGlow(weapon, helmet, clothes, shoes, accessory);
  
  // 更新角色模型图片
  updateCharModelImage();
}

// 更新角色模型图片显示
function updateCharModelImage() {
  var charImgEl = document.getElementById('charModelImage');
  if (!charImgEl) {
    // 如果元素不存在，创建它
    var charModel = document.querySelector('.char-model');
    if (charModel) {
      charImgEl = document.createElement('img');
      charImgEl.id = 'charModelImage';
      charImgEl.className = 'char-model-image';
      charModel.appendChild(charImgEl);
    }
  }
  
  if (charImgEl) {
    // 获取当前学生的角色ID
    var currentStudent = stu();
    var charId = currentStudent && currentStudent.charId ? currentStudent.charId : 1;
    var charInfo = CHARACTER_DB[charId] || CHARACTER_DB[1];
    charImgEl.src = charInfo.image;
    charImgEl.alt = charInfo.name;
  }
}

// 更新单个装备槽的显示
function updateCharEquipSlot(slotId, equip, defaultText) {
  var slot = document.getElementById(slotId);
  if (!slot) return;
  
  if (equip) {
    // 显示装备图标
    var rarityClass = getRarityClass(equip.rarity);
    slot.innerHTML = '<svg width="40" height="40"><use href="#icon-' + getEquipIconType(equip.slot) + '"/></svg>';
    slot.className = 'char-equip-slot ' + rarityClass;
    slot.title = equip.name;
  } else {
    // 显示空
    slot.innerHTML = '';
    slot.className = 'char-equip-slot empty';
    slot.title = defaultText + '：无';
  }
}

// 获取装备图标类型
function getEquipIconType(slot) {
  var iconMap = {
    'weapon': 'weapon',
    'shield': 'shield',
    'helmet': 'helmet',
    'clothes': 'clothes',
    'pants': 'pants',
    'shoes': 'boots',
    'necklace': 'accessory',
    'ring': 'accessory',
    'earring': 'accessory',
    'bracelet': 'accessory'
  };
  return iconMap[slot] || 'weapon';
}

// 获取稀有度CSS类
function getRarityClass(rarity) {
  return 'rarity-' + rarity;
}

// 更新角色装备信息文字
function updateCharEquipInfo(weapon, helmet, clothes, shoes, accessory) {
  var weaponInfo = document.getElementById('charEquipWeapon');
  var helmetInfo = document.getElementById('charEquipHelmet');
  var clothesInfo = document.getElementById('charEquipClothes');
  var shoesInfo = document.getElementById('charEquipShoes');
  var accessoryInfo = document.getElementById('charEquipAccessory');
  
  if (weaponInfo) weaponInfo.textContent = '武器：' + (weapon ? weapon.name : '无');
  if (helmetInfo) helmetInfo.textContent = '头盔：' + (helmet ? helmet.name : '无');
  if (clothesInfo) clothesInfo.textContent = '衣服：' + (clothes ? clothes.name : '无');
  if (shoesInfo) shoesInfo.textContent = '鞋子：' + (shoes ? shoes.name : '无');
  if (accessoryInfo) accessoryInfo.textContent = '饰品：' + (accessory ? accessory.name : '无');
}

// 更新角色装备光效
function updateCharRarityGlow(weapon, helmet, clothes, shoes, accessory) {
  var glow = document.getElementById('charRarityGlow');
  if (!glow) return;
  
  // 找出最高稀有度
  var maxRarity = 0;
  if (weapon && weapon.rarity > maxRarity) maxRarity = weapon.rarity;
  if (helmet && helmet.rarity > maxRarity) maxRarity = helmet.rarity;
  if (clothes && clothes.rarity > maxRarity) maxRarity = clothes.rarity;
  if (shoes && shoes.rarity > maxRarity) maxRarity = shoes.rarity;
  if (accessory && accessory.rarity > maxRarity) maxRarity = accessory.rarity;
  
  // 根据最高稀有度显示光效
  if (maxRarity >= 4) {
    glow.className = 'char-rarity-glow rarity-' + maxRarity;
    glow.style.opacity = '1';
  } else {
    glow.style.opacity = '0';
  }
}

// 示例：自动穿戴一套蓝、紫、金、红、粉装备
function equipSampleSet() {
  console.log('[示例] 自动穿戴一套装备');
  
  if (!state.equipped) state.equipped = {};
  
  // 蓝色装备（稀有度2）
  state.equipped.weapon = {
    name: '蓝色长剑',
    slot: 'weapon',
    rarity: 2,
    attack: 15
  };
  
  // 紫色装备（稀有度3）
  state.equipped.helmet = {
    name: '紫色头盔',
    slot: 'helmet',
    rarity: 3,
    defense: 10
  };
  
  // 金色装备（稀有度4）
  state.equipped.clothes = {
    name: '金色胸甲',
    slot: 'clothes',
    rarity: 4,
    defense: 20,
    health: 50
  };
  
  // 红色装备（稀有度5）
  state.equipped.shoes = {
    name: '红色靴子',
    slot: 'shoes',
    rarity: 5,
    speed: 15
  };
  
  // 粉色装备（稀有度6）
  state.equipped.ring = {
    name: '粉色戒指',
    slot: 'ring',
    rarity: 6,
    all: 10
  };
  
  // 保存并更新显示
  saveState();
  updateCharDisplay();
  
  // 同时更新装备槽显示
  renderLegequip();
  
  showMsg('✅', '已为角色穿戴一套蓝、紫、金、红、粉装备！查看中央角色展示区查看效果！');
}

// 在页面加载时自动更新角色展示区
document.addEventListener('DOMContentLoaded', function() {
  console.log('[角色展示] 页面加载完成，更新角色展示区');
  setTimeout(function() {
    updateCharDisplay();
  }, 1000);
});

// 在装备变化时更新角色展示区（重写onEquipSlotClick函数）
var originalOnEquipSlotClick = onEquipSlotClick;
if (typeof originalOnEquipSlotClick === 'function') {
  onEquipSlotClick = function(slot) {
    originalOnEquipSlotClick(slot);
    setTimeout(function() {
      updateCharDisplay();
    }, 500);
  };
}
