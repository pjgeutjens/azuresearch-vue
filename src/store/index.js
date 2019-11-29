import Vue from 'vue';
import Vuex from 'vuex';

import searchClient from '@/services/azsearchclient';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    facets: {},
    filters: [],
    searchString: '*',
  },
  mutations: {
    SET_RESULTS(state, data) {
      state.results = data;
    },
    SET_FACETS(state, data) {
      state.facets = data;
    },
    SET_SEARCHSTRING(state, data) {
      state.searchString = data;
    },
  },
  actions: {
    executeSearch({ state, commit }) {
      searchClient.search('realestate-us-sample-index', { search: state.searchString, top: 100, facets: ['beds', 'baths'] }, (err, results, raw) => {
        console.log(raw);
        commit('SET_RESULTS', raw.value);
        commit('SET_FACETS', raw['@search.facets']);
      });
    },
    setSearchString({ dispatch, commit }, value) {
      commit('SET_SEARCHSTRING', value);
      dispatch('executeSearch');
    },
  },
  getters: {
    searchString: state => state.searchString,
  },
  modules: {

  },
});
