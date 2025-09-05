const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 启动开发环境...');

// 检查依赖是否已安装
if (!fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
  console.log('📦 正在安装依赖...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ 依赖安装完成');
  } catch (error) {
    console.error('❌ 依赖安装失败:', error.message);
    process.exit(1);
  }
}

// 设置环境变量
process.env.NODE_ENV = 'development';
process.env.ELECTRON_ENABLE_LOGGING = 'true';

// 启动开发服务器
console.log('🔧 启动Vue开发服务器和Electron...');

try {
  // 使用 Vue CLI Plugin Electron Builder 的开发命令
  const child = spawn('npm', ['run', 'electron:serve'], {
    stdio: 'inherit',
    shell: true
  });

  child.on('error', (error) => {
    console.error('❌ 启动失败:', error.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    console.log(`\n👋 开发服务器已停止 (退出码: ${code})`);
    process.exit(code);
  });

  // 处理进程退出
  process.on('SIGINT', () => {
    console.log('\n🛑 正在停止开发服务器...');
    child.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 正在停止开发服务器...');
    child.kill('SIGTERM');
  });

} catch (error) {
  console.error('❌ 启动开发环境失败:', error.message);
  process.exit(1);
}