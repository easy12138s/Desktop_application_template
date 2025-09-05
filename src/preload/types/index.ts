/**
 * API响应类型
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

/**
 * 用户类型
 */
export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

/**
 * 创建用户数据类型
 */
export interface CreateUserData {
  username: string
  email: string
  password: string
}

/**
 * 文件信息类型
 */
export interface FileInfo {
  name: string
  path: string
  size: number
  isDirectory: boolean
  isFile: boolean
  extension?: string
  modified: Date
}

/**
 * 窗口配置类型
 */
export interface WindowConfig {
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  webPreferences?: any
  show?: boolean
  resizable?: boolean
  title?: string
}

/**
 * 窗口信息类型
 */
export interface WindowInfo {
  id: number
  title: string
  isVisible: boolean
  isMaximized: boolean
  isMinimized: boolean
}

/**
 * 文件对话框选项类型
 */
export interface FileDialogOptions {
  title?: string
  defaultPath?: string
  buttonLabel?: string
  filters?: Array<{
    name: string
    extensions: string[]
  }>
  properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles'>
}

/**
 * 保存对话框选项类型
 */
export interface SaveDialogOptions {
  title?: string
  defaultPath?: string
  buttonLabel?: string
  filters?: Array<{
    name: string
    extensions: string[]
  }>
}

/**
 * 用户列表响应类型
 */
export interface UserListResponse {
  users: User[]
  total: number
}