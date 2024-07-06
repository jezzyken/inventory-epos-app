<template>
  <div v-if="!isLoading">
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
        <v-col cols="12" md="6">
          <v-text-field
            v-model="items.description"
            label="Description"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="items.supplier"
            label="Supplier"
            :items="suppliers"
            item-text="name"
            item-value="_id"
            outlined
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.criticalLimit"
            label="Critical Limit"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            :items="units"
            v-model="items.unit"
            label="Unit"
            item-text="name"
            item-value="_id"
            outlined
          ></v-select>
        </v-col>

        <v-col cols="12" md="9">
          <v-text-field
            v-model="items.image"
            label="Image URL"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="items.type"
            :items="type"
            label="Type"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.productCost"
            label="Product Cost"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.sellingPrice"
            label="Product Price"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="items.stocks"
            label="Intial Stocks"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5" v-if="items.type === 'Variants'">
      <p class="text-button">Variant Information</p>
      <v-divider class="mb-5" />
      <v-row>
        <v-col cols="12" md="5">
          <!-- v-model="items.variant" optional model-->
          <v-select
            :items="variants"
            label="Variants"
            item-text="name"
            @change="onSelectVariant"
            return-object
            outlined
            :loading="isLoadingVariant"
          ></v-select>
        </v-col>
      </v-row>

      <v-row v-for="(vt, i) in variationAttributes" :key="i">
        <v-col cols="6">
          <span>{{ vt.name }}</span>
        </v-col>
        <v-col cols="6">
          <v-combobox
            v-model="vt.selectedValue"
            :items="vt.variant"
            chips
            label="Select variant value"
            multiple
            outlined
            @input="onSelectVariantAttrib"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>

      <v-row v-for="variants in items.variants" :key="variants.skuCode">
        <v-col cols="12" md="3">
          <v-text-field
            :v-model="variants.skuCode"
            label="Product Price"
            :value="`${items.name}-${variants.name}`"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="variants.productCost"
            label="Product Cost"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="variants.sellingPrice"
            label="Selling Price"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="6">
            <v-text-field
              v-model="variants.stocks"
              label="Initial Stocks"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="variants.stockAlert"
              label="Stock Alert"
              outlined
            ></v-text-field>
          </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-row justify="end" class="ma-0 mt-6">
      <v-btn dark :color="pageMode.color" @click="pageMode.action">{{
        pageMode.label
      }}</v-btn>
      <div class="ma-1"></div>
      <v-btn>clear</v-btn>
    </v-row>
  </div>
</template>

<script>
/*eslint-disable */
import variant from "@/store/modules/variant";
import { mapActions } from "vuex";

export default {
  props: {
    mode: String, // 'add' or 'edit'
  },
  data() {
    return {
      items: {
        type: "Standard",
        variants: [],
        image:
          "https://media.istockphoto.com/id/173633236/photo/hand-saw.webp?b=1&s=170667a&w=0&k=20&c=fk-bGhRNrB-MPIvOJXcVw9QE4fyXzJfTQeleMFwVXbA=",
      },
      isLoading: false,
      category: [],
      unit: [],
      variants: [],
      brand: [],
      colors: [],
      units: [],
      suppliers: [],
      type: ["Standard", "Variants"],
      chips: "",
      variationAttributes: [],
      isLoadingVariant: false,
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
      getColorItems: "color/getItem",
      getSupplierItems: "supplier/getItem",
    }),
    async initialize() {
      this.isLoading = true;
      const response = await this.getItemById(this.$route.params.id);
      this.items = {
        ...response.result,
        brand: response.result.brand._id,
        category: response.result.category._id,
        supplier: response.result.supplier._id,
        unit: response.result.unit._id,
      };
      this.isLoading = false;
    },

    async onAddItem() {
      await this.addItem({
        ...this.items,
      });
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
      this.isLoadingVariant = true;
      const category = await this.getCategoryItems();
      const unit = await this.getUnitItems();
      const brand = await this.getBrandItems();
      const variants = await this.getVariantItems();
      const colors = await this.getColorItems();
      const suppliers = await this.getSupplierItems();

      this.category = category.result;
      this.units = unit.result;
      this.brand = brand.result;
      this.variants = variants.result;
      this.colors = colors.result;
      this.suppliers = suppliers.result;
      this.isLoadingVariant = false;
    },

    handleColorPropertiesChange(price) {
      if (price.hasColorProperties === "No") {
        this.$set(price, "color", null);
      }
    },

    onSelectVariant(item) {
      const isExist = this.variationAttributes.find(
        (variant) => variant._id === item._id
      );

      if (!isExist) {
        this.variationAttributes.push({
          ...item,
          variant: item.values,
          variantId: item._id,
        });
      }
    },

    onSelectVariantAttrib() {
      this.items.variants = this.generateVariants(this.variationAttributes);

      console.log(this.variationAttributes);
    },

    generateVariants(attributes) {
      const variants = [];

      const generateCombinations = (attributeIndex, currentCombination) => {
        if (attributeIndex === attributes.length) {
          const name = currentCombination.map((attr) => attr.value).join("-");
          variants.push({
            name: name,
            attributes: [...currentCombination],
          });
          return;
        }
        const attribute = attributes[attributeIndex];
        attribute.selectedValue.forEach((value) => {
          const newCombination = [
            ...currentCombination,
            { key: attribute.name, value: value },
          ];
          generateCombinations(attributeIndex + 1, newCombination);
        });
      };

      generateCombinations(0, []);

      return variants;
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
