<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-6 rounded shadow">
      <h1 class="text-2xl mb-4 text-center">تسجيل الدخول</h1>
      <div>
        <label class="block mb-1">اسم المستخدم</label>
        <input v-model="username" class="w-full p-2 border rounded mb-3" />
        <label class="block mb-1">كلمة المرور</label>
        <input v-model="password" type="password" class="w-full p-2 border rounded mb-3" />
        <label class="block mb-1">الدور</label>
        <select v-model="role" class="w-full p-2 border rounded mb-4">
          <option value="admin">المدير</option>
          <option value="teacher">المعلم</option>
        </select>
        <button @click="login" class="w-full bg-blue-600 text-white p-2 rounded">تسجيل دخول (محاكاة)</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      role: 'admin'
    }
  },
  methods: {
    login() {
      // For MVP: local redirect based on selected role
      if (this.role === 'admin') this.$router.push('/admin')
      else this.$router.push('/teacher')
    }
  }
}
</script>
