export default {
  SET_RESULTS(state, data) {
    state.results = data;
  },
  SET_CHECKBOX_FACETS(state, data) {
    const resultArray = [];
    Object.entries(data).forEach((element) => {
      resultArray.push({
        field: element[0],
        values: element[1],
      });
    });
    state.checkbox_facets = resultArray;
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
    console.log(allFiltersString);
    state.filterString = allFiltersString;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
  SET_RESULTS_PER_PAGE(state, count) {
    state.resultsPerPage = count;
  },
  SET_ORDERBY(state, value) {
    state.orderBy = value;
  },
  SET_RESULTS_COUNT(state, count) {
    state.resultsCount = count;
  },
  SET_RANGE(state, payload) {
    state.ranges[payload.range] = {
      interval: 100,
      min: payload.selected[0],
      max: payload.selected[1],
    };
  },
};
