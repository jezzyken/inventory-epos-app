/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const defaultSummaryState = {
  sales: {
    today: { totalSales: 0, count: 0 },
    monthly: { totalSales: 0, count: 0 },
  },
  deliveries: {
    pending: 0,
    delivered: 0,
  },
  inventory: {
    lowStock: [],
  },
  topProducts: [],
};

const state = {
  summary: defaultSummaryState,
  salesTrend: [],
  deliveryStats: [],
};

const actions = {
  async getDashboardSummary({ commit }) {
    try {
      const response = await axios.get(`${url}/dashboard/summary`);
      commit("SET_SUMMARY", response.data.data || defaultSummaryState);

      console.log(response);
      return response.data;
    } catch (error) {
      commit("SET_SUMMARY", defaultSummaryState);
      return error.response;
    }
  },

  async getSalesTrend({ commit }, period = "daily") {
    try {
      const response = await axios.get(
        `${url}/dashboard/sales-trend?period=${period}`
      );
      commit("SET_SALES_TREND", response.data.data || []);
      return response.data;
    } catch (error) {
      commit("SET_SALES_TREND", []);
      return error.response;
    }
  },

  async getDeliveryStats({ commit }) {
    try {
      const response = await axios.get(`${url}/dashboard/delivery-stats`);
      commit("SET_DELIVERY_STATS", response.data.data || []);
      return response.data;
    } catch (error) {
      commit("SET_DELIVERY_STATS", []);
      return error.response;
    }
  },
};

const mutations = {
  SET_SUMMARY(state, data) {
    state.summary = data;
  },
  SET_SALES_TREND(state, data) {
    state.salesTrend = data;
  },
  SET_DELIVERY_STATS(state, data) {
    state.deliveryStats = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
