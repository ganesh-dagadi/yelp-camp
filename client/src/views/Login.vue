<template>
    <div class="container">
        <p>{{msg}}</p>
        <h1>Login</h1>
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
import { mapActions } from 'vuex'

export default {
    data(){
        return{
            username : '',
            password : '',
            msg : this.$route.query.msg
        }
    },
    methods : {
        ...mapActions(['setError' , 'logInUser']),
         submitForm(event){
            event.preventDefault();
            const user  = {
                username : this.username,
                password: this.password
            }
            this.logInUser(user)
        }
    }
}
</script>

<style scoped>
    .container{
        text-align: center;
    }
</style>