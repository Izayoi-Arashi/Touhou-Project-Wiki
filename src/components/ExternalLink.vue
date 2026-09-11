<script setup>
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  href: { type: String, required: true },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
})

// 旧版用 alert 提示外链安全，这里升级为确认弹窗
async function onClick(e) {
  e.preventDefault()
  try {
    await ElMessageBox.confirm('即将打开外部链接，请注意你的安全', '提示', {
      confirmButtonText: '继续访问',
      cancelButtonText: '取消',
      type: 'warning',
    })
    window.open(props.href, '_blank', 'noopener')
  } catch {
    /* 用户取消 */
  }
}
</script>

<template>
  <a :href="href" class="ext-link" @click="onClick">
    <img v-if="icon" :src="icon" class="link-icon" :alt="label" />
    <template v-else>{{ label }}</template>
  </a>
</template>

<style scoped>
.link-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
