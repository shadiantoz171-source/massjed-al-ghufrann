import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './views/Login.vue'
import AdminDashboard from './views/AdminDashboard.vue'
import TeacherDashboard from './views/TeacherDashboard.vue'
import StudentView from './views/StudentView.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: AdminDashboard },
  { path: '/teacher', component: TeacherDashboard },
  { path: '/student/:id', component: StudentView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
