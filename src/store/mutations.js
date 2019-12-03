export default {
  SET_RESULTS(state, data) {
    state.results = data;
  },
  SET_CHECKBOX_FACETS(state, data) {
    const resultArray = [];
    const facets = process.env.VUE_APP_CHECKBOX_FACETS;
    Object.entries(data).forEach((element) => {
      if (facets.includes(element[0])) {
        resultArray.push({
          field: element[0],
          values: element[1],
        });
      }
    });
    state.checkbox_facets = resultArray;
  },
  SET_DROPDOWN_FACETS(state, data) {
    const resultArray = [];
    const facets = process.env.VUE_APP_DROPDOWN_FACETS;

    Object.entries(data).forEach((element) => {
      if (facets.includes(element[0])) {
        resultArray.push({
          field: element[0],
          values: element[1],
        });
      }
    });
    state.dropdown_facets = resultArray;
  },
  SET_SEARCHSTRING(state, data) {
    state.searchString = data;
  },
  SET_FILTERS(state, payload) {
    if (payload.selected == null) {
      delete state.filters[payload.facet];
    } else {
      state.filters[payload.facet] = Array.isArray(payload.selected)
        ? payload.selected
        : payload.selected.split();
    }


    let allFilters = [];
    let allFiltersString = '';

    const keys = Object.keys(state.filters);
    keys.map((key) => {
      const filterArray = [];
      let filterString = '';
      state.filters[key].map((selectedValue) => {
        // handle query string for numbers or strings, add quotes depending
        const filter = typeof (selectedValue) === 'number' ? selectedValue : `'${selectedValue}'`;
        return filterArray.push(`${key} eq ${filter}`);
      });
      filterString += filterArray.join(' or ');
      return allFilters.push(filterString);
    });

    allFilters = allFilters.filter(f => f.length !== 0);
    allFiltersString = allFilters.join(' and ');
    state.filterString = allFiltersString;
    state.filtersActive = !!state.filterString;
  },
  CLEAR_FILTERS(state) {
    state.filters = {};
    state.filterString = '';
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
