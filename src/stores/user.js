import { defineStore } from 'pinia'

const STORAGE_KEY = 'data'
const VISITED_KEY = 'visited'

// 与旧版保持一致的 localStorage 结构：[{ uname, pwd, state }]
function loadUsers() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch {
      /* 数据损坏时重新初始化 */
    }
  }
  // 首次访问：初始化默认账号
  const defaults = [
    { uname: 'Admin1', pwd: '123456', state: false },
    { uname: 'Admin2', pwd: '123456', state: false },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
  localStorage.setItem(VISITED_KEY, String(true))
  return defaults
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: loadUsers(),
  }),
  getters: {
    currentUser: (state) => state.users.find((u) => u.state === true) || null,
  },
  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    },
    /**
     * @returns {string} 错误信息，空字符串表示成功
     */
    login(uname, pwd) {
      const user = this.users.find((u) => u.uname === uname)
      if (!user) return '登入失败，用户不存在！'
      if (user.pwd !== pwd) return '密码错误！'
      user.state = true
      this.save()
      return ''
    },
    /**
     * @returns {string} 错误信息，空字符串表示成功
     */
    register(uname, pwd) {
      if (this.users.some((u) => u.uname === uname)) return '账号已存在！'
      this.users.push({ uname, pwd, state: false })
      this.save()
      return ''
    },
    // 旧版退出登录只改内存不写回 localStorage，此处修复为真正持久化
    logout() {
      const user = this.users.find((u) => u.state === true)
      if (user) {
        user.state = false
        this.save()
      }
    },
    /**
     * @returns {string} 错误信息，空字符串表示成功
     */
    changePassword(currentPwd, newPwd) {
      const user = this.currentUser
      if (!user) return '获取用户信息失败，请重新登入'
      if (user.pwd !== currentPwd) return '当前密码与旧密码不一致!'
      if (newPwd === user.pwd) return '新密码不能与旧密码一致！'
      user.pwd = newPwd
      this.save()
      return ''
    },
  },
})
