import Vue from 'vue'
import Router from 'vue-router'

import DeviceShow from '@/components/deviceshow'
import ProductShow from '@/components/productshow'
import DeviceDetail from '@/components/devicedetail'
import Login from'@/components/Login'
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
	  {	path:'/login',component:Login }

]
}
)
