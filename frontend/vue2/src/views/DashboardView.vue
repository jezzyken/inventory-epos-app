<template>
  <div class="main-container">
    <v-row>
      <v-col cols="12" md="3" v-for="(card, i) in dashboardCards" :key="i">
        <v-card
          height="150"
          class="pa-5"
          :class="`dashboard-card-${card.title}`"
        >
          <span class="text-h5 text-uppercase">{{ card.title }}</span>
          <div
            class="d-flex justify-space-between align-center"
            style="height: calc(100% - 25px)"
          >
            <div>
              <span class="text-h3">{{ card.total }}</span>
            </div>
            <div>
              <v-icon class="card-icon">{{ card.icon }}</v-icon>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      dashboardCards: [
        {
          title: "products",
          total: "10",
          icon: "mdi-clipboard-list-outline",
        },
        {
          title: "sales",
          total: "100",
          icon: "mdi-invoice-list",
        },
        {
          title: "deliveries",
          total: "5",
          icon: "mdi-truck-delivery",
        },
        {
          title: "users",
          total: "2",
          icon: "mdi-contacts",
        },
      ],
    };
  },
};
</script>
<style scoped>
.main-container {
  margin: 20px;
}

.dashboard-card-products {
  border-bottom: rgb(132, 73, 243) 10px solid;
}

.dashboard-card-sales {
  border-bottom: rgb(0, 165, 74) 10px solid;
}

.dashboard-card-deliveries {
  border-bottom: rgb(243, 172, 73) 10px solid;
}

.dashboard-card-users {
  border-bottom: rgb(243, 73, 144) 10px solid;
}

.card-icon {
  font-size: 50px;
}
</style>
