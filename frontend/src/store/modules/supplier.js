/* eslint-disable */

import axios from "axios";

const url = require("@/config").url;

const state = {
  items: [],
};

const endpoint = "suppliers";

const actions = {
  async getItem({ commit }, data) {
    try {
      const response = await axios.get(`${url}/${endpoint}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async addItem({ commit }, data) {
    try {
      const response = await axios.post(`${url}/${endpoint}`, data);
      console.log(response)
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async updateItem({ commit }, data) {
    try {
      const response = await axios.put(`${url}/${endpoint}/${data._id}`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async deleteItem({ commit }, id) {
    try {
      const response = await axios.delete(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

const mutations = {
  SET_ITEM(state, data) {
    state.items = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
