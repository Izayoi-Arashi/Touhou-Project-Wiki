<script setup>
import { computed, getCurrentInstance, ref } from 'vue'
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

// 菜单是 li 的子元素（absolute top:100%），天生锚在吸顶导航上：
// 无 popper、无传送、无坐标换算——滚动/悬停语义由构造保证，不依赖任何时序
const open = ref(false)

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
    <li class="user-item" @mouseenter="open = true" @mouseleave="open = false">
      <span class="user-trigger">
        {{ store.currentUser ? store.currentUser.uname : '未登入' }}
        <span class="arrow">▾</span>
      </span>
      <transition name="menu-fade">
        <div v-show="open" class="user-menu">
          <div class="menu-item" @click="onCommand('alter')">更改密码</div>
          <div class="menu-item" @click="onCommand('about')">关于本站</div>
          <div class="menu-item menu-item--divided" @click="onCommand('logout')">退出登入</div>
        </div>
      </transition>
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

/* 触发区撑满整个珊瑚红块：块内任意位置悬停/点击均可触发 */
.user-trigger {
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-size: 18px;
  outline: none;
}

.user-trigger .arrow {
  font-size: 12px;
}

/* 菜单作为 li 的子元素向下展开：等宽无缝、跟随吸顶导航，不经过 popper */
.user-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #f08080;
  border: 1px solid #f08080;
  border-radius: 0 0 8px 8px;
  padding: 0;
  z-index: 2001;
}

/* 每项严格 50px = 触发块高度，与导航读作同一套网格 */
.menu-item {
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #fff;
  color: #f08080;
}

.menu-item--divided {
  border-top: 1px solid rgba(255, 255, 255, 0.35);
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.menu-fade-enter,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>