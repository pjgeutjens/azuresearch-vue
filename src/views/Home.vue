<template>
  <div>
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"></a>
      <b-input-group>
        <b-form-input lazy v-model="searchString" placeholder="Search"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="executeSearch">
            <font-awesome-icon icon="search" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                  <font-awesome-icon icon="globe" />
                  {{results.length}}
              </li>
              <li v-for="facet in facets" :key="facet.value">
                <CheckboxFacet v-bind:facet="facet" />
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <b-card-group deck>
          <ResultItem v-for="result in results" :item="result" :key="result"/>
          </b-card-group>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxFacet from '@/components/CheckboxFacet.vue';
import ResultItem from '@/components/ResultItem.vue';

export default {
  name: 'home',
  components: {
    CheckboxFacet,
    ResultItem,
  },
  methods: {
    executeSearch() {
      this.$store.dispatch('setSearchString', this.searchString);
    },
  },
  computed: {
    searchString: {
      get() {
        return this.$store.state.searchString;
      },
      set(value) {
        this.$store.dispatch('setSearchString', value);
      },
    },
    filters: {
      get() {
        return this.$store.state.filters;
      },
      set(value) {
        this.$store.dispatch('setFilters', value);
      },
    },
    results: {
      get() {
        return this.$store.state.results;
      },
    },
    facets: {
      get() {
        return this.$store.state.facets;
      },
    },
  },
};
</script>

<style>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>
