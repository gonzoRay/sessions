import Vue from 'vue';
import Vuex from 'vuex';

import { state } from './sessions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state
});
