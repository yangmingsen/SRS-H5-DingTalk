import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false
  },
  getters: {
    loading: state => state.loading
  },
  mutations: {
    SHOW_LOADING(state) {
      state.loading = true;
    },
    HIDE_LOADING(state) {
      state.loading = false;
    }
  },
  actions: {},
  modules: {}
});
