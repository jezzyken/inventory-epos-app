<template>
  <div class="adjustment-management">
    <v-overlay :value="isFetching" :absolute="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- Top Header Bar -->
    <v-app-bar elevation="1" color="white">
      <v-container class="py-1">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-btn icon @click="$router.push('/adjustment')">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h1 class="text-h5 ml-3 grey--text text--darken-3">
              {{ mode === "add" ? "New Adjustment" : "Edit Adjustment" }}
            </h1>
          </div>
          <div>
            <v-btn text class="mr-2" @click="$router.push('/adjustment')">
              Cancel
            </v-btn>
            <v-btn :color="buttonState.color" :loading="isSubmitting" :disabled="!isFormValid || isSubmitting"
              @click="buttonState.action" elevation="1">
              {{ buttonState.label }}
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-container class="pt-10">
      <div class="max-width-container">
        <!-- Quick Actions Panel -->
        <v-sheet class="pa-4 mb-6" rounded elevation="1">
          <div class="d-flex flex-wrap align-center">
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
              min-width="auto" class="flex-grow-0 mr-4">
              <template v-slot:activator="{ on, attrs }">
                <div class="date-selector">
                  <div class="caption grey--text">Date</div>
                  <div class="d-flex align-center cursor-pointer" v-bind="attrs" v-on="on">
                    <span class="subtitle-1">{{ formatDate(items.date) }}</span>
                    <v-icon right size="20" class="ml-2">mdi-calendar</v-icon>
                  </div>
                </div>
              </template>
              <v-date-picker v-model="items.date" no-title scrollable @input="menu = false">
              </v-date-picker>
            </v-menu>

            <div class="flex-grow-1">
              <div class="caption grey--text mb-1">Add Product</div>
              <v-autocomplete v-model="items.product" :items="products" :loading="isFetching" :disabled="isFetching"
                item-text="name" item-value="productCode" placeholder="Search and select products..."
                @change="onSelectItem" return-object hide-details dense outlined clearable class="product-select">
                <template v-slot:progress>
                  <v-progress-linear color="primary" indeterminate absolute height="2"></v-progress-linear>
                </template>
              </v-autocomplete>
            </div>
          </div>
        </v-sheet>

        <!-- Adjustment Items List -->
        <div class="adjustment-items mb-6">
          <div class="d-flex align-center mb-4">
            <span class="text-subtitle-1 font-weight-medium">Adjustment Items</span>
            <v-chip class="ml-3" small :color="items.stocks.length ? 'primary' : 'grey'" text-color="white">
              {{ items.stocks.length }} items
            </v-chip>
          </div>

          <div v-if="items.stocks.length" class="adjustment-list">
            <div v-for="(stock, index) in items.stocks" :key="index" class="adjustment-item">
              <div class="d-flex align-center justify-space-between pa-4">
                <div class="item-details flex-grow-1">
                  <div class="subtitle-1">{{ stock.name }}</div>
                  <div class="caption grey--text">
                    Available Stock: {{ stock.availableStocks }}
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-select v-model="stock.operation" :items="operationType" class="mr-4" style="width: 150px"
                    hide-details dense outlined></v-select>
                  <div class="quantity-control d-flex align-center mr-4">
                    <v-btn icon small @click="decrementQuantity(stock)" :disabled="!stock.quantity">
                      <v-icon small>mdi-minus</v-icon>
                    </v-btn>
                    <v-text-field v-model="stock.quantity" type="number" min="0" class="quantity-input mx-2"
                      hide-details dense outlined @input="validateQuantity($event, stock)"></v-text-field>
                    <v-btn icon small @click="incrementQuantity(stock)">
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <v-btn icon color="grey lighten-1" @click="onDeleteItem(stock, index)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-divider v-if="index !== items.stocks.length - 1"></v-divider>
            </div>
          </div>

          <v-sheet v-else class="empty-state pa-8 text-center" rounded>
            <v-icon size="64" color="grey lighten-2" class="mb-4">
              mdi-package-variant
            </v-icon>
            <div class="text-subtitle-1 grey--text mb-2">
              No items added yet
            </div>
            <div class="caption grey--text">
              Use the product selector above to add items for adjustment
            </div>
          </v-sheet>
        </div>

        <!-- Additional Details -->
        <v-sheet v-if="items.stocks.length" rounded elevation="1" class="pa-4">
          <div class="text-subtitle-1 font-weight-medium mb-4">
            Additional Details
          </div>
          <v-row>
            <v-col cols="12" md="8">
              <v-textarea v-model="items.reason" label="Reason" placeholder="Add reason for adjustment..." rows="3"
                outlined hide-details class="mb-4"></v-textarea>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </v-container>
  </div>
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
      isFetching: false,
      isSubmitting: false,
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
        label: "update adjustment",
      };
      if (this.mode === "add") {
        state = {
          color: "primary",
          action: this.onAddItem,
          label: "add adjustment",
        };
      }
      return state;
    },

    isFormValid() {
      return this.items.stocks.length > 0 &&
        this.items.stocks.every(stock => stock.quantity > 0) &&
        this.items.reason?.trim()
    }
  },

  async created() {
    console.log({ mode: this.mode })
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

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

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
          quantity: 0, // Add default quantity
          operation: "Addition", // Add default operation type
          productCode: item.productCode, // Add product code for display
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
      this.isSubmitting = true;
      try {
        const data = {
          date: this.items.date,
          stocks: this.items.stocks,
          reason: this.items.reason,
        };
        await this.addItem(data);
        this.$router.push("/adjustment");
      } catch (error) {
        console.error("Error adding item:", error);
      } finally {
        this.isSubmitting = false;
      }
    },

    async onUpdateItem() {
      this.isSubmitting = true;
      try {
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
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        this.isSubmitting = false;
      }
    },

    async onDeleteItem(stock = null, i) {
      this.items.stocks.splice(i, 1);
      if (stock.items_id) {
        if (!this.deleteItemId.includes(stock.items_id)) {
          this.deleteItemId.push(stock.items_id);
        }
      }
    },

    incrementQuantity(stock) {
      if (!stock.quantity) stock.quantity = 0;
      stock.quantity = parseInt(stock.quantity) + 1;
    },

    decrementQuantity(stock) {
      if (!stock.quantity) stock.quantity = 0;
      stock.quantity = Math.max(0, parseInt(stock.quantity) - 1);
    },

    validateQuantity(value, stock) {
      const parsedValue = parseInt(value);
      if (isNaN(parsedValue) || parsedValue < 0) {
        stock.quantity = 0;
      } else {
        stock.quantity = parsedValue;
      }
    },

    async fetch() {
      this.isFetching = true;
      try {
        const [suppliers, products] = await Promise.all([
          this.getSupplierItems(),
          this.getProductItems(),
        ]);

        this.suppliers = suppliers.result;
        this.products = products.result.map((product) => {
          if (product.type === "Variants") {
            product.name = `${product.name}-${product.variants.name}`;
            product.productCode = product.variants.productCode;
          }
          return product;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isFetching = false;
      }
    },
  },
};
</script>

<style scoped>
.adjustment-management {
  background-color: #f5f7fa;
  min-height: 100vh;
}

.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
}

.date-selector {
  min-width: 160px;
}

.adjustment-list {
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.adjustment-item {
  transition: background-color 0.2s ease;
}

.adjustment-item:hover {
  background-color: #f9f9f9;
}

.quantity-input {
  width: 70px;
}

.quantity-input ::v-deep input {
  text-align: center;
}

.product-select ::v-deep .v-input__slot {
  background-color: white !important;
}

.empty-state {
  background-color: white;
  border: 2px dashed #e0e0e0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
