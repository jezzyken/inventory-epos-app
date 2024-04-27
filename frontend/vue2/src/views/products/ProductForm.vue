<template>
  <v-container v-if="!isLoading">
    <v-sheet elevation="1" class="pa-5">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="items.name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="items.productCode" label="Product Code"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="items.category" label="Select" :items="category" item-text="name" item-value="_id"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="items.brand" label="Select" :items="brand" item-text="name" item-value="_id"></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field v-model="items.criticalLimit" label="Critical Limit"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="items.description" label="Description"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="items.image" label="Image URL"></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Unit</th>
              <th class="text-left">Variant</th>
              <th class="text-left">Item Price</th>
              <th class="text-left">Sale Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, i) in items.prices" :key="i">
              <td>
                <v-select v-model="price.unit" :items="unit" label="Select" item-text="name" item-value="_id"></v-select>
              </td>
              <td>
                <v-select v-model="price.variant" :items="variant" label="Select" item-text="name" item-value="_id"></v-select>
              </td>
              <td>
                <v-text-field v-model="price.itemPrice" label="Sale Price"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="price.salePrice" label="Item Price"></v-text-field>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row justify="end" class="ma-4">
        <v-btn dark color="primary" @click="addPrice">Add price</v-btn>
      </v-row>
    </v-sheet>

    <v-row justify="start" class="ma-0 mt-6">
      <v-btn dark color="primary" @click="onAddItem">add</v-btn>
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
    mode: String, // 'add' or 'edit'
  },
  data() {
    return {
      items: {
        image:
          "https://media.istockphoto.com/id/173633236/photo/hand-saw.webp?b=1&s=170667a&w=0&k=20&c=fk-bGhRNrB-MPIvOJXcVw9QE4fyXzJfTQeleMFwVXbA=",
          prices: [{}]
      },
      // priceItem: [{}],
      isLoading: false,
      category: [],
      unit: [],
      variant: [],
      brand: []
    };
  },
  async created() {
    this.fetch()
    if (this.$route?.params?.id) {
      this.initialize();
    }
  },

  methods: {
    ...mapActions({
      getItemById: "product/getItemById",
      getItemByProductId: "itemPrice/getItemByProductId",
      addItem: "product/addItem",
      getCategoryItems: "category/getItem",
      getVariantItems: "variant/getItem",
      getUnitItems: "unit/getItem",
      getBrandItems: "brand/getItem"

    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getItemById(this.$route.params.id);
      const priceResponse = await this.getItemByProductId(this.$route.params.id)
      this.items = response.result;
      this.priceItem = priceResponse.result

      this.isLoading = false;
    },

    addPrice() {
      this.items.prices.push({});
    },

    async onAddItem() {
      await this.addItem({ ...this.items, prices: this.priceItem });
    },

    async fetch() {
      const category = await this.getCategoryItems()
      const unit = await this.getUnitItems()
      const brand = await this.getBrandItems()
      const variant = await this.getVariantItems()
      this.category = category.result
      this.unit = unit.result
      this.brand = brand.result
      this.variant = variant.result
    }
  },
};
</script>
