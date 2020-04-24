/*import Vue from 'vue';
import Vuex from 'vuex';
import {SIZE_CHANGE} from "./mutationsType";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isPhone: false
    },
    mutations: {
        [SIZE_CHANGE](state, val) {
            state.isPhone = val || false;
        }
    }
});

export default store;*/

import state from './state';
import mutations from './mutations';

export default {state, mutations}
