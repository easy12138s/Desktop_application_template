import { app, shell } from 'electron'
import { readFile, writeFile, existsSync, mkdirSync, stat, readdir } from 'fs'
import { join, dirname, extname } from 'path'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
const statAsync = promisify(stat)
const readdirAsync = promisify(readdir)

export interface FileInfo {
  name: string
  path: string
  size: number
  isDirectory: boolean
  isFile: boolean
  extension?: string
  modified: Date
}

export class FileService {
  private userDataPath: string

  constructor() {
    this.userDataPath = app.getPath('userData')
  }

  /**
   * 读取文件内容
   */
  public async readFile(filePath: string, encoding: BufferEncoding = 'utf8'): Promise<string> {
    try {
      const content = await readFileAsync(filePath, encoding)
      return content
    } catch (error) {
      throw new Error(`读取文件失败: ${error}`)
    }
  }

  /**
   * 写入文件内容
   */
  public async writeFile(filePath: string, content: string, encoding: BufferEncoding = 'utf8'): Promise<void> {
    try {
      // 确保目录存在
      const dir = dirname(filePath)
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
      }

      await writeFileAsync(filePath, content, encoding)
    } catch (error) {
      throw new Error(`写入文件失败: ${error}`)
    }
  }

  /**
   * 检查文件是否存在
   */
  public fileExists(filePath: string): boolean {
    return existsSync(filePath)
  }

  /**
   * 获取文件信息
   */
  public async getFileInfo(filePath: string): Promise<FileInfo> {
    try {
      const stats = await statAsync(filePath)
      const name = filePath.split(/[/\\]/).pop() || ''
      
      return {
        name,
        path: filePath,
        size: stats.size,
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        extension: stats.isFile() ? extname(name) : undefined,
        modified: stats.mtime
      }
    } catch (error) {
      throw new Error(`获取文件信息失败: ${error}`)
    }
  }

  /**
   * 列出目录内容
   */
  public async listDirectory(dirPath: string): Promise<FileInfo[]> {
    try {
      const items = await readdirAsync(dirPath)
      const fileInfos: FileInfo[] = []

      for (const item of items) {
        const itemPath = join(dirPath, item)
        try {
          const fileInfo = await this.getFileInfo(itemPath)
          fileInfos.push(fileInfo)
        } catch (error) {
          // 跳过无法访问的文件
          console.warn(`跳过文件 ${itemPath}: ${error}`)
        }
      }

      return fileInfos.sort((a, b) => {
        // 目录优先，然后按名称排序
        if (a.isDirectory && !b.isDirectory) return -1
        if (!a.isDirectory && b.isDirectory) return 1
        return a.name.localeCompare(b.name)
      })
    } catch (error) {
      throw new Error(`列出目录内容失败: ${error}`)
    }
  }

  /**
   * 获取用户数据目录路径
   */
  public getUserDataPath(): string {
    return this.userDataPath
  }

  /**
   * 获取应用数据文件路径
   */
  public getAppDataPath(fileName: string): string {
    return join(this.userDataPath, fileName)
  }

  /**
   * 获取应用临时目录路径
   */
  public getTempPath(): string {
    return app.getPath('temp')
  }

  /**
   * 获取桌面路径
   */
  public getDesktopPath(): string {
    return app.getPath('desktop')
  }

  /**
   * 获取文档路径
   */
  public getDocumentsPath(): string {
    return app.getPath('documents')
  }

  /**
   * 获取下载路径
   */
  public getDownloadsPath(): string {
    return app.getPath('downloads')
  }

  /**
   * 在文件管理器中显示文件
   */
  public showItemInFolder(filePath: string): void {
    shell.showItemInFolder(filePath)
  }

  /**
   * 用默认应用打开文件
   */
  public async openPath(path: string): Promise<string> {
    return await shell.openPath(path)
  }

  /**
   * 在浏览器中打开URL
   */
  public async openExternal(url: string): Promise<void> {
    await shell.openExternal(url)
  }

  /**
   * 创建目录
   */
  public createDirectory(dirPath: string): void {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * 读取JSON文件
   */
  public async readJsonFile<T = any>(filePath: string): Promise<T> {
    try {
      const content = await this.readFile(filePath)
      return JSON.parse(content)
    } catch (error) {
      throw new Error(`读取JSON文件失败: ${error}`)
    }
  }

  /**
   * 写入JSON文件
   */
  public async writeJsonFile<T = any>(filePath: string, data: T): Promise<void> {
    try {
      const content = JSON.stringify(data, null, 2)
      await this.writeFile(filePath, content)
    } catch (error) {
      throw new Error(`写入JSON文件失败: ${error}`)
    }
  }

  /**
   * 获取文件大小（格式化）
   */
  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  /**
   * 检查文件扩展名
   */
  public isImageFile(filePath: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
    const ext = extname(filePath).toLowerCase()
    return imageExtensions.includes(ext)
  }

  /**
   * 检查是否为文本文件
   */
  public isTextFile(filePath: string): boolean {
    const textExtensions = ['.txt', '.md', '.json', '.js', '.ts', '.html', '.css', '.xml', '.csv']
    const ext = extname(filePath).toLowerCase()
    return textExtensions.includes(ext)
  }
}