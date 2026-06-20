<template>
  <div class="p-6">
    <h2 class="text-xl mb-4">لوحة المعلم</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 bg-white rounded shadow">
        <h3 class="font-bold">قائمة الطلاب</h3>
        <p class="text-sm text-gray-500">عرض وإدارة بيانات الطلاب</p>
        <button @click="goStudents" class="mt-3 bg-blue-500 text-white px-3 py-1 rounded">عرض الطلاب</button>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <h3 class="font-bold">إدخال التسميع</h3>
        <p class="text-sm text-gray-500">اختر طالباً ثم صفحات أو سور لتسجيلها</p>
        <button @click="goEnter" class="mt-3 bg-blue-500 text-white px-3 py-1 rounded">أدخل تسميع</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherDashboard',
  methods: {
    goEnter() {
      this.$router.push('/teacher/enter-recitation')
    },
    goStudents() {
      // placeholder: would open students list
      alert('عرض الطلاب - قيد التطوير')
    }
  }
}
</script>
