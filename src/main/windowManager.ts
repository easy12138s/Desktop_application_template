import { BrowserWindow, app } from 'electron'
import { join } from 'path'

export interface WindowConfig {
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  webPreferences?: any
  show?: boolean
  resizable?: boolean
  title?: string
  frame?: boolean
}

export class WindowManager {
  private mainWindow: BrowserWindow | null = null
  private windows: Map<string, BrowserWindow> = new Map()

  /**
   * 创建主窗口
   */
  public createMainWindow(): BrowserWindow {
    const isDev = process.env.NODE_ENV === 'development'
    
    const config: WindowConfig = {
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      show: false,
      resizable: true,
      frame: false,
      title: process.env.VUE_APP_TITLE || 'Vue Electron Desktop App',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: join(__dirname, 'preload.js')
      }
    }

    this.mainWindow = new BrowserWindow(config)

    // 在开发环境中加载开发服务器，在生产环境中加载静态文件
    if (isDev) {
      this.mainWindow.loadURL('http://localhost:8080')
      // 开发环境打开开发者工具
      this.mainWindow.webContents.openDevTools()
    } else {
      this.mainWindow.loadFile(join(__dirname, '../bundled/index.html'))
    }

    // 窗口准备就绪后显示
    this.mainWindow.once('ready-to-show', () => {
      if (this.mainWindow) {
        this.mainWindow.show()
      }
    })

    // 窗口关闭时清理引用
    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })

    // 注册主窗口
    this.windows.set('main', this.mainWindow)

    return this.mainWindow
  }

  /**
   * 创建子窗口
   */
  public createChildWindow(id: string, config: WindowConfig): BrowserWindow {
    const childWindow = new BrowserWindow({
      parent: this.mainWindow || undefined,
      modal: false,
      ...config,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: join(__dirname, 'preload.js'),
        ...config.webPreferences
      }
    })

    // 注册子窗口
    this.windows.set(id, childWindow)

    // 窗口关闭时清理引用
    childWindow.on('closed', () => {
      this.windows.delete(id)
    })

    return childWindow
  }

  /**
   * 关闭指定窗口
   */
  public closeWindow(id: string): void {
    const window = this.windows.get(id)
    if (window && !window.isDestroyed()) {
      window.close()
    }
  }

  /**
   * 获取指定窗口
   */
  public getWindow(id: string): BrowserWindow | undefined {
    return this.windows.get(id)
  }

  /**
   * 获取主窗口
   */
  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  /**
   * 获取所有窗口
   */
  public getAllWindows(): BrowserWindow[] {
    return Array.from(this.windows.values()).filter(window => !window.isDestroyed())
  }

  /**
   * 最小化主窗口
   */
  public minimizeMainWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.minimize()
    }
  }

  /**
   * 最大化主窗口
   */
  public maximizeMainWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      if (this.mainWindow.isMaximized()) {
        this.mainWindow.unmaximize()
      } else {
        this.mainWindow.maximize()
      }
    }
  }

  /**
   * 关闭主窗口
   */
  public closeMainWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.close()
    }
    // 关闭主窗口时退出应用
    app.quit()
  }

  /**
   * 关闭所有窗口
   */
  public closeAllWindows(): void {
    this.windows.forEach((window, id) => {
      if (!window.isDestroyed()) {
        window.close()
      }
    })
    this.windows.clear()
  }
}