<template>
  <div
    class="def"
    style="width: 80%; height: auto; left: 50%; bottom: 0; top: 20%"
  >
    <div @result-from-searchTab ="saveWord" />
    <div class="info">
      <div class="word">
        <div class="word_name">apple</div>
        <div class="word_defi">
          <div>1. 애플</div>
          <div>2. 사과</div>
          <div>3. 사과나무</div>
          <div>4. 뉴욕</div>
        </div>
        <div class="pron">
          <div>[ǽpl]</div>
          <div class="sound">
            <img src="../assets/speaker_icon1.png" />
          </div>
        </div>
      </div>
      <div class="add_word">
        <div></div>
        <div></div>
      </div>
    </div>

    <div class="defi">
      <div class="defi_type">
        <div>명사</div>
        <div>
          1. 사과와 속(屬)은 같고 종이 다른 과실
          <div>
            a crab apple
            <span class="sound_icon"
              ><img src="../assets/speaker_icon1.png"
            /></span>
          </div>
          <div>야생 능금.</div>
        </div>
        <div>
          2. 사과, 사과나무
          <div>
            a red-cheeked[a green, a sour] apple
            <span class="sound_icon"
              ><img src="../assets/speaker_icon1.png"
            /></span>
          </div>
          <div>빨간[덜 익은, 신] 사과</div>
        </div>
        <div>
          3. 사과 비슷한 과일: custard apple, oak apple, thorn apple, May apple
          등.
        </div>
        <div>4. (모양· 크기· 빛깔 등이) 사과 모양의 것; (비격식) 야구공.</div>
        <div>
          5. (보통 형용사와 함께) (미·속어) 녀석(fellow)
          <div>
            a sad apple
            <span class="sound_icon"
              ><img src="../assets/speaker_icon1.png"
            /></span>
          </div>
          <div>싫은[천박스러운] 놈</div>
        </div>
        <div>6. (속어) 번화가, 대도시.</div>
        <div>7. (미·속어) (신경 안정제가 든) 붉은 캡슐.</div>
      </div>
    </div>

    <div class="etc">
      <div class="etc_title">예문</div>
      <div class="etc_main">
        <div>
          <span>He ate the apple, stalk and all.</span>
          <span class="sound_icon"
            ><img src="../assets/speaker_icon1.png"
          /></span>
        </div>
        <div>그는 그 사과를 속심까지 다 먹었다.</div>
        <div>Merriam-Webster's Learner's Dictionary</div>
      </div>

      <div class="etc_main">
        <div>
          <span> Who could argue against mother hood and apple pie? </span>
          <span class="sound_icon"
            ><img src="../assets/speaker_icon1.png"
          /></span>
        </div>
        <div>
          모성과 안락한 가정에 반롤을 제기할 수 있는 사람이 누가 있겠는가?
        </div>
        <div>Merriam-Webster's Learner's Dictionary</div>
      </div>

      <div class="etc_main">
        <div>
          <span> apple is the same thing as this floppy disk. </span>
          <span class="sound_icon"
            ><img src="../assets/speaker_icon1.png"
          /></span>
        </div>
        <div>이 사과는 플로피 디스크와 같아요.</div>
        <div>TED</div>
      </div>
    </div>
  </div>
</template>

<script>
import speakerImage0 from "../assets/speaker_icon.png";
import speakerImage1 from "../assets/speaker_icon1.png";

export default {
  name: "DefinitionBox",
  data: function () {
    return {
      speakerImage0: speakerImage0,
      speakerImage1: speakerImage1,
      wordObj: {},
      word: "",
      shortMeaning: [],
      pron: "",
      types: "",
      longMeaning: [],
    };
  },
  methods: {
    saveWord: function(value) {
      this.wordObj = value;
      console.log(this.wordObj);
    }
  },
};
</script>

<style scoped>
.def {
  position: absolute;
  transform: translate(-50%, 0);
  background-color: #dcdcdc;
  border-radius: 50px 50px 0 0;
  border: 1px #424242 solid;
  border-bottom: none;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.def::-webkit-scrollbar {
  display: none;
}

.info {
  position: inherit;
  background-color: #c8c8c8;
  left: 5%;
  right: 35%;
  top: 5%;
  height: 200px;
  border-radius: 100px;
}

.word {
  position: relative;
  top: 20px;
  font-size: 50px;
  width: 100%;
  padding-left: 80px;
  padding-right: 50px;
}

.word_name {
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

.add_word {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px rgb(0, 0, 0) dashed;
  border-style: dashed;
  border-radius: 50px;
  top: 50%;
  right: 50px;
  transform: translate(0, -50%);
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

.defi {
  position: relative;
  top: 270px;
  left: 130px;
  width: 50%;
  margin-right: 20px;
  padding-bottom: 20px;
}

.defi_type {
}

.defi_type > div:first-child {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
  color: #707070;
}

.defi_type > div:nth-child(n + 2) {
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
  padding-bottom: 10px;
  border-left: 2px #949494 solid;
  margin-left: 20px;
}

.defi_type > div > div {
  padding-bottom: 5px;
  padding-left: 10px;
  margin-left: 20px;
  border-left: 3px #949494 solid;
}

.defi_type > div > div:nth-child(1) {
  margin-top: 10px;
  font-size: 15px;
  font-weight: 300;
}

.defi_type > div > div:nth-child(2) {
  font-size: 13px;
  font-weight: 300;
}

.defi_type > div:first-child {
  padding: 5px 10px;
  background-color: #c8c8c8;
  display: inline-block;
  border-radius: 40px;
  font-size: 20px;
  font-weight: bold;
}

.etc {
  position: inherit;
  right: 3%;
  top: 5%;
  left: 68%;
  background-color: #c8c8c8;
  border-radius: 50px;
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
