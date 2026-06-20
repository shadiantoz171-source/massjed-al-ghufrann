<template>
  <div class="p-6">
    <h2 class="text-xl mb-4">لوحة المدير</h2>
    <div class="grid grid-cols-3 gap-4">
      <div class="p-4 bg-white rounded shadow">
        <h3 class="font-bold">إدارة المعلمين</h3>
        <p class="text-sm text-gray-500">إنشاء وتعديل وحذف حسابات المعلمين</p>
        <button class="mt-3 bg-green-500 text-white px-3 py-1 rounded">اذهب</button>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <h3 class="font-bold">إدارة الطلاب</h3>
        <p class="text-sm text-gray-500">إضافة وتعديل بيانات الطلاب وتسميعاتهم</p>
        <button class="mt-3 bg-green-500 text-white px-3 py-1 rounded">اذهب</button>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <h3 class="font-bold">السنة الدراسية</h3>
        <p class="text-sm text-gray-500">تفعيل سنة جديدة وتحديد الألوان</p>
        <button class="mt-3 bg-green-500 text-white px-3 py-1 rounded">اذهب</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>
