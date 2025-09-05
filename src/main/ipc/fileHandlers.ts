import { ipcMain, IpcMainInvokeEvent, dialog } from 'electron'
import { FileService } from '../services'

/**
 * 文件操作IPC处理器
 */
export class FileHandlers {
  private fileService: FileService

  constructor() {
    this.fileService = new FileService()
    this.registerHandlers()
  }

  private registerHandlers(): void {
    // 读取文件
    ipcMain.handle('file:read', async (event: IpcMainInvokeEvent, filePath: string, encoding?: BufferEncoding) => {
      try {
        const content = await this.fileService.readFile(filePath, encoding)
        return { success: true, data: content }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '读取文件失败' }
      }
    })

    // 写入文件
    ipcMain.handle('file:write', async (event: IpcMainInvokeEvent, filePath: string, content: string, encoding?: BufferEncoding) => {
      try {
        await this.fileService.writeFile(filePath, content, encoding)
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '写入文件失败' }
      }
    })

    // 检查文件是否存在
    ipcMain.handle('file:exists', async (event: IpcMainInvokeEvent, filePath: string) => {
      try {
        const exists = this.fileService.fileExists(filePath)
        return { success: true, data: exists }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '检查文件失败' }
      }
    })

    // 获取文件信息
    ipcMain.handle('file:getInfo', async (event: IpcMainInvokeEvent, filePath: string) => {
      try {
        const fileInfo = await this.fileService.getFileInfo(filePath)
        return { success: true, data: fileInfo }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '获取文件信息失败' }
      }
    })

    // 列出目录内容
    ipcMain.handle('file:listDirectory', async (event: IpcMainInvokeEvent, dirPath: string) => {
      try {
        const items = await this.fileService.listDirectory(dirPath)
        return { success: true, data: items }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '列出目录失败' }
      }
    })

    // 获取系统路径
    ipcMain.handle('file:getSystemPath', async (event: IpcMainInvokeEvent, pathType: string) => {
      try {
        let path: string
        switch (pathType) {
          case 'userData':
            path = this.fileService.getUserDataPath()
            break
          case 'temp':
            path = this.fileService.getTempPath()
            break
          case 'desktop':
            path = this.fileService.getDesktopPath()
            break
          case 'documents':
            path = this.fileService.getDocumentsPath()
            break
          case 'downloads':
            path = this.fileService.getDownloadsPath()
            break
          default:
            throw new Error(`未知的路径类型: ${pathType}`)
        }
        return { success: true, data: path }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '获取系统路径失败' }
      }
    })

    // 在文件管理器中显示文件
    ipcMain.handle('file:showInFolder', async (event: IpcMainInvokeEvent, filePath: string) => {
      try {
        this.fileService.showItemInFolder(filePath)
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '打开文件管理器失败' }
      }
    })

    // 用默认应用打开文件
    ipcMain.handle('file:open', async (event: IpcMainInvokeEvent, path: string) => {
      try {
        const result = await this.fileService.openPath(path)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '打开文件失败' }
      }
    })

    // 在浏览器中打开URL
    ipcMain.handle('file:openExternal', async (event: IpcMainInvokeEvent, url: string) => {
      try {
        await this.fileService.openExternal(url)
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '打开链接失败' }
      }
    })

    // 读取JSON文件
    ipcMain.handle('file:readJson', async (event: IpcMainInvokeEvent, filePath: string) => {
      try {
        const data = await this.fileService.readJsonFile(filePath)
        return { success: true, data }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '读取JSON文件失败' }
      }
    })

    // 写入JSON文件
    ipcMain.handle('file:writeJson', async (event: IpcMainInvokeEvent, filePath: string, data: any) => {
      try {
        await this.fileService.writeJsonFile(filePath, data)
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '写入JSON文件失败' }
      }
    })

    // 文件选择对话框
    ipcMain.handle('file:showOpenDialog', async (event: IpcMainInvokeEvent, options: any) => {
      try {
        const result = await dialog.showOpenDialog(options)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '打开文件对话框失败' }
      }
    })

    // 文件保存对话框
    ipcMain.handle('file:showSaveDialog', async (event: IpcMainInvokeEvent, options: any) => {
      try {
        const result = await dialog.showSaveDialog(options)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : '打开保存对话框失败' }
      }
    })
  }
}