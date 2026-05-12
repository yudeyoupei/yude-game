/**
 * 数据迁移脚本
 * 将当前 localStorage 中的游戏数据导入数据库
 * 
 * 使用方法: 
 * 1. 确保服务器未运行或使用不同端口
 * 2. 先导出 localStorage 数据为 JSON 文件
 * 3. 运行本脚本导入
 */

const readline = require('readline');
const db = require('./db');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== 数据迁移工具 ===');
console.log('');
console.log('请选择迁移方式:');
console.log('1. 手动输入 JSON 数据');
console.log('2. 从文件中读取');
console.log('');

rl.question('请输入选项 (1 或 2): ', (answer) => {
  if (answer === '1') {
    console.log('请输入 JSON 数据 (按 Ctrl+D 结束):');
    let inputData = '';
    process.stdin.on('data', (chunk) => {
      inputData += chunk;
    });
    process.stdin.on('end', () => {
      try {
        const data = JSON.parse(inputData);
        importData(data);
      } catch (e) {
        console.error('JSON 解析失败:', e.message);
      }
      process.exit();
    });
  } else if (answer === '2') {
    rl.question('请输入文件路径: ', (filePath) => {
      try {
        const fs = require('fs');
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileData);
        importData(data);
      } catch (e) {
        console.error('文件读取或解析失败:', e.message);
      }
      process.exit();
    });
  } else {
    console.log('无效选项');
    process.exit();
  }
});

function importData(data) {
  // 检查是否有班级
  const classes = db.prepare('SELECT id, name FROM classes').all();
  
  if (classes.length === 0) {
    console.log('错误: 数据库中没有班级，请先启动服务器创建默认班级');
    return;
  }

  console.log('');
  console.log('可导入的班级:');
  classes.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.name} (ID: ${c.id})`);
  });
  console.log('');

  rl.question(`请选择要导入到的班级 (1-${classes.length}): `, (idx) => {
    const classIndex = parseInt(idx) - 1;
    if (classIndex < 0 || classIndex >= classes.length) {
      console.log('无效选项');
      process.exit();
      return;
    }

    const classId = classes[classIndex].id;

    // 构建标准 state 结构
    const state = {
      students: data.students || [],
      tasks: data.tasks || [],
      curId: data.curId || null,
      inventory: data.inventory || {},
      bossTeam: data.bossTeam || [],
      bossChallengedThisWeek: data.bossChallengedThisWeek || false,
      bossResetDate: data.bossResetDate || null,
      bossKillCount: data.bossKillCount || 0
    };

    // 导入到数据库
    db.prepare(`
      INSERT INTO game_states (class_id, state_data, updated_at)
      VALUES (?, ?, datetime('now', '+8 hours'))
      ON CONFLICT(class_id) DO UPDATE SET
        state_data = excluded.state_data,
        updated_at = datetime('now', '+8 hours')
    `).run(classId, JSON.stringify(state));

    console.log('');
    console.log(`✅ 成功导入 ${state.students.length} 个学生, ${state.tasks.length} 个任务`);
    console.log(`   到班级「${classes[classIndex].name}」`);
    
    process.exit();
  });
}
