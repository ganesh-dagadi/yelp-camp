<template>
  <div class="home">
    <p>{{msg}}</p>
    <div class="container">
       <h1> Home </h1>
       <div class="camps-wrapper">
         <div class="row">

           <div v-for="camp in camps" :key="camp._id" class="col-lg-4">
             <div class="card" style="width: 18rem;">
                <img class="card-img-top" :src="camp.image" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">{{camp.title}}</h5>
                  <p class="card-text">{{camp.descp}}</p>
                  <router-link href="#" class="btn btn-primary" :to="{name : 'Camps Show' , params : {id : camp._id}}">Read</router-link>
                </div>
              </div>
           </div>

         </div>
       </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axiosInstance from '../config/axios_config'
import router from '../router'
export default {
  name: 'Home',
  data(){
    return{
      camps : [],
      msg : this.$route.query.msg
    }
  },
  beforeMount(){
    axiosInstance.get('/camps/')
    .then(res=>{
      this.camps = res.data.camps
    })
    .catch(err=>{
      router.push(`/notfound?err=${err.data.status}`)
    })
  }
}
</script>
