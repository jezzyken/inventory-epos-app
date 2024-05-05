<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px" scrollable>
      <v-card v-if="hasItems">
        <v-card-title>
          <span class="text-h5">{{ items.name }}</span>
          <v-spacer></v-spacer>
          <div>
            <v-chip small class="ma-1" color="success" text-color="white">
              {{ items.brand.name }}
            </v-chip>
            <v-chip small class="ma-1" color="orange" text-color="white">
              {{ items.category.name }}
            </v-chip>
          </div>
        </v-card-title>

        <v-card-text style="height: 600px">
          <div class="my-4 text-subtitle-1">
            Product Code • {{ items.productCode }}
          </div>

          <div>
            {{ items.description }}
          </div>

          <v-divider class="mt-3"></v-divider>

          <v-card-title>Prices</v-card-title>

          <div>
            <v-data-table
              :headers="headers"
              :items="prices"
              :items-per-page="-1"
              class="elevation-1"
              :hide-default-footer="true"
              :loading="isLoading"
            ></v-data-table>
          </div>

          <v-card-title>Stocks</v-card-title>

          <div>
            <v-data-table
              :headers="stocksHeader"
              :items="stocks"
              :items-per-page="-1"
              class="elevation-1"
              :hide-default-footer="true"
              :loading="isLoading"
            ></v-data-table>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/*eslint-disable */
import { mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "Variant",
        align: "start",
        sortable: false,
        value: "variant.name",
      },
      { text: "Item Price", value: "itemPrice", sortable: false },
      { text: "Sale Price", value: "salePrice", sortable: false },
    ],

    stocksHeader: [
      {
        text: "Supplier",
        align: "start",
        sortable: false,
        value: "supplier.name",
      },
      { text: "Variant", value: "variant.name", sortable: false },
      { text: "Quantity", value: "quantity", sortable: false },
    ],

    dialog: false,
    prices: [],
    isLoading: false,
    items: [],
    stocks: [],
  }),
  computed: {
    hasItems() {
      return Object.keys(this.items).length > 0;
    },
  },

  methods: {
    ...mapActions({
      getItemById: "product/getItemById",
      getStockItems: "stock/getStockItems",
    }),

    async initialize() {
      this.isLoading = true;
      let id = await this.items._id;
      const products = await this.getItemById(id);
      const stocks = await this.getStockItems(id);
      this.prices = products.result.prices;
      this.stocks = stocks.result;
      this.isLoading = false;
    },
    showDialog(dialog, items) {
      this.dialog = dialog;
      this.items = items;
      this.initialize();
    },
  },
};
</script>
