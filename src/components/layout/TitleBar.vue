<template>
  <div class="title-bar" @dblclick="handleDoubleClick">
    <div class="title-bar-content">
      <!-- 应用图标和标题 -->
      <div class="title-info">
        <div class="app-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
            <path d="M2 17L12 22L22 17"/>
            <path d="M2 12L12 17L22 12"/>
          </svg>
        </div>
        <div class="app-title">{{ appTitle }}</div>
      </div>

      <!-- 窗口控制按钮 -->
      <div class="window-controls">
        <button 
          class="control-button minimize-button" 
          @click="minimize"
          title="最小化"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2" y="5" width="8" height="2" fill="currentColor"/>
          </svg>
        </button>
        
        <button 
          class="control-button maximize-button" 
          @click="toggleMaximize"
          :title="isMaximized ? '恢复' : '最大化'"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect v-if="!isMaximized" x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <g v-else>
              <rect x="2" y="3" width="6" height="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
              <path d="M4 2H10V8H9V3H4V2Z" fill="currentColor"/>
            </g>
          </svg>
        </button>
        
        <button 
          class="control-button close-button" 
          @click="close"
          title="关闭"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isMaximized = ref(false)

// 应用标题
const appTitle = computed(() => {
  return window.electronAPI.app.getTitle()
})

// 检查窗口最大化状态
const checkMaximizedState = async () => {
  try {
    isMaximized.value = await window.electronAPI.window.isMaximized()
  } catch (error) {
    console.error('检查窗口状态失败:', error)
  }
}

// 最小化窗口
const minimize = async () => {
  try {
    await window.electronAPI.window.minimize()
  } catch (error) {
    console.error('最小化窗口失败:', error)
  }
}

// 切换最大化状态
const toggleMaximize = async () => {
  try {
    await window.electronAPI.window.maximize()
    await checkMaximizedState()
  } catch (error) {
    console.error('切换最大化状态失败:', error)
  }
}

// 关闭窗口
const close = async () => {
  try {
    await window.electronAPI.window.close()
  } catch (error) {
    console.error('关闭窗口失败:', error)
  }
}

// 双击标题栏切换最大化
const handleDoubleClick = () => {
  toggleMaximize()
}

onMounted(() => {
  checkMaximizedState()
})
</script>

<style lang="scss" scoped>
.title-bar {
  height: 40px;
  background: var(--title-bar-background);
  border-bottom: 1px solid var(--border-color);
  -webkit-app-region: drag;
  user-select: none;
  display: flex;
  align-items: center;
  min-height: 40px;
}

.title-bar-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.title-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--primary-color);
}

.app-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.window-controls {
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
}

.control-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--text-color-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--button-hover-background);
    color: var(--text-color);
  }

  &:active {
    background: var(--button-active-background);
  }
}

.close-button {
  &:hover {
    background: #e74c3c;
    color: white;
  }

  &:active {
    background: #c0392b;
  }
}

.minimize-button,
.maximize-button {
  margin-right: 1px;
}
</style>