<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px" scrollable>
      <v-card v-if="hasItems">
        <v-card-title>
          <span class="text-h5">{{ items.recipientName }} • ({{ items.contactNo }})</span>
          <v-spacer></v-spacer>
          <div>
            <v-chip small class="ma-1" :color="items.status === 'pending' ? 'warning' : 'success'" text-color="white">
              <span class="text-uppercase text-caption">{{
                items.status
                }}</span>
            </v-chip>
            <!-- <v-chip small class="ma-1" color="orange" text-color="white">
               items.category.name 
            </v-chip> -->
          </div>
        </v-card-title>

        <v-card-text style="height: 600px">
          <div>
            <span class="my-4 text-overline font-weight-bold">Delivery Address</span>
            <br />
            <span>{{ items.address }}</span>
          </div>
          <div>
            <span class="my-4 text-overline font-weight-bold">Delivery Date •</span>
            <span>{{ items.deliveryDate }}</span>
          </div>
          <div>
            <span class="my-4 text-overline font-weight-bold">Notes</span>
            <br />
            {{ items.notes }}
          </div>

          <v-divider class="mt-8"></v-divider>
          <v-card-title>Orders</v-card-title>
          <v-divider class="mt-0"></v-divider>

          <div>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Product</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stock, i) in orders.orderItems" :key="i">
                    <td class="pa-5">
                      <span>{{ stock.name }}</span>
                    </td>
                    <td class="pa-5">
                      <span>{{ stock.sellingPrice }}</span>
                    </td>
                    <td>
                      <span>{{ stock.quantity }}</span>
                    </td>
                    <td class="pa-5">
                      <span>{{ stock.subTotal }}</span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-row justify="end" class="mt-5 mb-5">
              <v-simple-table style="width: 50%" class="outside-bordered-table">
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td class="pa-5">
                        <span>Total</span>
                      </td>
                      <td class="pa-5">
                        <span>P {{ orders.salesTotal }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-5">
                        <span>Delivery Fee</span>
                      </td>
                      <td class="pa-5">
                        <span>P {{ items.deliveryFee }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-5">
                        <span>Discount</span>
                      </td>
                      <td class="pa-5">
                        <span>P {{ orders.discount }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-5">
                        <span>Grand total</span>
                      </td>
                      <td class="pa-5">
                        <span>P {{ orders.grandTotal }}</span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn depressed color="primary" @click="onUpdateStatus(items.status)">
            {{
              items.status === "pending"
                ? "Mark as Delivered"
                : "Mark as Pending"
            }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/*eslint-disable */
import { mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "Unit",
        sortable: false,
        value: "unit.name",
      },
      {
        text: "Variant",
        sortable: false,
        value: "variant.name",
      },
      {
        text: "Colors",
        sortable: false,
        value: "color",
      },
      { text: "Item Price", value: "itemPrice", sortable: false },
      { text: "Sale Price", value: "salePrice", sortable: false },
    ],

    stocksHeader: [
      {
        text: "Supplier",
        align: "start",
        sortable: false,
        value: "supplier.name",
      },
      { text: "Variant", value: "variant.name", sortable: false },
      { text: "Quantity", value: "quantity", sortable: false },
    ],

    dialog: false,
    prices: [],
    isLoading: false,
    items: [],
    stocks: [],
    orders: [],
    status: false,
  }),
  computed: {
    hasItems() {
      return Object.keys(this.items).length > 0;
    },
  },

  methods: {
    ...mapActions({
      getItemById: "product/getItemById",
      getStockItems: "stock/getStockItems",
      getSalesById: "sale/getItemById",
      updateItem: "delivery/updateItem",
    }),

    async initialize(id) {
      this.isLoading = true;

      const response = await this.getSalesById(id);

      const orderItems = response.result[0].items.map((item) => {
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

      // console.log({ ...response.result[0], orders });

      this.orders = {
        ...response.result[0],
        orderItems,
      };

      console.log(this.orders);

      this.isLoading = false;
    },
    showDialog(dialog, items) {
      this.dialog = dialog;
      this.items = items;
      this.initialize(items.saleDetails._id);
    },

    async onUpdateStatus(status) {
      let newStatus = status === "delivered" ? "pending" : "delivered";
      await this.updateItem({ id: this.items._id, status: newStatus });
      this.dialog = false
      this.$emit('get-items');
    },
  },
};
</script>

<style scoped>
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
