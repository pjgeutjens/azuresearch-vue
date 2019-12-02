import searchClient from '@/services/azsearchclient';
import getFacetsFromEnv from '@/store/helpers';

export default {
  executeSearch({ state, commit }) {
    searchClient.search(
      'realestate-us-sample-index',
      {
        search: `${state.searchString}`,
        filter: `${state.filterString}`,
        top: state.resultsPerPage,
        skip: (state.currentPage - 1) * state.resultsPerPage,
        facets: getFacetsFromEnv(),
        orderby: `${state.orderBy}`,
        count: true,
      },
      (err, results, raw) => {
        console.log(raw);
        commit('SET_RESULTS', raw.value);
        commit('SET_CHECKBOX_FACETS', raw['@search.facets']);
        commit('SET_RESULTS_COUNT', raw['@odata.count']);
      },
    );
  },

  setSearchString({ dispatch, commit }, value = '*') {
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

  setOrderBy({ dispatch, commit }, value) {
    commit('SET_ORDERBY', value);
    dispatch('executeSearch');
  },

  setFilterString({ dispatch, commit }) {
    commit('SET_FILTERSTRING');
    dispatch('executeSearch');
  },

  setRange({ commit }, payload) {
    commit('SET_RANGE', payload);
    // dispatch('executeSearch');
  },
};
