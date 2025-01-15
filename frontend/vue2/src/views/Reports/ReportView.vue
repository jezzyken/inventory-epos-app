<template>
  <v-container>
    <v-card class="elevation-2">
      <v-card-title>
        Reports
        <v-spacer></v-spacer>
        <v-row align="center" justify="end" class="pr-4">
          <v-col cols="auto">
            <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
              max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateRangeText" label="Date Range" readonly v-bind="attrs" v-on="on" outlined
                  dense hide-details></v-text-field>
              </template>
              <v-date-picker v-model="dates" range @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" @click="generateReport">
              Generate Report
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="activeTab" background-color="primary" dark>
        <v-tab v-for="tab in tabs" :key="tab.value">
          {{ tab.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <!-- Product Report -->
        <v-tab-item>
          <v-data-table :headers="productHeaders" :items="productReport" :loading="loading" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="exportToExcel">
                  Export to Excel
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>

        <!-- Inventory Report -->
        <v-tab-item>
          <v-data-table :headers="inventoryHeaders" :items="inventoryReport" :loading="loading" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="exportToExcel">
                  Export to Excel
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>

        <!-- Sales Report -->
        <v-tab-item>
          <v-data-table :headers="salesHeaders" :items="salesReport" :loading="loading" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="exportToExcel">
                  Export to Excel
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ReportsView',
  data: () => ({
    activeTab: 0,
    loading: false,
    dates: [],
    dateMenu: false,
    tabs: [
      { text: 'Product Report', value: 'products' },
      { text: 'Inventory Report', value: 'inventory' },
      { text: 'Sales Report', value: 'sales' }
    ],
    productHeaders: [
      { text: 'Name', value: 'name' },
      { text: 'Code', value: 'productCode' },
      { text: 'Brand', value: 'brand' },
      { text: 'Category', value: 'category' },
      { text: 'Stock', value: 'stocks' },
      { text: 'Cost', value: 'productCost' },
      { text: 'Price', value: 'sellingPrice' }
    ],
    inventoryHeaders: [
      { text: 'Date', value: 'date' },
      { text: 'Product', value: 'productName' },
      { text: 'Variant', value: 'variantName' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Status', value: 'status' },
      { text: 'Supplier', value: 'supplier' }
    ],
    salesHeaders: [
      { text: 'Date', value: 'date' },
      { text: 'Reference', value: 'referenceCode' },
      { text: 'Customer', value: 'customer' },
      { text: 'Total', value: 'grandTotal' },
      { text: 'Payment Type', value: 'paymentType' }
    ]
  }),

  computed: {
    ...mapState({
      productReport: state => state.report.productReport,
      inventoryReport: state => state.report.inventoryReport,
      salesReport: state => state.report.salesReport
    }),
    dateRangeText() {
      return this.dates.join(' to ');
    }
  },

  methods: {
    ...mapActions({
      getProductReport: 'report/getProductReport',
      getInventoryReport: 'report/getInventoryReport',
      getSalesReport: 'report/getSalesReport'
    }),

    async generateReport() {
      if (!this.dates[0] || !this.dates[1]) {
        return;
      }

      this.loading = true;
      const dateRange = {
        startDate: this.dates[0],
        endDate: this.dates[1]
      };

      try {
        switch (this.activeTab) {
          case 0:
            await this.getProductReport(dateRange);
            break;
          case 1:
            await this.getInventoryReport(dateRange);
            break;
          case 2:
            await this.getSalesReport(dateRange);
            break;
        }
      } catch (error) {
        console.error('Error generating report:', error);
      }
      this.loading = false;
    },

    exportToExcel() {
      // Implement Excel export functionality
      console.log('Export to Excel');
    }
  }
};
</script>