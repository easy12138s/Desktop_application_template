import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const isInitialized = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const language = ref('zh-CN')
  const windowMaximized = ref(false)

  // 计算属性
  const isDarkTheme = computed(() => theme.value === 'dark')

  // 方法
  const initialize = async () => {
    try {
      // 从本地存储加载设置
      await loadSettings()
      
      // 应用主题
      applyTheme()
      
      isInitialized.value = true
      console.log('应用初始化完成')
    } catch (error) {
      console.error('应用初始化失败:', error)
      throw error
    }
  }

  const loadSettings = async () => {
    try {
      // 尝试从文件加载用户设置
      const userDataPath = await window.electronAPI.file.getSystemPath('userData')
      if (userDataPath.success) {
        const settingsPath = `${userDataPath.data}/app-settings.json`
        const settingsResult = await window.electronAPI.file.readJson(settingsPath)
        
        if (settingsResult.success && settingsResult.data) {
          const settings = settingsResult.data
          theme.value = settings.theme || 'light'
          language.value = settings.language || 'zh-CN'
        }
      }
    } catch (error) {
      console.warn('加载设置失败，使用默认设置:', error)
    }
  }

  const saveSettings = async () => {
    try {
      const userDataPath = await window.electronAPI.file.getSystemPath('userData')
      if (userDataPath.success) {
        const settings = {
          theme: theme.value,
          language: language.value,
          lastUpdated: new Date().toISOString()
        }
        
        const settingsPath = `${userDataPath.data}/app-settings.json`
        await window.electronAPI.file.writeJson(settingsPath, settings)
        console.log('设置已保存')
      }
    } catch (error) {
      console.error('保存设置失败:', error)
    }
  }

  const setTheme = async (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    applyTheme()
    await saveSettings()
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (theme.value === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const setLanguage = async (newLanguage: string) => {
    language.value = newLanguage
    await saveSettings()
  }

  const setWindowMaximized = (maximized: boolean) => {
    windowMaximized.value = maximized
  }

  const toggleTheme = async () => {
    await setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    // 状态
    isInitialized,
    theme,
    language,
    windowMaximized,
    
    // 计算属性
    isDarkTheme,
    
    // 方法
    initialize,
    setTheme,
    setLanguage,
    setWindowMaximized,
    toggleTheme,
    saveSettings
  }
})