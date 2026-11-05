import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 本机环境限制：esbuild 对 >1MB 的包走临时文件传输，Go 侧删除临时文件被
    // 文件系统过滤驱动拒绝（Access is denied），导致 vite:esbuild-transpile 必败。
    // 关闭 target 降级与 esbuild 压缩以完全跳过该路径；产物不压缩，运行时行为不变。
    target: 'esnext',
    minify: false,
  },
})
