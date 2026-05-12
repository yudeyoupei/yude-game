const express = require('express');
const db = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// 所有班级路由都需要认证
router.use(authenticate);

// 获取当前用户的班级列表
router.get('/', (req, res) => {
  try {
    const classes = db.prepare(`
      SELECT c.id, c.name, c.created_at,
        (SELECT COUNT(*) FROM user_classes WHERE class_id = c.id) as teacher_count,
        (SELECT COUNT(*) FROM game_states WHERE class_id = c.id) as has_data
      FROM classes c
      JOIN user_classes uc ON uc.class_id = c.id
      WHERE uc.user_id = ?
      ORDER BY c.created_at DESC
    `).all(req.user.id);

    res.json({ classes });
  } catch (err) {
    console.error('[获取班级列表错误]', err);
    res.status(500).json({ error: '获取班级列表失败' });
  }
});

// 创建班级（仅限管理员）
router.post('/', (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: '仅管理员可以创建班级' });
    }

    const { name } = req.body;
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: '请输入班级名称' });
    }

    // 创建班级
    const result = db.prepare('INSERT INTO classes (name, creator_id) VALUES (?, ?)')
      .run(name.trim(), req.user.id);

    const classId = result.lastInsertRowid;

    // 关联管理员到班级
    db.prepare('INSERT INTO user_classes (user_id, class_id) VALUES (?, ?)')
      .run(req.user.id, classId);

    // 初始化空的游戏状态
    const defaultState = {
      students: [],
      tasks: [],
      curId: null,
      inventory: {},
      bossTeam: [],
      bossChallengedThisWeek: false,
      bossResetDate: null,
      bossKillCount: 0
    };
    db.prepare('INSERT INTO game_states (class_id, state_data) VALUES (?, ?)')
      .run(classId, JSON.stringify(defaultState));

    res.json({
      class: { id: classId, name: name.trim() }
    });

  } catch (err) {
    console.error('[创建班级错误]', err);
    res.status(500).json({ error: '创建班级失败' });
  }
});

// 查看班级邀请码（仅管理员和班级成员）
router.get('/:id/invite-codes', (req, res) => {
  try {
    const classId = req.params.id;

    // 验证用户在该班级中
    const membership = db.prepare(`
      SELECT 1 FROM user_classes WHERE user_id = ? AND class_id = ?
    `).get(req.user.id, classId);

    if (!membership && req.user.role !== 'admin') {
      return res.status(403).json({ error: '您不在该班级中' });
    }

    const codes = db.prepare(`
      SELECT id, code, max_uses, used_count, active, created_at
      FROM class_invite_codes
      WHERE class_id = ?
      ORDER BY created_at DESC
    `).all(classId);

    res.json({ codes });
  } catch (err) {
    console.error('[获取邀请码错误]', err);
    res.status(500).json({ error: '获取邀请码失败' });
  }
});

// 生成新的邀请码（仅管理员）
router.post('/:id/invite-codes', (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: '仅管理员可以生成邀请码' });
    }

    const classId = req.params.id;
    const { maxUses } = req.body;

    // 生成随机邀请码
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    db.prepare(`
      INSERT INTO class_invite_codes (class_id, code, max_uses, created_by)
      VALUES (?, ?, ?, ?)
    `).run(classId, code, maxUses || 0, req.user.id);

    res.json({
      code,
      max_uses: maxUses || 0
    });

  } catch (err) {
    console.error('[生成邀请码错误]', err);
    res.status(500).json({ error: '生成邀请码失败' });
  }
});

// 获取班级详细信息
router.get('/:id', (req, res) => {
  try {
    const classId = req.params.id;

    // 验证用户在该班级中
    const membership = db.prepare(`
      SELECT 1 FROM user_classes WHERE user_id = ? AND class_id = ?
    `).get(req.user.id, classId);

    if (!membership) {
      return res.status(403).json({ error: '您不在该班级中' });
    }

    const classInfo = db.prepare(`
      SELECT c.id, c.name, c.created_at,
        (SELECT COUNT(*) FROM user_classes WHERE class_id = c.id) as teacher_count
      FROM classes c WHERE c.id = ?
    `).get(classId);

    if (!classInfo) {
      return res.status(404).json({ error: '班级不存在' });
    }

    res.json({ class: classInfo });
  } catch (err) {
    console.error('[获取班级信息错误]', err);
    res.status(500).json({ error: '获取班级信息失败' });
  }
});

module.exports = router;
