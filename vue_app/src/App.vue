<template>
  <first-page v-show="login" />
  <nav-bar />
</template>

<script>
import FirstPage from "./components/FirstPage.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    FirstPage,NavBar
  },
  data() {
    return {
      login: true,
    };
  },
};
</script>
  <!-- <router-link to="/">Home</router-link> | -->
  <!-- <router-view/> -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
