import axios from 'axios'
import qs from 'qs'

export const API_LOGIN = '/jk/yhy-admin/'
export const API_ROOT = '/api/'
// export const API_ROOT = 'http://192.168.100.37:8080/'
export const API_WEB = '/api/admin/'
// http://119.23.46.215:8080/yhcloud/phone/sendSMS
export const API_TEST = '/test/yhcloud/phone/'

// 登录验证
export const doLogin = params => { return axios.post( API_ROOT + 'to/login3',  params ); };

// 获取用户列表
export const getUser = params => { return axios.get( API_ROOT + 'to/userlist', { params: params }); };

// 新增用户
export const addUser = params => { return axios.post( API_ROOT + 'to/add_user', qs.stringify( params )); };

// 编辑用户信息
export const updateUser = params => { return axios.post( API_ROOT + 'to/update_User', qs.stringify( params )); };

// 删除用户
export const delUser = params => { return axios.post( API_ROOT + 'to/delete', qs.stringify( params )); };

// 获取所有文章
export const allArticle = params => { return axios.get( API_WEB + 'selectAllArticle', params ); };

// 添加文章
export const addArticle = params => { return axios.post( API_WEB + 'addArticle', params ); };

// 修改文章
export const updateArticle = params => { return axios.post( API_WEB + 'updateArticle',  params ); };

// 删除文章
export const delArticle = params => { return axios.post( API_WEB + 'delArticle', params ); };

// test
export const doTest = params => { return axios.post( API_TEST + 'sendSMS',  params ); };

// http://192.168.100.37:8080/testfreemark/admin/selectAllSeo  
// http://192.168.100.37:8080/testfreemark/admin/updateSeo 
// http://192.168.100.37:8080/testfreemark/admin/addSeo   
// http://192.168.100.37:8080/testfreemark/admin/delSeo

// SEO
export const selectAllSeo = params => { return axios.post( API_WEB + 'selectAllSeo',  params ); };

export const updateSeo = params => { return axios.post( API_WEB + 'updateSeo',  params ); };




