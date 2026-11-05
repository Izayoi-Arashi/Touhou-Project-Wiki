<script setup>
import { reactive, ref } from 'vue'
import { Message } from 'element-ui'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const formRef = ref()
const form = reactive({ currentPwd: '', newPwd: '', confirmPwd: '' })

const rules = {
  currentPwd: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 12, message: '新密码必须是6-12位字符', trigger: 'blur' },
  ],
  confirmPwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPwd) callback(new Error('两次密码输入的不一致！'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
}

function handleChange() {
  formRef.value.validate((valid) => {
    if (!valid) return
    const err = store.changePassword(form.currentPwd, form.newPwd)
    if (err) {
      Message.error(err)
      return
    }
    Message.success('修改成功！')
    formRef.value.resetFields()
  })
}
</script>

<template>
  <div class="glass-card alter-card">
    <h1 class="alter-title">修改密码</h1>
    <p class="userinfo">用户：{{ store.currentUser ? store.currentUser.uname : '未知' }}</p>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="alter-form"
      @submit.prevent="handleChange"
    >
      <el-form-item label="当前密码" prop="currentPwd">
        <el-input v-model="form.currentPwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="form.newPwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPwd">
        <el-input v-model="form.confirmPwd" type="password" show-password @keyup.enter="handleChange" />
      </el-form-item>
      <el-button type="primary" class="submit-btn" @click="handleChange">确认修改</el-button>
    </el-form>
  </div>
</template>

<style scoped>
.alter-card {
  max-width: 560px;
  min-height: calc(100vh - 240px);
  display: flex;
  flex-direction: column;
}

.alter-title {
  text-align: center;
  margin-bottom: 8px;
}

.userinfo {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 24px;
}

.alter-form {
  padding: 0 30px;
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
}

/* 暗色玻璃卡上的表单可用性：标签白色，输入框与登录页同款（透明底 + 白下划线） */
.alter-card :deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 0.9);
}

.alter-card :deep(.el-input__inner) {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 0;
  color: #fff;
  height: 40px;
  line-height: 40px;
}

.alter-card :deep(.el-input__inner:focus) {
  border-bottom-color: #f08080;
}

.alter-card :deep(.el-input__suffix) {
  color: rgba(255, 255, 255, 0.8);
}
</style>