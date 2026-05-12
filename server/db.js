const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'data', 'yude_game.db');

// 确保 data 目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// 启用 WAL 模式，提升并发性能
db.pragma('journal_mode = WAL');

// 建表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    display_name TEXT DEFAULT '',
    role TEXT DEFAULT 'teacher',
    created_at DATETIME DEFAULT (datetime('now', '+8 hours'))
  );

  CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    creator_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT (datetime('now', '+8 hours'))
  );

  CREATE TABLE IF NOT EXISTS class_invite_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER NOT NULL,
    code TEXT UNIQUE NOT NULL,
    max_uses INTEGER DEFAULT 0,
    used_count INTEGER DEFAULT 0,
    created_by INTEGER,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT (datetime('now', '+8 hours'))
  );

  CREATE TABLE IF NOT EXISTS user_classes (
    user_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, class_id)
  );

  CREATE TABLE IF NOT EXISTS game_states (
    class_id INTEGER PRIMARY KEY,
    state_data TEXT NOT NULL,
    updated_at DATETIME DEFAULT (datetime('now', '+8 hours'))
  );
`);

// 预创建默认管理员（如果不存在）
const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  
  const result = db.prepare(`
    INSERT INTO users (username, password, display_name, role)
    VALUES (?, ?, ?, 'admin')
  `).run('admin', hashedPassword, '管理员');

  // 创建默认班级
  const classResult = db.prepare(`
    INSERT INTO classes (name, creator_id) VALUES (?, ?)
  `).run('默认班', result.lastInsertRowid);

  // 关联管理员和默认班级
  db.prepare('INSERT INTO user_classes (user_id, class_id) VALUES (?, ?)')
    .run(result.lastInsertRowid, classResult.lastInsertRowid);

  // 生成默认邀请码
  const inviteCode = 'YUDE888';
  db.prepare(`
    INSERT INTO class_invite_codes (class_id, code, max_uses, created_by)
    VALUES (?, ?, 0, ?)
  `).run(classResult.lastInsertRowid, inviteCode, result.lastInsertRowid);

  console.log('[DB] 默认管理员已创建：admin / admin123');
  console.log('[DB] 默认班级已创建：默认班');
  console.log('[DB] 邀请码已生成：YUDE888');
}

module.exports = db;
