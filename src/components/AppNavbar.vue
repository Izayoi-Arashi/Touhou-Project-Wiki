<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const navItems = [
  { label: '首页', to: '/home', match: (p) => p === '/home' },
  { label: '简介', to: '/introduction', match: (p) => p.startsWith('/introduction') },
  { label: '主要角色', to: '/roles', match: (p) => p.startsWith('/roles') },
  { label: '二创作品', to: '/works', match: (p) => p.startsWith('/works') },
]

// 滑块跟随高亮项移动；用户菜单占据第 5 格（各占 20%）
const activeIndex = computed(() => navItems.findIndex((item) => item.match(route.path)))

function onCommand(command) {
  if (command === 'logout') {
    store.logout()
    ElMessage.success('已退出登入')
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
      <el-dropdown class="user-dropdown" @command="onCommand">
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
