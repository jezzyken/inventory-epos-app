<template>
  <v-container v-if="!isLoading">
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
          <v-text-field
            v-model="items.customer"
            label="Customer"
            outlined
          ></v-text-field>
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
              <th class="text-left">Price</th>
              <th class="text-left">Stocks</th>
              <th class="text-center">Quantity</th>
              <th class="text-left">Sub Total</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, i) in items.stocks" :key="i">
              <td class="pa-5">
                <span>{{ stock.name }}</span>
              </td>
              <td class="pa-5">
                <span>{{ stock.sellingPrice }}</span>
              </td>
              <td class="pa-5">
                <span>{{ stock.availableStocks }}</span>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <v-btn
                    dark
                    color="primary"
                    small
                    fab
                    @click="incrementQuantity(i)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <div style="width: 75px">
                    <v-text-field
                      v-model="stock.quantity"
                      class="text-center mx-2"
                      outlined
                      hide-details
                      dense
                      @input="updateSubTotal(i)"
                    ></v-text-field>
                  </div>
                  <v-btn
                    dark
                    color="primary"
                    small
                    fab
                    @click="decrementQuantity(i)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </td>
              <td class="pa-5">
                <span>{{ stock.subTotal.toFixed(2) }}</span>
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

      <v-row justify="end" class="mt-5">
        <v-simple-table style="width: 30%" class="outside-bordered-table">
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="pa-5">
                  <span>Total</span>
                </td>
                <td class="pa-5">
                  <span>{{ total }}</span>
                </td>
              </tr>
              <tr>
                <td class="pa-5">
                  <span>Discount</span>
                </td>
                <td class="pa-5">
                  <span>{{ discount }}</span>
                </td>
              </tr>
              <tr>
                <td class="pa-5">
                  <span>Grand total</span>
                </td>
                <td class="pa-5">
                  <span>{{ grandTotal }}</span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-sheet>
    <v-sheet elevation="1" class="pa-5 mt-5" v-if="items.stocks != 0">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.discount"
            label="Discount"
            outlined
            @input="onAddDiscount(items.discount)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="items.paymentType"
            label="Payment"
            :items="payment"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.cash"
            label="Cash"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.change"
            label="Change"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="items.notes"
            label="Notes"
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
      stocks: [],
      variants: [],
      colors: [],
      variantColorItems: [],
      variantId: null,
      productId: null,
      payment: ["Cash", "Dedit"],
      deleteItemId: [],
      discount: 0,
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

    total() {
      const subtotal = this.items.stocks.reduce((total, stock) => {
        const subtotal =
          parseFloat(stock.sellingPrice) * parseInt(stock.quantity || 0);
        return total + subtotal;
      }, 0);

      return subtotal
    },

    grandTotal() {
      const subtotal = this.items.stocks.reduce((total, stock) => {
        const subtotal =
          parseFloat(stock.sellingPrice) * parseInt(stock.quantity || 0);
        return total + subtotal;
      }, 0);

      return subtotal - this.discount;
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
      getStockById: "stock/getItemById",
      updateItem: "stock/updateItem",
      deleteItem: "stockItem/deleteItem",
    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getStockById(this.$route.params.id);

      const { status, notes, date, items } = response.result[0];
      console.log(response);

      this.items.status = status;
      this.items.notes = notes;
      this.items.date = date;

      for (let item of items) {
        const data = {
          name: item.product.name,
          quantity: item.quantity,
          availableStocks: item.product.stocks,
          product: item.product._id,
          items_id: item.item_id,
          sellingPrice: item.sellingPrice,
          subTotal:
            parseFloat(item.sellingPrice) * parseInt(item.quantity || 0),
        };

        if (item.product.type === "Variants") {
          data.variant = item.variant._id;
          data.name = `${item.product.name}-${item.variant.name}`;
          data.availableStocks = item.variant.stocks;
          data.sellingPrice = item.variant.sellingPrice;
        }

        console.log(data);

        this.items.stocks.push(data);
      }

      this.isLoading = false;
    },

    async onSelectItem(item) {
      const data = {
        product: item._id,
        name: item.name,
        availableStocks: item.availableStocks,
        sellingPrice: item.sellingPrice,
        quantity: 0,
        subTotal: 0,
      };

      if (item.type === "Variants") {
        data.variant = item.variants._id;
        data.sellingPrice = item.variants.sellingPrice;
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
          deletedItems: this.deleteItemId,
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
      const products = await this.getProductItems();
      this.products = products.result.map((product) => {
        if (product.type === "Variants") {
          product.name = `${product.name}-${product.variants.name}`;
          product.productCode = product.variants.productCode;
        }
        return product;
      });
    },
    updateSubTotal(index) {
      const stock = this.items.stocks[index];
      stock.subTotal =
        parseFloat(stock.sellingPrice) * parseInt(stock.quantity || 0);
    },

    incrementQuantity(index) {
      this.items.stocks[index].quantity++;
      this.updateSubTotal(index);
    },

    decrementQuantity(index) {
      if (this.items.stocks[index].quantity > 0) {
        this.items.stocks[index].quantity--;
        this.updateSubTotal(index);
      }
    },
    onAddDiscount(discount) {
      this.discount = discount;
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
.outside-bordered-table {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.outside-bordered-table thead {
  background-color: rgba(0, 0, 0, 0.03);
}

.outside-bordered-table thead th {
  font-weight: bold;
}
</style>
