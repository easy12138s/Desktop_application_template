<template>
  <div class="dashboard-home">
    <div class="welcome-section">
      <h2 class="welcome-title">欢迎使用桌面应用模板</h2>
      <p class="welcome-subtitle">今天是 {{ currentDate }}</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">1.0.0</div>
          <div class="stat-label">模板版本</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ appInfo.version }}</div>
          <div class="stat-label">应用版本</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ appInfo.platform }}</div>
          <div class="stat-label">运行平台</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">运行中</div>
          <div class="stat-label">应用状态</div>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h3 class="section-title">快速操作</h3>
      <div class="action-buttons">
        <router-link to="/settings" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
          </svg>
          应用设置
        </router-link>
        
        <button class="btn btn-ghost" @click="openDataFolder">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
          </svg>
          打开数据目录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 应用信息
const appInfo = computed(() => ({
  version: window.electronAPI.app.getVersion(),
  platform: window.electronAPI.app.getPlatform(),
  environment: window.electronAPI.app.getEnvironment()
}))

// 当前日期
const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

// 打开数据目录
const openDataFolder = async () => {
  try {
    const result = await window.electronAPI.file.getSystemPath('userData')
    if (result.success && result.data) {
      await window.electronAPI.file.showInFolder(result.data)
    }
  } catch (error) {
    console.error('打开数据目录失败:', error)
  }
}
</script>

<style lang="scss" scoped>
.dashboard-home {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.welcome-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.welcome-subtitle {
  font-size: var(--text-lg);
  color: var(--text-color-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  padding: var(--spacing);
  display: flex;
  align-items: center;
  gap: var(--spacing);
  transition: transform var(--transition);

  &:hover {
    transform: translateY(-2px);
  }
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-color-secondary);
}

.quick-actions {
  margin-top: var(--spacing-xl);
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing);
}

.action-buttons {
  display: flex;
  gap: var(--spacing);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

// 响应式设计
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>