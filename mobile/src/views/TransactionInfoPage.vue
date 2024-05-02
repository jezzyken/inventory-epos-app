<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>transaction Info</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
        <ion-grid>
          <ion-row class="ion-align-items-center ion-justify-content-between">
            <ion-col>
              <span class="transaction-title">Transaction Info</span>
            </ion-col>
            <ion-col class="ion-text-end">
              <span class="transaction-cost">{{ filteredItems.cost }}</span>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div class="transaction-info-title">Transaction No.</div>
              <div class="transaction-info-text">
                {{ filteredItems.contact }}
              </div>
            </ion-col>
            <ion-col>
              <div class="transaction-info-title">Customer</div>
              <div class="transaction-info-text">{{ filteredItems.name }}</div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <span class="transaction-info-title">Date & Time</span>
              <div class="transaction-info-text">
                <span>{{ filteredItems.date }}</span>
              </div>
            </ion-col>
          </ion-row>
          <ion-col>
            <h3 class="transaction-title">Purchased Items</h3>
          </ion-col>
          <ion-col>
            <ion-item
              class="item-list"
              lines="full"
              v-for="purchasedItem in filteredItems.purchasedItems"
              :key="purchasedItem.id"
            >
              <ion-label>
                <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                      <span class="list-title">{{ purchasedItem.unit }}</span>
                    </ion-col>
                    <ion-col size="9">
                      <p class="list-text">
                        {{ purchasedItem.item }}
                      </p>
                    </ion-col>
                </ion-row>
              </ion-label>
            </ion-item>
          </ion-col>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
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
    IonToolbar,
    IonButtons,
    IonTitle,
    IonBackButton,
    IonPage,
    IonContent,
    IonCol,
    IonGrid,
    IonRow,
    IonItem,
    IonLabel,
  },
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
          cost: "P5,000.00",
          contact: "09123456781",
          date: "01 Dec, 2024",
          recipient: "test1",
          note: "test",
          purchasedItems: [
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
          cost: "P5,000.00",
          contact: "09123456781",
          date: "02 Dec, 2024",
          recipient: "test2",
          note: "test",
          purchasedItems: [
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
          cost: "P4,200.00",
          contact: "09123456781",
          date: "03 Dec, 2024",
          recipient: "test3",
          note: "test",
          purchasedItems: [
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
ion-item {
  --inner-padding-end: 0px;
  --padding-end: 0px;
}

.item-list {
  margin-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
}

.list-title {
  font-size: 14px;
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
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.transaction-cost {
  font-size: 20px;
  font-weight: bold;
  color: #098d16;
}
</style>
