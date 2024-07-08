<template>
  <v-container v-if="!isLoading">
    <!-- <div v-if="mode === 'add'"> -->
    <v-sheet elevation="1" class="pa-5">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="items.date"
            label="Date"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="items.supplier"
            label="Supplier"
            :items="suppliers"
            item-text="name"
            item-value="_id"
            return-object
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12">
          <div class="d-flex">
            <v-select
              v-model="items.product"
              label="Products"
              :items="products"
              item-text="name"
              item-value="productCode"
              outlined
              @change="onSelectItem"
              return-object
            ></v-select>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-left">Stocks</th>
              <th class="text-center">Quantity</th>
              <th class="text-left">Supplier</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, i) in items.stocks" :key="i">
              <td class="pa-5">
                <span>{{ stock.name }}</span>
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
              <td class="pa-5">
                <div style="width: 80%">
                  <v-select
                    v-model="stock.supplier"
                    label="Supplier"
                    :items="suppliers"
                    item-text="name"
                    item-value="_id"
                    outlined
                    hide-details
                  ></v-select>
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
            v-model="items.notes"
            label="Notes"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="items.status"
            label="Status"
            :items="status"
            outlined
          ></v-select>
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

export default {
  props: {
    mode: String,
  },
  data() {
    return {
      items: {
        stocks: [],
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
      addItem: "stock/addItem",
      getSupplierItems: "supplier/getItem",
      getStockById: "stock/getItemById",
      updateItem: "stock/updateItem",
      deleteItem: "stockItem/deleteItem",
    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getStockById(this.$route.params.id);

      const { status, notes, date, items } = response.result[0];

      this.items.status = status;
      this.items.notes = notes;
      this.items.date = date;


      for (let item of items) {
        const data = {
          name: item.product.name,
          quantity: item.quantity,
          availableStocks: item.product.stocks,
          supplier: item.supplier._id,
          product: item.product._id,
          items_id: item.item_id,
        };

        if (item.product.type === "Variants") {
          data.variant = item.variant._id;
          data.name = `${item.product.name}-${item.variant.name}`
          data.availableStocks = item.variant.stocks
        }

        this.items.stocks.push(data);
      }

      this.isLoading = false;
    },

    async onSelectItem(item) {
      const data = {
        product: item._id,
        supplier: this.items.supplier._id,
        name: item.name,
        availableStocks: item.availableStocks,
      };

      if (item.type === "Variants") {
        data.variant = item.variants._id;
      }

      this.items.stocks.push(data);
    },

    async onAddItem() {
      const data = {
        date: this.items.date,
        notes: this.items.notes,
        status: this.items.status,
        stocks: this.items.stocks,
      };
      await this.addItem(data);
      this.$router.push("/stock");
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: {
          date: this.items.date,
          notes: this.items.notes,
          status: this.items.status,
          stocks: this.items.stocks,
          deletedItems: this.deleteItemId
        },
      };
      await this.updateItem(data);
      this.$router.push("/stock");
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
