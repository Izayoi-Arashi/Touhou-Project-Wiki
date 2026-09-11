<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
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
      ElMessage.error(err)
      return
    }
    ElMessage.success('修改成功！')
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
</style>
