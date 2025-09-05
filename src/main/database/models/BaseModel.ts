import DatabaseManager from '..'
import Database from 'better-sqlite3'

export abstract class BaseModel {
  protected db: typeof DatabaseManager
  protected tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
    this.db = DatabaseManager
  }

  /**
   * 创建记录
   */
  public create(data: Record<string, any>): number {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map(() => '?').join(', ')
    
    const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`
    
    const result = this.db.run(sql, values)
    return result.lastInsertRowid as number
  }

  /**
   * 根据ID查找记录
   */
  public findById<T = any>(id: number | string): T | undefined {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
    return this.db.get(sql, [id]) as T | undefined
  }

  /**
   * 更新记录
   */
  public update(id: number | string, data: Record<string, any>): void {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map(key => `${key} = ?`).join(', ')
    
    // 添加更新时间
    const sql = `UPDATE ${this.tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    
    this.db.run(sql, [...values, id])
  }

  /**
   * 删除记录
   */
  public delete(id: number | string): void {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
    this.db.run(sql, [id])
  }

  /**
   * 查找所有记录
   */
  public findAll<T = any>(conditions?: Record<string, any>, limit?: number, offset?: number): T[] {
    let sql = `SELECT * FROM ${this.tableName}`
    const params: any[] = []

    if (conditions && Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ')
      sql += ` WHERE ${whereClause}`
      params.push(...Object.values(conditions))
    }

    if (limit) {
      sql += ` LIMIT ?`
      params.push(limit)
    }

    if (offset) {
      sql += ` OFFSET ?`
      params.push(offset)
    }

    return this.db.query(sql, params) as T[]
  }

  /**
   * 计算记录数量
   */
  public count(conditions?: Record<string, any>): number {
    let sql = `SELECT COUNT(*) as count FROM ${this.tableName}`
    const params: any[] = []

    if (conditions && Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ')
      sql += ` WHERE ${whereClause}`
      params.push(...Object.values(conditions))
    }

    const result = this.db.get(sql, params) as { count: number } | undefined
    return result ? result.count : 0
  }

  /**
   * 检查记录是否存在
   */
  public exists(conditions: Record<string, any>): boolean {
    const count = this.count(conditions)
    return count > 0
  }
}