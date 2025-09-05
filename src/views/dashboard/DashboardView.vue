<template>
  <div class="dashboard-layout">
    <!-- 侧边栏 -->
    <nav class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">控制台</h2>
      </div>
      
      <ul class="sidebar-menu">
        <li class="menu-item">
          <router-link to="/dashboard" class="menu-link" exact-active-class="active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <span>仪表板</span>
          </router-link>
        </li>
        

        
        <li class="menu-item">
          <router-link to="/settings" class="menu-link" active-class="active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
            <span>设置</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部栏 -->
      <header class="top-bar">
        <div class="top-bar-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        
        <div class="top-bar-right">
          <!-- 主题切换 -->
          <button class="btn btn-ghost icon-button" @click="toggleTheme" title="切换主题">
            <svg v-if="appStore.isDarkTheme" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 0V4m0 16v-2m8-6h-2M6 12H4m12.95-7.95l-1.41 1.41M7.46 16.54l-1.41 1.41m11.9 0l-1.41-1.41M7.46 7.46L6.05 6.05"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
            </svg>
          </button>
          

        </div>
      </header>

      <!-- 路由内容 -->
      <div class="content-area">
        <DashboardHome />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import DashboardHome from './DashboardHome.vue'

const route = useRoute()
const appStore = useAppStore()

// 页面标题
const pageTitle = computed(() => {
  const routeMap: Record<string, string> = {
    '/dashboard': '仪表板',
    '/users': '用户管理',
    '/settings': '设置'
  }
  return routeMap[route.path] || '控制台'
})

// 切换主题
const toggleTheme = () => {
  appStore.toggleTheme()
}


</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: var(--background-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: var(--spacing);
  border-bottom: 1px solid var(--border-color);
}

.sidebar-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-color);
}

.sidebar-menu {
  flex: 1;
  padding: var(--spacing);
  list-style: none;
}

.menu-item {
  margin-bottom: var(--spacing-sm);
}

.menu-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing);
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: all var(--transition);
  
  &:hover {
    background-color: var(--button-hover-background);
    color: var(--text-color);
  }
  
  &.active {
    background-color: var(--primary-color);
    color: white;
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  height: 60px;
  padding: 0 var(--spacing);
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-bar-left {
  display: flex;
  align-items: center;
}

.page-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-color);
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing);
}

.icon-button {
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.user-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-color);
}

.user-email {
  font-size: var(--text-xs);
  color: var(--text-color-secondary);
}

.content-area {
  flex: 1;
  overflow: auto;
  padding: var(--spacing);
}

// 响应式设计
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
  
  .user-info {
    display: none;
  }
}
</style>