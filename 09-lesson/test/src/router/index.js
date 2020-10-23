import Vue from 'vue'
import Router from 'vue-router'

import DeviceShow     from '@/components/deviceshow';
import ProductShow    from '@/components/productshow';
import DeviceDetail   from '@/components/devicedetail';
import Login          from '@/components/Login';
import CreateProduct  from '@/components/createproduct';
import DeviceManyShow from "@/components/devicemanyshow";
import CreateDevice   from "@/components/createdevice";
Vue.use(Router)

export default new Router(
  {
  // mode: 'history',
   routes :[
  { path: '/', component: ProductShow },
  { path: '/deviceshow', component: DeviceShow },
  { path: '/deviceshow/devicedetail/:id/:pkey', component: DeviceDetail },
  { path: '/deviceshow/detail/:id/:pkey',
    component: DeviceDetail,
    name:'detail' },
  {	path:'/login',component:Login },
  {	path:'/createproduct',component:CreateProduct },
  {	path:'/devices/many',
    component:DeviceManyShow,
    name: 'showdevices'},
  {path: '/device/create',component:CreateDevice },



]
}
)
