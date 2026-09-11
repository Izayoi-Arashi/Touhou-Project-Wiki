<script setup>
import ExternalLink from '../components/ExternalLink.vue'
</script>

<template>
  <div>
    <div class="glass-card" style="text-align: center">
      <h1>基于前端技术的东方Project同人wiki</h1>
      <h3 style="margin-top: 12px">
        <ExternalLink label="作者主页" href="https://www.arashiizayoi.xin" />
      </h3>
    </div>

    <div class="glass-card">
      <h1 style="text-align: center">本站的所使用的一些素材来源</h1>
      <div class="credit">
        <h4>简介页</h4>
        <p>顶部右侧图片：《春の天霊夢さん ～おまけ画像を添えて～》画师：亜羽瀬ひの</p>
        <p>其余图片来自网络</p>
        <h4>人物介绍页</h4>
        <h6>轮播图及角色详情页</h6>
        <p>《博丽灵梦》画师：Rivergod</p>
        <p>《魔理沙》画师：kikazun</p>
        <p>《⑨》画师：uki</p>
        <p>《神風》画师：亜羽瀬ひの</p>
        <p>《胡蝶夢の舞》画师：かけら</p>
        <p>《ひょっこり紫さん》画师：亜羽瀬ひの</p>
        <h4>二创作品页</h4>
        <p>素材均来源于网络</p>
      </div>
    </div>

    <div class="glass-card" style="text-align: center">
      <h1>
        <ExternalLink
          class="rule-link"
          label="东方同人规约"
          href="https://www.bilibili.com/read/cv6364137/?spm_id_from=333.999.0.0"
        />
      </h1>
    </div>

    <div class="glass-card" style="text-align: center; margin-top: 20px; padding: 20px 50px">
      <h6>此页面最后编辑于2024年8月11日! | 版权所有侵权必究</h6>
    </div>
  </div>
</template>

<style scoped>
.credit {
  margin-top: 16px;
}

.credit h4 {
  margin-top: 14px;
}

.credit p {
  margin-top: 6px;
  line-height: 1.7;
}

.rule-link {
  color: lightcoral;
}
</style>
