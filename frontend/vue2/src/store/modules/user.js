/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const state = {
  users: [],
};

const endpoint = "users";

const actions = {
  async getUsers({ commit }) {
    try {
      const response = await axios.get(`${url}/${endpoint}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getUserById({ commit }, id) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async addUser({ commit }, data) {
    try {
      const response = await axios.post(`${url}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async updateUser({ commit }, { id, data }) {
    try {
      const response = await axios.put(`${url}/${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async deleteUser({ commit }, id) {
    try {
      const response = await axios.delete(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

const mutations = {
  SET_USERS(state, data) {
    state.users = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
