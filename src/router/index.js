import Vue from "vue";
import VueRouter from "vue-router";
import Presentation from '../pages/intruduction.vue';
import DataFlow from '../pages/dataFlow.vue'
/* import Index from "@/views/index/IndexPage.vue";
import notfound from '@/views/index/notfound/404.vue' */

Vue.use(VueRouter);



const routes = [
  { path: '/', redirect: { name: 'presentation' }},
  {
    path:"/presentation",
    name:"presentation",
    component:Presentation
  },
  {
    path:"/dataflow",
    name:"dataflow",
    component:DataFlow
  },
/*   {
    path: "/",
    name: "Home",
    component: Home
  }, */
 // {
 //   path: "/",
  //  name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //  component: () =>
 //     import(/* webpackChunkName: "about" */ "../views/login/Login.vue")
 // },
/*   {
    path:'/404',
    name:'notfound',
    component:notfound
  } */





];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
