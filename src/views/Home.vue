<template>
  <div class="home">
    <input v-model.lazy="searchString"/>
    <p>{{results.length}}</p>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  name: 'home',
  computed: {
    searchString: {
      get() {
        return this.$store.state.searchString;
      },
      set(value) {
        this.$store.dispatch('setSearchString', value);
      },
    },
    results: {
      get() {
        return this.$store.state.results;
      },
    },
  },
};
</script>
