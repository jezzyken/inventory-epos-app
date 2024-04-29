<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Delivery Info</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <span class="transaction-title">Delivery Status</span>
            <div>
              <p
                :class="
                  filteredItems.status === 'delivered'
                    ? 'product-status-delivered'
                    : 'product-status-pending'
                "
              >
                {{ filteredItems.status }}
              </p>
            </div>
          </ion-row>
          <ion-row class="ion-margin-top">
            <ion-col class="ion-no-padding">
              <div class="transaction-info-title">Recepient</div>
              <div class="transaction-info-text">{{ filteredItems.name }}</div>
            </ion-col>
            <ion-col class="ion-no-padding">
              <div class="transaction-info-title">Delivery Date</div>
              <div class="transaction-info-text">01-24-2024 4:20PM</div>
            </ion-col>
          </ion-row>
          <ion-col class="ion-margin-top">
            <div>
              <span class="transaction-info-title">Address</span>
              <div class="transaction-info-text">
                <span>{{ filteredItems.address }}</span>
              </div>
            </div>
            <div class="ion-margin-top">
              <span class="transaction-info-title">Note</span>
              <div class="transaction-info-text">
                <span>
                  {{ filteredItems.note }}
                </span>
              </div>
            </div>
          </ion-col>
          <ion-col>
            <h3 class="transaction-title">Orders</h3>
          </ion-col>
          <ion-col>
            <ion-item
              class="item-list ion-no-padding"
              lines="full"
              v-for="order in filteredItems.orders"
              :key="order.id"
            >
              <ion-label>
                <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                      <h3 class="list-title">{{ order.unit }}</h3>
                    </ion-col>
                    <ion-col size="9">
                      <p class="list-text">
                        {{ order.item }}
                      </p>
                    </ion-col>
                </ion-row>
              </ion-label>
            </ion-item>
          </ion-col>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
} from "@ionic/vue";

export default {
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonPage,
    IonContent,
    IonCol,
    IonGrid,
    IonRow,
    IonItem,
    IonLabel,
  },
  // computed: {
  //   filteredItems(){
  //     return this.items.find(item => item.id == this.$route.params.id)
  //   }
  // },

  created() {
    this.filteredItems = this.items.find(
      (item) => item.id == this.$route.params.id
    );
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Test1",
          address: "address test1",
          status: "pending",
          recipient: "test1",
          note: "test",
          orders: [
            {
              id: 1,
              unit: "1",
              item: "1 set of kidney",
            },
          ],
        },
        {
          id: 2,
          name: "Test2",
          address: "address test2",
          status: "pending",
          recipient: "test2",
          note: "test",
          orders: [
            {
              id: 1,
              unit: "2",
              item: "1 set of kidney",
            },
          ],
        },
        {
          id: 3,
          name: "Test3",
          address: "address test3",
          status: "delivered",
          recipient: "test3",
          note: "test",
          orders: [
            {
              id: 1,
              unit: "3",
              item: "cock for figthing",
            },
            {
              id: 2,
              unit: "4",
              item: "1 ball of fury",
            },
          ],
        },
      ],
      filteredItems: {},
    };
  },
};
</script>

<style scoped>
.product-status-delivered {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 8px;
  color: #fff;
  background: #098d16;
  border-radius: 2px;
  padding: 4px;
}

.product-status-pending {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 8px;
  color: #fff;
  background: #fbbc04;
  border-radius: 2px;
  padding: 4px;
}

ion-item {
  --inner-padding-end: 0px;
  --padding-end: 0px;
}

.item-list {
  margin-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
}

.list-container {
  display: flex;
  align-items: center;
}

.list-title {
  font-size: 14px;
  /* padding-right: 5px; */
  text-align: center;
  color: #333;
}

.list-text {
  font-size: 16px;
  color: #333;
  /* display: block; */
}

.transaction-info-title {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 400;
}

.transaction-info-text {
  letter-spacing: 0.5px;
  margin-top: 6px;
  font-size: 16px;
  color: #3e3e3e;
}

.transaction-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.container {
  margin-top: 20px;
  padding: 0px 20px;
}
</style>
