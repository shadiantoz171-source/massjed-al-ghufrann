<template>
  <div class="p-6">
    <h2 class="text-xl mb-4">عرض طالب</h2>
    <div class="bg-white p-4 rounded shadow max-w-2xl">
      <h3 class="font-bold mb-2">بيانات الطالب</h3>
      <p>الاسم: مثال الطالب</p>
      <p>اسم الأب: مثال</p>
      <p>المرحلة التعليمية: ابتدائي</p>

      <h4 class="mt-4 font-bold">التسميعات</h4>
      <div class="mt-2">
        <p class="inline-block px-3 py-1 bg-yellow-200 rounded mr-2">السور المسجلة سابقًا (أصفر)</p>
        <p class="inline-block px-3 py-1 bg-green-200 rounded">السور الحالية (أخضر)</p>
      </div>

      <div class="mt-4">
        <p>قائمة التسميعات ستظهر هنا صفحة صفحة أو سور جزء عم حسب الإدخالات.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>
