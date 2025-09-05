import { ipcRenderer } from 'electron'
import type { WindowConfig, WindowInfo, ApiResponse } from '../types'

/**
 * 窗口操作API
 */
export const windowApi = {
  /**
   * 最小化窗口
   */
  minimize: (): Promise<void> => {
    return ipcRenderer.invoke('window:minimize')
  },

  /**
   * 最大化/恢复窗口
   */
  maximize: (): Promise<void> => {
    return ipcRenderer.invoke('window:maximize')
  },

  /**
   * 关闭窗口
   */
  close: (): Promise<void> => {
    return ipcRenderer.invoke('window:close')
  },

  /**
   * 检查窗口是否最大化
   */
  isMaximized: (): Promise<boolean> => {
    return ipcRenderer.invoke('window:isMaximized')
  },

  /**
   * 创建子窗口
   */
  createChild: (config: WindowConfig): Promise<number> => {
    return ipcRenderer.invoke('window:createChild', config)
  },

  /**
   * 关闭子窗口
   */
  closeChild: (windowId: string): Promise<void> => {
    return ipcRenderer.invoke('window:closeChild', windowId)
  },

  /**
   * 获取所有窗口信息
   */
  getAllWindows: (): Promise<WindowInfo[]> => {
    return ipcRenderer.invoke('window:getAllWindows')
  }
}