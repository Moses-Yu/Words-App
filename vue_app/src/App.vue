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

<style scoped></style>
