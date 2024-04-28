<template>
  <v-container v-if="!isLoading">
    <div v-if="mode === 'add'">
      <v-sheet elevation="1" class="pa-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="items.date" label="Date" outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="items.supplier" label="Supplier" :items="suppliers" item-text="name" return-object
              outlined></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <div class="d-flex">
              <v-select v-model="items.product" label="Products" :items="products" item-text="name" outlined
                @change="onSelectItem" return-object></v-select>
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
                <th class="text-left">Product Code</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Supplier</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stock, i) in stocks" :key="i">
                <td class="pa-5">
                  <v-text-field v-model="stock.productName" label="Product" outlined hide-details dense></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="stock.productCode" label="Product Code" outlined hide-details
                    dense></v-text-field>
                </td>
                <td>
                  <div class="d-flex justify-center">
                    <v-btn dark color="primary" small fab>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <div style="width: 75px">
                      <v-text-field v-model="stock.quantity" class="text-center mx-2" outlined hide-details
                        dense></v-text-field>
                    </div>
                    <v-btn dark color="primary" small fab>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </div>
                </td>
                <td>
                  <v-text-field v-model="stock.supplierName" label="Supplier" outlined hide-details
                    dense></v-text-field>
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

    </div>

    <div v-else>
      <v-sheet elevation="1" class="pa-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="items.date" label="Date" outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="items.supplier" label="Supplier" :items="suppliers" item-text="name" return-object
              outlined></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex">
              <v-select v-model="items.product" label="Products" :items="products" item-text="name" outlined
                @change="onSelectItem" return-object></v-select>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex">
              <v-text-field v-model="items.quantity" label="Quantity" outlined></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
    <v-row justify="start" class="ma-0 mt-6">

      <v-btn dark :color="buttonState.color" @click="buttonState.action">{{ buttonState.label
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
        stocks: []
      },
      isLoading: false,
      category: [],
      unit: [],
      variant: [],
      brand: [],
      products: [],
      suppliers: [],
      stocks: []
    };
  },
  computed: {
    buttonState() {
      let state = {
        color: 'warning',
        action: this.onUpdateItem,
        label: "update"
      }
      if (this.mode === 'add') {
        state = {
          color: 'primary',
          action: this.onAddItem,
          label: "add"
        }
      }
      return state
    }
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
      addItem: "stock/addItem",
      getSupplierItems: "supplier/getItem",
      getStockById: "stock/getItemById",
      updateItem: "stock/updateItem",

    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getStockById(this.$route.params.id);
      console.log(response)
      this.items = response.result;
      this.isLoading = false;
    },

    onSelectItem() {
      const data = {
        product: this.items.product._id,
        supplier: this.items.supplier._id,
        productName: this.items.product.name,
        supplierName: this.items.supplier.name,
        productCode: this.items.product.productCode,

      }
      this.stocks.push(data)
    },

    async onAddItem() {
      const data = this.stocks.map(item => (
        {
          ...item,
          date: this.items.date || new Date()
        }
      ))
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
          quantity: this.items.quantity
        }
      }
      await this.updateItem(data)
      this.$router.push("/stock");
    },

    async fetch() {
      const suppliers = await this.getSupplierItems();
      const products = await this.getProductItems();
      this.suppliers = suppliers.result;
      this.products = products.result;
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
