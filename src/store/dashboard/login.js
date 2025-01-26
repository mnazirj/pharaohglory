export default {
    state: {
      // user: null,
      isAuth:
        localStorage.getItem("isAuth") === "true" ||
        sessionStorage.getItem("isAuth") === "true",
    },
    getters: {
      isAuth: (state) => state.isAuth,
    },
    mutations: {
      login(state) {
        state.isAuth = true;
      },
      logout(state) {
        state.isAuth = false;
        localStorage.removeItem("isAuth");
        sessionStorage.removeItem("isAuth");
      },
      // userLoader(state, newUser) {
      //   state.user = newUser;
      //   console.log(state.user);
      // },
    },
    actions: {
      login({ commit }) {
        // api
        commit("login");
      },
      logout({ commit }) {
        //api
        commit("logout");
      },
    },
  };