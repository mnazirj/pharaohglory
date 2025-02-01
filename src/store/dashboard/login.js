export default {
  state: {
    // user: null,
    isAuth:
      localStorage.getItem("isAuth") === "true" ||
      sessionStorage.getItem("isAuth") === "true",
    user:
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")) ||
      null,
  },
  getters: {
    isAuth: (state) => state.isAuth,
    user: (state) => state.user,
  },
  mutations: {
    login(state, userInfo) {
      state.isAuth = true;
      state.user = userInfo;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      sessionStorage.removeItem("isAuth");
      sessionStorage.removeItem("user");
    },
  },
  actions: {
    login({ commit }, userInfo) {
      // api
      commit("login", userInfo);
    },
    logout({ commit }) {
      //api
      commit("logout");
    },
  },
};
