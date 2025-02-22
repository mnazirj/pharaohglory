import { createStore } from "vuex";

async function updateWishListLocal(item) {
  await localStorage.setItem("wishlist", JSON.stringify(item));
}

function findWishItem(state, payload) {
  return state.item.find((i) => i.id == payload.id);
}
function findWishItemIndex(state, payload) {
  return state.item.indexOf(state.item.find((i) => i.id == payload.id));
}

export default createStore({
  state: {
    // dashbboard
    // isAuth:
    //   localStorage.getItem("isAuth") === "true" ||
    //   sessionStorage.getItem("isAuth") === "true",
    // token: null,
    // user:
    //   JSON.parse(localStorage.getItem("user")) ||
    //   JSON.parse(sessionStorage.getItem("user")) ||
    //   null,

    //WishList
    item: [],
  },
  getters: {
    // isAuth: (state) => state.isAuth,
    // user: (state) => state.user,
    // token: (state) => state.token,
    // getWishList: (state) => state.item,
  },
  mutations: {
    login(state, userInfo) {
      // state.isAuth = true;
      // state.user = userInfo;
    },
    logout(state) {
      // state.isAuth = false;
      // state.user = null;
      // state.token = null;
      // localStorage.removeItem("isAuth");
      // localStorage.removeItem("user");
      // sessionStorage.removeItem("isAuth");
      // sessionStorage.removeItem("user");
      // localStorage.removeItem("_token");
      // sessionStorage.removeItem("_token");
    },

    //WishList
    addToWishList(state, payload) {
      let hasItem = findWishItem(state, payload); //Searching if item in wishlist already
      if (hasItem) return; //if item exsit pass
      state.item.push(payload); // if not push item to array
      updateWishListLocal(state.item); //update local storage with new wishlist items
    },
    removeFromWishList(state, payload) {
      let hasItem = findWishItem(state, payload); //search if item in wishlist
      if (!hasItem) return; //if not pass
      let index = findWishItemIndex(state, payload); //get the index of item in wishlist array
      state.item.splice(index, 1); //remove the item
      updateWishListLocal(state.item); //update local storage with new items
    },

    updateWishListFromLocal(state) {
      const items = localStorage.getItem("wishlist"); // get the item stored in storage
      if (items) {
        //if items exist then parse it to json and store it in items array
        state.item = JSON.parse(items);
      }
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
});
