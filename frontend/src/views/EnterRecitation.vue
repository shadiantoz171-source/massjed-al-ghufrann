<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-xl mb-4">إدخال التسميع</h2>

    <div class="bg-white p-4 rounded shadow">
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block mb-1">اختر الطالب</label>
          <select v-model="form.student_id" class="w-full p-2 border rounded">
            <option v-for="s in students" :key="s.id" :value="s.id">{{ s.display_name }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-1">اختر الجزء (Juz)</label>
          <select v-model.number="form.juz_number" @change="onJuzChange" class="w-full p-2 border rounded">
            <option v-for="n in 30" :key="n" :value="n">{{ 'الجزء ' + n }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-1">تاريخ التسميع</label>
          <input type="date" v-model="form.date_recorded" class="w-full p-2 border rounded" />
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-1">الملاحظات</label>
        <textarea v-model="form.notes" class="w-full p-2 border rounded"></textarea>
      </div>

      <div v-if="loading" class="text-center py-6">جارٍ التحميل...</div>

      <div v-else>
        <h3 class="font-bold mb-2">قائمة {{ form.juz_number === 30 ? 'السور (جزء عم)' : 'الصفحات' }}</h3>

        <div class="grid grid-cols-4 gap-2">
          <label v-for="item in items" :key="itemKey(item)" class="flex items-center p-2 border rounded">
            <input type="checkbox" v-model="selected" :value="itemValue(item)" class="ml-2" />
            <span v-if="form.juz_number === 30">{{ item.name_ar }}</span>
            <span v-else>صفحة {{ item.page_number }}</span>
          </label>
        </div>

        <div class="mt-4">
          <button @click="submit" class="bg-green-600 text-white px-4 py-2 rounded">حفظ التسميع</button>
        </div>
      </div>

      <div v-if="message" class="mt-4 p-3 bg-green-100 text-green-700 rounded">{{ message }}</div>
      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EnterRecitation',
  data() {
    return {
      students: [],
      items: [],
      selected: [],
      loading: false,
      message: '',
      error: '',
      form: {
        student_id: null,
        juz_number: 1,
        date_recorded: null,
        notes: ''
      }
    }
  },
  created() {
    this.fetchStudents()
    this.onJuzChange()
  },
  methods: {
    async fetchStudents() {
      try {
        const res = await axios.get('/api/students')
        this.students = res.data
        if (this.students.length) this.form.student_id = this.students[0].id
      } catch (e) {
        console.error(e)
      }
    },
    async onJuzChange() {
      this.loading = true
      this.items = []
      this.selected = []
      try {
        if (this.form.juz_number === 30) {
          const res = await axios.get('/api/surahs?juz=30')
          this.items = res.data
        } else {
          const res = await axios.get(`/api/juz-pages?juz=${this.form.juz_number}`)
          this.items = res.data
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    itemKey(item) {
      return item.id ? 's-' + item.id : 'p-' + item.page_number
    },
    itemValue(item) {
      // return an object for binding; Vue won't track complex objects in array v-model well, so return stringified
      if (this.form.juz_number === 30) return JSON.stringify({ surah_id: item.id })
      return JSON.stringify({ page_number: item.page_number })
    },
    async submit() {
      if (!this.form.student_id) {
        this.error = 'اختر طالبًا.'
        return
      }
      if (!this.selected.length) {
        this.error = 'اختر صفحة أو سورة واحدة على الأقل.'
        return
      }

      this.loading = true
      this.error = ''
      this.message = ''

      const items = this.selected.map(s => JSON.parse(s))
      try {
        const payload = {
          student_id: this.form.student_id,
          juz_number: this.form.juz_number,
          date_recorded: this.form.date_recorded,
          notes: this.form.notes,
          items: items
        }
        const res = await axios.post('/api/recitations', payload)
        this.message = 'تم حفظ ' + (res.data.created ? res.data.created.length : 0) + ' سجلاً.'
        // Reset selection after success
        this.selected = []
      } catch (e) {
        console.error(e)
        this.error = e.response && e.response.data && e.response.data.errors ? JSON.stringify(e.response.data.errors) : 'حدث خطأ'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
