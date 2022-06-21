<template>
  <div class="box">
    <div class="title">Select Quiz</div>
    <div class="selectBook">
      <div>
        <button @click="toWordQuiz">Word</button>
        <div class="description">뜻 보고 단어 선택하기</div>
      </div>
      <div>
        <button disabled>Word</button>
        <div class="description">빈칸의 단어 선택하기</div>
      </div>
      <div>
        <button disabled>Spelling</button>
        <div class="description">뜻 보고 단어 입력하기</div>
      </div>
      <div>
        <button disabled>Spelling</button>
        <div class="description">빈칸의 단어 입력하기</div>
      </div>
      <div>
        <button disabled>Listening</button>
        <div class="description">듣고 따라 쓰기</div>
      </div>
      <div>
        <button disabled>Speaking</button>
        <div class="description">읽고 말하기</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuizBook",
  data() {
    return {
      selectBook: this.$route.params.selectBook,
      userName: this.$route.params.userName,
    };
  },
  methods: {
    toWordQuiz() {
      this.$router.push({
        name: "wordQuiz",
        params: {
          userName: this.userName,
          selectBook: this.selectBook,
        },
      });
    },
  },
};
</script>
<style scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 50px;
  font-weight: bold;
}
.selectBook {
  display: block;
  margin-top: 30px;
}

button {
  display: inline-block;
  background-color: #c8c8c8;
  width: 130px;
  border-radius: 50px 50px 50px 50px;
  border: 0;
  margin-bottom: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
}

button:hover {
  background-color: #7a7a7a;
  cursor: pointer;
}
.description {
  display: inline-block;

  margin-left: 20px;
}
</style>
