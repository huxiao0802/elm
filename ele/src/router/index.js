import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/home"
import City from "@/components/city"
import Msite from "@/components/msite"

// 外卖 搜索 订单 我的
import Ahome from "@/components/ahome"
import Search from "@/components/search"

//商铺 
import Shop from "@/components/shop"
import Shopsp from "@/components/shopsp"
import Shoppj from "@/components/shoppj"

//商品分类详情页
import Food from "@/components/food"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path: '/msite',
      redirect:"/msite/ahome"
    },

    {
      path: '/home',
      name: 'home',
      component: Home
    },
    
    {
      path: '/food',//商品分类详情页
      name: 'food',
      component: Food
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      children:[
        {
          path: 'shopsp',
          name: 'shopsp',
          component: Shopsp
        },
        {
          path: 'shoppj',
          name: 'shoppj',
          component: Shoppj
        },
      ]
    },
    {
      path: '/city/:id',
      name: 'city',
      component: City
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite,
      children:[
        {
          path: 'ahome',
          name: 'ahome',
          component: Ahome
        },
        {
          path: 'search/:id',
          name: 'search',
          component: Search
        },
      ]
    }
  ]
})
