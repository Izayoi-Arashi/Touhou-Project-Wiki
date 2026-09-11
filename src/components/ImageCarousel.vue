<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  // [{ image, caption, to }]
  items: { type: Array, required: true },
})

const router = useRouter()
const current = ref(0)
let timer = null

function goTo(i) {
  current.value = (i + props.items.length) % props.items.length
}

function prev() {
  goTo(current.value - 1)
}

function next() {
  goTo(current.value + 1)
}

function open(item) {
  if (item.to) router.push(item.to)
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, 3000)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <div class="carousel" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="track" :style="{ transform: `translateX(-${current * 100}%)` }">
      <div v-for="(item, i) in items" :key="i" class="slide">
        <img :src="item.image" :alt="item.caption" class="slide-img" @click="open(item)" />
        <div class="caption">{{ item.caption }}</div>
      </div>
    </div>
    <button class="ctrl prev" aria-label="上一张" @click="prev">&#10094;</button>
    <button class="ctrl next" aria-label="下一张" @click="next">&#10095;</button>
    <div class="indicators">
      <span
        v-for="(item, i) in items"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  max-width: 800px;
  margin: 20px auto 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #fff;
}

/* 角色图为竖版（约 1280x1800）：按高度约束 + contain 完整显示，不再裁剪 */
.slide-img {
  display: block;
  max-height: 480px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
}

.ctrl {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  transition: background-color 0.3s;
}

.ctrl:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.indicators {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background: rgba(0, 0, 0, 0.1);
}

.dot {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #bbb;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot:hover {
  background-color: #888;
}

.dot.active {
  background-color: #f08080;
}
</style>
