import Vue from 'vue'
import VueRouter from 'vue-router'
import { useUserStore } from '../stores/user'
import { pinia } from '../stores'
import { getCharacter } from '../data/characters'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
  {
    path: '/',
    component: () => import('../layouts/WikiLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', name: 'home', component: () => import('../views/HomeView.vue') },
      { path: 'introduction', name: 'introduction', component: () => import('../views/IntroductionView.vue') },
      { path: 'roles', name: 'roles', component: () => import('../views/RolesView.vue') },
      {
        path: 'roles/:id',
        name: 'role-detail',
        component: () => import('../views/RoleDetailView.vue'),
        // 旧版琪露诺详情页因链接指向错误而无法到达，这里统一校验 id
        beforeEnter: (to, from, next) => {
          if (!getCharacter(to.params.id)) next({ name: 'roles' })
          else next()
        },
      },
      { path: 'works', name: 'works', component: () => import('../views/WorksView.vue') },
      { path: 'alter', name: 'alter', component: () => import('../views/AlterPasswordView.vue') },
      { path: 'about', name: 'about', component: () => import('../views/AboutView.vue') },
    ],
  },
  { path: '*', redirect: '/home' },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to) {
    // 简介页电梯导航使用 hash 锚点
    if (to.hash) return { selector: to.hash, behavior: 'smooth' }
    return { x: 0, y: 0 }
  },
})

// 登录守卫：替代旧版散落在各页面的 state === true 检查
router.beforeEach((to, from, next) => {
  const store = useUserStore(pinia)
  const isAuthPage = to.name === 'login' || to.name === 'register'
  if (!isAuthPage && !store.currentUser) {
    next({ name: 'login' })
    return
  }
  if (isAuthPage && store.currentUser) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router