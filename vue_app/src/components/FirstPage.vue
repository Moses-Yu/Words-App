<template>
  <search-tab v-on:result-from-searchTab="searchData = value"/>
  <definition-box v-show="searchData.word"/>
</template>

<script>
import SearchTab from './SearchTab.vue'
import DefinitionBox from './DefinitionBox.vue'

export default {
  name: 'FirstPage',
  components: {
    SearchTab, DefinitionBox
  },
  data() {
    return {
      searchData: {},
    }
  },
}
</script>

<style scoped>

</style>
