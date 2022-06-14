<template>
  <div v-bind:class="{search_tab_top : result != '', search_tab_center : result == ''}" style="">
    <input v-model="searchText" class="search_input" type="text" />
    <button class="search_submit" type="button" @click="search">
      <img src="../assets/search_icon.png" />
    </button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "SearchTab",
  data() {
    return {
      value: false,
      searchText: "",
      result: "test",
    };
  },
  methods: {
    search() {
      console.log(this.searchText);
      axios
        .get("/server/word/" + this.searchText)
        .then((response) => {
          console.log(response.data.result);
        //this.searchText = "";
          this.$root.$emit("result-from-searchTab", response.data.result)
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.search_tab_center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  float: left;
}
.search_tab_top {
  position: absolute;
  left: 30%;
  top: 10%;
  transform: translate(-50%, -50%);
  float: left;
}
.search_input {
  border: 0;
  border: 1px #424242 solid;
  outline: none;
  width: 620px;
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
