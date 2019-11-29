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
      console.log('SET_FS');
      let filterString = '$filter=';
      const filterArray = [];
      const keys = Object.keys(state.filters);
      keys.map(key => state.filters[key].map(selectedValue => filterArray.push(`${key} eq ${selectedValue}`)));
      filterString += filterArray.join(' or ');
      state.filterString = filterString;
    },
  },
  actions: {
    executeSearch({ state, commit }) {
      searchClient.search('realestate-us-sample-index', { search: `${state.searchString}${state.filterString}`, top: 300, facets: ['beds', 'baths'] }, (err, results, raw) => {
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

    setFilterString({ commit }) {
      commit('SET_FILTERSTRING');
    },
  },
  getters: {
    searchString: state => state.searchString,
    filterString: state => state.filterString,
  },
  modules: {

  },
});
