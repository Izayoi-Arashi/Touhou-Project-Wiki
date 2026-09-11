<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  // [{ id, label }]
  floors: { type: Array, required: true },
})

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 200
}

function jump(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="floor-nav" :class="{ scrolled }">
    <div v-for="f in floors" :key="f.id" class="floor" @click="jump(f.id)">{{ f.label }}</div>
  </div>
</template>

<style scoped>
.floor-nav {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  transition: background-color 0.4s;
  z-index: 10;
}

.floor-nav.scrolled {
  background-color: lightcoral;
}

.floor {
  margin: 5px 0;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.floor:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: palegreen;
  transform: scale(1.05);
}
</style>
