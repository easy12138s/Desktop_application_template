import { BaseModel } from './BaseModel'
import DatabaseManager from '..'

export interface AppSetting {
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'json'
  updated_at: string
}

export class AppSettingModel extends BaseModel {
  constructor() {
    super('app_settings')
  }

  /**
   * 获取设置值
   */
  public async getSetting<T = any>(key: string, defaultValue?: T): Promise<T | undefined> {
    const sql = `SELECT * FROM ${this.tableName} WHERE key = ?`
    const setting = DatabaseManager.get(sql, [key]) as AppSetting | undefined
    
    if (!setting) {
      return defaultValue
    }

    return this.parseValue<T>(setting.value, setting.type)
  }

  /**
   * 设置配置值
   */
  public async setSetting<T = any>(key: string, value: T, type?: AppSetting['type']): Promise<void> {
    const settingType = type || this.getValueType(value)
    const stringValue = this.stringifyValue(value, settingType)

    // 检查设置是否已存在
    const existingSetting = await this.getSetting(key)
    
    if (existingSetting !== undefined) {
      // 更新现有设置
      const sql = `UPDATE ${this.tableName} SET value = ?, type = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?`
      DatabaseManager.run(sql, [stringValue, settingType, key])
    } else {
      // 创建新设置
      const sql = `INSERT INTO ${this.tableName} (key, value, type) VALUES (?, ?, ?)`
      DatabaseManager.run(sql, [key, stringValue, settingType])
    }
  }

  /**
   * 删除设置
   */
  public async deleteSetting(key: string): Promise<void> {
    const sql = `DELETE FROM ${this.tableName} WHERE key = ?`
    DatabaseManager.run(sql, [key])
  }

  /**
   * 获取所有设置
   */
  public async getAllSettings(): Promise<Record<string, any>> {
    const sql = `SELECT * FROM ${this.tableName}`
    const settings = DatabaseManager.query(sql) as AppSetting[]
    
    const result: Record<string, any> = {}
    for (const setting of settings) {
      result[setting.key] = this.parseValue(setting.value, setting.type)
    }
    
    return result
  }

  /**
   * 批量设置
   */
  public async setBatchSettings(settings: Record<string, any>): Promise<void> {
    for (const [key, value] of Object.entries(settings)) {
      await this.setSetting(key, value)
    }
  }

  /**
   * 获取设置键列表
   */
  public async getSettingKeys(): Promise<string[]> {
    const sql = `SELECT key FROM ${this.tableName} ORDER BY key`
    const results = DatabaseManager.query(sql) as { key: string }[]
    return results.map((result: { key: string }) => result.key)
  }

  /**
   * 解析值
   */
  private parseValue<T>(value: string, type: AppSetting['type']): T {
    switch (type) {
      case 'number':
        return Number(value) as T
      case 'boolean':
        return (value === 'true') as T
      case 'json':
        try {
          return JSON.parse(value) as T
        } catch {
          return value as T
        }
      case 'string':
      default:
        return value as T
    }
  }

  /**
   * 字符串化值
   */
  private stringifyValue<T>(value: T, type: AppSetting['type']): string {
    switch (type) {
      case 'json':
        return JSON.stringify(value)
      case 'number':
      case 'boolean':
        return String(value)
      case 'string':
      default:
        return String(value)
    }
  }

  /**
   * 获取值类型
   */
  private getValueType<T>(value: T): AppSetting['type'] {
    if (typeof value === 'number') {
      return 'number'
    } else if (typeof value === 'boolean') {
      return 'boolean'
    } else if (typeof value === 'object') {
      return 'json'
    } else {
      return 'string'
    }
  }
}