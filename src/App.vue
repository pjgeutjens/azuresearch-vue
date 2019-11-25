<template>
  <div id="app">
    <input v-model.lazy="searchString">
    <p>{{searchResults.length}}</p>
  </div>
</template>

<script>
import AzureSearch from 'azure-search';

export default {
  name: 'app',
  data() {
    return {
      searchResults: [],
      facets: [],
      searchString: '*',
      client: AzureSearch({
        url: process.env.VUE_APP_SEARCHURL,
        key: process.env.VUE_APP_SEARCHKEY,
      }),
    };
  },
  methods: {
    executeSearch() {
      this.client.search('realestate-us-sample-index', { search: this.searchString, top: 100, facets: ['beds', 'baths'] }, (err, results, raw) => {
        console.log(raw);
        this.facets = raw['@search.facets'];
        this.searchResults = raw.value;
      });
    },
  },
  watch: {
    searchString: {
      immediate: true,
      handler() {
        this.executeSearch();
      },
    },
  },
  mounted() {
    this.executeSearch();
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
