<script setup>
import { onMounted, onUnmounted } from 'vue'
import router from '../router'

const props = defineProps({
  // [{ image, caption, to }]
  items: { type: Array, required: true },
  // 受控当前索引：由父组件持有，缩略图导航/角色名片与轮播共享同一状态
  current: { type: Number, required: true },
})

const emit = defineEmits(['update:current'])

let timer = null

function goTo(i) {
  emit('update:current', (i + props.items.length) % props.items.length)
}

function prev() {
  goTo(props.current - 1)
}

function next() {
  goTo(props.current + 1)
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
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  /* 统一画框：固定 360x480，cover 满铺裁剪。
     原图比例 0.707~0.75 与画框 0.746 相差 ≤5%，
     仅裁两侧 ≤5% 窄边即可满铺，无任何留白 */
  width: min(360px, 100%);
  margin: 20px auto 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  background-color: #111;
}

.track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  height: 480px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* 角色图为竖版（0.69~0.75）：统一 360x480 画框 + contain 完整显示，不再裁剪 */
.slide-img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.65));
  color: #fff;
  text-align: center;
  padding: 26px 10px 10px;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  pointer-events: none;
}

.ctrl {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s, border-color 0.3s;
}

.ctrl:hover {
  background-color: rgba(240, 128, 128, 0.85);
  border-color: #f08080;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}


</style>