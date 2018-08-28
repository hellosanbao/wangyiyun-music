import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import(/* webpackChunkName: "group-Home" */'@/view/Home') 
const GdList = ()=> import(/* webpackChunkName: "group-GdList" */'@/view/gdList') 
const GdDetail = ()=> import(/* webpackChunkName: "group-GdList" */'@/view/gdDetail') 

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {path: '/',name: 'Home',component: Home},
    {path: '/GdList',name: 'GdList',component: GdList},
    {path: '/GdDetail/:id',name: 'GdDetail',component: GdDetail},
  ]
})
