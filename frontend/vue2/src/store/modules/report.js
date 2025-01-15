/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const state = {
  productReport: [],
  inventoryReport: [],
  salesReport: [],
};

const actions = {
  async getProductReport({ commit }, dateRange) {
    try {
      const response = await axios.get(
        `${url}/reports/products?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      commit("SET_PRODUCT_REPORT", response.data.data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getInventoryReport({ commit }, dateRange) {
    try {
      const response = await axios.get(
        `${url}/reports/inventory?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      commit("SET_INVENTORY_REPORT", response.data.data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getSalesReport({ commit }, dateRange) {
    try {
      const response = await axios.get(
        `${url}/reports/sales?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      commit("SET_SALES_REPORT", response.data.data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

const mutations = {
  SET_PRODUCT_REPORT(state, data) {
    state.productReport = data;
  },
  SET_INVENTORY_REPORT(state, data) {
    state.inventoryReport = data;
  },
  SET_SALES_REPORT(state, data) {
    state.salesReport = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
