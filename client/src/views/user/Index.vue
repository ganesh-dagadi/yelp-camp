<template>
  <div class="home">
    <p>{{msg}}</p>
    <h1> User dashboard </h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'UserIndex',
  data(){
    return {
      msg : this.$route.query.msg
    }
  }
}
</script>
