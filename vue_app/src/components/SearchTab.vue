<template>
  <div
    :class="[isActive ? 'search_tab_top' : 'search_tab_center', 'div_box']"
  >
    <input v-model="searchText" class="search_input" type="text"  @keyup.enter="search"/>
    <button class="search_submit" type="button" @click="search">
      <img src="../assets/search_icon.png" />
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchTab",
  data() {
    return {
      searchText: "",
      result: {
        word_id: 0,
        searched: false,
      },
    };
  },
  methods: {
    search() {
      console.log(this.searchText);
      axios
        .get("http://localhost:3001/server/word/" + this.searchText)
        .then((response) => {
          this.result = response.data;
          this.result.searched = true;
          this.$emit("result-from-searchTab", this.result);
        })
        .catch((err) => {
          this.result.searched = true;
          console.log(err);
          this.$emit("result-from-searchTab", this.result);
        });
    },
  },
  computed: {
    isActive: function () {
      if (this.result.searched) return true;
      else return false;
    },
  },
};
</script>

<style scoped>
.div_box {
  transition-property: left, top;
  transition-duration: 2s, 2s;
  float: left;
  position: absolute;
  transform: translate(-50%, -50%);
}
.search_tab_center {
  left: 50%;
  top: 50%;
}
.search_tab_top {
  left: 50%;
  top: 10%;
}
.search_input {
  border: 0;
  border: 1px #424242 solid;
  outline: none;
  width: 80%;
  padding-left: 20px;
  font-size: 40px;
  border-radius: 100px;
}
.search_submit {
  position: absolute;
  border: 0;
  background: none;
  padding-top: 0px;
  margin-top: 0px;
}

.search_submit > img {
  margin-top: 0px;
  margin-left: 10px;
  width: 40px;
  height: auto;
}
</style>
