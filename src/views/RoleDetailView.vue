<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SpoilerText from '../components/SpoilerText.vue'
import { getCharacter } from '../data/characters'

const route = useRoute()
const character = computed(() => getCharacter(route.params.id))

// 文本段统一处理：字符串包装为单元素数组，{ spoiler } 段渲染为剧透遮罩
function segs(value) {
  return Array.isArray(value) ? value : [value]
}
</script>

<template>
  <div v-if="character">
    <div class="glass-card detail-card">
      <div class="back-row">
        <router-link to="/roles" class="back-link">&#8592; 返回角色列表</router-link>
      </div>
      <div class="detail-main">
        <div class="r-text">
          <h2>简介</h2>
          <p v-for="(para, i) in character.intro" :key="i" class="para">
            <template v-for="(seg, j) in segs(para)" :key="j">
              <SpoilerText v-if="typeof seg === 'object'">{{ seg.spoiler }}</SpoilerText>
              <template v-else>{{ seg }}</template>
            </template>
          </p>

          <h2>基本资料</h2>
          <div v-for="item in character.profile" :key="item.label" class="profile-row">
            <span class="field-label">{{ item.label }}：</span>
            <p class="inline-text">
              <template v-for="(seg, j) in segs(item.value)" :key="j">
                <SpoilerText v-if="typeof seg === 'object'">{{ seg.spoiler }}</SpoilerText>
                <template v-else>{{ seg }}</template>
              </template>
            </p>
          </div>

          <template v-if="character.titles && character.titles.length">
            <h2>称号</h2>
            <p v-for="t in character.titles" :key="t" class="indent-line">{{ t }}</p>
          </template>

          <h2>人际关系</h2>
          <div v-for="rel in character.relations" :key="rel.label" class="indent-line">
            <span>{{ rel.label }}：</span>
            <p class="inline-text">
              <template v-for="(item, k) in rel.items" :key="k">
                <router-link v-if="item.to" :to="`/roles/${item.to}`" class="role-link">{{ item.text }}</router-link>
                <template v-else>{{ item.text }}</template>
                <span v-if="item.note" class="note">（{{ item.note }}）</span>
                <span v-if="k < rel.items.length - 1">、</span>
              </template>
            </p>
          </div>

          <template v-if="character.abilities && character.abilities.length">
            <h2>能力</h2>
            <p v-for="a in character.abilities" :key="a" class="indent-line">{{ a }}</p>
          </template>
        </div>

        <div class="r-img">
          <img :src="character.image" :alt="character.name" />
          <h6 style="text-align: center">{{ character.imageCaption }}</h6>
        </div>
      </div>
    </div>

    <div class="glass-card" style="text-align: center; padding: 20px 50px">
      <h6>此页面最后编辑于2024年8月11日! | 版权所有侵权必究</h6>
    </div>
  </div>
</template>

<style scoped>
.detail-card h2 {
  color: lightcoral;
  margin: 18px 0 10px;
}

.back-row {
  margin-bottom: 6px;
}

.back-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  color: #fff;
}

.detail-main {
  display: flex;
  gap: 30px;
}

.r-text {
  flex: 2;
}

.r-img {
  flex: 1;
  text-align: center;
}

.r-img img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
}

.para {
  line-height: 1.9;
  margin-bottom: 10px;
}

.profile-row {
  margin: 12px 0;
  line-height: 1.9;
}

.inline-text {
  display: inline;
  line-height: 1.9;
}

.indent-line {
  text-indent: 2em;
  margin: 12px 0;
  line-height: 1.9;
}

.role-link {
  color: lightgreen;
  text-decoration: none;
}

.role-link:hover {
  text-decoration: underline;
}

.note {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

@media (max-width: 900px) {
  .detail-main {
    flex-direction: column;
  }
}
</style>
