<template>
  <span class="spoiler">
    <span class="spoiler-text"><slot /></span>
    <span class="spoiler-overlay" />
  </span>
</template>

<style scoped>
/* 剧透遮罩：毛玻璃彩蛋。注意不能对遮罩用 backdrop-filter——
   祖先 .glass-card 自带 backdrop-filter 已构成 Backdrop Root，
   其内子元素（文字）不进 backdrop 采样，blur 会失效。
   故改为直接模糊文字本体（filter: blur），悬停时解模糊+胶囊淡出。
   行盒收紧到 1.45 使遮罩刚好裹住字面，而非继承段落的 1.9 整行 */
.spoiler {
  position: relative;
  display: inline-block;
  line-height: 1.45;
  vertical-align: baseline;
  margin: 0 1px;
  cursor: help;
}

.spoiler-text {
  position: relative;
  display: inline-block;
  color: #fff;
  z-index: 1;
  filter: blur(7px);
  transition: filter 0.25s ease;
}

.spoiler:hover .spoiler-text {
  filter: blur(0);
}

.spoiler-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  z-index: 2;
  transition: opacity 0.25s ease;
}

.spoiler:hover .spoiler-overlay {
  opacity: 0;
}
</style>
