<template>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name : 'Home'}">Yelp-camp</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <router-link v-show="!isLoggedIn" class="nav-item nav-link" :to="{name : 'Login'}">Login</router-link >
        <router-link v-show="!isLoggedIn" class="nav-item nav-link" :to="{name : 'Register'}">Register</router-link>
        <router-link v-show="isLoggedIn" class="nav-item nav-link" :to="{}">Welcome {{loggedInUser.username}} </router-link>
        <button @click="logoutClick()" v-show="isLoggedIn" class="nav-item nav-link"> Logout </button>
      </div>
    </div>
  </nav>
    <p>{{this.$store.state.auth.refresh_token}}</p>
    <p>{{this.$store.state.auth.access_token}}</p>
    <p> {{this.$store.state.general.error}}</p>
    <p> {{this.$store.state.general.msg}}</p>

  <router-view/>
</template>

<script>
import {mapGetters , mapActions} from 'vuex'

export default {
  computed : mapGetters(['loggedInUser' , 'isLoggedIn']),
  methods:{
    ...mapActions(['logOutUser']),
    logoutClick(){
      this.logOutUser()
    }
  },
  beforeCreate(){
    this.$store.commit('syncLocalStorage')
  }
}
</script>

<style scoped>

</style>
