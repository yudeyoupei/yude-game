# 育德优培冒险乐园 - 部署指南

## 技术栈
- **前端**: 纯 HTML/CSS/JS
- **后端**: Node.js + Express + SQLite
- **部署**: Zeabur（免费版）

## 部署步骤

### 1. 上传到 GitHub
```bash
# 在页游目录下执行
git init
git add .
git commit -m "初始版本"
# 在 GitHub 创建仓库后
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 2. 在 Zeabur 部署
1. 访问 https://zeabur.com 注册/登录（支持 GitHub 和微信登录）
2. 点击「创建项目」→「部署服务」
3. 选择你的 GitHub 仓库
4. Zeabur 会自动识别为 Node.js 应用
5. **关键设置**:
   - 构建目录: `server/`
   - 启动命令: `node server.js`
   - 环境变量: 无需额外设置（已配置默认值）

### 3. 设置自定义域名（可选）
- Zeabur 会提供 `.zeabur.app` 域名
- 可以在设置中绑定自己的域名

## 初始账号
- **管理员**: admin / admin123
- **班级邀请码**: YUDE888（供其他老师注册）

## 本地开发
```bash
cd server
npm install
node server.js
```
访问 http://localhost:3000/login.html
