import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CampsIndex from '../views/camps/Index.vue'
import CampsCreate from '../views/camps/Create.vue'
import CampsShow from '../views/camps/Show.vue'
import CampsUpdate from '../views/camps/Update.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserIndex from '../views/user/Index.vue'
import NotFound from '../views/NotFound.vue'

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
    path : '/camps/new',
    name : 'Camps Create',
    component : CampsCreate
  },
  {
    path: '/camps/:id',
    name: 'Camps Show',
    component: CampsShow
  },
  {
    path: '/camps/edit/:id',
    name: 'Camps Update',
    component: CampsUpdate,
    beforeEnter : (to , from , next)=>{
      if(to.name !== 'Login' && !store.state.auth.isLoggedIn ) next({name : 'Login'})
      else next()
    }
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
    component : UserIndex,
    beforeEnter : (to , from , next)=>{
      if(to.name !== 'Login' && !store.state.auth.isLoggedIn ) next({name : 'Login'})
      else next()
    }
  },
  {
    path : '/notfound',
    name : 'Not Found',
    component : NotFound
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
