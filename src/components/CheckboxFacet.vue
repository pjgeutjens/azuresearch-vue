<template>
  <b-form-group :disabled="options.length <= 1 && selected.length == 0">
      <b-list-group>
        <b-list-group-item>{{facet.field}}</b-list-group-item>
        <b-list-group-item>
          <!-- <b-form-checkbox-group
        v-model="selected"
        :options="options"
        name="facet.field"
        stacked
      > -->
      <b-form-checkbox-group class="border-transparent"
        v-model="selected"
        stacked>
        <b-list-group-item
          v-for="option in options"
          :key="option.value"
          class="d-flex justify-content-between align-items-center border-0">
          <b-form-checkbox :value="option.value">
            {{option.text}}
          </b-form-checkbox>
            <b-badge v-show="option.count > 0"
            :variant="selected.includes(option.value) ? 'primary': 'light'"
            pill>
              {{option.count}}
            </b-badge>
        </b-list-group-item>
      </b-form-checkbox-group>
        </b-list-group-item>
      </b-list-group>

    </b-form-group>
</template>

<script>
import { mapState } from 'vuex';

const _ = require('lodash');

export default {
  props: [
    'facet',
  ],
  data() {
    return {
      selected: [],
      options: (this.facet.values.map(item => ({
        text: `${item.value}`,
        value: item.value,
        count: item.count,
      }))).sort((a, b) => a.value - b.value),
    };
  },
  watch: {
    selected() {
      const payload = {
        facet: this.facet.field,
        selected: this.selected,
      };
      this.$store.dispatch('setFilter', payload);
    },
    facet() {
      _.forEach(this.options, (obj) => {
        _.set(obj, 'count', 0);
      });
      this.facet.values.forEach((v) => {
        this.options.find(o => o.value === v.value).count = v.count;
      });
    },
    filters() {
      if (!this.filters[this.facet.field]) {
        this.selected = [];
      }
    },
  },
  computed: {
    ...mapState([
      'filters',
    ]),
  },
};
</script>
<style>
  .form-group {
    margin-top: 20px;
  }
  .list-group-item {
    border: none;
  }
</style>
