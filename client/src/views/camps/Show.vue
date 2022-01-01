<template>
    <div class="container">
        <router-link :to="{name : 'Camps Update' , params : {id : camp._id} }"> Update </router-link>
        <button @click="deleteCamp(camp._id)"> Delete </button>
        <h1>{{camp.title}}</h1>
        <div class="image">
            <img :src="camp.image" alt="">
        </div>
        <div class="descp">
            {{camp.descp}}
        </div>
        <div class="text">
            {{camp.text}}
        </div>
        
    </div>
</template>


<script>
import axiosInstance from '../../config/axios_config'
import router from '../../router';
export default {
    name : 'Camps Show',
    data(){
        return {
            camp : {}
        }
    },
    methods : {
        async deleteCamp(id){
            const res = await axiosInstance.delete(`/camps/${id}`);
            if(res.status == 200){
                router.push('/')
            }
        }
    },
    beforeMount(){
        axiosInstance.get(`/camps/${this.$route.params.id}`)
        .then(res=>{
           this.camp = res.data.camp
        })
        .catch(err=>{
            this.$router.push(`/notfound?err=${err.data.status}`)
        })
    }
}
</script>