import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/login'], resolve)
    },
    { path: '/yhy',redirect:'/userList', name: 'yhy', component: Home, hidden: false,
      children: [
        { path: '/userlist.jsp', name: 'userList', component: resolve => require(['@/views/yhy/userList'], resolve), meta: { role: 'B', title: '用户列表', icon: 'el-icon-setting'} },
        { path: '/log.html', name: 'log', component: resolve => require(['@/views/yhy/log'], resolve), meta: { role: 'C', title: '接口日志', icon: 'el-icon-setting'} },
        { path: '/roleList.jsp', name: 'roleList', component: resolve => require(['@/views/yhy/roleList'], resolve), meta: { title: '角色列表', icon: 'el-icon-setting'} },
        { path: '/hotellog.html', name: 'hotelLog', component: resolve => require(['@/views/yhy/hotelLog'], resolve), meta: { title: '后台进程日志', icon: 'el-icon-setting'} },
        { path: '/equipment.jsp', name: 'equipmentList', component: resolve => require(['@/views/yhy/equipment'], resolve), meta: { role: 'B', title: '设备列表', icon: 'el-icon-date' }},
        { path: '/equipmentOrigin', name: 'equipmentOrigin', component: resolve => require(['@/views/yhy/equipmentOrigin'], resolve), meta: { role: 'C', title: '设备溯源', icon: 'el-icon-star-on' }}
      ]
    },
    { path: '/kh',redirect:'/userServiceOrder', name: 'kh', component: Home, hidden: false,
      children: [
        { path: '/userServiceOrder', name: 'userServiceOrder', component: resolve => require(['@/views/kh/userServiceOrder'], resolve) },
        { path: '/orderEvaluation', name: 'orderEvaluation', component: resolve => require(['@/views/kh/orderEvaluation'], resolve) },
        { path: '/customerLog', name: 'customerLog', component: resolve => require(['@/views/kh/customerLog'], resolve) }
      ]
    },
    { path: '/web',redirect:'/article', name: 'web', component: Home, hidden: false,
      children: [
        { path: '/seo', name: 'system', component: resolve => require(['@/views/web/seo'], resolve) },
        { path: '/article', name: 'news', component: resolve => require(['@/views/web/article'], resolve) }
      ]
    }
  ]  
});