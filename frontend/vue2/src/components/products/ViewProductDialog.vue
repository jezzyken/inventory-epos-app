<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px" scrollable>
      <v-card v-if="hasItems">
        <v-card-title>
          <span class="text-h5">Delivery Details</span>
          <v-spacer></v-spacer>
          <v-chip small :color="items.status === 'delivered' ? 'success' : 'warning'" text-color="white">
            {{ items.status }}
          </v-chip>
        </v-card-title>

        <v-card-text style="height: 600px">
          <div class="delivery-info mb-4">
            <h3 class="text-h6">Delivery Information</h3>
            <v-simple-table>
              <tbody>
                <tr>
                  <td class="font-weight-medium">Date:</td>
                  <td>{{ items.deliveryDate }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Recipient:</td>
                  <td>{{ items.recipientName }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Contact:</td>
                  <td>{{ items.contactNo }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Address:</td>
                  <td>{{ items.address }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Notes:</td>
                  <td>{{ items.notes }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>

          <v-divider></v-divider>

          <!-- Sale Information -->
          <div v-if="saleDetails" class="sale-info mt-4">
            <h3 class="text-h6">Sale Information</h3>
            <v-simple-table>
              <tbody>
                <tr>
                  <td class="font-weight-medium">Reference Code:</td>
                  <td>{{ saleDetails.referenceCode }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Payment Type:</td>
                  <td>{{ saleDetails.paymentType }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Amount Received:</td>
                  <td>{{ formatCurrency(saleDetails.amountReceived) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Discount:</td>
                  <td>{{ formatCurrency(saleDetails.discount) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-medium">Grand Total:</td>
                  <td>{{ formatCurrency(saleDetails.grandTotal) }}</td>
                </tr>
              </tbody>
            </v-simple-table>

            <!-- Sale Items -->
            <h4 class="text-subtitle-1 mt-4">Items</h4>
            <v-data-table :headers="saleItemHeaders" :items="saleDetails.items" :items-per-page="-1" class="elevation-1"
              :hide-default-footer="true">
              <template v-slot:[`item.price`]="{ item }">
                {{ formatCurrency(item.variant.price) }}
              </template>
              <template v-slot:[`item.total`]="{ item }">
                {{ formatCurrency(item.variant.price * item.quantity) }}
              </template>
            </v-data-table>
          </div>
        </v-card-text>

        <v-card-actions>
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
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    isLoading: false,
    items: [],
    saleDetails: null,
    saleItemHeaders: [
      { text: "Product", value: "product.name" },
      { text: "Variant", value: "variant.name" },
      { text: "Quantity", value: "quantity" },
      { text: "Unit Price", value: "price" },
      { text: "Total", value: "total" }
    ]
  }),

  computed: {
    hasItems() {
      return Object.keys(this.items).length > 0;
    }
  },

  methods: {
    ...mapActions({
      getSaleById: "sales/getById"
    }),

    async initialize() {
      this.isLoading = true;
      if (this.items.sale) {
        try {
          const response = await this.getSaleById(this.items.sale);
          this.saleDetails = response.result[0];
        } catch (error) {
          console.error("Error fetching sale details:", error);
        }
      }
      this.isLoading = false;
    },

    showDialog(dialog, items) {
      this.dialog = dialog;
      this.items = items;
      this.initialize();
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(amount);
    },

    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }
};
</script>

<style scoped>
.delivery-info,
.sale-info {
  padding: 16px;
}
</style>