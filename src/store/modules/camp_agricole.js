const state = {
  camp_id: null,
};

const mutations = {
  SET_CAMP_ID: (state, id) => {
    state.camp_id = id;
  },
};

const actions = {
  set_camp({ commit }, id) {
    commit('SET_CAMP_ID', id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
