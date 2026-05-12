const express = require('express');
const db = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// 所有状态路由都需要认证
router.use(authenticate);

// 获取班级游戏状态
router.get('/:classId', (req, res) => {
  try {
    const classId = req.params.classId;

    // 验证用户在该班级中
    const membership = db.prepare(`
      SELECT 1 FROM user_classes WHERE user_id = ? AND class_id = ?
    `).get(req.user.id, classId);

    if (!membership) {
      return res.status(403).json({ error: '您不在该班级中' });
    }

    let stateRow = db.prepare('SELECT state_data, updated_at FROM game_states WHERE class_id = ?').get(classId);

    if (!stateRow) {
      // 如果没有数据，返回默认状态
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
      return res.json({ state: defaultState, updated_at: null });
    }

    const state = JSON.parse(stateRow.state_data);
    res.json({ state, updated_at: stateRow.updated_at });

  } catch (err) {
    console.error('[获取游戏状态错误]', err);
    res.status(500).json({ error: '获取游戏状态失败' });
  }
});

// 保存班级游戏状态
router.put('/:classId', (req, res) => {
  try {
    const classId = req.params.classId;
    const { state } = req.body;

    if (!state) {
      return res.status(400).json({ error: '缺少游戏状态数据' });
    }

    // 验证用户在该班级中
    const membership = db.prepare(`
      SELECT 1 FROM user_classes WHERE user_id = ? AND class_id = ?
    `).get(req.user.id, classId);

    if (!membership) {
      return res.status(403).json({ error: '您不在该班级中' });
    }

    const stateJson = JSON.stringify(state);

    // 使用 INSERT OR REPLACE
    db.prepare(`
      INSERT INTO game_states (class_id, state_data, updated_at)
      VALUES (?, ?, datetime('now', '+8 hours'))
      ON CONFLICT(class_id) DO UPDATE SET
        state_data = excluded.state_data,
        updated_at = datetime('now', '+8 hours')
    `).run(classId, stateJson);

    res.json({ success: true });

  } catch (err) {
    console.error('[保存游戏状态错误]', err);
    res.status(500).json({ error: '保存游戏状态失败' });
  }
});

module.exports = router;
