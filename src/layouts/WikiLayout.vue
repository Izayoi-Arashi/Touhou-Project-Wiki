<script setup>
import { ref } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'

// 暗/浅色切换：状态写在 body 类上，localStorage 记忆，启动时由 main.js 恢复
// 按钮放在布局层而非导航内：导航的 backdrop-filter 会捕获 fixed 后代的定位基准
const isLight = ref(document.body.classList.contains('light'))

function toggleTheme() {
  isLight.value = !isLight.value
  document.body.classList.toggle('light', isLight.value)
  localStorage.setItem('wiki-theme', isLight.value ? 'light' : 'dark')
}
</script>

<template>
  <div class="bg-page">
    <div class="bg-fixed-layer" style="background-image: url('/images/background.jpg')" />
    <AppNavbar />
    <transition name="page-fade" mode="out-in">
      <router-view />
    </transition>
    <button class="theme-toggle" :title="isLight ? '切换到暗色' : '切换到浅色'" @click="toggleTheme">
      {{ isLight ? '🌙' : '☀️' }}
    </button>
  </div>
</template>

<style scoped>
/* 主题切换悬浮球：固定于右下角，避开卡片与页脚内容区 */
.theme-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  font-size: 20px;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
  color: inherit;
  background: rgba(20, 20, 20, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  backdrop-filter: blur(6px);
  z-index: 150;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.theme-toggle:hover {
  background: rgba(240, 128, 128, 0.9);
  border-color: #f08080;
  color: #fff;
}

body.light .theme-toggle {
  background: rgba(255, 255, 255, 0.75);
  border-color: rgba(0, 0, 0, 0.15);
  color: #b8541e;
}

body.light .theme-toggle:hover {
  background: #f08080;
  border-color: #f08080;
  color: #fff;
}
</style>
