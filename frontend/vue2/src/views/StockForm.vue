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

    <v-card v-for="(stock, i) in stocks" :key="i" class="pa-5 mt-5">
      <v-card-title class="mb-4 pa-0">{{ stock.productName }}</v-card-title>

      <v-row class="mb-5">
        <v-col>
          <v-select
            v-model="stock.variants"
            label="Products"
            :items="getVariants(stock)"
            item-text="name"
            outlined
            hide-details
            dense
            return-object
          ></v-select>

          <!-- @change="onSelectVariant" -->
        </v-col>

        <!-- v-if="stock.color.length != 0" -->
        <!-- v-if="hasColorProperties == 'Yes'" -->
        <v-col>
          <v-select
            v-if="stock.variants && hasColorProperties(getSelectedPrice(stock))"
            v-model="stock.colors"
            label="Colors"
            :items="getSelectedPrice(stock).color"
            item-text="name"
            outlined
            hide-details
            dense
            return-object
          >
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-select>
        </v-col>

        <v-col>
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
        </v-col>

        <v-col>
          <v-text-field
            v-model="stock.supplierName"
            label="Supplier"
            outlined
            hide-details
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <!-- <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Prooduct</th>
                <th class="text-left">Product Code</th>
                <th class="text-left">Variants</th>
                <th class="text-left">Colors</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Supplier</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stock, i) in stocks" :key="i">
                <td class="pa-5">
                  <v-text-field
                    v-model="stock.productName"
                    label="Product"
                    outlined
                    hide-details
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="stock.productCode"
                    label="Product Code"
                    outlined
                    hide-details
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-select
                    v-model="stock.variants"
                    label="Products"
                    :items="stock.prices"
                    item-text="variant.name"
                    outlined
                    hide-details
                    dense
                    return-object
                  ></v-select>
                </td>
                <td>
                  <v-select
                    v-model="stock.colors"
                    label="Products"
                    :items="stock.prices"
                    item-text="color.name"
                    outlined
                    hide-details
                    dense
                    return-object
                  ></v-select>
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
                  <v-text-field
                    v-model="stock.supplierName"
                    label="Supplier"
                    outlined
                    hide-details
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-btn
                    dark
                    color="error"
                    x-small
                    fab
                    @click="onDeleteItem(i)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
</v-simple-table> -->
    <!-- </div> -->

    <!-- <div v-else>
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

          <v-col cols="12" md="3">
            <div class="d-flex">
              <v-select
                v-model="items.variant"
                label="Products"
                :items="prices"
                item-text="variant.name"
                outlined
                return-object
                @change="onSelectVariant"
              ></v-select>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <div class="d-flex">
              <v-text-field
                v-model="items.quantity"
                label="Quantity"
                outlined
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </div> -->
    <v-row justify="start" class="ma-0 mt-6">
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
      getProductItems: "product/getItem",
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

    async onSelectItem() {
      const productPrices = await this.getProductItemPrices(
        this.items.product._id
      );
      this.prices = productPrices.result[0].prices;

      this.prices.forEach((element) => {
        this.colors.push({ color: element.color, id: element._id });
      });

      const data = {
        product: this.items.product._id,
        supplier: this.items.supplier._id,
        productName: this.items.product.name,
        supplierName: this.items.supplier.name,
        productCode: this.items.product.productCode,
        prices: productPrices.result[0].prices,
      };

      this.stocks.push(data);
    },

    async onAddItem() {

      const data = this.stocks
        .map((item) => ({
          ...item,
          variant: item.variant,
          color: item.colors?._id,
          date: this.items.date || new Date(),
        }))
        .map(({ prices, variants, ...item }) => item);

      await this.addItem(data);
      this.$router.push("/stock");
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
      this.products = products.result;
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
