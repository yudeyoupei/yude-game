// ============================================
// 技能系统补丁 - 修复宠物数据获取
// ============================================

// ============================================
// 获取学生的宠物对象（从实际数据存储结构中）
// ============================================
function getStudentPet(student) {
    if (!student) return null;
    
    var pet = null;
    
    // 检查主宠物（student.p 是主宠物的pokeId）
    if (student.p) {
        pet = {
            pokeId: student.p,
            exp: student.petExp !== undefined ? student.petExp : (student.e || 0),
            mp: student.petMp || 100,
            maxMp: 100,
            skills: student.petSkills || [],
            skillLevels: student.petSkillLevels || {},
            petHunger: student.petHunger !== undefined ? student.petHunger : 100,
            isMain: true
        };
    } 
    // 如果没有主宠物，检查背包宠物
    else if (student.petInventory && student.petInventory.length > 0) {
        var firstPet = student.petInventory[0];
        pet = {
            pokeId: firstPet.pokeId,
            exp: firstPet.exp || 0,
            mp: firstPet.mp || 100,
            maxMp: 100,
            skills: firstPet.skills || [],
            skillLevels: firstPet.skillLevels || {},
            petHunger: firstPet.petHunger !== undefined ? firstPet.petHunger : 100,
            isMain: false
        };
    }
    
    return pet;
}

// ============================================
// 技能中心UI渲染
// ============================================
function renderSkillCenter() {
    console.log('[技能中心] 渲染技能中心');
    
    // 使用现有的stu()函数获取当前学生
    var currentStudent = stu();
    if (!currentStudent) {
        var el = document.getElementById('currentPetSkills');
        if (el) el.innerHTML = '<div class="empty" style="text-align:center;padding:40px 20px;opacity:0.5">请先选择一个学生</div>';
        return;
    }
    
    // 获取学生的宠物（使用正确的数据来源）
    var pet = getStudentPet(currentStudent);
    
    if (!pet) {
        var el = document.getElementById('currentPetSkills');
        if (el) el.innerHTML = '<div class="empty" style="text-align:center;padding:40px 20px;opacity:0.5">该学生还没有宠物</div>';
        return;
    }
    
    // 渲染当前宠物信息
    renderPetSkillHeader(pet);
    
    // 渲染已学技能 + 背包技能书
    renderPetSkills(pet, currentStudent);
}

function renderPetSkillHeader(pet) {
    var avatar = document.getElementById('skillPetAvatar');
    var name = document.getElementById('skillPetName');
    var mp = document.getElementById('skillPetMp');
    var maxMp = document.getElementById('skillPetMaxMp');
    
    // 从POKEDB获取宠物名称
    var pokeData = null;
    if (typeof POKEDB !== 'undefined' && pet.pokeId) {
        pokeData = POKEDB[pet.pokeId];
    } else if (typeof window.POKEDB !== 'undefined' && pet.pokeId) {
        pokeData = window.POKEDB[pet.pokeId];
    }
    
    // 获取当前学生，用于计算进化阶段
    var currentStudent = (typeof stu === 'function') ? stu() : null;
    
    // 尝试用 eggy 图片替换 emoji
    if (avatar && pet.pokeId &&
        typeof getEggyElementByPokeId === 'function' &&
        typeof getEggyStageByExpAndMaterials === 'function' &&
        typeof getEggyImagePath === 'function') {
        var eggyElement = getEggyElementByPokeId(pet.pokeId);
        var eggyStage = getEggyStageByExpAndMaterials(pet.exp || 0, currentStudent || pet);
        var eggyPath = getEggyImagePath(eggyElement, eggyStage);
        // 用自定义名字（若有）优先
        var displayName = (currentStudent && currentStudent.pokeName && currentStudent.pokeName.trim())
            ? currentStudent.pokeName.trim()
            : (pokeData ? (pokeData.n || '未命名') : '未命名');
        avatar.innerHTML = '<img src="' + eggyPath + '" alt="' + displayName + '" '
            + 'style="width:100%;height:100%;object-fit:contain;border-radius:50%;display:block" '
            + 'onerror="this.parentElement.innerHTML=\'🐾\'">';
    } else {
        // 降级：显示 emoji
        if (avatar) avatar.textContent = pokeData ? (pokeData.e || '🐾') : '🐾';
    }
    
    // 显示名字（优先使用自定义名）
    var finalName = (currentStudent && currentStudent.pokeName && currentStudent.pokeName.trim())
        ? currentStudent.pokeName.trim()
        : (pokeData ? (pokeData.n || '未命名') : '未命名');
    if (name) name.textContent = finalName;
    if (mp) mp.textContent = pet.mp || 100;
    if (maxMp) maxMp.textContent = pet.maxMp || 100;
}

// 技能书稀有度对应表（用于显示技能书的品级颜色）
function getSkillBookTierInfo(skillRarity) {
    var tiers = {
        2: { name: '蓝色技能书', icon: '📘', color: '#4A90E2', bg: 'rgba(74,144,226,0.15)' },
        3: { name: '紫色技能书', icon: '📕', color: '#9b59b6', bg: 'rgba(155,89,182,0.15)' },
        4: { name: '橙色技能书', icon: '📙', color: '#e67e22', bg: 'rgba(230,126,34,0.15)' },
        5: { name: '红色技能书', icon: '📕', color: '#e74c3c', bg: 'rgba(231,76,60,0.15)' }
    };
    return tiers[skillRarity] || { name: '技能书', icon: '📕', color: '#aaa', bg: 'rgba(150,150,150,0.15)' };
}

function renderPetSkills(pet, currentStudent) {
    var container = document.getElementById('petSkillsList');
    if (!container) return;
    
    var learnedSkills = pet.skills || [];
    var skillBooks = currentStudent ? (currentStudent.skillBooks || []) : [];
    
    // 如果都没有，显示引导提示
    if (learnedSkills.length === 0 && skillBooks.length === 0) {
        container.innerHTML = '<div style="text-align:center;opacity:0.5;padding:40px 20px;font-size:.9rem">📚 还没有学习任何技能<br><small style="opacity:0.6">开宝箱获取技能书后可以在这里学习！</small></div>';
        return;
    }
    
    var html = '';
    
    // 双栏布局容器
    html += '<div class="skill-dual-col">';
    
    // ===== 左栏：已学习技能 (占2/3) =====
    html += '<div class="skill-col skill-col-learned">';
    html += '<div class="skill-col-title"><span style="color:#26de81">⭐</span> 已学习技能 <span style="opacity:0.45;font-weight:normal;font-size:.75rem">(' + learnedSkills.length + ')</span></div>';
    html += '<div class="skill-col-body">';
    
    if (learnedSkills.length === 0) {
        html += '<div style="text-align:center;opacity:0.35;padding:30px 10px;font-size:.78rem;line-height:1.8">还没有已学技能<br><small>去背包使用技能书学习</small></div>';
    } else {
        html += '<div class="learned-grid">';
        learnedSkills.forEach(function(skillId) {
            var skill = findSkillById(skillId);
            if (!skill) return;
            
            var rarityInfo = (typeof SKILL_RARITIES !== 'undefined') ? (SKILL_RARITIES[skill.rarity] || SKILL_RARITIES[0]) : { name: '普通', bgColor: '#333', color: '#CCC' };
            
            // 获取技能等级（默认Lv.1）
            var skillLevel = pet.skillLevels ? (pet.skillLevels[skillId] || 1) : 1;
            var isMaxLevel = skillLevel >= 5;
            
            // 升级消耗计算
            var upgradeCost = getUpgradeCost(skill.rarity, skillLevel);
            var studentObj = (typeof stu === 'function') ? stu() : null;
            var canUpgrade = studentObj && (studentObj.c || 0) >= upgradeCost && !isMaxLevel;
            
            html += '<div class="learned-item" style="border-color:' + rarityInfo.color + '">';
            html += '<div class="learned-icon">' + renderSkillIcon(skill) + '</div>';
            html += '<div class="learned-name" style="color:' + rarityInfo.color + '">' + (skill.name || '') + ' <span class="skill-lv">Lv.' + skillLevel + '</span></div>';
            html += '<div class="learned-desc">' + (skill.desc || '') + '</div>';
            html += '<div class="learned-bottom">';
            if (isMaxLevel) {
                html += '<span class="skill-max-badge">MAX</span>';
            } else {
                html += '<button class="skill-upgrade-btn" onclick="upgradeSkill(\'' + skillId + '\')" ' + (canUpgrade ? '' : 'disabled') + '>⬆ 升级 <span class="cost">💰' + upgradeCost + '</span></button>';
            }
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';
    }
    html += '</div></div>'; // 关闭左栏
    
    // ===== 右栏：背包技能书 (占1/3) =====
    html += '<div class="skill-col skill-col-books">';
    html += '<div class="skill-col-title"><span style="color:#FFD700">📕</span> 背包技能书 <span style="opacity:0.45;font-weight:normal;font-size:.75rem">(' + skillBooks.length + ')</span></div>';
    html += '<div class="skill-col-body">';
    
    if (skillBooks.length === 0) {
        html += '<div style="text-align:center;opacity:0.35;padding:30px 10px;font-size:.78rem;line-height:1.8">背包里没有技能书<br><small>开宝箱可获得技能书</small></div>';
    } else {
        html += '<div class="book-list">';
        skillBooks.forEach(function(skillId, index) {
            var skill = findSkillById(skillId);
            if (!skill) return;
            
            var rarityInfo = (typeof SKILL_RARITIES !== 'undefined') ? (SKILL_RARITIES[skill.rarity] || SKILL_RARITIES[0]) : { name: '普通', bgColor: '#333', color: '#CCC' };
            var tierInfo = getSkillBookTierInfo(skill.rarity);
            var alreadyLearned = learnedSkills.indexOf(skillId) !== -1;
            
            html += '<div class="book-item" onclick="learnFromBook(\'' + skillId + '\',' + index + ')" style="border-color:' + tierInfo.color + (alreadyLearned ? ';opacity:0.55' : '') + '">';
            html += '<div class="book-icon">' + renderSkillIcon(skill) + '</div>';
            html += '<div class="book-info">';
            html += '<div class="book-name" style="color:' + rarityInfo.color + '">' + (skill.name || '') + '</div>';
            html += '<div class="book-desc">' + (skill.desc || '') + '</div>';
            html += '<div class="book-source" style="color:' + tierInfo.color + '">' + tierInfo.icon + ' ' + tierInfo.name + '</div>';
            html += '</div>';
            html += '<div class="book-action">';
            if (alreadyLearned) {
                html += '<span class="book-btn learned">已学会</span>';
            } else {
                html += '<span class="book-btn learn" style="background:' + tierInfo.color + '">📕 学习</span>';
            }
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';
    }
    html += '</div></div>'; // 关闭右栏
    
    html += '</div>'; // 关闭双栏容器
    
    container.innerHTML = html;
}

// ============================================
// 渲染技能图标（统一SVG，不再使用emoji）
// 按技能类型定形状、按稀有度定颜色
// ============================================
function renderSkillIcon(skill) {
    if (!skill) return '';
    
    var rarityInfo = (typeof SKILL_RARITIES !== 'undefined') ? (SKILL_RARITIES[skill.rarity] || SKILL_RARITIES[0]) : { color: '#CCCCCC', bgColor: 'rgba(200,200,200,0.15)' };
    var color = rarityInfo.color;
    var bgColor = rarityInfo.bgColor;
    var glow = color + '44';
    
    // 根据技能类型生成对应的SVG路径
    var iconSvg = '';
    switch(skill.type) {
        case 'magic':
            // 法杖+星芒
            iconSvg = '<path d="M24 4 L26 18 L40 20 L28 28 L32 44 L24 34 L16 44 L20 28 L8 20 L22 18 Z" fill="rgba(255,255,255,0.95)"/>'
                + '<circle cx="24" cy="24" r="14" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/>';
            break;
        case 'physical':
            // 箭矢+准心
            iconSvg = '<path d="M10 24 L28 10 L26 18 L40 20 L40 28 L26 30 L28 38 Z" fill="rgba(255,255,255,0.95)"/>'
                + '<circle cx="24" cy="24" r="14" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/>';
            break;
        case 'defend':
            // 盾牌+勾
            iconSvg = '<path d="M24 6 L10 12 L10 24 C10 34 18 40 24 42 C30 40 38 34 38 24 L38 12 Z" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>'
                + '<path d="M18 22 L22 28 L30 16" fill="none" stroke="' + color + '" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>';
            break;
        case 'passive':
            // 菱形宝石
            iconSvg = '<path d="M24 6 L38 24 L24 42 L10 24 Z" fill="rgba(255,255,255,0.95)"/>'
                + '<path d="M24 12 L32 24 L24 36 L16 24 Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>'
                + '<circle cx="24" cy="24" r="4" fill="rgba(255,255,255,0.5)"/>';
            break;
        default:
            // 默认：问号（用稀有度颜色显示）
            iconSvg = '<text x="24" y="30" text-anchor="middle" font-size="22" font-weight="bold" fill="rgba(255,255,255,0.9)">?</text>';
    }
    
    var svg = '<svg width="44" height="44" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 2px 6px ' + glow + ')">';
    svg += '<circle cx="24" cy="24" r="21" fill="' + bgColor + '" stroke="' + color + '" stroke-width="2"/>';
    svg += '<circle cx="24" cy="24" r="18" fill="none" stroke="' + color + '" stroke-width="0.5" opacity="0.35"/>';
    svg += iconSvg;
    svg += '</svg>';
    
    return svg;
}

// ============================================
// 查找技能
// ============================================
function findSkillById(skillId) {
    var allSkills = getAllSkills();
    if (!allSkills) return null;
    for (var i = 0; i < allSkills.length; i++) {
        if (allSkills[i].id === skillId) return allSkills[i];
    }
    return null;
}

// ============================================
// 从技能书学习技能
// ============================================
function learnFromBook(skillId, bookIndex) {
    console.log('[技能书] 尝试使用技能书学习:', skillId, '索引:', bookIndex);
    
    var currentStudent = stu();
    if (!currentStudent) {
        showMsg('❌', '请先选择一个学生');
        return;
    }
    
    var pet = getStudentPet(currentStudent);
    if (!pet) {
        showMsg('❌', '该学生还没有宠物');
        return;
    }
    
    var skill = findSkillById(skillId);
    if (!skill) {
        showMsg('❌', '技能不存在');
        return;
    }
    
    var skillBooks = currentStudent.skillBooks || [];
    
    // 验证技能书确实在背包里
    var actualIndex = skillBooks.indexOf(skillId);
    if (actualIndex === -1) {
        showMsg('❌', '技能书不在背包中');
        return;
    }
    
    // 检查宠物是否已学会
    var learnedSkills = pet.skills || [];
    if (learnedSkills.indexOf(skillId) !== -1) {
        // 已学会：直接消耗技能书，显示成功
        skillBooks.splice(actualIndex, 1);
        currentStudent.skillBooks = skillBooks;
        if (typeof saveState === 'function') saveState();
        showMsg('✅', '【' + skill.name + '】已学会，技能书已使用！');
        renderSkillCenter();
        return;
    }
    
    // 未学会：学习技能 + 消耗技能书（不扣MP）
    if (!pet.skills) pet.skills = [];
    pet.skills.push(skillId);
    
    // 初始化技能等级为Lv.1
    if (!pet.skillLevels) pet.skillLevels = {};
    pet.skillLevels[skillId] = 1;
    
    skillBooks.splice(actualIndex, 1);
    
    // 同步回学生对象
    if (pet.isMain) {
        currentStudent.petSkills = pet.skills;
        currentStudent.petSkillLevels = pet.skillLevels;
    } else {
        for (var j = 0; j < currentStudent.petInventory.length; j++) {
            if (currentStudent.petInventory[j].pokeId === pet.pokeId) {
                currentStudent.petInventory[j].skills = pet.skills;
                currentStudent.petInventory[j].skillLevels = pet.skillLevels;
                break;
            }
        }
    }
    
    if (typeof saveState === 'function') saveState();
    
    var tierNames = {2:'蓝色技能书',3:'紫色技能书',4:'橙色技能书',5:'红色技能书'};
    var tierName = tierNames[skill.rarity] || '技能书';
    showMsg(skill.icon || '🎉', '从' + tierName + '习得【' + skill.name + '】！');
    renderSkillCenter();
}

// ============================================
// 学习技能
// ============================================
function learnSkill(skillId) {
    console.log('[学习技能] 尝试学习技能:', skillId);
    
    var currentStudent = stu();
    if (!currentStudent) {
        showMsg('❌', '请先选择一个学生');
        return;
    }
    
    var pet = getStudentPet(currentStudent);
    
    if (!pet) {
        showMsg('❌', '该学生还没有宠物');
        return;
    }
    
    var skill = findSkillById(skillId);
    if (!skill) {
        showMsg('❌', '技能不存在');
        return;
    }
    
    // 检查是否已学习
    if (!pet.skills) pet.skills = [];
    if (pet.skills.indexOf(skillId) !== -1) {
        showMsg('⚠️', '已经学习过这个技能了');
        return;
    }
    
    // 检查MP是否足够（被动技能不消耗MP）
    if (skill.type !== 'passive' && (pet.mp || 0) < (skill.mpCost || 0)) {
        showMsg('⚠️', 'MP不足！需要 ' + (skill.mpCost || 0) + ' MP，去开宝箱获得技能书吧！');
        return;
    }
    
    // 扣除MP（被动技能不消耗）
    if (skill.type !== 'passive') {
        pet.mp = (pet.mp || 0) - (skill.mpCost || 0);
        if (pet.isMain) {
            currentStudent.petMp = pet.mp;
        } else {
            for (var i = 0; i < currentStudent.petInventory.length; i++) {
                if (currentStudent.petInventory[i].pokeId === pet.pokeId) {
                    currentStudent.petInventory[i].mp = pet.mp;
                    break;
                }
            }
        }
    }
    
    // 学习技能
    pet.skills.push(skillId);
    // 初始化技能等级为Lv.1
    if (!pet.skillLevels) pet.skillLevels = {};
    pet.skillLevels[skillId] = 1;
    
    if (pet.isMain) {
        currentStudent.petSkills = pet.skills;
        currentStudent.petSkillLevels = pet.skillLevels;
    } else {
        for (var j = 0; j < currentStudent.petInventory.length; j++) {
            if (currentStudent.petInventory[j].pokeId === pet.pokeId) {
                currentStudent.petInventory[j].skills = pet.skills;
                currentStudent.petInventory[j].skillLevels = pet.skillLevels;
                break;
            }
        }
    }
    
    if (typeof saveState === 'function') {
        saveState();
    } else if (typeof saveData === 'function') {
        saveData();
    }
    
    showMsg(skill.icon || '✨', '成功学习技能【' + skill.name + '】！');
    renderSkillCenter();
}

// ============================================
// 计算技能升级消耗
// ============================================
function getUpgradeCost(rarity, currentLevel) {
    // 基础消耗：稀有度越高越贵
    var baseCost = [100, 150, 250, 400, 600, 900, 1200]; // 白绿蓝紫橙金红
    var base = baseCost[rarity] || 250;
    // 等级越高越贵: Lv.1→2 = base, Lv.2→3 = base*1.5, Lv.3→4 = base*2, Lv.4→5 = base*2.5
    var levelMultiplier = 1 + (currentLevel - 1) * 0.5;
    return Math.floor(base * levelMultiplier);
}

// ============================================
// 技能升级
// ============================================
function upgradeSkill(skillId) {
    var currentStudent = stu();
    if (!currentStudent) {
        showMsg('❌', '请先选择一个学生');
        return;
    }
    
    var pet = getStudentPet(currentStudent);
    if (!pet) {
        showMsg('❌', '该学生还没有宠物');
        return;
    }
    
    var skill = findSkillById(skillId);
    if (!skill) {
        showMsg('❌', '技能不存在');
        return;
    }
    
    // 确保技能已被学习
    if (!pet.skills || pet.skills.indexOf(skillId) === -1) {
        showMsg('❌', '该技能未学习，无法升级');
        return;
    }
    
    // 初始化等级数据
    if (!pet.skillLevels) pet.skillLevels = {};
    var currentLevel = pet.skillLevels[skillId] || 1;
    
    // 最高5级
    if (currentLevel >= 5) {
        showMsg('⭐', '该技能已达最高等级！');
        return;
    }
    
    var cost = getUpgradeCost(skill.rarity, currentLevel);
    var coins = currentStudent.c || 0;
    
    if (coins < cost) {
        showMsg('💰', '金币不足！升级需要 ' + cost + ' 金币（当前：' + coins + '）');
        return;
    }
    
    // 扣除金币并升级
    currentStudent.c = coins - cost;
    
    // 新等级
    var newLevel = currentLevel + 1;
    pet.skillLevels[skillId] = newLevel;
    
    // 同步回学生对象
    if (pet.isMain) {
        currentStudent.petSkillLevels = pet.skillLevels;
    } else {
        for (var i = 0; i < currentStudent.petInventory.length; i++) {
            if (currentStudent.petInventory[i].pokeId === pet.pokeId) {
                currentStudent.petInventory[i].skillLevels = pet.skillLevels;
                break;
            }
        }
    }
    
    if (typeof saveState === 'function') saveState();
    
    var powerBoost = Math.round(skill.power * (newLevel * 0.2) * 10) / 10;
    showMsg('⬆', '技能【' + skill.name + '】升级至 Lv.' + newLevel + '！<br><small style="opacity:0.7">威力 +' + powerBoost + '</small>');
    renderSkillCenter();
}

// ============================================
// 标签页切换时渲染技能中心
// ============================================
var _origSwitchTab = null;
function hookSkillCenter() {
    // 钩子：在switchTab函数中添加技能中心的渲染
    if (typeof switchTab === 'function' && !_origSwitchTab) {
        _origSwitchTab = switchTab;
        window.switchTab = function(tab) {
            _origSwitchTab(tab);
            if (tab === 'skills') {
                renderSkillCenter();
            }
        };
    }
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('[技能系统] 初始化...');
    
    // 注入技能中心CSS
    var style = document.createElement('style');
    style.textContent = `
        /* 覆盖 skill_styles.css 中的 grid 冲突 */
        #petSkillsList.pet-skills-list {
            display: block !important;
            grid-template-columns: none !important;
            gap: 0 !important;
        }
        .skill-dual-col {
            display: flex;
            gap: 20px;
            align-items: flex-start;
        }
        .skill-col {
            min-width: 0;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.04);
            border-radius: 12px;
            padding: 16px;
        }
        .skill-col-learned {
            flex: 2;
        }
        .skill-col-books {
            flex: 1;
        }
        .skill-col-title {
            font-size: .85rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #fff;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .skill-col-body {
            min-height: 60px;
        }
        .learned-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
            gap: 12px;
        }
        .learned-item {
            background: rgba(255,255,255,0.05);
            border: 1.5px solid;
            border-radius: 10px;
            padding: 12px 10px;
            text-align: center;
            transition: all 0.2s;
            cursor: default;
            display: flex;
            flex-direction: column;
        }
        .learned-item:hover {
            background: rgba(255,255,255,0.1);
            transform: translateY(-2px);
        }
        .learned-icon {
            font-size: 1.6rem;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
        }
        .learned-name {
            font-size: .72rem;
            font-weight: 600;
            line-height: 1.3;
        }
        .skill-lv {
            font-size: .6rem;
            opacity: 0.7;
            font-weight: 400;
        }
        .learned-desc {
            font-size: .6rem;
            opacity: 0.55;
            line-height: 1.3;
            margin: 3px 0 6px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .learned-bottom {
            margin-top: auto;
            display: flex;
            justify-content: center;
        }
        .skill-upgrade-btn {
            background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15));
            border: 1px solid rgba(255,215,0,0.4);
            color: #FFD700;
            border-radius: 6px;
            padding: 3px 8px;
            font-size: .6rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .skill-upgrade-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, rgba(255,215,0,0.35), rgba(255,165,0,0.25));
            transform: translateY(-1px);
        }
        .skill-upgrade-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
        .skill-upgrade-btn .cost {
            font-size: .55rem;
            opacity: 0.8;
        }
        .skill-max-badge {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: #fff;
            font-size: .6rem;
            font-weight: 700;
            padding: 2px 10px;
            border-radius: 10px;
        }
        .book-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .book-item {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255,255,255,0.04);
            border: 1.5px solid;
            border-radius: 10px;
            padding: 12px 14px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .book-item:hover {
            background: rgba(255,255,255,0.1);
            transform: translateX(3px);
        }
        .book-icon {
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        .book-info {
            flex: 1;
            min-width: 0;
        }
        .book-name {
            font-size: .8rem;
            font-weight: 600;
            margin-bottom: 2px;
        }
        .book-desc {
            font-size: .65rem;
            opacity: 0.6;
            line-height: 1.3;
            margin-bottom: 2px;
        }
        .book-source {
            font-size: .6rem;
            opacity: 0.7;
        }
        .book-action {
            flex-shrink: 0;
        }
        .book-btn {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 6px;
            font-size: .68rem;
            font-weight: 600;
            white-space: nowrap;
        }
        .book-btn.learn {
            color: #fff;
            cursor: pointer;
        }
        .book-btn.learn:hover {
            filter: brightness(1.2);
        }
        .book-btn.learned {
            background: rgba(38,222,129,0.2);
            color: #26de81;
        }
        .skill-icon img {
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        @media (max-width: 700px) {
            .skill-dual-col { flex-direction: column; }
            .skill-col-learned { flex: 1; }
            .skill-col-books { flex: 1; }
            .learned-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
        }
    `;
    document.head.appendChild(style);
    
    hookSkillCenter();
    console.log('[技能系统] 初始化完成');
});
