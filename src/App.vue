<template>
  <div id="app">
    <b-nav pills  align="left" class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Link4Vets</a>
      <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
      <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
  </b-nav>
    <router-view/>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('executeSearch');
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
