<template>
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
  data() {
    return {
      searchData: {},
      haveWord: false
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
};
</script>

<style scoped></style>
