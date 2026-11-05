<script setup>
import { computed, getCurrentInstance, nextTick } from 'vue'
import { Message } from 'element-ui'
import { useUserStore } from '../stores/user'
import router from '../router'

// Vue Router 3 没有 useRouter/useRoute 组合式 API：
// 响应式 $route 经组件代理读取，router 单例直接复用模块导出
const vm = getCurrentInstance().proxy
const route = computed(() => vm.$route)
const store = useUserStore()

const navItems = [
  { label: '首页', to: '/home', match: (p) => p === '/home' },
  { label: '简介', to: '/introduction', match: (p) => p.startsWith('/introduction') },
  { label: '主要角色', to: '/roles', match: (p) => p.startsWith('/roles') },
  { label: '二创作品', to: '/works', match: (p) => p.startsWith('/works') },
]

// 滑块跟随高亮项移动；用户菜单占据第 5 格（各占 20%）
const activeIndex = computed(() => navItems.findIndex((item) => item.match(route.value.path)))

// 上下联通等宽：展开时把菜单几何精确对齐触发块 li
// （popper 按内层 span 定位，与 li 边缘不重合；且其定位 update 晚于
// visible-change 事件，故须等它写完内联样式后再覆盖 left/top/width）
function onVisibleChange(visible) {
  if (!visible) return
  nextTick(() => {
    requestAnimationFrame(() => {
      const li = document.querySelector('.nav .user-item')
      const menu = document.querySelector('.el-dropdown-menu')
      if (!li || !menu) return
      const rect = li.getBoundingClientRect()
      menu.style.width = li.offsetWidth + 'px'
      // popper 挂在 body 上用文档坐标：视口坐标必须加滚动量，否则页面非顶部时
      // 菜单会被定位到当前视口之外（表现即"呼不出来"）
      menu.style.left = rect.left + window.scrollX + 'px'
      menu.style.top = rect.bottom + window.scrollY + 'px'
    })
  })
}

function onCommand(command) {
  if (command === 'logout') {
    store.logout()
    Message.success('已退出登入')
    router.push('/login')
  } else {
    router.push(`/${command}`)
  }
}
</script>

<template>
  <ul class="nav">
    <li
      v-for="(item, i) in navItems"
      :key="item.to"
      :class="{ active: i === activeIndex }"
      @click="router.push(item.to)"
    >
      {{ item.label }}
    </li>
    <li class="user-item">
      <el-dropdown class="user-dropdown" @command="onCommand" @visible-change="onVisibleChange">
        <span class="user-trigger">
          {{ store.currentUser ? store.currentUser.uname : '未登入' }}
          <span class="arrow">▾</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="alter">更改密码</el-dropdown-item>
            <el-dropdown-item command="about">关于本站</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </li>
    <div v-show="activeIndex >= 0" class="slider" :style="{ transform: `translateX(${activeIndex * 100}%)` }" />
  </ul>
</template>

<style scoped>
.nav {
  width: 100%;
  height: 50px;
  display: flex;
  list-style: none;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(20, 20, 20, 0.55);
  backdrop-filter: blur(10px);
}

.nav li {
  position: relative;
  flex: 1;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: lightcoral;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
}

.nav li.active {
  color: #fff;
}

.slider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20%;
  height: 3px;
  background-color: lightcoral;
  transition: transform 0.3s ease;
}

.user-item {
  background-color: lightcoral;
}

.user-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 18px;
  outline: none;
}

.user-trigger .arrow {
  font-size: 12px;
}
</style>