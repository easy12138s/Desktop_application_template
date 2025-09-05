const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  pluginOptions: {
    electronBuilder: {
      // 主进程文件配置
      mainProcessFile: 'src/background.ts',
      // 预加载文件配置  
      preload: 'src/preload.ts',
      
      // 构建配置
      builderOptions: {
        appId: 'com.example.vue-electron-app',
        productName: 'Vue Electron Desktop Template',
        directories: {
          output: 'dist_electron'
        },
        files: [
          'dist_electron/bundled/**/*'
        ],
        extraFiles: [
          {
            from: 'src/assets/database/',
            to: 'resources/database/',
            filter: ['**/*']
          }
        ],
        
        // Windows配置
        win: {
          target: [{
            target: 'nsis',
            arch: ['x64']
          }],
          icon: 'public/icon.ico'
        },
        
        // macOS配置
        mac: {
          target: [{
            target: 'dmg',
            arch: ['x64', 'arm64']
          }],
          icon: 'public/icon.icns'
        },
        
        // Linux配置
        linux: {
          target: [{
            target: 'AppImage',
            arch: ['x64']
          }],
          icon: 'public/icon.png'
        }
      },
      
      // Node模块配置
      externals: ['better-sqlite3'],
      
      // 原生模块配置
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
})