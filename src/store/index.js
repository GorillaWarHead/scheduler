import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meeting: {},
  },
  mutations: {
    setMeeting(state, payload) {
      state.meeting = payload;
    },
  },
  actions: {},
  modules: {},
});
