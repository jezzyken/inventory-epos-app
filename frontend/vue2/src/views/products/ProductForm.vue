<template>
  <v-container v-if="!isLoading">
    <v-sheet elevation="1" class="pa-5">
      <p class="text-button">Product Information</p>
      <v-divider class="mb-5" />
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.name"
            label="Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.productCode"
            label="Product Code"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="items.category"
            label="Category"
            :items="category"
            item-text="name"
            item-value="_id"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="items.brand"
            label="Brand"
            :items="brand"
            item-text="name"
            item-value="_id"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="items.criticalLimit"
            label="Critical Limit"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="items.description"
            label="Description"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="items.image"
            label="Image URL"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <p class="text-button">Product Price</p>
      <v-divider class="mb-5" />
      <v-sheet
        v-for="(price, i) in items.prices"
        :key="i"
        elevation="1"
        class="pa-5 mb-4 price-container"
      >
        <v-btn
          dark
          color="error"
          x-small
          fab
          @click="onDeleteItem(i)"
          class="price-close-btn"
          v-if="items.prices.length > 1"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row>
          <v-col cols="12" md="3">
            <div class="d-flex align-center">
              <span class="mr-2">Has color properties?:</span>
              <v-radio-group
                v-model="price.hasColorProperties"
                row
                @change="handleColorPropertiesChange(price)"
              >
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
          <v-col cols="12" md="3" v-if="price.hasColorProperties === 'Yes'">
            <v-select
              v-model="price.color"
              :items="colors"
              label="Color"
              item-text="name"
              item-value="_id"
              auto-select-first
              multiple
              outlined
              class="mt-3"
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="price.unit"
              :items="unit"
              label="Unit"
              item-text="name"
              item-value="_id"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="price.variant"
              :items="variant"
              label="Variant"
              item-text="name"
              item-value="_id"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="price.itemPrice"
              label="Item Price"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="price.salePrice"
              label="Sale Price"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-sheet>

      <v-row justify="end" class="ma-0">
        <v-btn dark color="primary" @click="addPrice">Add price</v-btn>
      </v-row>
    </v-sheet>

    <v-row justify="start" class="ma-0 mt-6">
      <v-btn dark :color="pageMode.color" @click="pageMode.action">{{
        pageMode.label
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
    mode: String, // 'add' or 'edit'
  },
  data() {
    return {
      items: {
        image:
          "https://media.istockphoto.com/id/173633236/photo/hand-saw.webp?b=1&s=170667a&w=0&k=20&c=fk-bGhRNrB-MPIvOJXcVw9QE4fyXzJfTQeleMFwVXbA=",
        prices: [
          {
            hasColorProperties: "No",
            color: null,
          },
        ],
      },
      // priceItem: [{}],
      isLoading: false,
      category: [],
      unit: [],
      variant: [],
      brand: [],
      colors: [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
        "black",
        "white",
      ],
      hasColorProperties: "No",
    };
  },
  computed: {
    pageMode() {
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
      getItemById: "product/getItemById",
      getItemByProductId: "itemPrice/getItemByProductId",
      addItem: "product/addItem",
      updateItem: "product/updateItem",
      getCategoryItems: "category/getItem",
      getVariantItems: "variant/getItem",
      getUnitItems: "unit/getItem",
      getBrandItems: "brand/getItem",
    }),
    async initialize() {
      this.isLoading = true;
      const response = await this.getItemById(this.$route.params.id);
      this.items = {
        ...response.result,
        brand: response.result.brand._id,
        category: response.result.category._id,
        prices: response.result.prices.map((item) => ({
          ...item,
          unit: item.unit?._id,
          variant: item.variant._id,
        })),
      };
      this.isLoading = false;
    },

    addPrice() {
      this.items.prices.push({});
    },

    async onAddItem() {
      await this.addItem(this.items);
      this.$router.push("/product");
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: this.items,
      };
      await this.updateItem(data);
      this.$router.push("/product");
    },

    onDeleteItem(i) {
      this.items.prices.splice(i, 1);
    },

    async fetch() {
      const category = await this.getCategoryItems();
      const unit = await this.getUnitItems();
      const brand = await this.getBrandItems();
      const variant = await this.getVariantItems();
      this.category = category.result;
      this.unit = unit.result;
      this.brand = brand.result;
      this.variant = variant.result;
    },

    handleColorPropertiesChange(price) {
      if (price.hasColorProperties === "No") {
        this.$set(price, "color", null);
      }
    },
  },
};
</script>

<style scoped>
.price-container {
  position: relative;
}

.price-close-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px 10px 0px 0px;
}
</style>
