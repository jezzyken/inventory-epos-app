<template>
  <div v-if="!isLoading">
    <!-- Product Information Section -->
    <v-card class="mb-6">
      <v-card-title class="headline py-3 grey lighten-4 d-flex align-center">
        <v-icon left color="primary">mdi-package-variant</v-icon>
        Product Information
      </v-card-title>

      <v-card-text class="pt-6">
        <v-row>
          <!-- Left Column - Product Details -->
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="items.name"
                  label="Product Name*"
                  outlined
                  dense
                  placeholder="Enter product name"
                  :rules="[(v) => !!v || 'Name is required']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="items.productCode"
                  label="Product Code*"
                  outlined
                  dense
                  placeholder="Enter product code"
                  :rules="[(v) => !!v || 'Product code is required']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="items.category"
                  label="Category*"
                  :items="category"
                  item-text="name"
                  item-value="_id"
                  outlined
                  dense
                  placeholder="Select category"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="items.brand"
                  label="Brand*"
                  :items="brand"
                  item-text="name"
                  item-value="_id"
                  outlined
                  dense
                  placeholder="Select brand"
                ></v-select>
              </v-col>
            </v-row>

            <v-textarea
              v-model="items.description"
              label="Description"
              outlined
              auto-grow
              rows="3"
              placeholder="Enter product description"
              class="mb-3"
            ></v-textarea>
          </v-col>

          <!-- Right Column - Image Upload -->
          <v-col cols="12" md="4">
            <image-upload
              v-model="items.image"
              class="h-100"
              @error="handleImageError"
            ></image-upload>
          </v-col>
        </v-row>

        <!-- Additional Details Section -->
        <v-divider class="my-6"></v-divider>

        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="items.supplier"
              label="Supplier*"
              :items="suppliers"
              item-text="name"
              item-value="_id"
              outlined
              dense
              placeholder="Select supplier"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="items.unit"
              label="Unit*"
              :items="units"
              item-text="name"
              item-value="_id"
              outlined
              dense
              placeholder="Select unit"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="items.type"
              :items="type"
              label="Product Type*"
              outlined
              dense
              :disabled="pageMode.label === 'update'"
              placeholder="Select type"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="items.criticalLimit"
              label="Critical Limit*"
              outlined
              dense
              type="number"
              placeholder="Enter limit"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Pricing Section -->
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="items.productCost"
              label="Product Cost*"
              outlined
              dense
              type="number"
              prefix="₱"
              placeholder="0.00"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="items.sellingPrice"
              label="Selling Price*"
              outlined
              dense
              type="number"
              prefix="₱"
              placeholder="0.00"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="items.stocks"
              label="Initial Stock*"
              outlined
              dense
              type="number"
              :disabled="pageMode.label === 'update'"
              placeholder="Enter quantity"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Variants Section -->
    <v-card v-if="items.type === 'Variants'" class="mb-6">
      <v-card-title class="headline py-3 grey lighten-4 d-flex align-center">
        <v-icon left color="primary">mdi-shapes</v-icon>
        Variant Information
      </v-card-title>

      <v-card-text class="pt-6">
        <v-row v-show="pageMode.label !== 'update'">
          <v-col cols="12" md="5">
            <v-select
              :items="variants"
              label="Select Variants"
              item-text="name"
              @change="onSelectVariant"
              return-object
              outlined
              dense
              :loading="isLoadingVariant"
              placeholder="Choose variant type"
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-for="(vt, i) in variationAttributes" :key="i" class="mt-3">
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-medium">{{ vt.name }}</div>
          </v-col>
          <v-col cols="12" md="8">
            <v-combobox
              v-model="vt.selectedValue"
              :items="vt.variant"
              chips
              label="Select variant values"
              multiple
              outlined
              dense
              @input="onSelectVariantAttrib"
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  color="primary"
                  text-color="white"
                  small
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>

        <!-- Generated Variants -->
        <v-row
          v-for="variant in items.variants"
          :key="variant.skuCode"
          class="mt-6"
        >
          <v-col cols="12">
            <v-card outlined>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      :value="`${items.name}-${variant.name}`"
                      label="SKU Code"
                      outlined
                      dense
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="variant.productCost"
                          label="Variant Cost"
                          outlined
                          dense
                          type="number"
                          prefix="₱"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="variant.sellingPrice"
                          label="Variant Price"
                          outlined
                          dense
                          type="number"
                          prefix="₱"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="variant.stocks"
                          label="Initial Stock"
                          outlined
                          dense
                          type="number"
                          :disabled="pageMode.label === 'update'"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="variant.stockAlert"
                          label="Stock Alert"
                          outlined
                          dense
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="3">
                    <image-upload v-model="variant.image"></image-upload>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Action Buttons -->
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/product')" :disabled="isLoading">
        <v-icon left>mdi-close</v-icon>
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        :dark="!isLoading"
        :loading="isLoading"
        @click="pageMode.action"
        class="ml-2"
      >
        <v-icon left>{{
          pageMode.label === "add" ? "mdi-plus" : "mdi-content-save"
        }}</v-icon>
        {{ pageMode.label === "add" ? "Add Product" : "Save Changes" }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
/*eslint-disable */
import { mapActions } from "vuex";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  components: {
    ImageUpload,
  },
  props: {
    mode: String, // 'add' or 'edit'
  },
  data() {
    return {
      items: {
        type: "Standard",
        variants: [],
        image:
          "https://lh3.googleusercontent.com/proxy/HtfKFkdagZAMcDYISnQFW_KRwGig586P-ZcBqED8Mo38kf8ONen9NOQMp2is03ezbqq6J8LF6Fm4S8CUi3tQlJDirH0bzUuxkMDVvA1FFrfwKjBma1PC",
      },
      isLoading: false,
      category: [],
      unit: [],
      variants: [],
      brand: [],
      units: [],
      suppliers: [],
      type: ["Standard", "Variants"],
      chips: "",
      variationAttributes: [],
      isLoadingVariant: false,
      test: "sample data",
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
      getSupplierItems: "supplier/getItem",
      uploadImage: "product/uploadImage",
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

    handleImageError(error) {
      this.$store.dispatch("snackbar/showError", error);
    },

    async onAddItem() {
      try {
        this.isLoading = true;
        await this.addItem({
          ...this.items,
        });
        this.$router.push("/product");
      } catch (error) {
        // this.$store.dispatch('snackbar/showError', error.message || 'Error adding product');
      } finally {
        this.isLoading = false;
      }
    },
    async onUpdateItem() {
      try {
        const data = {
          id: this.$route?.params?.id,
          data: this.items,
        };
        await this.updateItem(data);
        this.$router.push("/product");
      } catch (error) {
        this.$store.dispatch("snackbar/showError", "Error updating product");
      }
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
      const suppliers = await this.getSupplierItems();

      this.category = category.result;
      this.units = unit.result;
      this.brand = brand.result;
      this.variants = variants.result;
      this.suppliers = suppliers.result;
      this.isLoadingVariant = false;
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
            name,
            skuCode: "",
            image: null,
            productCost: "",
            sellingPrice: "",
            stocks: 0,
            stockAlert: 5,
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
.headline {
  font-size: 1.25rem !important;
  font-weight: 500;
}

.v-card {
  border-radius: 8px;
}

.v-card__title {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-select.v-select--enclosed .v-select__details {
  margin-bottom: 0;
}

.variant-card {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
