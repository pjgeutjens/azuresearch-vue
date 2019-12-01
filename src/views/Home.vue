<template>
  <div>
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"></a>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item col-12">
                <b-list-group>
                  <b-list-group-item>
                    <span>
                      Showing {{showingStart}} - {{showingEnd}} of {{resultsCount}} results
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </li>
              <li v-for="facet in checkbox_facets" :key="facet.value" class="nav-item col-12">
                <CheckboxFacet v-bind:facet="facet" />
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
          <b-row>
            <b-col cols="6">
              <b-input-group>
                      <b-form-input lazy v-model="searchString" placeholder="Search"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="info" @click="executeSearch">
                          <font-awesome-icon icon="search" />
                        </b-button>
                      </b-input-group-append>
                      <b-input-group-append>
                        <b-button variant="primary" @click="resetSearchString">
                          <font-awesome-icon icon="undo" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
            </b-col>
            <b-col>
              <b-pagination
                v-model="currentPage"
                :total-rows="resultsCount"
                :per-page="resultsPerPage"
                aria-controls="results-group">
              </b-pagination>
            </b-col>
            <b-col cols="2">
              <b-input-group append="Per Page">
                <b-form-select v-model="resultsPerPage" :options="perPageOptions">
                  <template v-slot:first>
                    <option :value="null" disabled>-- Results Per Page --</option>
                  </template>
                </b-form-select>
              </b-input-group>
            </b-col>
            <b-col></b-col>

          </b-row>
          <div class="row">
            <b-card-group deck id="results-group">
              <ResultItem v-for="result in results" :item="result" :key="result.listingId"/>
            </b-card-group>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheckboxFacet from '@/components/CheckboxFacet.vue';
import ResultItem from '@/components/ResultItem.vue';

export default {
  name: 'home',
  components: {
    CheckboxFacet,
    ResultItem,
  },
  data() {
    return {
      perPageOptions: [
        { text: '10', value: 10, disabled: false },
        { text: '50', value: 50, disabled: false },
        { text: '100', value: 100, disabled: false },
      ],
    };
  },
  methods: {
    executeSearch() {
      this.$store.dispatch('setSearchString', this.searchString);
    },
    resetSearchString() {
      this.$store.dispatch('setSearchString');
    },
  },
  computed: {
    ...mapState([
      'resultsCount',
      'ranges',
    ]),
    showingStart() {
      return 1 + ((this.currentPage - 1) * this.resultsPerPage);
    },
    showingEnd() {
      return Math.min(this.currentPage * this.resultsPerPage, this.resultsCount);
    },
    rows() {
      return this.results.length;
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        this.$store.dispatch('setCurrentPage', value);
      },
    },
    resultsPerPage: {
      get() {
        return this.$store.state.resultsPerPage;
      },
      set(value) {
        this.$store.dispatch('setResultsPerPage', value);
      },
    },
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
    checkbox_facets: {
      get() {
        return this.$store.state.checkbox_facets;
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

  .sidebar {
    padding-top: 5px;
  }

  main {
    margin-top: 5px;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>
