<template>
  <v-container v-if="!isLoading">
    <v-sheet elevation="1" class="pa-5">
      <p class="text-button">Product Information</p>
      <v-divider class="mb-5" />
      <v-row>
        <v-col cols="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="items.date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="items.date"
                label="Date"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="items.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(items.date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <div class="d-flex">
            <v-autocomplete
              v-model="items.product"
              label="Products"
              :items="products"
              item-text="name"
              item-value="productCode"
              outlined
              @change="onSelectItem"
              return-object
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <p class="text-button">Adjustments</p>
      <v-divider class="mb-5" />
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-left">Product Code</th>
              <th class="text-left">Stocks</th>
              <th class="text-center">Quantity</th>
              <th class="text-left" width="20%">Type</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, i) in items.stocks" :key="i">
              <td class="pa-5">
                <span>{{ stock.name }}</span>
              </td>
              <td class="pa-5">
                <span>{{ stock.productCode }}</span>
              </td>
              <td class="pa-5">
                <span>{{ stock.availableStocks }}</span>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <v-btn dark color="primary" small fab>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <div style="width: 75px">
                    <v-text-field
                      v-model="stock.quantity"
                      class="text-center mx-2"
                      outlined
                      hide-details
                      dense
                    ></v-text-field>
                  </div>
                  <v-btn dark color="primary" small fab>
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </td>
              <td>
                <div class="my-4">
                  <v-select
                    v-model="stock.operation"
                    label="Operation"
                    :items="operationType"
                    outlined
                    hide-details=""
                  />
                </div>
              </td>
              <td>
                <v-btn dark color="error" small @click="onDeleteItem(stock, i)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5" v-if="items.stocks != 0">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="items.reason"
            label="Reason"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-row justify="end" class="ma-0 mt-6">
      <v-btn dark :color="buttonState.color" @click="buttonState.action">{{
        buttonState.label
      }}</v-btn>
      <div class="ma-1"></div>
      <v-btn>clear</v-btn>
    </v-row>
  </v-container>
</template>

<script>
/*eslint-disable */
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    mode: String,
  },
  data() {
    return {
      items: {
        stocks: [],
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      isLoading: false,
      category: [],
      unit: [],
      prices: [],
      brand: [],
      products: [],
      suppliers: [],
      stocks: [],
      variants: [],
      colors: [],
      variantColorItems: [],
      variantId: null,
      productId: null,
      status: ["Pending", "Completed"],
      deleteItemId: [],
      operationType: ["Addition", "Subtraction"],
      menu: false,
    };
  },
  computed: {
    buttonState() {
      let state = {
        color: "warning",
        action: this.onUpdateItem,
        label: "update",
      };
      if (this.mode === "add") {
        state = {
          color: "primary",
          action: this.onAddItem,
          label: "add",
        };
      }
      return state;
    },
  },

  async created() {
    this.fetch();
    if (this.$route?.params?.id) {
      this.initialize();
    }
  },

  methods: {
    ...mapActions({
      getProductItems: "product/getItems",
      addItem: "adjustment/addItem",
      getSupplierItems: "supplier/getItem",
      getAdjustmentById: "adjustment/getItemById",
      updateItem: "adjustment/updateItem",
      deleteItem: "stockItem/deleteItem",
    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getAdjustmentById(this.$route.params.id);

      const { reason, date, items } = response.result[0];

      this.items.date = moment(date).format("YYYY-MM-DD");
      this.items.reason = reason;

      for (let item of items) {
        const data = {
          name: item.product.name,
          quantity: item.quantity,
          availableStocks: item.product.stocks,
          product: item.product._id,
          items_id: item.item_id,
          operation: item.operation,
        };

        if (item.product.type === "Variants") {
          data.variant = item.variant._id;
          data.name = `${item.product.name}-${item.variant.name}`;
          data.availableStocks = item.variant.stocks;
        }

        this.items.stocks.push(data);
      }

      this.isLoading = false;
    },

    async onSelectItem(item) {
      const existingItem = this.items.stocks.find((stock) =>
        item.type === "Variants"
          ? stock.product === item._id && stock.variant === item.variants._id
          : stock.product === item._id
      );

      if (!existingItem) {
        const data = {
          product: item._id,
          name: item.name,
          availableStocks: item.stocks,
        };

        if (item.type === "Variants") {
          data.variant = item.variants._id;
          data.name = item.name;
          data.availableStocks = item.variants.stocks;
        }

        this.items.stocks.push(data);
      }
    },

    async onAddItem() {
      const data = {
        date: this.items.date,
        stocks: this.items.stocks,
        reason: this.items.reason,
      };
      await this.addItem(data);
      this.$router.push("/adjustment");
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: {
          date: this.items.date,
          reason: this.items.reason,
          status: this.items.status,
          stocks: this.items.stocks,
          deletedItems: this.deleteItemId,
        },
      };
      await this.updateItem(data);
      this.$router.push("/adjustment");
    },

    async onDeleteItem(stock = null, i) {
      this.items.stocks.splice(i, 1);
      if (stock.items_id) {
        if (!this.deleteItemId.includes(stock.items_id)) {
          this.deleteItemId.push(stock.items_id);
        }
      }
    },

    async fetch() {
      const suppliers = await this.getSupplierItems();
      const products = await this.getProductItems();
      this.suppliers = suppliers.result;
      this.products = products.result.map((product) => {
        if (product.type === "Variants") {
          product.name = `${product.name}-${product.variants.name}`;
          product.productCode = product.variants.productCode;
        }
        return product;
      });
    },
  },
};
</script>

<style scoped>
.v-text-field .v-input__control .v-input__slot {
  min-width: 30px !important;
  display: flex !important;
  align-items: center !important;
}
</style>
