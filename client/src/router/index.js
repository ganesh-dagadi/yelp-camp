import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CampsIndex from '../views/camps/Index.vue'
import CampsShow from '../views/camps/Show.vue'
import CampsUpdate from '../views/camps/Update.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserIndex from '../views/user/index.vue'

import store from '../store'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/camps',
    name: 'Camps Index',
    component: CampsIndex
  },
  {
    path: '/camps/:id',
    name: 'Camps Show',
    component: CampsShow
  },
  {
    path: '/camps/edit/:id',
    name: 'Camps Update',
    component: CampsUpdate
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path : '/user/:id',
    name : 'User Index',
    component : UserIndex
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to , from , next)=>{
  store.commit('setError' , '')
  next()
})
export default router
