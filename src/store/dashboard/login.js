// export default {
//   state: {
//     // user: null,
//     isAuth:
//       localStorage.getItem("isAuth") === "true" ||
//       sessionStorage.getItem("isAuth") === "true",
//     token: localStorage.getItem("_token") || sessionStorage.getItem("_token"),
//     user:
//       JSON.parse(localStorage.getItem("user")) ||
//       JSON.parse(sessionStorage.getItem("user")) ||
//       null,
//   },
//   getters: {
//     isAuth: (state) => state.isAuth,
//     user: (state) => state.user,
//     token: (state) => state.token,
//   },
//   mutations: {
//     login(state, userInfo) {
//       state.isAuth = true;
//       state.user = userInfo;
//     },
//     logout(state) {
//       state.isAuth = false;
//       state.user = null;
//       localStorage.removeItem("isAuth");
//       localStorage.removeItem("user");
//       sessionStorage.removeItem("isAuth");
//       sessionStorage.removeItem("user");
//       localStorage.removeItem("_token");
//     },
//   },
//   actions: {
//     login({ commit }, userInfo) {
//       // api
//       commit("login", userInfo);
//     },
//     logout({ commit }) {
//       //api
//       commit("logout");
//     },
//   },
// };
