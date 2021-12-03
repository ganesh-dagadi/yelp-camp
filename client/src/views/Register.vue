<template>
    <div class="container">
        <h1>Register</h1>
        <form>
            <div>
                <label for="Username">Username</label>
                <input v-model = "username" type="text" required>
            </div>
           
            <div>
                <label for="password">Password</label>
                <input v-model = "password" type="password">
            </div>
            <button @click="submitForm">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data(){
        return{
            username : '',
            password : ''
        }
    },
    methods : {
        ...mapActions(['setError']),
         submitForm(event){
             event.preventDefault();
            const user  = {
                username : this.username,
                password: this.password
            }

         axios.post('/auth/register' , user)
         .then(res=>{
             if(res.status == 200){
                 this.$router.push('/login?msg=Please Login')
             }else{
                 this.setError("Something went wrong. try again")
             }
         })
         .catch(err=>{
                this.setError(err.data.error.msg)
            
         })

        }
    }
}
</script>

<style scoped>
    .container{
        text-align: center;
    }
</style>