<script setup>
import FloorNav from '../components/FloorNav.vue'
import TermTooltip from '../components/TermTooltip.vue'
import { locations } from '../data/locations'
import { novels, collections, comics } from '../data/novels'
import { games } from '../data/games'

const floors = [
  { id: 'floor-top', label: '回到顶部' },
  { id: 'floor-locations', label: '地方设定' },
  { id: 'floor-novels', label: '小说&漫画' },
  { id: 'floor-games', label: '官方游戏' },
]

const termZun =
  '上海爱丽丝幻乐团（英文：Team Shanghai Alice，日文：上海アリス幻楽団）是日本著名同人游戏社团，主要从事弹幕射击游戏的开发制作，为ZUN一人所有，他以其作品《东方Project》闻名。尽管有着“上海爱丽丝幻乐团”的名称，该团体的总部却并非设在中国上海。这个名字是为了呼应整个东方系列游戏的主题而取的。ZUN认为，“上海”是一个东西方文明交汇融合的城市，“爱丽丝”的名字也暗含童话的意味。也就是说，“上海爱丽丝”这个名字融合了东西方的幻想色彩。“幻乐团”的名字是因为ZUN最初想发展音乐同人团体而取的。另外，东方Project系列作品中的一位角色的名字也叫做“爱丽丝”（爱丽丝·玛格特罗依德），她的人偶之一也叫做“上海”（上海人形）'

const termRecreation =
  '二次创作（英语：re-creation）是指使用了已存在着作物的文字、图像、影片、音乐或其他艺术作品创作的行为。而这些作品则称为“二次创作物 (Derivative work)”。是与“独创”相对的概念。'

const termNiconico =
  'niconico动画（日语：ニコニコ動画）是一个由多玩国公司运营，以亚文化视频为主要内容的弹幕式视频分享网站，也是日本第一个弹幕视频网站。中国的AcFun、Bilibili等视频分享网站都是以该网站为原型创立的。'

const termEra =
  '旧作指的是编号为TH01-TH05的作品，由ZUN在1996年至1998年以PC-98为平台发表，在国内也被称为黑历史。这五部作品的设定、人物、世界观、游戏系统都与新作有较大的不同。当时ZUN的社团名为ZUNSOFT，运行平台为PC-98（一种日本产销的计算机架构）。其中第一作《东方灵异传》是一个打砖块游戏，之后四作均为弹幕射击（STG），游戏系统也趋于完善，奠定了新作的基础。新作指的则是TH06之后的作品，也就是2002年《东方红魔乡》之后的作品（含红魔乡）被称为新作。新作的世界观、人物、基础游戏系统都有了重新设定。社团名称也变为上海爱丽丝幻乐团，运行平台转移到了Windows上。根据编号、系统、制作方新作等一般分为正传和外传两部分。整数编号的为正传。正传除东方花映冢为双人STG之外，均为单人STG射击游戏，正传的全部游戏均为ZUN一人制作。2004年，ZUN与黄昏边境合作推出了弹幕格斗游戏《东方萃梦想》，此后，东方的弹幕格斗游戏系列一直由ZUN与黄昏合作制作，而这一系列作品则被称为外传，编号后带有小数点。'
</script>

<template>
  <div>
    <!-- 简介 -->
    <div class="glass-card intro-card">
      <div class="i-text">
        <h1>欢迎来到人与妖怪的世界！</h1>
        <p class="para">
          东方Project（日语：東方プロジェクト・とうほうぷろじぇくと，英语：Touhou Project，Project Shrine
          Maiden），简称东方，或称东方系列，是日本的同人社团“<TermTooltip :content="termZun">上海爱丽丝幻乐团（ZUN）</TermTooltip>”所制作的一系列以弹幕射击游戏为主的游戏，并衍生有漫画、小说等作品。
          其自成一派的世界观，个性鲜明的各种角色，精心排列设置的几何状弹幕，为每位角色、每个场合设计的风格多变的音乐，在爱好者之间有着非常高的人气。
          又因为制作方对<TermTooltip :content="termRecreation">二次创作</TermTooltip>限制条件较少、管理较为宽松的缘故，不少爱好者为其制作了大量的二次创作作品，例如音乐、漫画、小说、动画、插图、游戏、MAD等，形成了种类繁多的二次创作潮流。在<TermTooltip :content="termNiconico">niconico</TermTooltip>上与偶像大师、VOCALOID并称为“御三家”。
          截至目前，东方Project在niconico上的相关创作视频总播放量已经达到45亿以上，在nico仅次于VOCALOID系列，而东方Project相关作品在Youtube等国际视频网站上也广受热议，一度引发热潮。
          2010年10月，东方Project获得了吉尼斯世界纪录认证为“最多作品的同人射击游戏”。
        </p>
      </div>
      <div class="i-img">
        <img src="/images/reimu.jpg" alt="图片" />
        <h6 style="text-align: center">图为博丽灵梦</h6>
      </div>
    </div>

    <!-- 地方设定 -->
    <div class="glass-card" id="floor-locations">
      <h2>地方设定</h2>
      <h6 class="era-note">
        该系列分为<TermTooltip :content="termEra">新作跟旧作</TermTooltip>，在本站若没有特别说明一般指的是新作
      </h6>
      <template v-for="loc in locations" :key="loc.name">
        <h4 class="t2">{{ loc.name }}</h4>
        <p class="para">{{ loc.desc }}</p>
      </template>
    </div>

    <!-- 小说&漫画&合辑本 -->
    <div class="glass-card" id="floor-novels">
      <h2>小说&漫画</h2>
      <h6>排序不分先后</h6>
      <div class="nov-comp">
        <h4 class="t2 center">小说</h4>
        <div class="card-row">
          <div v-for="n in novels" :key="n.title" class="book-card">
            <img :src="n.image" :alt="n.title" />
            <h5>《{{ n.title }}》</h5>
          </div>
        </div>
        <h4 class="t2 center">合辑本</h4>
        <div class="card-row">
          <div v-for="c in collections" :key="c.title" class="book-card">
            <img :src="c.image" :alt="c.title" />
            <h5>《{{ c.title }}》</h5>
          </div>
        </div>
        <h4 class="t2 center">漫画</h4>
        <div class="card-grid">
          <div v-for="c in comics" :key="c.title" class="book-card">
            <img :src="c.image" :alt="c.title" />
            <h5>《{{ c.title }}》</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- 官方游戏 -->
    <div class="glass-card" id="floor-games">
      <h2>官方游戏</h2>
      <h6>排序不分先后</h6>
      <div class="card-grid">
        <div v-for="g in games" :key="g.title" class="book-card">
          <img :src="g.image" :alt="g.title" />
          <h5>《{{ g.title }}》</h5>
        </div>
      </div>
    </div>

    <div class="glass-card" style="text-align: center; padding: 20px 50px">
      <h6>此页面最后编辑于2024年8月11日! | 版权所有侵权必究</h6>
    </div>

    <FloorNav :floors="floors" />
  </div>
</template>

<style scoped>
.intro-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.i-text {
  flex: 2;
}

.i-img {
  flex: 1;
  text-align: right;
}

.i-img img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
}

.para {
  margin-top: 12px;
  line-height: 1.9;
}

.era-note {
  margin-top: 12px;
}

.t2 {
  color: lightcoral;
  margin: 18px 0 6px;
}

.t2::before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background: url('/images/icons/star.ico') no-repeat center / cover;
}

.t2.center {
  text-align: center;
}

.nov-comp {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
}

.card-row {
  display: flex;
  justify-content: center;
  gap: 80px;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.book-card {
  text-align: center;
  flex: 1 0 15%;
  min-width: 130px;
}

.card-row .book-card {
  flex: 0 0 auto;
}

.book-card img {
  width: 110px;
  height: auto;
  border-radius: 4px;
  transition: transform 0.3s;
}

.book-card img:hover {
  transform: scale(1.08);
}

.book-card h5 {
  margin-top: 6px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .intro-card {
    flex-direction: column;
  }
}
</style>
