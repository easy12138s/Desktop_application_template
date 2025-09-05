import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { WindowManager } from '../windowManager'

/**
 * 窗口操作IPC处理器
 */
export class WindowHandlers {
  private windowManager: WindowManager

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager
    this.registerHandlers()
  }

  private registerHandlers(): void {
    // 最小化窗口
    ipcMain.handle('window:minimize', () => {
      this.windowManager.minimizeMainWindow()
    })

    // 最大化/恢复窗口
    ipcMain.handle('window:maximize', () => {
      this.windowManager.maximizeMainWindow()
    })

    // 关闭窗口
    ipcMain.handle('window:close', () => {
      this.windowManager.closeMainWindow()
    })

    // 获取窗口状态
    ipcMain.handle('window:isMaximized', () => {
      const mainWindow = this.windowManager.getMainWindow()
      return mainWindow ? mainWindow.isMaximized() : false
    })

    // 创建子窗口
    ipcMain.handle('window:createChild', async (event: IpcMainInvokeEvent, config: any) => {
      const childWindow = this.windowManager.createChildWindow('child-' + Date.now(), config)
      return childWindow.id
    })

    // 关闭子窗口
    ipcMain.handle('window:closeChild', async (event: IpcMainInvokeEvent, windowId: string) => {
      this.windowManager.closeWindow(windowId)
    })

    // 获取所有窗口
    ipcMain.handle('window:getAllWindows', () => {
      const windows = this.windowManager.getAllWindows()
      return windows.map(window => ({
        id: window.id,
        title: window.getTitle(),
        isVisible: window.isVisible(),
        isMaximized: window.isMaximized(),
        isMinimized: window.isMinimized()
      }))
    })
  }
}