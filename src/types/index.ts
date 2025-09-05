/**
 * 用户类型定义
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
 * API响应类型
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

/**
 * 路由元信息类型
 */
export interface RouteMeta {
  requiresAuth?: boolean
  title?: string
  icon?: string
  hideInMenu?: boolean
}

/**
 * 应用主题类型
 */
export type Theme = 'light' | 'dark'

/**
 * 语言类型
 */
export type Language = 'zh-CN' | 'en-US'

/**
 * 窗口状态类型
 */
export interface WindowState {
  isMaximized: boolean
  isMinimized: boolean
  isVisible: boolean
}

/**
 * 应用设置类型
 */
export interface AppSettings {
  theme: Theme
  language: Language
  autoLaunch: boolean
  minimizeToTray: boolean
  closeToTray: boolean
}

/**
 * 用户偏好设置类型
 */
export interface UserPreferences {
  notifications: boolean
  autoSave: boolean
  autoBackup: boolean
  backupInterval: number
}

/**
 * 分页参数类型
 */
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

/**
 * 分页响应类型
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 表单验证规则类型
 */
export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message: string
  validator?: (value: any) => boolean | Promise<boolean>
}

/**
 * 表单字段类型
 */
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  rules?: ValidationRule[]
  options?: Array<{ label: string; value: any }>
  disabled?: boolean
}

/**
 * 对话框选项类型
 */
export interface DialogOptions {
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'confirm'
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
}

/**
 * 通知类型
 */
export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  showClose?: boolean
}

/**
 * 菜单项类型
 */
export interface MenuItem {
  id: string
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
  disabled?: boolean
  hidden?: boolean
}

/**
 * 面包屑项类型
 */
export interface BreadcrumbItem {
  label: string
  path?: string
  disabled?: boolean
}