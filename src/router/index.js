import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/components/Home'
import user from '@/views/user'
import userList from '@/views/userList'
import log from '@/views/log'
import roleList from '@/views/roleList'
import hotellog from '@/views/hotellog'
import equipment from '@/views/equipment'
import equipmentOrigin from '@/views/equipmentOrigin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '/',redirect:'/userlist', name: 'index', component: Home, hidden: false,
      children: [
        { path: '/userlist', name: 'userlist', component: userList, meta: { role: 'B', title: '用户列表', icon: 'el-icon-setting'} },
        { path: '/log', name: 'log', component: log, meta: { role: 'C', title: '接口日志', icon: 'el-icon-setting'} },
        { path: '/roleList', name: 'roleList', component: roleList, meta: { title: '角色列表', icon: 'el-icon-setting'} },
        { path: '/hotellog', name: 'hotellog', component: hotellog, meta: { title: '后台进程日志', icon: 'el-icon-setting'} },
        { path: '/equipmentList', name: 'equipmentList', component: equipment, meta: { role: 'B', title: '设备列表', icon: 'el-icon-date' }},
        { path: '/equipmentOrigin', name: 'equipmentOrigin', component: equipmentOrigin, meta: { role: 'C', title: '设备溯源', icon: 'el-icon-star-on' }}
      ]
    }
  ]  
});