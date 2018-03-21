import axios from 'axios'
import qs from 'qs'

export const API_LOGIN = '/jk/yhy-admin/'
export const API_ROOT = '/api/'
// export const API_ROOT = 'http://192.168.100.37:8080/'
export const API_TEST = 'http://localhost/yhy-admin/'

// 登录验证
export const doLogin = params => { return axios.post( API_ROOT + 'to/login3', qs.stringify( params )); };

// 获取用户列表
export const getUser = params => { return axios.get( API_ROOT + 'to/userlist', { params: params }); };

// 新增用户
export const addUser = params => { return axios.post( API_ROOT + 'to/add_user', qs.stringify( params )); };

// 编辑用户信息
export const updateUser = params => { return axios.post( API_ROOT + 'to/update_User', qs.stringify( params )); };

// 删除用户
export const delUser = params => { return axios.post( API_ROOT + 'to/delete', qs.stringify( params )); };

// 测试专用
export const loginByUserInfo = [
  {"id": 1, "username": "aaa", "pew": 123456, "role": "A" , "introduce":"我可以看见全部页面"},
  {"id": 2, "username": "bbb", "pew": 123456, "role": "B" , "introduce":"我可以看到B的页面"},
  {"id": 3, "username": "ccc", "pew": 123456, "role": "C" , "introduce":"我可以看见C的页面"}
]
