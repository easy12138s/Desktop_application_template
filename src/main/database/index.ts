import * as Database from 'better-sqlite3'
import * as path from 'path'
import { app } from 'electron'

class DatabaseManager {
  private db!: Database.Database

  constructor() {
    this.init()
  }

  private init() {
    const isDev = process.env.NODE_ENV === 'development'
    const dbPath = isDev 
      ? path.join(process.cwd(), 'dev-database.sqlite')
      : path.join(app.getPath('userData'), 'app-database.sqlite')

    console.log('数据库路径:', dbPath)
    
    this.db = new (Database as any)(dbPath)
    
    // 初始化数据库表
    this.initializeTables()
    console.log('✅ 数据库连接成功')
  }

  private initializeTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS app_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        context TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)
  }

  // 查询方法
  query(sql: string, params: any[] = []) {
    return this.db.prepare(sql).all(params)
  }

  // 执行方法
  run(sql: string, params: any[] = []) {
    return this.db.prepare(sql).run(params)
  }

  // 获取单条记录
  get(sql: string, params: any[] = []) {
    return this.db.prepare(sql).get(params)
  }

  // 关闭数据库连接
  close() {
    this.db.close()
  }
}

// 创建单例实例
const databaseManager = new DatabaseManager()

// 导出接口
export default {
  query: (sql: string, params?: any[]) => databaseManager.query(sql, params),
  run: (sql: string, params?: any[]) => databaseManager.run(sql, params),
  get: (sql: string, params?: any[]) => databaseManager.get(sql, params),
  close: () => databaseManager.close(),
}