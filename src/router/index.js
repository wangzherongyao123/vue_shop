import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import home from '../components/home.vue'
Vue.use(VueRouter)


const router = new VueRouter({
  routes: [

    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    { path: '/home', component: home }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
   
  if(!tokenStr) return next('/login')

 next()

})


export default router
