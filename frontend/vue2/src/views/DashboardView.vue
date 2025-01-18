<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto fill-height" color="primary" dark>
          <v-card-text class="d-flex flex-column">
            <div class="text-subtitle-1 mb-2">Today's Sales</div>
            <div class="text-h4 mb-2">₱{{ formatNumber(summary.sales?.today?.totalSales) }}</div>
            <div class="text-caption">Orders: {{ summary.sales?.today?.count || 0 }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto fill-height" color="success" dark>
          <v-card-text class="d-flex flex-column">
            <div class="text-subtitle-1 mb-2">Monthly Sales</div>
            <div class="text-h4 mb-2">₱{{ formatNumber(summary.sales?.monthly?.totalSales) }}</div>
            <div class="text-caption">Orders: {{ summary.sales?.monthly?.count || 0 }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto fill-height" color="warning" dark>
          <v-card-text class="d-flex flex-column">
            <div class="text-subtitle-1 mb-2">Pending Deliveries</div>
            <div class="text-h4 mb-2">{{ summary.deliveries?.pending || 0 }}</div>
            <div class="text-caption">Total Pending</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto fill-height" color="info" dark>
          <v-card-text class="d-flex flex-column">
            <div class="text-subtitle-1 mb-2">Completed Deliveries</div>
            <div class="text-h4 mb-2">{{ summary.deliveries?.delivered || 0 }}</div>
            <div class="text-caption">Total Completed</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Sales Trend
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="selectedPeriod" mandatory>
              <v-btn small value="daily">Daily</v-btn>
              <v-btn small value="weekly">Weekly</v-btn>
              <v-btn small value="monthly">Monthly</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text>
            <div class="chart-container">
              <line-chart v-if="hasChartData" :chart-data="chartData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Delivery Status</v-card-title>
          <v-card-text>
            <div class="chart-container">
              <pie-chart v-if="hasPieData" :chart-data="pieChartData" :options="pieChartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tables Row -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Top Selling Products</v-card-title>
          <v-data-table :headers="topProductHeaders" :items="summary.topProducts || []" :items-per-page="5"
            hide-default-footer>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.productName }}</td>
              <td>{{ props.item.totalQuantity }}</td>
              <td>₱{{ formatNumber(props.item.totalSales) }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Low Stock Alert</v-card-title>
          <v-data-table :headers="lowStockHeaders" :items="summary.inventory?.lowStock || []" :items-per-page="5"
            hide-default-footer>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.stocks }}</td>
              <td>{{ props.item.criticalLimit }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Line, mixins } from 'vue-chartjs';
import { Pie } from 'vue-chartjs';

const LineChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};

const PieChart = {
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};

export default {
  name: 'DashboardView',
  components: {
    LineChart,
    PieChart
  },
  data: () => ({
    selectedPeriod: 'daily',
    topProductHeaders: [
      { text: 'Product', value: 'productName' },
      { text: 'Quantity Sold', value: 'totalQuantity' },
      { text: 'Total Sales', value: 'totalSales' }
    ],
    lowStockHeaders: [
      { text: 'Product', value: 'name' },
      { text: 'Current Stock', value: 'stocks' },
      { text: 'Critical Limit', value: 'criticalLimit' }
    ],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return '₱' + value.toLocaleString();
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return '₱' + tooltipItem.yLabel.toLocaleString();
          }
        }
      }
    },
    pieChartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  computed: {
    ...mapState({
      summary: state => state.dashboard.summary,
      salesTrend: state => state.dashboard.salesTrend,
      deliveryStats: state => state.dashboard.deliveryStats
    }),

    hasChartData() {
      return this.salesTrend && this.salesTrend.length > 0;
    },

    hasPieData() {
      return this.summary.deliveries &&
        (this.summary.deliveries.delivered > 0 || this.summary.deliveries.pending > 0);
    },

    chartData() {
      return {
        labels: (this.salesTrend || []).map(item =>
          `${item._id?.year}-${item._id?.month}-${item._id?.day}`
        ),
        datasets: [{
          label: 'Sales',
          backgroundColor: 'rgba(71, 183, 132, 0.2)',
          borderColor: '#47b784',
          data: (this.salesTrend || []).map(item => item.totalSales)
        }]
      };
    },

    pieChartData() {
      return {
        labels: ['Delivered', 'Pending'],
        datasets: [{
          backgroundColor: ['#41B883', '#E46651'],
          data: [
            this.summary.deliveries?.delivered || 0,
            this.summary.deliveries?.pending || 0
          ]
        }]
      };
    }
  },

  watch: {
    selectedPeriod() {
      this.getSalesTrend(this.selectedPeriod);
    }
  },

  methods: {
    ...mapActions({
      getDashboardSummary: 'dashboard/getDashboardSummary',
      getSalesTrend: 'dashboard/getSalesTrend',
      getDeliveryStats: 'dashboard/getDeliveryStats'
    }),

    formatNumber(value) {
      return (value || 0).toLocaleString();
    },

    async loadDashboardData() {
      try {
        await Promise.all([
          this.getDashboardSummary(),
          this.getSalesTrend(this.selectedPeriod),
          this.getDeliveryStats()
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    }
  },

  created() {
    this.loadDashboardData();
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
}
</style>