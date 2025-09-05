const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 检查和设置开发环境...');

// 检查Node.js版本
function checkNodeVersion() {
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const versionNumber = nodeVersion.replace('v', '').split('.')[0];
    
    console.log(`📋 Node.js版本: ${nodeVersion}`);
    
    if (parseInt(versionNumber) < 18) {
      console.warn('⚠️  建议使用Node.js 18或更高版本');
    } else {
      console.log('✅ Node.js版本满足要求');
    }
  } catch (error) {
    console.error('❌ 无法获取Node.js版本:', error.message);
    process.exit(1);
  }
}

// 检查npm版本
function checkNpmVersion() {
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`📋 npm版本: ${npmVersion}`);
    console.log('✅ npm可用');
  } catch (error) {
    console.error('❌ 无法获取npm版本:', error.message);
    process.exit(1);
  }
}

// 检查网络连接（测试镜像源）
function checkNetworkAndMirror() {
  try {
    console.log('🌐 检查网络连接和镜像源...');
    
    // 检查当前镜像源
    const registry = execSync('npm config get registry', { encoding: 'utf8' }).trim();
    console.log(`📋 当前镜像源: ${registry}`);
    
    // 测试镜像源连通性
    execSync('npm ping', { stdio: 'pipe' });
    console.log('✅ 镜像源连接正常');
  } catch (error) {
    console.warn('⚠️  镜像源连接测试失败，可能需要配置镜像源');
    console.log('🔧 建议运行以下命令配置镜像源:');
    console.log('   npm config set registry https://registry.npmmirror.com');
  }
}

// 检查和创建必要的目录
function checkDirectories() {
  const requiredDirs = [
    'scripts',
    'src/assets/database',
    'public'
  ];
  
  console.log('📁 检查项目目录结构...');
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ 创建目录: ${dir}`);
    }
  });
}

// 检查关键文件
function checkFiles() {
  const requiredFiles = [
    'package.json',
    'vue.config.js',
    'tsconfig.json',
    '.npmrc',
    'src/background.ts',
    'src/preload.ts',
    'src/main.ts',
    'public/index.html'
  ];
  
  console.log('📄 检查关键文件...');
  
  const missingFiles = [];
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });
  
  if (missingFiles.length > 0) {
    console.error('❌ 缺少关键文件:');
    missingFiles.forEach(file => console.error(`   - ${file}`));
    process.exit(1);
  } else {
    console.log('✅ 所有关键文件存在');
  }
}

// 安装依赖
function installDependencies() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 正在安装依赖...');
    try {
      execSync('npm install', { 
        stdio: 'inherit', 
        cwd: path.join(__dirname, '..') 
      });
      console.log('✅ 依赖安装完成');
    } catch (error) {
      console.error('❌ 依赖安装失败:', error.message);
      process.exit(1);
    }
  } else {
    console.log('✅ 依赖已安装');
  }
}

// 主函数
function main() {
  try {
    checkNodeVersion();
    checkNpmVersion();
    checkNetworkAndMirror();
    checkDirectories();
    checkFiles();
    installDependencies();
    
    console.log('\n🎉 开发环境设置完成！');
    console.log('\n📖 可用命令:');
    console.log('   npm run dev        - 启动开发服务器');
    console.log('   npm run build:prod - 构建生产版本');
    console.log('   npm run electron:serve - 直接启动Electron开发模式');
    console.log('   npm run electron:build - 构建Electron应用');
    
  } catch (error) {
    console.error('❌ 环境设置失败:', error.message);
    process.exit(1);
  }
}

main();