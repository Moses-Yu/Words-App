<template>
  <search-tab/>
  <definition-box/>
</template>

<script>
import SearchTab from './SearchTab.vue'
import DefinitionBox from './DefinitionBox.vue'

export default {
  name: 'FirstPage',
  components: {
    SearchTab, DefinitionBox
  }
}
</script>

<style scoped>

</style>
