# Vue Electron 桌面应用基础模板

> 基于 Vue 3 + Electron + SQLite 的跨平台桌面应用开发模板

## 🚀 项目特性

- **现代化技术栈**: Vue 3 + TypeScript + Electron + SQLite
- **零配置开箱即用**: 基于 Vue CLI Plugin Electron Builder
- **完整的架构设计**: 主进程、渲染进程、预加载脚本分层架构
- **数据库集成**: 内置 SQLite 数据库支持
- **用户系统**: 完整的用户注册、登录功能
- **主题切换**: 支持亮色/暗色主题
- **跨平台**: 支持 Windows、macOS、Linux
- **热重载**: 开发环境支持热重载
- **类型安全**: 完整的 TypeScript 支持

## 📦 技术栈

- **前端框架**: Vue 3 + Composition API
- **桌面框架**: Electron
- **开发语言**: TypeScript
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **样式**: Sass/SCSS
- **数据库**: SQLite3
- **构建工具**: Vue CLI Plugin Electron Builder

## 🛠️ 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装与运行

```bash
# 1. 克隆项目
git clone <repository-url>
cd Desktop_application_template

# 2. 安装依赖
npm install

# 3. 启动开发环境
npm run dev

# 或者使用原生命令
npm run electron:serve
```

### 构建打包

```bash
# 构建生产版本
npm run build:prod

# 或者使用原生命令
npm run electron:build
```

## 📁 项目结构

```
src/
├── background.ts              # 主进程入口
├── preload.ts                # 预加载脚本入口
├── main.ts                   # Vue应用入口
├── App.vue                   # 根组件
├── main/                     # 主进程模块
│   ├── windowManager.ts      # 窗口管理
│   ├── database/             # 数据库模块
│   │   ├── index.ts         # 数据库管理器
│   │   └── models/          # 数据模型
│   ├── services/            # 业务服务
│   ├── ipc/                 # IPC处理器
│   └── utils/               # 工具函数
├── preload/                 # 预加载模块
│   ├── apis/               # API暴露
│   └── types/              # 类型定义
├── components/             # Vue组件
│   ├── layout/            # 布局组件
│   └── common/            # 通用组件
├── views/                 # 页面组件
│   ├── auth/             # 认证页面
│   └── dashboard/        # 仪表板页面
├── router/               # 路由配置
├── store/                # 状态管理
├── types/                # 类型定义
└── assets/               # 静态资源
    └── styles/          # 样式文件
```

## 🔧 开发指南

### 主要命令

```bash
# 开发环境
npm run dev                 # 启动开发服务器
npm run electron:serve      # 原生Electron开发命令

# 构建
npm run build:prod          # 构建生产版本
npm run electron:build      # 原生Electron构建命令

# 工具
npm run setup              # 环境检查和设置
npm run electron:generate-icons  # 生成应用图标
```

### 环境配置

开发环境配置文件：`.env.development`
```
NODE_ENV=development
VUE_APP_TITLE=Desktop App Dev
ELECTRON_ENABLE_LOGGING=true
DATABASE_PATH=./dev-database.sqlite
LOG_LEVEL=debug
```

生产环境配置文件：`.env.production`
```
NODE_ENV=production
VUE_APP_TITLE=Desktop App
ELECTRON_ENABLE_LOGGING=false
DATABASE_PATH=./app-database.sqlite
LOG_LEVEL=error
```

### 数据库

项目使用 SQLite 作为本地数据库，支持：
- 用户管理（注册、登录、信息管理）
- 应用设置存储
- 用户偏好设置

数据库文件位置：
- 开发环境：项目根目录
- 生产环境：用户数据目录

### API 使用

在渲染进程中，可以通过 `window.electronAPI` 访问主进程功能：

```typescript
// 窗口操作
await window.electronAPI.window.minimize()
await window.electronAPI.window.maximize()
await window.electronAPI.window.close()

// 数据库操作
const result = await window.electronAPI.database.users.login(email, password)

// 文件操作
const content = await window.electronAPI.file.read(filePath)
await window.electronAPI.file.write(filePath, content)
```

## 🎨 主题系统

应用支持亮色和暗色主题，主题配置通过 CSS 变量实现：

```scss
:root {
  --primary-color: #3b82f6;
  --background-color: #ffffff;
  --text-color: #1f2937;
  // ...
}

:root.dark {
  --background-color: #111827;
  --text-color: #f9fafb;
  // ...
}
```

## 📱 响应式设计

应用支持不同窗口尺寸的响应式布局，最小窗口尺寸为 800x600。

## 🔒 安全性

- 禁用 Node.js 集成
- 启用上下文隔离
- 通过预加载脚本安全地暴露 API
- 密码使用 SHA256 哈希存储

## 📋 待办事项

- [ ] 添加更多页面组件
- [ ] 实现文件管理功能
- [ ] 添加应用更新机制
- [ ] 实现数据导入导出
- [ ] 添加国际化支持
- [ ] 完善单元测试

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Electron](https://www.electronjs.org/) - 构建跨平台桌面应用
- [Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/) - Vue + Electron 集成
- [SQLite](https://www.sqlite.org/) - 轻量级数据库
