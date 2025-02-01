<template>
  <div class="stock-management">
    <v-overlay :value="isFetching" :absolute="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>


    <!-- Top Header Bar -->
    <v-app-bar elevation="1" color="white">
      <v-container class="py-1">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-btn icon @click="$router.push('/stock')">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h1 class="text-h5 ml-3 grey--text text--darken-3">
              {{ mode === "add" ? "New Stock Entry" : "Edit Stock Entry" }}
            </h1>
          </div>
          <div>
            <v-btn text class="mr-2" @click="$router.push('/stock')">
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
              <v-autocomplete v-model="items.product" :loading="isFetching" :disabled="isFetching" :items="products"
                item-text="name" item-value="productCode" placeholder="Search and select products..."
                @change="onSelectItem" return-object hide-details dense outlined clearable class="product-select">
                <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Stock: {{ item.stocks }} | Code: {{ item.productCode }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </div>
          </div>
        </v-sheet>

        <!-- Stock Items List -->
        <div class="stock-items mb-6">
          <div class="d-flex align-center mb-4">
            <span class="text-subtitle-1 font-weight-medium">Stock Items</span>
            <v-chip class="ml-3" small :color="items.stocks.length ? 'primary' : 'grey'" text-color="white">
              {{ items.stocks.length }} items
            </v-chip>
          </div>

          <div v-if="items.stocks.length" class="stock-list">
            <div v-for="(stock, index) in items.stocks" :key="index" class="stock-item">
              <div class="d-flex align-center justify-space-between pa-4">
                <div class="item-details flex-grow-1">
                  <div class="subtitle-1">{{ stock.name }}</div>
                  <div class="caption grey--text">
                    Available Stock: {{ stock.availableStocks }}
                  </div>
                </div>

                <div class="d-flex align-center">
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
              Use the product selector above to add items to this stock entry
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
              <v-textarea v-model="items.notes" label="Notes" placeholder="Add any additional notes here..." rows="3"
                outlined hide-details class="mb-4"></v-textarea>
            </v-col>
            <v-col cols="12" md="4">
              <v-select v-model="items.status" :items="status" label="Status" outlined hide-details></v-select>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  name: "StockForm",

  props: {
    mode: {
      type: String,
    },
  },

  data() {
    return {
      items: {
        stocks: [],
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        notes: "",
        status: "Pending",
      },
      isLoading: false,
      isFetching: false,
      isSubmitting: false,
      products: [],
      status: ["Pending", "Completed"],
      deleteItemId: [],
      menu: false,
      search: null,
    };
  },

  computed: {
    buttonState() {
      return this.mode === "add"
        ? {
          color: "primary",
          action: this.onAddItem,
          label: "Add Stock",
        }
        : {
          color: "warning",
          action: this.onUpdateItem,
          label: "Update Stock",
        };
    },
    isFormValid() {
      const hasStocks = this.items.stocks.length > 0;
      const hasValidQuantities = this.items.stocks.every(
        (stock) => stock.quantity && parseInt(stock.quantity) > 0
      );
      return hasStocks && hasValidQuantities;
    },
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
      addItem: "stock/addItem",
      getStockById: "stock/getItemById",
      updateItem: "stock/updateItem",
      deleteItem: "stockItem/deleteItem",
    }),

    async initialize() {
      this.isLoading = true;
      try {
        const response = await this.getStockById(this.$route.params.id);
        const { status, notes, date, items } = response.result[0];

        this.items.status = status;
        this.items.notes = notes;
        this.items.date = moment(date).format("YYYY-MM-DD");

        this.items.stocks = items.map((item) => ({
          name:
            item.product.type === "Variants"
              ? `${item.product.name}-${item.variant.name}`
              : item.product.name,
          quantity: item.quantity,
          availableStocks:
            item.product.type === "Variants"
              ? item.variant.stocks
              : item.product.stocks,
          product: item.product._id,
          items_id: item.item_id,
          ...(item.product.type === "Variants" && {
            variant: item.variant._id,
          }),
        }));
      } catch (error) {
        console.error("Error initializing:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async onSelectItem(item) {
      const existingItem = this.items.stocks.find((stock) =>
        item.type === "Variants"
          ? stock.product === item._id && stock.variant === item.variants._id
          : stock.product === item._id
      );

      if (!existingItem) {
        this.items.stocks.push({
          product: item._id,
          name: item.type === "Variants" ? item.name : item.name,
          availableStocks:
            item.type === "Variants" ? item.variants.stocks : item.stocks,
          quantity: 0,
          ...(item.type === "Variants" && { variant: item.variants._id }),
        });
      }
    },

    async onAddItem() {
      this.isSubmitting = true;
      try {
        await this.addItem({
          date: this.items.date,
          notes: this.items.notes,
          status: this.items.status,
          stocks: this.items.stocks,
        });
        this.$router.push("/stock");
      } catch (error) {
        console.error("Error adding item:", error);
      } finally {
        this.isSubmitting = false;
      }
    },

    async onUpdateItem() {
      this.isSubmitting = true;
      try {
        await this.updateItem({
          id: this.$route?.params?.id,
          data: {
            date: this.items.date,
            notes: this.items.notes,
            status: this.items.status,
            stocks: this.items.stocks,
            deletedItems: this.deleteItemId,
          },
        });
        this.$router.push("/stock");
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        this.isSubmitting = false;
      }
    },

    onDeleteItem(stock, index) {
      this.items.stocks.splice(index, 1);
      if (stock.items_id && !this.deleteItemId.includes(stock.items_id)) {
        this.deleteItemId.push(stock.items_id);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    incrementQuantity(stock) {
      stock.quantity = parseInt(stock.quantity || 0) + 1;
    },

    decrementQuantity(stock) {
      stock.quantity = Math.max(0, parseInt(stock.quantity || 0) - 1);
    },

    validateQuantity(value, stock) {
      if (value < 0 || value === "") {
        stock.quantity = 0;
      }
    },

    async fetch() {
      this.isFetching = true;
      try {
        const products = await this.getProductItems();
        this.products = products.result.map((product) => ({
          ...product,
          name:
            product.type === "Variants"
              ? `${product.name}-${product.variants.name}`
              : product.name,
          productCode:
            product.type === "Variants"
              ? product.variants.productCode
              : product.productCode,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.isFetching = false;
      }
    },
  },
};
</script>

<style scoped>
.stock-management {
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

.stock-list {
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.stock-item {
  transition: background-color 0.2s ease;
}

.stock-item:hover {
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
