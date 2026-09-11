<script setup>
import ImageCarousel from '../components/ImageCarousel.vue'
import { characters, carouselOrder } from '../data/characters'

const items = carouselOrder.map((id) => {
  const c = characters.find((ch) => ch.id === id)
  return { image: c.image, caption: c.name, to: `/roles/${c.id}` }
})
</script>

<template>
  <div>
    <div class="glass-card">
      <h1>人物介绍</h1>
      <h6 class="note">
        由于该系列角色较多（全系列有123个角色），本栏目只列举几个人气较高的角色,您可以通过点击下方的图片查看对应角色的详情
      </h6>
      <ImageCarousel :items="items" />
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
</style>
