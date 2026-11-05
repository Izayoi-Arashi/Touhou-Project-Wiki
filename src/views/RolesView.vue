<script setup>
import { computed, ref } from 'vue'
import ImageCarousel from '../components/ImageCarousel.vue'
import { characters, carouselOrder } from '../data/characters'

const items = carouselOrder.map((id) => {
  const c = characters.find((ch) => ch.id === id)
  return { image: c.image, caption: c.name, to: `/roles/${c.id}` }
})

// 当前幻灯片索引：缩略图导航、轮播、角色名片三方共享
const current = ref(0)

const activeChar = computed(() => characters.find((ch) => ch.id === carouselOrder[current.value]))

// 名片只取首段纯文本简介（跳过含剧透遮罩的段落，保证卡片无遮罩嵌套）
const activeIntro = computed(() => {
  const first = activeChar.value?.intro?.find((s) => typeof s === 'string')
  return first || ''
})
</script>

<template>
  <div>
    <div class="glass-card">
      <h1>人物介绍</h1>
      <h6 class="note">
        由于该系列角色较多（全系列有123个角色），本栏目只列举几个人气较高的角色,您可以通过点击下方的图片查看对应角色的详情
      </h6>
      <div class="carousel-row">
        <div class="thumb-col">
          <img
            v-for="(item, i) in items"
            :key="item.to"
            class="thumb"
            :class="{ active: i === current }"
            :src="item.image"
            :alt="item.caption"
            @click="current = i"
          />
        </div>
        <ImageCarousel :items="items" :current="current" @update:current="current = $event" />
        <transition name="info-fade" mode="out-in">
          <div class="char-info" :key="current">
            <h3>{{ items[current].caption }}</h3>
            <p class="info-text">{{ activeIntro }}</p>
            <router-link class="info-link" :to="items[current].to">查看详情 →</router-link>
          </div>
        </transition>
      </div>
    </div>
    <div class="glass-card" style="text-align: center; padding: 20px 50px">
      <h6>此页面最后编辑于2024年8月11日! | 版权所有侵权必究</h6>
    </div>
  </div>
</template>

<style scoped>
.note {
  margin-top: 10px;
  line-height: 1.7;
}

/* 轮播 + 左缩略图导航 + 右角色名片：填充画框两侧留白 */
.carousel-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  margin-top: 18px;
}

.thumb-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumb {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.25);
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.thumb:hover {
  transform: scale(1.06);
}

.thumb.active {
  border-color: #f08080;
  box-shadow: 0 0 8px rgba(240, 128, 128, 0.7);
}

.char-info {
  width: 280px;
  padding: 22px 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
}

.char-info h3 {
  margin: 0 0 10px;
  color: lightcoral;
  font-size: 20px;
  letter-spacing: 1px;
}

.info-text {
  line-height: 1.8;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.88);
  min-height: 120px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.info-link {
  display: inline-block;
  margin-top: 12px;
  color: #f08080;
  text-decoration: none;
  font-size: 13px;
}

.info-link:hover {
  text-decoration: underline;
}

.info-fade-enter-active,
.info-fade-leave-active {
  transition: opacity 0.2s ease;
}

.info-fade-enter,
.info-fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .carousel-row {
    flex-direction: column;
  }

  .thumb-col {
    flex-direction: row;
  }
}
</style>
