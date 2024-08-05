import axios from "axios";
import router from "../../router";
const url = require("@/config").url;

const state = {
  token: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user")) || {},
  status: "",
  error: null,
};

const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading";
    state.error = null;
  },
  AUTH_SUCCESS(state, { token, user }) {
    state.status = "success";
    state.token = token;
    state.user = user;
    state.error = null;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  AUTH_ERROR(state, error) {
    state.status = "error";
    state.error = error;
  },
  AUTH_LOGOUT(state) {
    state.status = "";
    state.token = "";
    state.user = {};
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  },
};

const actions = {
  async login({ commit }, data) {
    commit("AUTH_REQUEST");
    try {
      const res = await axios.post(`${url}/auths/login`, data);

      const token = res.data.token;
      const user = res.data.user;

      commit("AUTH_SUCCESS", { token, user });
      router.push("/");
      return res.data;
    } catch (err) {
      commit("AUTH_ERROR", err.response.data.msg);
      return err.response;
    }
  },
  async register({ commit }, data) {
    commit("AUTH_REQUEST");
    try {
      const res = await axios.post("/api/v1/server/auth/register", data);
      const token = res.data.token;
      const user = res.data.user;

      commit("AUTH_SUCCESS", { token, user });
      router.push("/");
    } catch (err) {
      commit("AUTH_ERROR", err.response.data.msg);
    }
  },
  logout({ commit }) {
    commit("AUTH_LOGOUT");
    router.push("/login");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
  authStatus: (state) => state.status,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
