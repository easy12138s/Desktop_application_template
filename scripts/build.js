const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('📦 开始构建应用...');

// 设置环境变量
process.env.NODE_ENV = 'production';

// 检查依赖是否已安装
if (!fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
  console.log('📦 正在安装依赖...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ 依赖安装完成');
  } catch (error) {
    console.error('❌ 依赖安装失败:', error.message);
    process.exit(1);
  }
}

try {
  console.log('🔨 正在构建Vue应用...');
  
  // 构建应用
  execSync('npm run electron:build', { 
    stdio: 'inherit', 
    cwd: path.join(__dirname, '..') 
  });
  
  console.log('✅ 应用构建完成！');
  console.log('📁 构建文件位置: dist_electron/');
  
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}