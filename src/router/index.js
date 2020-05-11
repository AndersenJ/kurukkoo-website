import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/Page.vue'
import Archive from '../views/Archive.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Page',
    component: Page
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
