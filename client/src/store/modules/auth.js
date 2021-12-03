import axios from "axios"
import router from "../../router"

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
        axios.post('/auth/login' , user)
        .then(res=>{
            if(res){
                commit('setLoggedInUser' , res)
                router.push(`/user/${res.data.user._id}`)
            }
        })
        .catch(err=>{
            console.log(err)
        }) 
    },
    logOutUser({commit}){
        axios.get('/auth/logout')
        .then(res=>{
            if(res){
                commit('clearState')
                router.push(`/?msg=${res.data.success.msg}`)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}

const mutations = {
    setAccessToken : (state , token) => state.access_token = token,
    setLoggedInUser : (state , response)=> {
        state.user = response.data.user
        state.isLoggedIn = true
        state.access_token = response.data.auth.accessToken
        state.refresh_token = response.data.auth.refreshToken
    },
    clearState : (state)=>{
        state.user = {},
        state.isLoggedIn = false;
        state.access_token = '';
        state.refresh_token = '';

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}