<template>
  <b-form-group>
      <b-list-group>
        <b-list-group-item>{{range.field}}</b-list-group-item>
        <b-list-group-item>
          <vue-slider v-model="limits" :enable-cross="false"></vue-slider>
        </b-list-group-item>
      </b-list-group>

    </b-form-group>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: [
    'range',
  ],
  data() {
    return {
      limits: [0, Number.MAX_SAFE_INTEGER],
    };
  },
  watch: {
    limits() {
      const payload = {
        range: this.range,
        selected: this.limits,
      };
      this.$store.dispatch('setRange', payload);
    },
  },
  computed: {
    ...mapState([
      'ranges',
      'results',
    ]),
    slider_min() {
      if (this.results.length <= 0) { return 0; }
      const values = this.results.map(result => result[this.range]);
      return Math.min(values);
    },

    slider_max() {
      if (this.results.length <= 0) { return Number.MAX_SAFE_INTEGER; }
      const values = this.results.map(result => result[this.range]);
      return Math.max(values);
    },
  },
};
</script>
<style>
  .form-group {
    margin-top: 20px;
  }
</style>
