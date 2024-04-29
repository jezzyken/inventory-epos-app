<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Delivery</ion-title>
        <ion-button slot="end" size="small" fill="clear" color="dark" class="ion-margin-end">
          <ion-icon :icon="filter"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-item class="delivery-delivered" detail lines="full" v-for="item in items" :key="item.id"
        :router-link="{name: 'delivery-details', params: {id: item.id}}">
        <ion-label>
          <ion-row class="ion-align-items-center ion-justify-content-between">
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.address }}</p>
            </div>
            <h3 :class="item.status === 'delivered' ? 'status-delivered' : 'status-pending'">{{ item.status }}</h3>
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
          status: "pending",
          recipient: "test1",
          note: "test",
          orders: [
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
          status: "pending",
          recipient: "test2",
          note: "test",
          orders: [
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
          status: "delivered",
          recipient: "test3",
          note: "test",
          orders: [
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
.delivery-lists {
  margin: 0px 20px;
}

.delivery-delivered {
  border-left: 3px solid #098d16;
  margin-bottom: 20px;
}

.delivery-pending {
  border-left: 3px solid #fbbc04;
  margin-bottom: 20px;
}

.status-delivered {
  color: #098d16;
  text-transform: capitalize;
}

.status-pending {
  color: #fbbc04;
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
