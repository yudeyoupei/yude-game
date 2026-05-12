const jwt = require('jsonwebtoken');

// JWT 认证中间件
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未登录，请先登录' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yude_game_secret_key_2026_change_me');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: '登录已过期，请重新登录' });
  }
}

// 生成 JWT
function generateToken(user) {
  const secret = process.env.JWT_SECRET || 'yude_game_secret_key_2026_change_me';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, display_name: user.display_name },
    secret,
    { expiresIn }
  );
}

module.exports = { authenticate, generateToken };
