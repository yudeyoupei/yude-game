require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 静态文件服务 - 服务于页游根目录
app.use(express.static(path.join(__dirname, '..'), {
  // login.html 和 class-select.html 是 SPA 入口，不要缓存
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/state', require('./routes/state'));

// SPA 路由：登录页和班级选择页
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/class-select', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'class-select.html'));
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('[服务器错误]', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[服务器] 育德优培冒险乐园 后端已启动`);
  console.log(`[服务器] 地址: http://localhost:${PORT}`);
  console.log(`[服务器] 登录页: http://localhost:${PORT}/login.html`);
});
