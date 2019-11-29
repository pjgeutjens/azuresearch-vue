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
      debugger;
      console.log('SET_FS');
      const allFilters = [];
      let allFiltersString = '';
      const keys = Object.keys(state.filters);
      keys.map((key) => {
        const filterArray = [];
        let filterString = '';
        state.filters[key].map(selectedValue => filterArray.push(`${key} eq ${selectedValue}`));
        filterString += filterArray.join(' or ');
        return allFilters.push(filterString);
      });
      allFiltersString = allFilters.join(' and ');
      state.filterString = allFiltersString;
    },
  },
  actions: {
    executeSearch({ state, commit }) {
      searchClient.search('realestate-us-sample-index', {
        search: `${state.searchString}`, filter: `${state.filterString}`, top: 300, facets: ['beds', 'baths'],
      }, (err, results, raw) => {
        console.log(raw);
        commit('SET_RESULTS', raw.value);
        commit('SET_FACETS', raw['@search.facets']);
      });
    },

    setSearchString({ dispatch, commit }, value) {
      commit('SET_SEARCHSTRING', value);
      dispatch('executeSearch');
    },

    setFilter({ dispatch, commit }, payload) {
      commit('SET_FILTER', payload);
      dispatch('setFilterString');
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
