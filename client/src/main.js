import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config=>{
    config.headers.access_token = store.state.auth.access_token;
    config.headers.refresh_token = store.state.auth.refresh_token;
    return config
})

axios.interceptors.response.use(response=>{
    if(response.status == 200){
        return Promise.resolve(response)
    }else{
        Promise.reject(response)
    }
} ,
error=>{
    const status = error.response.status;
    if(status == 500) return store.commit('setError' , error.response.error.msg)
    if(status == 404) return router.push('/notfound')
    if(status == 302) return router.push('/login?msg=Please Login')
    if(status == 403 && !(error.response.error.isrefTokenError)) return store.commit('setError' , error.response.error.msg)
    if(status == 400){
        return store.commit('setError' , error.response.data.error.msg)
    } 
    if(error.response.status == 403 && error.response.error.isrefTokenError) return router.push('/login');

    if(status == 401){
        if(!store.state.auth.refresh_token) return router.push('/login')
        axios.get('/auth/newtoken')
        .then(res=>{
            store.commit('setAccessToken' ,res.auth.accessToken )
        })
        .catch(err=>{
            console.log('error in interceptor')
            console.log(err)
        })
    }
})

createApp(App).use(store).use(router).mount('#app')
