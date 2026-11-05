<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  // [{ id, label }]
  floors: { type: Array, required: true },
})

const scrolled = ref(false)
const activeId = ref('')

function onScroll() {
  scrolled.value = window.scrollY > 200
  // 滚动侦测：以吸顶导航下沿（50px）+ 缓冲为基准线，最后一个越线的楼层即当前层
  let current = ''
  for (const f of props.floors) {
    if (f.id === 'floor-top') continue
    const el = document.getElementById(f.id)
    if (el && el.getBoundingClientRect().top <= 120) current = f.id
  }
  activeId.value = current
}

function jump(id) {
  // floor-top 没有对应锚点元素，特判滚回页面顶部
  if (id === 'floor-top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="floor-fade">
    <div v-show="scrolled" class="floor-nav" :class="{ scrolled }">
      <div
        v-for="f in floors"
        :key="f.id"
        class="floor"
        :class="{ active: activeId === f.id }"
        @click="jump(f.id)"
      >{{ f.label }}</div>
    </div>
  </transition>
</template>

<style scoped>
.floor-nav {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92px;
  transition: background-color 0.4s;
  z-index: 10;
}

.floor-nav.scrolled {
  background-color: lightcoral;
}

.floor {
  margin: 3px 0;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.floor:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.03);
}

/* 当前楼层：白底珊瑚字——与全站"悬停反转"语言一致 */
.floor.active,
.floor.active:hover {
  background-color: #fff;
  color: #f08080;
}

.floor-fade-enter-active,
.floor-fade-leave-active {
  transition: opacity 0.25s ease;
}

.floor-fade-enter,
.floor-fade-leave-to {
  opacity: 0;
}
</style>
