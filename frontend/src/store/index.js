import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const modules = {};

//Dynamically import and register the store modules
const requireModule = require.context("./modules", false, /\.js$/);
requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, "");
  const moduleConfig = requireModule(fileName);
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default new Vuex.Store({
  modules,
  state: {
    drawer: true,
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
  },
  actions: {},
});
