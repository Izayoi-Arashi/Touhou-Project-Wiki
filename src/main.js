import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import ElementUI from 'element-ui'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { pinia } from './stores'
import router from './router'
import './styles/global.css'

Vue.use(PiniaVuePlugin)
Vue.use(ElementUI, { locale: zhCN })

// 主题：启动时从 localStorage 恢复（'light' 加浅色类，缺省暗色）
if (localStorage.getItem('wiki-theme') === 'light') {
  document.body.classList.add('light')
}

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount('#app')