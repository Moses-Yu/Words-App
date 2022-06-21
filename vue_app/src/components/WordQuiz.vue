<template>
  <div class="box">
    <div class="title">WordQuiz</div>
    <div class="subtitle">with {{ selectBook }} words</div>
    <div v-for="(item, i) in questions" :key="i">
      <div v-if="num == i">
        <div class="number">{{ num + 1 }}/10</div>
        <div class="que">
          <p>
            {{ item.q }}
          </p>
        </div>
        <div class="buttonHolder">
          <div class="buttons" v-for="(s, j) in item.s" :key="j">
            <button @click="choose(item.a, s, i)">{{ s }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WordQuiz",
  components: {},
  props: {
    book: String,
  },
  data() {
    return {
      selectBook: this.$route.params.selectBook,
      userName: this.$route.params.userName,
      wordList: [],
      wrongAnswer: [],
      randomNum: [],
      questions: [],
      num: 0,
    };
  },
  mounted() {
    this.getWordList();
  },
  methods: {
    getWordList() {
      let url = "";
      if (this.selectBook == "Toeic") {
        url = "/server/wordlist";
      } else if (this.selectBook == "MyWords") {
        url = "/server/userWords/" + this.userName;
      }
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.isSuccess);
          this.wordList = res.data.result;
          console.log(this.wordList.length);

          if (this.wordList.length > 10) {
            this.generateQ();
          } else {
            alert("단어가 부족합니다.");
            this.$router.push({
              name: "quiz",
              params: {
                userName: this.userName,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generateQ() {
      let temp = this.wordList;
      let qs = [];
      if (temp.length < 10) {
        return false;
      }

      while (qs.length < 10) {
        let i = this.getRandomInt(0, temp.length);
        let q = {
          q: temp[i].meaning,
          a: temp[i].word,
          s: [],
          id: i,
        };
        let exist = false;
        for (let i = 0; i < qs.length; i++) {
          if (q.a == qs[i].a) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          qs.push(q);
        }
      }

      for (let i = 0; i < 10; i++) {
        let sel = [];
        while (sel.length < 5) {
          let rI = this.getRandomInt(0, temp.length);
          let s = temp[rI].word;
          if (sel.indexOf(s) == -1 && qs[i].a != s) sel.push(s);
        }
        sel.push(qs[i].a);
        sel = this.shuffle(sel);
        qs[i].s = sel;
      }

      this.questions = qs;
      // console.log(qs);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    },
    shuffle(array) {
      for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
      }
      return array;
    },
    choose(a, b, i) {
      if (a == b) {
        this.questions[i].correct = true;
      } else this.questions[i].correct = false;
      console.log(this.num, ": ", this.questions[i].correct);
      if (this.num < this.questions.length) {
        this.num++;
      }

      if (this.num == this.questions.length) {
        this.$router.push({
          name: "result",
          params: {
            userName: this.userName,
            selectBook: this.selectBook,
            questions: JSON.stringify(this.questions),
            wordList: JSON.stringify(this.wordList),
          },
        });
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.box {
  position: absolute;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 800px;
  /* background-color: rgb(194, 194, 194); */
  text-align: center;
}
.title {
  font-size: 50px;
  font-weight: bold;
}

.subtitle {
  margin-bottom: 10px;
  font-size: 15px;
}

.que {
  margin: auto;
  margin-top: 30px;
  width: 400px;
  height: 300px;
  padding: 0 30px;
  background-color: #a7a7a7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
}
.que > p {
  font-weight: bold;
  font-size: 25px;
}

.buttonHolder {
  position: fixed;
  bottom: 20px;
  width: 300px;
  left: 50%;
  transform: translate(-50%, 0);
}

button {
  border: 0;
  width: 200px;
  padding-top: 10px;
  padding-bottom: 8px;
  margin-bottom: 7px;
  background-color: #a7a7a7;
  font-size: 20px;
  border-radius: 50px;
}

button:hover {
  background-color: #747474;
  cursor: pointer;
}

.number {
  background-color: #a7a7a7;
  font-size: 20px;
  border-radius: 50px;
  padding: 4px;
  width: 100px;
  margin: auto;
}
</style>
