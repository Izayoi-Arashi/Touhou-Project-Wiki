<script setup>
import ExternalLink from '../components/ExternalLink.vue'
import { works } from '../data/works'
</script>

<template>
  <div>
    <div class="glass-card" style="text-align: center; padding: 30px 50px">
      <h6>由于该系列的二创作品经过二十多年的发展，二创作品数量庞大，本栏目只展示，人气较高的作品</h6>
    </div>

    <div v-for="work in works" :key="work.title" class="glass-card">
      <h1>{{ work.type }}</h1>
      <div class="work-body">
        <div class="w-text">
          <h4>《{{ work.title }}》</h4>
          <p v-for="meta in work.meta" :key="meta.label" class="meta-line">
            <span>{{ meta.label }}：</span><span class="meta-value">{{ meta.value }}</span>
          </p>
          <p v-for="(para, i) in work.paragraphs" :key="i" class="para">{{ para }}</p>
          <div v-if="work.platforms.length" class="icon-row">
            <h5 style="display: inline-block; margin-right: 6px">支持平台:</h5>
            <img v-for="p in work.platforms" :key="p" class="icon-s" :src="p" alt="平台" />
          </div>
          <div v-if="work.links.length" class="icon-row">
            <ExternalLink
              v-for="link in work.links"
              :key="link.label"
              :href="link.href"
              :label="link.label"
              :icon="link.icon"
            />
          </div>
        </div>
        <div class="w-img">
          <img class="p-img" :src="work.image" :alt="work.imageCaption" />
          <h6 style="text-align: center">{{ work.imageCaption }}</h6>
        </div>
      </div>
    </div>

    <div class="glass-card" style="text-align: center; padding: 20px 50px">
      <h6>此页面最后编辑于2024年8月11日! | 版权所有侵权必究</h6>
    </div>
  </div>
</template>

<style scoped>
.work-body {
  display: flex;
  gap: 40px;
  margin-top: 16px;
  padding-left: 2em;
}

.w-text {
  flex: 2;
}

.w-img {
  flex: 1;
  text-align: right;
}

.p-img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
}

.meta-line {
  margin-top: 8px;
}

.meta-value {
  display: inline-block;
}

.para {
  margin-top: 10px;
  line-height: 1.8;
}

.icon-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-s {
  width: 20px;
  height: 20px;
}

@media (max-width: 900px) {
  .work-body {
    flex-direction: column;
    padding-left: 0;
  }

  .w-img {
    text-align: center;
  }
}
</style>
