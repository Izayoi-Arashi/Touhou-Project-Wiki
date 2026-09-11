<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// 登录/注册页的全屏背景轮播（7 秒切换，淡入淡出，定时器在卸载时清理）
const backgrounds = [1, 2, 3, 4, 5].map((n) => `/images/rpicture/${n}.jpg`)
const index = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % backgrounds.length
  }, 7000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="bg-page">
    <Transition name="bg-fade">
      <div :key="index" class="bg-fixed-layer" :style="{ backgroundImage: `url(${backgrounds[index]})` }" />
    </Transition>
    <slot />
  </div>
</template>

<style scoped>
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s ease;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}
</style>
