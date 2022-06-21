<template>
  <div class="box">
    <div class="title">Quiz</div>
    <div class="subtitle">{{ userName }}</div>
    <div v-if="!selectBook" class="selectBook">
      <button type="button" @click="selectToeic">TOEIC</button>
      <button type="button" @click="selectMyWords">My Words</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizPage",
  components: {},
  data() {
    return {
      selectBook: "",
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
    selectToeic() {
      if (this.userName) {
        this.selectBook = "Toeic";
        this.$router.push({
          name: "quizBook",
          params: {
            userName: this.userName,
            selectBook: this.selectBook,
          },
        });
      } else {
        alert("로그인이 필요합니다.");
        this.$router.push("/login");
      }
    },
    selectMyWords() {
      if (this.userName) { 
        this.selectBook = "MyWords";
        this.$router.push({
          name: "quizBook",
          params: {
            selectBook: this.selectBook,
            userName: this.userName,
          },
        });
      } else {
        alert("로그인이 필요합니다.");
        this.$router.push("/login");
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.box {
}
.title {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: bold;
}
.subtitle {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
}
.selectBook {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.selectBook > button {
  display: block;
  background-color: #c8c8c8;
  width: 120px;
  border-radius: 50px 50px 50px 50px;
  border: 0;
  margin-bottom: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
}

.selectBook > button:hover {
  background-color: #7a7a7a;
  cursor: pointer;
}
</style>
