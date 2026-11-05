<script setup>
import { reactive, ref } from 'vue'
import { Message } from 'element-ui'
import { useUserStore } from '../stores/user'
import router from '../router'
import BgCarousel from '../components/BgCarousel.vue'

const store = useUserStore()
const formRef = ref()
const form = reactive({ uname: '', pwd: '', cpwd: '' })

const rules = {
  uname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '用户名必须是6-12位字符', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码必须是6-12位字符', trigger: 'blur' },
  ],
  cpwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.pwd) callback(new Error('两次密码输入的不一致！'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
}

function handleRegister() {
  formRef.value.validate((valid) => {
    if (!valid) return
    const err = store.register(form.uname, form.pwd)
    if (err) {
      Message.error(err)
      return
    }
    Message.success('注册成功！')
    // 旧版此处跳转到不存在的页面，已修复为跳转登录页
    router.push('/login')
  })
}
</script>

<template>
  <BgCarousel>
    <div class="auth-box">
      <h2>注册</h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
        <el-form-item prop="uname">
          <el-input v-model="form.uname" placeholder="用户名" @keyup.enter="handleRegister" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model="form.pwd"
            type="password"
            placeholder="密码"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        <el-form-item prop="cpwd">
          <el-input
            v-model="form.cpwd"
            type="password"
            placeholder="确认密码"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        <el-button type="primary" class="submit-btn" @click="handleRegister">注册</el-button>
      </el-form>
      <p class="switch-tip">
        已有账号? <router-link to="/login" class="switch-link">去登入</router-link>
      </p>
    </div>
    <p class="copyright">
      &copy; <a href="https://www.arashiizayoi.xin" target="_blank" rel="noopener">2024 Arashi Izayoi . All rights reserved.</a>
    </p>
  </BgCarousel>
</template>

<style scoped>
.auth-box {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: #fff;
}

.auth-box h2 {
  margin: 0 0 30px;
  text-align: center;
  font-size: 24px;
}

/* 暗色背景下的输入框：透明底 + 白色下划线，还原旧版样式
   （Element UI 的输入框就是 .el-input__inner 本体，没有 EP 的 __wrapper 包裹层） */
.auth-box :deep(.el-input__inner) {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 0;
  color: #fff;
  height: 40px;
  line-height: 40px;
}

.auth-box :deep(.el-input__inner:focus) {
  border-bottom-color: #f08080;
}

.auth-box :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.55);
}

/* 密码可见性切换图标 */
.auth-box :deep(.el-input__suffix) {
  color: rgba(255, 255, 255, 0.8);
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
}

.switch-tip {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.switch-link {
  color: #f08080;
  text-decoration: none;
}

.switch-link:hover {
  text-decoration: underline;
}

/* 版权条固定在页面底部 */
.copyright {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  padding: 0;
}
</style>