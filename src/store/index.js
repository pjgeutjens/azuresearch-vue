import Vue from 'vue';
import Vuex from 'vuex';

import searchClient from '@/services/azsearchclient';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    facets: [],
    filters: {},
    searchString: '*',
    filterString: '',
    currentPage: 1,
    resultsPerPage: 10,
    resultsCount: 0,
  },
  mutations: {
    SET_RESULTS(state, data) {
      state.results = data;
    },
    SET_FACETS(state, data) {
      const resultArray = [];
      Object.entries(data).forEach((element) => {
        resultArray.push({
          field: element[0],
          values: element[1],
        });
      });
      state.facets = resultArray;
    },
    SET_SEARCHSTRING(state, data) {
      state.searchString = data;
    },
    SET_FILTER(state, payload) {
      state.filters[payload.facet] = payload.selected;
    },
    SET_FILTERSTRING(state) {
      let allFilters = [];
      let allFiltersString = '';
      const keys = Object.keys(state.filters);
      keys.map((key) => {
        const filterArray = [];
        let filterString = '';
        state.filters[key].map(selectedValue => filterArray.push(`${key} eq ${selectedValue}`));
        filterString += filterArray.join(' or ');
        return allFilters.push(filterString);
      });
      allFilters = allFilters.filter(f => f.length !== 0);
      allFiltersString = allFilters.join(' and ');
      state.filterString = allFiltersString;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_RESULTS_PER_PAGE(state, count) {
      state.resultsPerPage = count;
    },
    SET_RESULTS_COUNT(state, count) {
      state.resultsCount = count;
    },
  },
  actions: {
    executeSearch({ state, commit }) {
      searchClient.search('realestate-us-sample-index', {
        search: `${state.searchString}`, filter: `${state.filterString}`, top: state.resultsPerPage, skip: (state.currentPage - 1) * state.resultsPerPage, facets: ['beds', 'baths'], count: true,
      }, (err, results, raw) => {
        console.log(raw);
        commit('SET_RESULTS', raw.value);
        commit('SET_FACETS', raw['@search.facets']);
        commit('SET_RESULTS_COUNT', raw['@odata.count']);
      });
    },

    setSearchString({ dispatch, commit }, value) {
      commit('SET_CURRENT_PAGE', 1);
      commit('SET_SEARCHSTRING', value);
      dispatch('executeSearch');
    },

    setFilter({ dispatch, commit }, payload) {
      commit('SET_CURRENT_PAGE', 1);
      commit('SET_FILTER', payload);
      dispatch('setFilterString');
    },

    setCurrentPage({ dispatch, commit }, page) {
      commit('SET_CURRENT_PAGE', page);
      dispatch('executeSearch');
    },

    setResultsPerPage({ dispatch, commit }, count) {
      commit('SET_RESULTS_PER_PAGE', count);
      dispatch('executeSearch');
    },

    setFilterString({ dispatch, commit }) {
      commit('SET_FILTERSTRING');
      dispatch('executeSearch');
    },
  },
  getters: {
    searchString: state => state.searchString,
    filterString: state => state.filterString,
  },
  modules: {

  },
});
