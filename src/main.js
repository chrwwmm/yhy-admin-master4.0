import Vue from 'vue'
import App from './App'
import router from './router'
import { powerRouter } from './router';
import store from './store';
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if(store.getters.role){ //判断role 是否存在
      next()
    }else{
       	if (['/login'].indexOf(to.path) !== -1) { 
           next()
        } else {
           next('/login')
        }
	}
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
