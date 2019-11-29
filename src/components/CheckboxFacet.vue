<template>
  <b-form-group>
      <h4>{{ facet.field }}</h4>
      <hr>
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        name="facet.field"
        stacked
      >
      </b-form-checkbox-group>
    </b-form-group>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: [
    'facet',
  ],
  data() {
    return {
      selected: [],
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
  },
  computed: {
    ...mapState([
      'filters',
    ]),
    options() {
      return this.facet.values.map(item => ({
        text: `${item.value} (${item.count})`,
        value: item.value,
      }));
    },
  },
};
</script>
<style>
  .form-group {
    margin-top: 20px;
  }
</style>
