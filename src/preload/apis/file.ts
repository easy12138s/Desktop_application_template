import { ipcRenderer } from 'electron'
import type { 
  ApiResponse, 
  FileInfo, 
  FileDialogOptions, 
  SaveDialogOptions 
} from '../types'

/**
 * 文件操作API
 */
export const fileApi = {
  /**
   * 读取文件
   */
  read: (filePath: string, encoding?: BufferEncoding): Promise<ApiResponse<string>> => {
    return ipcRenderer.invoke('file:read', filePath, encoding)
  },

  /**
   * 写入文件
   */
  write: (filePath: string, content: string, encoding?: BufferEncoding): Promise<ApiResponse<void>> => {
    return ipcRenderer.invoke('file:write', filePath, content, encoding)
  },

  /**
   * 检查文件是否存在
   */
  exists: (filePath: string): Promise<ApiResponse<boolean>> => {
    return ipcRenderer.invoke('file:exists', filePath)
  },

  /**
   * 获取文件信息
   */
  getInfo: (filePath: string): Promise<ApiResponse<FileInfo>> => {
    return ipcRenderer.invoke('file:getInfo', filePath)
  },

  /**
   * 列出目录内容
   */
  listDirectory: (dirPath: string): Promise<ApiResponse<FileInfo[]>> => {
    return ipcRenderer.invoke('file:listDirectory', dirPath)
  },

  /**
   * 获取系统路径
   */
  getSystemPath: (pathType: 'userData' | 'temp' | 'desktop' | 'documents' | 'downloads'): Promise<ApiResponse<string>> => {
    return ipcRenderer.invoke('file:getSystemPath', pathType)
  },

  /**
   * 在文件管理器中显示文件
   */
  showInFolder: (filePath: string): Promise<ApiResponse<void>> => {
    return ipcRenderer.invoke('file:showInFolder', filePath)
  },

  /**
   * 用默认应用打开文件
   */
  open: (path: string): Promise<ApiResponse<string>> => {
    return ipcRenderer.invoke('file:open', path)
  },

  /**
   * 在浏览器中打开URL
   */
  openExternal: (url: string): Promise<ApiResponse<void>> => {
    return ipcRenderer.invoke('file:openExternal', url)
  },

  /**
   * 读取JSON文件
   */
  readJson: <T = any>(filePath: string): Promise<ApiResponse<T>> => {
    return ipcRenderer.invoke('file:readJson', filePath)
  },

  /**
   * 写入JSON文件
   */
  writeJson: (filePath: string, data: any): Promise<ApiResponse<void>> => {
    return ipcRenderer.invoke('file:writeJson', filePath, data)
  },

  /**
   * 显示文件选择对话框
   */
  showOpenDialog: (options: FileDialogOptions): Promise<ApiResponse<any>> => {
    return ipcRenderer.invoke('file:showOpenDialog', options)
  },

  /**
   * 显示文件保存对话框
   */
  showSaveDialog: (options: SaveDialogOptions): Promise<ApiResponse<any>> => {
    return ipcRenderer.invoke('file:showSaveDialog', options)
  }
}