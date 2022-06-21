<template>
  <div class="box">
    <div class="title">Quiz Result</div>
    <button class="replay" @click="restart">Again</button>
    <div class="list">
      <div style="margin-bottom: 10px; font-weight: bold">문제 목록</div>
      <div v-for="(item, index) in questions" :key="index">
        <button
          :id="index"
          :class="[item.correct ? 'correct' : 'wrong', 'input']"
          type="button"
          name="word"
          @click="selectWord(item.id)"
        >
          {{ item.a }}
        </button>
      </div>
    </div>
    <div class="def def_anim" style="">
      <div class="info" v-if="word.word">
        <div class="word">
          <div class="word_name">{{ word.word }}</div>
          <div class="word_defi">
            <div>{{ word.meaning }}</div>
          </div>
          <div class="pron">
            <div>{{ word.pron }}</div>
            <div class="sound" @click="playSound(word.sound_url)">
              <audio :id="word.sound_url" :src="word.sound_url"></audio>
              <img src="../assets/speaker_icon1.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="add_word" v-if="word.word" @click="addWordToMyPage">
        <div></div>
        <div></div>
      </div>
      <div class="err" v-else>Can not search word</div>
      <div class="etcs" v-if="word.meaning_deep">
        <div class="etc">
          <div class="etc_title">예문</div>

          <div
            class="etc_main"
            v-for="index in word.md.length - 2"
            :key="index"
          >
            <div>
              <span>{{ word.md[index] }}</span>
              <span class="sound_icon"
                ><img src="../assets/speaker_icon1.png"
              /></span>
            </div>
            <div>{{ word.mdk[index] }}</div>
            <!-- <div>Merriam-Webster's Learner's Dictionary</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ResultPage",
  components: {},
  data() {
    return {
      userName: this.$route.params.userName,
      selectBook: this.$route.params.selectBook,
      questions: [],
      wordList: [],
      isChecked: 0,
      word: {},
    };
  },
  mounted() {
    this.wordList = JSON.parse(this.$route.params.wordList);
    this.questions = JSON.parse(this.$route.params.questions);
    for (let i = 0; i < this.questions.length; i++) {
      if (!this.questions[i].correct) {
        this.selectWord(this.questions[i].id);
        break;
      }
      if (i == this.questions.length - 1) {
        this.selectWordWord(this.questions[0].id);
      }
    }
  },
  methods: {
    playSound(id) {
      let i = document.getElementById(id);
      i.play();
    },
    restart() {
      this.$router.push({
        name: "wordQuiz",
        params: {
          userName: this.userName,
          selectBook: this.selectBook,
        },
      });
    },
    selectWord(id) {
      let temp = this.wordList[id];
      if (temp.meaning_deep) {
        let s = temp.meaning_deep;
        let md = s.split("@@@");
        s = temp.meaning_deep_kr;
        let mdk = s.split("@@@");
        temp.md = md;
        temp.mdk = mdk;
      }
      this.word = temp;
    },
    play(id) {
      let i = document.getElementById(id);
      i.play();
    },
    addWordToMyPage() {
      if (this.userName) {
        axios
          .post("/server/addWordToMyPage", {
            word: this.word,
            userName: this.userName,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          })
          .catch();
      } else {
        alert("로그인이 필요합니다.");
        this.$router.push({
          name: "login",
        });
      }
    },
  },
};
</script>

<style scoped>
.replay {
  position: fixed;
  width: 100px;
  padding: 5px;
  left: 60px;
  top: 140px;
  font-size: 25px;
  background-color: #dcdcdc;
  border: 1px #424242 solid;
}
.correct {
  background-color: #56bd5e;
}
.wrong {
  background-color: #cc4949;
}
.box {
  overflow-y: hidden;
  font-size: 20px;
}
.title {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: bold;
}

input {
  display: none;
}

button {
  display: inline-block;
  background-color: #c8c8c8;
  width: 90%;
  left: auto;
  border-radius: 50px 50px 50px 50px;
  margin-bottom: 5px;
  padding-top: 2px;
  padding-bottom: 5px;
  font-size: 20px;
  border: 0;
}

/* label.checked {
  background-color: #7a7a7a;
} */

input[type="radio"]:checked + label {
  background-color: #7a7a7a;
}

.list {
  position: absolute;
  display: inline-block;
  left: 30px;
  top: 20%;
  height: auto;
  width: 160px;
  bottom: 0;
  background-color: #dcdcdc;
  border: 1px #424242 solid;
  border-radius: 50px 50px 0 0;
  border-bottom: 0;
  vertical-align: middle;
  text-align: center;
  align-items: center;
  padding-top: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.list::-webkit-scrollbar {
  display: none;
}

.def {
  position: absolute;
  background-color: #dcdcdc;
  border-radius: 50px 50px 0 0;
  border: 1px #424242 solid;
  border-bottom: none;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: auto;
  height: auto;
  right: 30px;
  left: 200px;
  bottom: 0;
  top: 20%;
}
@keyframes slideUpFromBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
.def_anim {
  animation: 2s ease-out 0s 1 slideUpFromBottom;
}

.def::-webkit-scrollbar {
  display: none;
}

.info {
  position: relative;
  background-color: #c8c8c8;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  width: auto;

  /* height: 200px; */
  border-radius: 50px;
}

.err {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
}
.word {
  /* position: relative; */
  top: 20px;
  font-size: 50px;
  width: 70%;
  padding-left: 80px;
  padding-right: 50px;
}

.word_name {
  margin-top: 20px;
  font-weight: 600;
}

.word_defi {
  font-size: 20px;
  display: flex;
  margin-top: 10px;
}

.word_defi > div {
  margin-right: 20px;
  font-weight: bold;
}

.pron {
  position: inherit;
  font-size: 20px;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 20px;
}

.pron > div:first {
  display: inline-flex;
}

.sound {
  display: inline-flex;
  margin-top: 6px;
  margin-left: 10px;
}

.sound > img {
  height: 20px;
  width: auto;
}

.etcs {
  width: auto;
  background-color: #c8c8c8;
  border-radius: 50px;
  padding-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.etc {
  /* border-top-left-radius: 50px;
    border-top-right-radius: 50px; */
  /* min-height: 95%; */
}

.etc > div {
  padding: 10px 0px 0px 20px;
}

.etc_title {
  position: relative;
  left: 30px;
  top: 30px;
  font-size: 25px;
  font-weight: bold;
  /* letter-spacing: 5px; */
  margin-bottom: 50px;
}

.etc_main {
  position: relative;
  margin-bottom: 40px;
  margin-left: 25px;
  margin-right: 45px;
  font-size: 25px;
}

.etc_main > div {
  border-left: 6px #949494 solid;
  padding-left: 15px;
  font-size: 18px;
}

.etc_main > div:nth-child(1) {
  font-weight: bold;
  padding-bottom: 15px;
}

.etc_main > div:nth-child(2) {
  padding-bottom: 10px;
}

.etc_main > div:nth-child(3) {
  margin-top: 5px;
  margin-left: 20px;
  border: 0;
  font-size: 12px;
  color: #949494;
}

.etc_main > div:first-child {
  display: inline-block;
}

.etc_main > div:first-child > div {
  display: inline-block;
}

.sound_icon {
  margin: 0;
}

.sound_icon > img {
  margin-top: 0px;
  margin-left: 0px;
  height: 20px;
  top: 4px;
  display: inline-block;
  position: relative;
}
.add_word {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  border: 1px rgb(0, 0, 0);
  border-style: dashed;
  border-radius: 50px;
  top: 100px;
  /* left: 80%; */
  right: 100px;
  /* margin: 0 !important; */
  z-index: 1;
  /* transform: translate(-50%, -50%); */
}
.add_word:hover {
  border: 1px rgb(0, 0, 0);
  border-style: solid;
  cursor: pointer;
}

.add_word div:nth-child(1) {
  position: absolute;
  width: 30px;
  height: 5px;
  left: 51%;
  top: 51%;
  transform: translate(-50%, -50%);
  background-color: black;
  border-radius: 10px;
}

.add_word div:nth-child(2) {
  position: absolute;
  display: block;
  width: 30px;
  height: 5px;
  background-color: black;
  border-radius: 10px;
  left: 51%;
  top: 51%;
  transform: translate(-50%, -50%) rotate(90deg);
}

button:hover {
  cursor: pointer;
  background-color: #979797;
}
</style>
