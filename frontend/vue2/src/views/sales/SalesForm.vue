<template>
  <v-container v-if="!isLoading">
    <v-sheet elevation="1" class="pa-5">
      <p class="text-button">Product Information</p>
      <v-divider class="mb-5" />
      <v-row>
        <v-col cols="12" md="6">
          <v-menu ref="menu1" v-model="menu" :close-on-content-click="false" :return-value.sync="items.date"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="items.date" label="Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs"
                v-on="on" outlined></v-text-field>
            </template>
            <v-date-picker v-model="items.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(items.date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="items.customer" label="Customer" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="d-flex">
            <span class="align-self-center mr-3">Has Delivery:</span>

            <v-radio-group v-model="items.hasDelivery" row @change="onSelectDelivery(items.hasDelivery)">
              <v-radio label="Yes" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
          </div>
        </v-col>

        <div v-if="items.hasDelivery">
          <div class="pa-5">
            <p class="text-button">Product Information</p>
            <v-divider class="mb-5" />
          </div>
          <v-row class="pa-4">
            <v-col cols="4">
              <v-text-field v-model="items.delivery.recipientName" label="Recipient Name" outlined></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="items.delivery.contactNo" label="Contact No" outlined></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-menu ref="menu2" v-model="deliveryDateMenu" :close-on-content-click="false"
                :return-value.sync="items.delivery.deliveryDate" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="items.delivery.deliveryDate" label="Delivery Date"
                    prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                </template>
                <v-date-picker v-model="items.delivery.deliveryDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="deliveryDateMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu2.save(items.delivery.deliveryDate)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="items.delivery.address" label="Delivery Address" outlined></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="items.delivery.deliveryFee" label="Delivery Fee" outlined></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="items.delivery.notes" label="Notes" outlined></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-col cols="12">
          <div class="d-flex">
            <v-select v-model="items.product" label="Products" :items="products" item-text="name"
              item-value="productCode" outlined @change="onSelectItem" return-object></v-select>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <p class="text-button">Sales</p>
      <v-divider class="mb-5" />
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
                  <v-btn dark color="primary" small fab @click="incrementQuantity(i)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <div style="width: 75px">
                    <v-text-field v-model="stock.quantity" class="text-center mx-2" outlined hide-details dense
                      @input="updateSubTotal(i)"></v-text-field>
                  </div>
                  <v-btn dark color="primary" small fab @click="decrementQuantity(i)">
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
                  <span>P {{ salesTotal }}</span>
                </td>
              </tr>
              <tr>
                <td class="pa-5">
                  <span>Delivery Fee</span>
                </td>
                <td class="pa-5">
                  <span>P {{ deliveryFee }}</span>
                </td>
              </tr>
              <tr>
                <td class="pa-5">
                  <span>Discount</span>
                </td>
                <td class="pa-5">
                  <span>P {{ discount }}</span>
                </td>
              </tr>
              <tr>
                <td class="pa-5">
                  <span>Grand total</span>
                </td>
                <td class="pa-5">
                  <span>P {{ grandTotal }}</span>
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
          <v-text-field v-model="items.discount" label="Discount" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="items.paymentType" label="Payment" :items="payment" outlined></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="items.amountReceived" label="Cash" outlined @input="onAddAmount"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="items.change" label="Change" outlined></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field v-model="items.notes" label="Notes" outlined></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-row justify="end" class="ma-0 mt-6">
      <v-btn dark :color="buttonState.color" @click="buttonState.action">{{
        buttonState.label
        }}</v-btn>
      <div class="ma-1"></div>
      <v-btn>cancel</v-btn>
    </v-row>
  </v-container>
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
        hasDelivery: null,
        delivery: {
          deliveryDate: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
        },
        stocks: [],
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
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
      menu: false,
      deliveryDateMenu: false,
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

    salesTotal() {
      const subtotal = this.items.stocks.reduce((total, stock) => {
        const subtotal =
          parseFloat(stock.sellingPrice) * parseInt(stock.quantity || 0);
        return total + subtotal;
      }, 0);

      return subtotal.toFixed(2);
    },

    grandTotal() {
      const subtotal = this.items.stocks.reduce((total, stock) => {
        const subtotal =
          parseFloat(stock.sellingPrice) * parseInt(stock.quantity || 0);
        return total + subtotal;
      }, 0);

      return (subtotal + +this.deliveryFee - this.discount).toFixed(2);
    },

    deliveryFee() {
      if (this.items.hasDelivery) {
        const fee = this.items.delivery.deliveryFee;
        return fee ? parseFloat(fee).toFixed(2) : "0.00";
      }
      return "0.00";
    },

    discount() {
      return this.items.discount
        ? parseFloat(this.items.discount).toFixed(2)
        : "0.00";
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
      getSalesById: "sale/getItemById",
      getDeliveryBySalesItemId: "delivery/getDeliveryBySalesItemId",
      addItem: "sale/addItem",
      updateItem: "sale/updateItem",
      deleteItem: "stockItem/deleteItem",
    }),

    async initialize() {
      this.isLoading = true;
      try {
        const [salesResponse, deliveryResponse] = await Promise.all([
          this.getSalesById(this.$route.params.id),
          this.getDeliveryBySalesItemId(this.$route.params.id),
        ]);

        const sale = salesResponse.result[0];

        if (deliveryResponse.result.length > 0) {
          const delivery = deliveryResponse.result[0];
          if (delivery.deliveryDate) {
            delivery.deliveryDate = moment(delivery.deliveryDate).format(
              "YYYY-MM-DD"
            );
          }
          Object.assign(this.items.delivery, delivery);
        }

        const saleFields = [
          "date",
          "referenceCode",
          "amountReceived",
          "discount",
          "salesTotal",
          "paymentType",
          "change",
          "discount",
          "grandTotal",
          "hasDelivery",
          "notes",
          "customer",
        ];
        saleFields.forEach((field) => {
          if (field === "date") {
            this.$set(
              this.items,
              field,
              moment(sale[field]).format("YYYY-MM-DD")
            );
          } else {
            this.$set(this.items, field, sale[field]);
          }
        });

        this.items.stocks = sale.items.map((item) => {
          const baseData = {
            name: item.product.name,
            quantity: item.quantity,
            availableStocks: item.product.stocks,
            product: item.product._id,
            items_id: item.item_id,
            sellingPrice: item.product.sellingPrice,
            subTotal:
              parseFloat(item.product.sellingPrice) *
              parseInt(item.quantity || 0),
          };

          if (item.product.type === "Variants") {
            return {
              ...baseData,
              variant: item.variant._id,
              name: `${item.product.name}-${item.variant.name}`,
              availableStocks: item.variant.stocks,
              sellingPrice: item.variant.sellingPrice,
              subTotal:
                parseFloat(item.variant.sellingPrice) *
                parseInt(item.quantity || 0),
            };
          }

          return baseData;
        });
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        this.isLoading = false;
      }
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
        ...this.items,
        stocks: this.items.stocks,
        salesTotal: this.salesTotal,
        grandTotal: this.grandTotal,
      };

      await this.addItem(data);
      this.$router.push("/sale");
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: {
          ...this.items,
          salesTotal: this.salesTotal,
          grandTotal: this.grandTotal,
          deletedItems: this.deleteItemId,
        },
      };
      await this.updateItem(data);
      this.$router.push("/sale");
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

    onAddAmount(amount) {
      if (
        typeof +amount === "number" &&
        +amount !== 0 &&
        +amount >= this.grandTotal
      ) {
        this.items.change = amount - this.grandTotal;
      } else {
        this.items.change = 0;
      }
    },

    onSelectDelivery(delivery) {
      console.log(delivery);
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
