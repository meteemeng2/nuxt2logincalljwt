export const state = () => ({
  token: null,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export const actions = {
  saveToken({ commit }, token) {
    commit('setToken', token);
  },
};
