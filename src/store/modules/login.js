import { loginByUserInfo }from '../../api/login'
import { doLogin } from '@/api/api'

const login = {
  state: {
  	username:sessionStorage.getItem('USERNAME'),
  	role:sessionStorage.getItem('ROLE'),
  	introduce:'',
  	newrouter:JSON.parse(sessionStorage.getItem('NEWROUER'))
  },
  mutations: {
  	SET_USERNAME:(state, username) => {
  		state.username = username;
  	},
  	SET_ROLE:(state, role) => {
  		state.role = role;
  	},
  	SET_INTRODUCE:(state, introduce) =>{
  		state.introduce = introduce;
  	},
  	SET_NEWROUER:(state, newrouter) =>{
  		state.newrouter = newrouter;
  	},
  },
  actions: {
  	// Logins({ commit }, info){
  	// 	return new Promise((resolve, reject) => {
	// 		doLogin(info).then((res) => {
	// 			console.log(res);
	// 			commit('SET_NEWROUER',res); //存储最新路由
	// 			return data=res;
	// 		});
  	// 	    resolve(data);
    //     }).catch(error => {
    //         reject(error);
    //     });
	// },
	Logins({ commit }, info) {
		return new Promise((resolve, reject) => {
			doLogin(info).then(response => {
				console.log(response)
				const data = response.data
				commit('SET_ROLE','role'); //存储role
				sessionStorage.setItem('ROLE', 'role'); //存入 session 
				commit('SET_NEWROUER',data); //存储最新路由
				sessionStorage.setItem('NEWROUER',JSON.stringify(data)); //存入 session
				console.log(sessionStorage)
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
  	Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_USERNAME','');
          commit('SET_ROLE','');
          commit('SET_NEWROUER',[]);
          // location.reload();
          sessionStorage.removeItem('USERNAME');
          sessionStorage.removeItem('ROLE');
          resolve();
        }).catch(error => {
          reject(error);
        });
    }
  }
}
export default login;