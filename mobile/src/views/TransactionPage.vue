<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Transaction</ion-title>
        <ion-button
          slot="end"
          size="small"
          fill="clear"
          color="dark"
          class="ion-margin-end"
        >
          <ion-icon :icon="filter"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-item
        class="ion-margin-bottom"
        detail
        lines="full"
        v-for="item in items"
        :key="item.id"
        :router-link="{ name: 'transaction-details', params: { id: item.id } }"
      >
        <ion-label>
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.date }}</p>
            </div>
            <h3 class="transaction-cost-color">{{ item.cost }}</h3>
          </ion-row>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonToolbar,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonPage,
  IonContent,
  IonRow,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { filter } from "ionicons/icons";
// import DeliveryDataVue from '@/components/DeliveryData.vue';

export default {
  components: {
    IonToolbar,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonPage,
    IonContent,
    IonRow,
    IonIcon,
    IonButton,
  },
  setup() {
    return { filter };
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
              unit: "kg",
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
              unit: "kg",
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
              unit: "kg",
              item: "cock for figthing",
            },
            {
              id: 2,
              unit: "kg",
              item: "1 ball of fury",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.transaction-cost-color {
  color: #098d16;
  text-transform: capitalize;
}

h3 {
  line-height: 150%;
  font-weight: 300;
  text-align: left;
  font-size: 15px;
  color: #333;
}

p {
  color: #5f5f5f;
  font-size: 12px;
}
</style>
