/* eslint-disable */

import axios from "axios";

const url = require("@/config").url;

const state = {
  items: [],
};

const endpoint = "deliveries";

const actions = {
  async getItem({ commit }, data) {
    try {
      const response = await axios.get(`${url}/${endpoint}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getDeliveryBySalesItemId({ commit }, id) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${id}/sales`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async addItem({ commit }, data) {
    try {
      const response = await axios.post(`${url}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async updateItem({ commit }, data) {

    console.log(data)
    try {
      const response = await axios.put(`${url}/${endpoint}/${data.id}`, {status: data.status});
      return response.data;
    } catch (error) {
      console.log(error)
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
