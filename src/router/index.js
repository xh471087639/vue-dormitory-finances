import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import regist from '../views/regist'
import financialManagement from '../views/financialManagement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {index: 1},
    component: login
  },
  {
    path: '/regist',
    name: 'regist',
    meta: {index: 2},
    component: regist
  },
  {
    path: '/financialManagement',
    name: 'financialManagement',
    meta: {index: 2},
    component: financialManagement
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
