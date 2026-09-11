<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import BgCarousel from '../components/BgCarousel.vue'

const router = useRouter()
const store = useUserStore()
const formRef = ref()
const form = reactive({ uname: '', pwd: '' })

const rules = {
  uname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

function handleLogin() {
  formRef.value.validate((valid) => {
    if (!valid) return
    const err = store.login(form.uname, form.pwd)
    if (err) {
      ElMessage.error(err)
      return
    }
    ElMessage.success('登入成功！')
    router.push('/home')
  })
}
</script>

<template>
  <BgCarousel>
    <div class="auth-box">
      <h2>登入</h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
        <el-form-item prop="uname">
          <el-input v-model="form.uname" placeholder="用户名" size="large" @keyup.enter="handleLogin" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model="form.pwd"
            type="password"
            placeholder="密码"
            size="large"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-button type="primary" class="submit-btn" @click="handleLogin">登入</el-button>
      </el-form>
      <p class="switch-tip">
        还没注册? <router-link to="/register" class="switch-link">前往注册</router-link>
      </p>
      <p class="hint">默认账号：Admin1 / 123456</p>
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

/* 暗色背景下的输入框：透明底 + 白色下划线，还原旧版样式 */
.auth-box :deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
}

.auth-box :deep(.el-input__wrapper.is-focus) {
  border-bottom-color: var(--el-color-primary);
}

.auth-box :deep(.el-input__inner) {
  color: #fff;
}

.auth-box :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.55);
}

.auth-box :deep(.el-input__password) {
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
  color: var(--el-color-primary);
  text-decoration: none;
}

.switch-link:hover {
  text-decoration: underline;
}

.hint {
  margin-top: 12px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
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
