import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>import('views/home/home')
const Category = () =>import('views/category/category')
const Cart = () =>import('views/cart/cart')
const Profile = () =>import('views/profile/profile')
const Detail = () =>import('views/detail/Detail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail',
      component:Detail
    }
  ],
  mode:'history'
})


export default router
