const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { authenticate, generateToken } = require('../middleware/auth');

const router = express.Router();

// 注册（邀请码 + 用户名 + 密码）
router.post('/register', (req, res) => {
  try {
    const { username, password, inviteCode, displayName } = req.body;

    if (!username || !password || !inviteCode) {
      return res.status(400).json({ error: '请填写用户名、密码和邀请码' });
    }

    if (username.length < 2 || username.length > 20) {
      return res.status(400).json({ error: '用户名长度应为 2-20 个字符' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: '密码长度不少于 6 位' });
    }

    // 检查邀请码
    const inviteCodeRow = db.prepare(`
      SELECT ci.*, c.name as class_name, c.id as class_id
      FROM class_invite_codes ci
      JOIN classes c ON c.id = ci.class_id
      WHERE ci.code = ? AND ci.active = 1
    `).get(inviteCode);

    if (!inviteCodeRow) {
      return res.status(400).json({ error: '邀请码无效或已失效' });
    }

    // 检查邀请码使用次数
    if (inviteCodeRow.max_uses > 0 && inviteCodeRow.used_count >= inviteCodeRow.max_uses) {
      return res.status(400).json({ error: '邀请码已用完' });
    }

    // 检查用户名是否已存在
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existingUser) {
      return res.status(400).json({ error: '用户名已存在' });
    }

    // 创建用户
    const hashedPassword = bcrypt.hashSync(password, 10);
    const display_name = displayName || username;
    const result = db.prepare(`
      INSERT INTO users (username, password, display_name) VALUES (?, ?, ?)
    `).run(username, hashedPassword, display_name);

    const userId = result.lastInsertRowid;

    // 关联用户到班级
    db.prepare('INSERT INTO user_classes (user_id, class_id) VALUES (?, ?)')
      .run(userId, inviteCodeRow.class_id);

    // 更新邀请码使用次数
    db.prepare('UPDATE class_invite_codes SET used_count = used_count + 1 WHERE id = ?')
      .run(inviteCodeRow.id);

    // 生成 token
    const user = { id: userId, username, role: 'teacher', display_name };
    const token = generateToken(user);

    res.json({
      token,
      user: { id: userId, username, display_name, role: 'teacher' },
      class: { id: inviteCodeRow.class_id, name: inviteCodeRow.class_name }
    });

  } catch (err) {
    console.error('[注册错误]', err);
    res.status(500).json({ error: '注册失败，请稍后重试' });
  }
});

// 登录
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: '请填写用户名和密码' });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
      return res.status(400).json({ error: '用户名或密码错误' });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: '用户名或密码错误' });
    }

    const token = generateToken(user);

    // 获取用户的班级列表
    const classes = db.prepare(`
      SELECT c.id, c.name FROM classes c
      JOIN user_classes uc ON uc.class_id = c.id
      WHERE uc.user_id = ?
    `).all(user.id);

    res.json({
      token,
      user: { id: user.id, username: user.username, display_name: user.display_name, role: user.role },
      classes
    });

  } catch (err) {
    console.error('[登录错误]', err);
    res.status(500).json({ error: '登录失败，请稍后重试' });
  }
});

// 获取当前用户信息
router.get('/me', authenticate, (req, res) => {
  try {
    const user = db.prepare('SELECT id, username, display_name, role FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    const classes = db.prepare(`
      SELECT c.id, c.name FROM classes c
      JOIN user_classes uc ON uc.class_id = c.id
      WHERE uc.user_id = ?
    `).all(user.id);

    res.json({ user, classes });
  } catch (err) {
    console.error('[获取用户信息错误]', err);
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

module.exports = router;
