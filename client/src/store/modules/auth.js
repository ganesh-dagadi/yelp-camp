import router from "../../router"
import axios_instance from "../../config/axios_config"

const state = {
    user : {
    },
    isLoggedIn : false,
    access_token:'',
    refresh_token:''
}

const getters = {
    loggedInUser  : state => state.user,
    isLoggedIn    : state => state.isLoggedIn
}

const actions = {
     logInUser({commit} , user){
        axios_instance.post('/auth/login' , user)
        .then(res=>{
            if(res){
                commit('setLoggedInUser' , res)
                router.push(`/user/${res.data.user._id}`)
            }
        })
        .catch(err=>{
            router.push(`/login?err =${err.data.error.msg}`)
        }) 
    },
    logOutUser({commit}){
        axios_instance.get('/auth/logout')
        .then(res=>{
            if(res){
                localStorage.removeItem('auth_data')
                commit('clearState')
                router.push(`/?msg=${res.data.success.msg}`)
            }
        }).catch(err=>{
            router.push(`/error?err=${err.status}`)
        })
    },
}

const mutations = {
    setAccessToken : (state , token) => {
        state.access_token = token
    },
    setLoggedInUser : (state , response)=> {
        state.user = response.data.user
        state.isLoggedIn = true
        state.access_token = response.data.auth.accessToken
        state.refresh_token = response.data.auth.refreshToken
        localStorage.setItem('auth_data' , JSON.stringify(state));
    },
    clearState : (state)=>{
        state.user = {},
        state.isLoggedIn = false;
        state.access_token = '';
        state.refresh_token = '';
    },
    syncLocalStorage : (state) => {
       const authData = JSON.parse(localStorage.getItem('auth_data'));
       if(authData) {
        state.user = authData.user;
        state.isLoggedIn = authData.isLoggedIn;
        state.access_token = authData.access_token;
        state.refresh_token = authData.refresh_token;
       }
       
    },
    updateLocalStorage : (state)=>{
        localStorage.setItem('auth_data' , JSON.stringify(state))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}