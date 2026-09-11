<script setup>
defineProps({
  content: { type: String, required: true },
})
</script>

<template>
  <el-tooltip placement="top" effect="light" popper-class="term-popper">
    <template #content>
      <div class="term-content">{{ content }}</div>
    </template>
    <span class="term"><slot /></span>
  </el-tooltip>
</template>

<style scoped>
.term {
  color: palegreen;
  cursor: help;
  border-bottom: 1px dotted palegreen;
}
</style>

<style>
/* el-tooltip 挂载在 body 下，样式不能 scoped */
.term-popper {
  max-width: 460px;
  line-height: 1.7;
}

.term-popper .term-content {
  color: #333;
  font-size: 13px;
}
</style>
