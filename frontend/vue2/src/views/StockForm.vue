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
            return-object
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex">
            <v-select
              v-model="items.product"
              label="Products"
              :items="products"
              item-text="name"
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
              <th class="text-left">Prooduct</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, i) in stocks" :key="i">
              <td class="pa-5">
                <v-text-field
                  v-model="stock.product.name"
                  label="Product"
                  outlined
                  hide-details
                  dense
                  readonly
                ></v-text-field>
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
                <v-btn dark color="error" x-small fab>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
      getProductItemPrices: "product/getItemPrices",
      addItem: "stock/addItem",
      getSupplierItems: "supplier/getItem",
      getStockById: "stock/getItemById",
      updateItem: "stock/updateItem",
    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getStockById(this.$route.params.id);
      const productPrices = await this.getProductItemPrices(
        response.result.product._id
      );

      this.prices = productPrices.result[0].prices;
      this.variantId = response.result.variant._id;

      this.items = {
        ...response.result,
        variant: response.result.variant.name,
      };
      this.isLoading = false;
    },

    async onSelectItem(item) {

      const data = {
        product: {
          name: item.name,
          type: item.type,
        },
        productId: item._id,
        supplier: this.items.supplier._id,
      };

      if(item.type === 'Variants'){
        data.variantId = item.variants._id
      }

      this.stocks.push(data);
    },

    async onAddItem() {
      await this.addItem(this.stocks);
      // this.$router.push("/stock");
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: {
          date: this.items.date,
          product: this.items.product._id,
          supplier: this.items.supplier._id,
          variant: this.variantId,
          quantity: this.items.quantity,
        },
      };
      await this.updateItem(data);
      this.$router.push("/stock");
    },

    onDeleteItem(i) {
      this.stocks.splice(i, 1);
    },

    hasColorProperties(price) {
      return price && price.hasColorProperties === "Yes";
    },

    getVariants(stock) {
      this.variantId = stock?.variant?._id;
      return stock.prices.map((price) => price.variant);
    },
    getSelectedPrice(stock) {
      return stock.prices.find(
        (price) => price.variant.name === stock.variants.name
      );
    },

    // onSelectVariant(item) {
    //   this.productId = item._id;
    //   this.variantId = item.variant._id;
    //   let filteredColor = this.colors.find(
    //     (color) => color.id === this.productId
    //   );
    //   this.variantColorItems = filteredColor.color;
    //   this.hasColorProperties = item.hasColorProperties;
    //   console.log(this.variantColorItems);
    // },

    // onSelectColor(item) {
    //   this.variantId = item.color._id;
    // },

    async fetch() {
      const suppliers = await this.getSupplierItems();
      const products = await this.getProductItems();
      this.suppliers = suppliers.result;
      this.products = products.result.map((product) => {
        if (product.type === "Variants") {
          product.name = `${product.name}-${product.variants.name}`;
        }
        return product;
      });
    },
  },

  watch: {
    hasColorProperties(val) {
      console.log(val);
      return val;
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
