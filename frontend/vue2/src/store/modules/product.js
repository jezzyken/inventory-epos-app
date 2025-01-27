/* eslint-disable */

import axios from "axios";

const url = require("@/config").url;

const state = {
  items: [],
};

const endpoint = "products";

const actions = {
  async getItem({ commit }, data) {
    try {
      const response = await axios.get(`${url}/${endpoint}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getItems({ commit }) {
    try {
      const response = await axios.get(`${url}/${endpoint}/items`);
      console.log(response);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getItemById({ commit }, id) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getItemPrices({ commit }, id) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${id}/prices`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async uploadImage({ commit }, imageData) {
    try {
      // If imageData is already a URL, return it
      if (typeof imageData === "string" && imageData.startsWith("http")) {
        return imageData;
      }

      const formData = new FormData();

      // If imageData is a base64 string, convert it to a blob
      if (typeof imageData === "string" && imageData.startsWith("data:image")) {
        const response = await fetch(imageData);
        const blob = await response.blob();
        formData.append("image", blob, "image.jpg");
      } else {
        formData.append("image", imageData);
      }

      const response = await axios.post(`${url}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload image");
    }
  },

  async addItem({ dispatch }, payload) {
    try {
      let processedPayload = { ...payload };

      if (payload.image && payload.image.startsWith("data:image")) {
        processedPayload.image = await dispatch("uploadImage", payload.image);
      }

      if (payload.type === "Variants" && payload.variants) {
        processedPayload.variants = await Promise.all(
          payload.variants.map(async (variant) => {
            let processedVariant = { ...variant };
            if (variant.image && variant.image.startsWith("data:image")) {
              processedVariant.image = await dispatch(
                "uploadImage",
                variant.image
              );
            }
            return processedVariant;
          })
        );
      }

      return await axios.post(`${url}/${endpoint}`, processedPayload);
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  },

  async updateItem({ dispatch }, { id, data }) {
    try {
      let processedData = { ...data };

      if (data.image && data.image.startsWith("data:image")) {
        processedData.image = await dispatch("uploadImage", data.image);
      }

      if (data.type === "Variants" && data.variants) {
        processedData.variants = await Promise.all(
          data.variants.map(async (variant) => {
            let processedVariant = { ...variant };
            if (variant.image && variant.image.startsWith("data:image")) {
              processedVariant.image = await dispatch(
                "uploadImage",
                variant.image
              );
            }
            return processedVariant;
          })
        );
      }

      return await axios.put(`${url}/${endpoint}/${id}`, processedData);
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
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
