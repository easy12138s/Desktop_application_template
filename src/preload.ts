import { contextBridge } from 'electron'
import { windowApi, fileApi } from './preload/apis'

/**
 * Electron API 暴露给渲染进程
 * 
 * 通过 contextBridge 安全地暴露API到渲染进程
 * 渲染进程可以通过 window.electronAPI 访问这些API
 */
const electronAPI = {
  // 窗口操作
  window: windowApi,
  
  // 数据库操作
  // database: databaseApi,
  
  // 文件操作
  file: fileApi,

  // 应用信息
  app: {
    /**
     * 获取应用版本
     */
    getVersion: () => process.env.npm_package_version || '1.0.0',
    
    /**
     * 获取平台信息
     */
    getPlatform: () => process.platform,
    
    /**
     * 获取环境信息
     */
    getEnvironment: () => process.env.NODE_ENV || 'production',
    
    /**
     * 获取应用标题
     */
    getTitle: () => process.env.VUE_APP_TITLE || 'Vue Electron Desktop App'
  }
}

// 在主世界暴露API
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// 为TypeScript提供类型定义
declare global {
  interface Window {
    electronAPI: typeof electronAPI
  }
}