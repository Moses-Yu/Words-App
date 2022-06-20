<template>
  <div>Quiz{{ userName }}</div>
</template>

<script>
import axios from "axios";
export default {

  name: "QuizPage",
  components: {},
  data() {
    return {
      userName: this.$route.params.userName,
    };
  },
  methods: {
    getWordList() {
      let list = [];
      axios
        .get("/server/userWords/" + this.userName)
        .then((res) => {
          list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      return list;
    },
  },
  computed: {},
};
</script>

<style scoped></style>
