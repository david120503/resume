import api from 'lib/api/common/index';

export default {
    test({ commit }, params) {
        commit("test", params);
    },

    setWindowSize({ commit }, params) {
        commit("setWindowSize", params);
    }
};