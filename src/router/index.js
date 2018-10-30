import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from '../components/home.vue'
import Homepage from '../components/homepage/index.vue'
import Sort from '../components/sort/index.vue'
import Cake from '../components/cake/index.vue'
import Ice from '../components/ice/index.vue'
import Bread from '../components/bread/index.vue'
import Temperature from '../components/temperature/index.vue'
import Details from '../components/details/index.vue'
import Buycar from '../components/buycar/index.vue'
import Mine from '../components/login/mine.vue'
import Userlogin from '../components/login/login.vue'
import Reg from '../components/login/reg.vue'

Vue.use(VueRouter)

const routes = [{
    path:'/',
    component:Home,
    children:[{
        path:'/',
        name: 'homepage',
        component:Homepage
    },{
        path:'/sort',
        name: 'sort',
        component:Sort,
        children: [{
            path:'/',
            name: 'cake',
            component:Cake
        },{
            path:'/ice',
            name: 'ice',
            component:Ice
        },
        {
            path:'/bread',
            name: 'bread',
            component:Bread
        },
        {
            path:'/temperature',
            name: 'temperature',
            component:Temperature
        }]
    },{
        path:'/buycar',
        name: 'buycar',
        component:Buycar,
        
    },{
        path:'/mine',
        name: 'mine',
        component:Mine,
        
    }]
},{
    path:'/details',
    name: 'details',
    component:Details
},{
    path:'/userlogin',
    name: 'userlogin',
    component:Userlogin
},{
    path:'/reg',
    name: 'reg',
    component:Reg
}];
// const router = new VueRouter({
//     routes:routes,
//     linkActiveClass:'active',
//     history:ture
// })


export default new VueRouter({routes})