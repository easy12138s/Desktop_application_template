<template>
  <div id="app" class="app-container">
    <!-- 标题栏 -->
    <TitleBar />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TitleBar from './components/layout/TitleBar.vue'
import { useAppStore } from './store/app'

const appStore = useAppStore()

// 应用初始化
onMounted(async () => {
  try {
    // 初始化应用配置
    await appStore.initialize()
  } catch (error) {
    console.error('应用初始化失败:', error)
  }
})
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

// 全局滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track-color);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover-color);
}
</style>