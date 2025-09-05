import { WindowHandlers } from './windowHandlers'
import { FileHandlers } from './fileHandlers'
import { WindowManager } from '../windowManager'

/**
 * IPC处理器管理器
 */
export class IpcManager {
  private windowHandlers: WindowHandlers
  private fileHandlers: FileHandlers

  constructor(windowManager: WindowManager) {
    // 初始化各种处理器
    this.windowHandlers = new WindowHandlers(windowManager)
    this.fileHandlers = new FileHandlers()
  }

  /**
   * 初始化所有IPC处理器
   */
  public initialize(): void {
    console.log('IPC处理器初始化完成')
  }
}

export { WindowHandlers, FileHandlers }