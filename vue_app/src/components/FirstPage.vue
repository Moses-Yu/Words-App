<template>
  <div class="welcome" v-if="userName && !haveWord">
    환영합니다 {{ this.$route.params.userName }}님!
  </div>
  <search-tab v-on:result-from-searchTab="getWordFromSearchTab" />
  <definition-box v-show="haveWord" :wordObject="searchData" />
</template>

<script>
import SearchTab from "./SearchTab.vue";
import DefinitionBox from "./DefinitionBox.vue";

export default {
  name: "FirstPage",
  components: {
    SearchTab,
    DefinitionBox,
  },
  params:{
    userName: String,
  },
  data() {
    return {
      searchData: {},
      haveWord: false,
      userName: this.$route.params.userName
    };
  },
  methods: {
    getWordFromSearchTab(value) {
      this.searchData = value;
      this.haveWord = true;
      console.log(this.searchData);
    },
  },
  // computed: {
  //   haveWord: function () {
  //     if (this.searchData.word_id > 0) return true;
  //     else return false;
  //   },
  // },
  mounted() {
    this.userName = this.$route.params.userName;
    console.log(this.userName);
  },
};
</script>

<style scoped>
.welcome {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
}
</style>
