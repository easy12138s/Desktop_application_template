import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { WindowManager } from './main/windowManager'
import { IpcManager } from './main/ipc'
import { Logger, isDevelopment } from './main/utils'

// 设置开发模式
const isDev = isDevelopment()

// 确保只有一个应用实例
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

// 应用实例
class ElectronApp {
  private windowManager: WindowManager
  private ipcManager: IpcManager

  constructor() {
    this.windowManager = new WindowManager()
    this.ipcManager = new IpcManager(this.windowManager)
    
    this.initializeApp()
  }

  /**
   * 初始化应用
   */
  private initializeApp(): void {
    // 设置应用协议
    protocol.registerSchemesAsPrivileged([
      { scheme: 'app', privileges: { secure: true, standard: true } }
    ])

    // 应用就绪时创建窗口
    app.whenReady().then(async () => {
      await this.onAppReady()
    })

    // 所有窗口关闭时退出应用 (Windows & Linux)
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    // 应用激活时创建窗口 (macOS)
    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await this.createMainWindow()
      }
    })

    // 第二个实例启动时聚焦到主窗口
    app.on('second-instance', () => {
      const mainWindow = this.windowManager.getMainWindow()
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore()
        }
        mainWindow.focus()
      }
    })

    // 应用即将退出时清理资源
    app.on('before-quit', async () => {
      await this.cleanup()
    })

    // 处理网络请求 (可选)
    this.setupNetworkHandling()
  }

  /**
   * 应用就绪处理
   */
  private async onAppReady(): Promise<void> {
    try {
      Logger.info('应用正在启动...')



      // 初始化IPC处理器
      this.ipcManager.initialize()

      // 创建协议
      if (isDev && !process.env.IS_TEST) {
        // 开发环境设置
        // await this.setupDevelopment()
      } else {
        // 生产环境设置
        createProtocol('app')
      }

      // 创建主窗口
      await this.createMainWindow()

      Logger.info('应用启动完成')
    } catch (error) {
      Logger.error('应用启动失败:', error)
      app.quit()
    }
  }



  /**
   * 创建主窗口
   */
  private async createMainWindow(): Promise<void> {
    try {
      Logger.info('正在创建主窗口...')
      this.windowManager.createMainWindow()
      Logger.info('主窗口创建完成')
    } catch (error) {
      Logger.error('创建主窗口失败:', error)
      throw error
    }
  }

  /**
   * 设置开发环境
   */
  private async setupDevelopment(): Promise<void> {
    // 安装Vue开发工具
    try {
      await installExtension(VUEJS3_DEVTOOLS)
      Logger.info('Vue DevTools 安装成功')
    } catch (error) {
      Logger.warn('Vue DevTools 安装失败:', error)
    }
  }

  /**
   * 设置网络请求处理
   */
  private setupNetworkHandling(): void {
    // 在开发环境中，忽略证书错误
    if (isDev) {
      app.commandLine.appendSwitch('--ignore-certificate-errors')
      app.commandLine.appendSwitch('--disable-web-security')
    }
  }

  /**
   * 清理资源
   */
  private async cleanup(): Promise<void> {
    try {
      Logger.info('正在清理应用资源...')
      
      // 关闭所有窗口
      this.windowManager.closeAllWindows()
      
      Logger.info('应用资源清理完成')
    } catch (error) {
      Logger.error('清理应用资源失败:', error)
    }
  }
}

// 创建应用实例
new ElectronApp()

// 退出应用时的清理工作
process.on('exit', () => {
  Logger.info('应用进程退出')
})

process.on('uncaughtException', (error) => {
  Logger.error('未捕获的异常:', error)
})

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('未处理的Promise拒绝:', reason, 'at', promise)
})