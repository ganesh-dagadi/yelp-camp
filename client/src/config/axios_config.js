import axios from "axios"
import router from "../router";
import store from "../store";

function refreshToken(){
    return new Promise((resolve , reject)=>{
        axios({
            method : 'GET',
            url : 'http://localhost:5000/api/auth/newToken',
            headers:{
                refresh_token : store.state.auth.refresh_token
            }
        })
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}
const baseURL = 'http://localhost:5000/api'

const instance = axios.create({
    baseURL,
    headers : {
        access_token : store.state.auth.access_token,
        refresh_token : store.state.auth.refresh_token
    }
})

instance.interceptors.request.use(function (config){
    config.headers.access_token = store.state.auth.access_token;
    config.headers.refresh_token = store.state.auth.refresh_token;
    return config
} , function(error){
    throw new Error(error)
})

instance.interceptors.response.use(function(response){
    return response
} , async function(error){
    const status = error.response.status;
    const originalRequest  = error.config
    if(status == 500) return store.commit('setError' , error.response.error.msg)
    if(status == 404) return router.push('/notfound')
    if(status == 302) return router.push('/login?msg=Please Login')
    if(status == 403 && !(error.response.error.isrefTokenError)) return store.commit('setError' , error.response.error.msg)
    if(status == 400){
       store.commit('setError' , error.response.data.error.msg)
       return Promise.reject(error.response)
    } 
    if(error.response.status == 403 && error.response.error.isrefTokenError) return router.push('/login');

    if(status == 401){
        if(!store.state.auth.refresh_token) return router.push('/login')
        try{
            const res = await refreshToken();
            store.commit('setAccessToken' , res.data.auth.accessToken)
            store.commit('updateLocalStorage')
            return instance(originalRequest)
        }catch(err){
            return Promise.reject(err)
        } 
    }
    return Promise.reject(error)
})

export default instance;