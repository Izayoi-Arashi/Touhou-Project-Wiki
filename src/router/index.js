import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import { getCharacter } from '../data/characters'

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
        beforeEnter: (to) => {
          if (!getCharacter(to.params.id)) return { name: 'roles' }
        },
      },
      { path: 'works', name: 'works', component: () => import('../views/WorksView.vue') },
      { path: 'alter', name: 'alter', component: () => import('../views/AlterPasswordView.vue') },
      { path: 'about', name: 'about', component: () => import('../views/AboutView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    // 简介页电梯导航使用 hash 锚点
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// 登录守卫：替代旧版散落在各页面的 state === true 检查
router.beforeEach((to) => {
  const store = useUserStore()
  const isAuthPage = to.name === 'login' || to.name === 'register'
  if (!isAuthPage && !store.currentUser) {
    return { name: 'login' }
  }
  if (isAuthPage && store.currentUser) {
    return { name: 'home' }
  }
})

export default router
