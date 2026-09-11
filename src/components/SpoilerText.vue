<template>
  <span class="spoiler">
    <span class="spoiler-text"><slot /></span>
    <span class="spoiler-overlay" />
  </span>
</template>

<style scoped>
/* 剧透遮罩：白色色块盖住文字，悬停时淡出（旧版角色页彩蛋） */
.spoiler {
  position: relative;
  display: inline-block;
}

.spoiler-text {
  position: relative;
  display: inline-block;
  color: #fff;
  z-index: 1;
  transition: opacity 0.3s;
}

.spoiler-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  z-index: 2;
  transition: opacity 0.3s;
}

.spoiler:hover .spoiler-overlay {
  opacity: 0;
}
</style>
