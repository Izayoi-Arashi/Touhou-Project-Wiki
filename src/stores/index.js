import { createPinia } from 'pinia'

// 独立导出 pinia 实例：router 守卫等组件外场景调用 store 时需显式传入
export const pinia = createPinia()