import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios_instance from './config/axios_config.js'

axios_instance

createApp(App).use(store).use(router).mount('#app')
