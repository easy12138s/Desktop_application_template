/**
 * 日志工具
 */
export class Logger {
  private static isDev = process.env.NODE_ENV === 'development'
  private static logLevel = process.env.LOG_LEVEL || (Logger.isDev ? 'debug' : 'error')

  private static levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  }

  private static shouldLog(level: keyof typeof Logger.levels): boolean {
    return Logger.levels[level] >= Logger.levels[Logger.logLevel as keyof typeof Logger.levels]
  }

  public static debug(...args: any[]): void {
    if (Logger.shouldLog('debug')) {
      console.log('[DEBUG]', new Date().toISOString(), ...args)
    }
  }

  public static info(...args: any[]): void {
    if (Logger.shouldLog('info')) {
      console.info('[INFO]', new Date().toISOString(), ...args)
    }
  }

  public static warn(...args: any[]): void {
    if (Logger.shouldLog('warn')) {
      console.warn('[WARN]', new Date().toISOString(), ...args)
    }
  }

  public static error(...args: any[]): void {
    if (Logger.shouldLog('error')) {
      console.error('[ERROR]', new Date().toISOString(), ...args)
    }
  }
}

/**
 * 延迟执行
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 安全地解析JSON
 */
export function safeJsonParse<T = any>(json: string, defaultValue?: T): T | undefined {
  try {
    return JSON.parse(json)
  } catch {
    return defaultValue
  }
}

/**
 * 安全地字符串化JSON
 */
export function safeJsonStringify(obj: any, space?: number): string {
  try {
    return JSON.stringify(obj, null, space)
  } catch {
    return ''
  }
}

/**
 * 检查是否为开发环境
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * 检查是否为生产环境
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * 格式化日期
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 生成随机字符串
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 深度克隆对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T
  }

  if (typeof obj === 'object') {
    const cloned = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }

  return obj
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastTime >= wait) {
      lastTime = now
      func(...args)
    }
  }
}

/**
 * 重试函数
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxAttempts) {
        break
      }
      
      Logger.warn(`Attempt ${attempt} failed, retrying in ${delayMs}ms...`, error)
      await delay(delayMs)
    }
  }

  throw lastError || new Error('All retry attempts failed')
}