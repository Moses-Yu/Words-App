<template>
  <div class="box">
    <div class="title">{{ userName }}의 단어장</div>
    <div class="list">
      <div style="margin-bottom: 10px; font-weight: bold">단어 목록</div>
      <div v-for="(item, index) in this.wordList" :key="index">
        <input
          :id="index"
          class="input"
          type="radio"
          name="word"
          :value="index"
          v-model="isChecked"
        />
        <label :for="index">
          {{ item.word }}
        </label>
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
            <div class="sound" @click="play(word.sound_url)">
              <audio :id="word.sound_url" :src="word.sound_url"></audio>
              <img src="../assets/speaker_icon1.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="add_word" v-if="word.word" @click="deleteWord">
        <img src="../assets/trash_can.png" />
      </div>
      <div class="err" v-else>Can not search word</div>
      <div class="etcs" v-if="word.word">
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
  name: "MyPage",
  components: {},
  data() {
    return {
      userName: this.$route.params.userName,
      wordList: [],
      isChecked: 0,
    };
  },
  methods: {
    play(id) {
      let i = document.getElementById(id);
      i.play();
    },
    getWordList() {
      axios
        .get("/server/userWords/" + this.$route.params.userName)
        .then((res) => {
          this.wordList = res.data.result;
          console.log(this.wordList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reload() {
      this.getWordList();
    },
    deleteWord() {
      console.log(this.isChecked, this.wordList[this.isChecked].word_id);
      const id = this.wordList[this.isChecked].word_id;
      axios
        .delete("/server/delete", {
          data: {
            word_id: id,
            userName: this.userName,
          },
        })
        .then((res) => {
          if (res.data.isSuccess) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
          this.reload();
          this.isChecked = 0;
        })
        .catch();
    },
  },
  computed: {
    word: function () {
      if (this.wordList.length > 0) {
        let temp = this.wordList[this.isChecked];
        if (temp.word) {
          let s = temp.meaning_deep;
          let md = s.split("@@@");
          s = temp.meaning_deep_kr;
          let mdk = s.split("@@@");
          temp.md = md;
          temp.mdk = mdk;
        }
        return temp;
      }
      return [];
    },
  },
  mounted() {
    if (this.userName) this.reload();
    else this.$router.push("/login");
  },
};
</script>

<style scoped>
.box {
  overflow-y: hidden;
  font-size: 20px;
}
.title {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: bold;
}

input {
  display: none;
}

label {
  display: inline-block;
  background-color: #c8c8c8;
  width: 90%;
  left: auto;
  border-radius: 50px 50px 50px 50px;
  margin-bottom: 5px;
  padding-top: 2px;
  padding-bottom: 5px;
  font-size: 20px;
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

.add_word > img {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  top: 120px;
  right: 100px;
}
.add_word:hover {
  cursor: pointer;
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
</style>
