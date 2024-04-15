<template>
  <ion-page>
    <ion-content
      :fullscreen="true"
      class="ion-no-margin ion-no-padding home-content-container"
    >
      <div class="container">
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <span class="transaction-title">Delivery Status</span>
            <div>
              <p class="card-product-status">Available</p>
            </div>
          </ion-row>
          <ion-row class="ion-margin-top">
            <ion-col class="ion-no-padding">
              <div class="transaction-info-title">Recepient</div>
              <div class="transaction-info-text">Ochinchin Orewa</div>
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
                <span>Vorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
            </div>
            <div class="ion-margin-top">
              <span class="transaction-info-title">Note</span>
              <div class="transaction-info-text">
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                  alias illo sunt itaque rem nostrum cupiditate reprehenderit
                  fugit, incidunt magnam veniam error temporibus tempore.
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
              detail="false"
              lines="full"
              v-for="n in 3"
              :key="n"
            >
              <ion-label>
                <ion-row>
                  <div class="list-container">
                    <ion-col size="3" class="ion-margin-end">
                      <h3 class="list-title">Unit(3)</h3>
                    </ion-col>
                    <ion-col class="ion-no-padding">
                      <p class="list-text">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis.
                      </p>
                    </ion-col>
                  </div>
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
    IonPage,
    IonContent,
    IonCol,
    IonGrid,
    IonRow,
    IonItem,
    IonLabel,
  },
};
</script>

<style scoped>
.card-product-status {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 8px;
  color: #fff;
  background: #098d16;
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

.transaction-cost {
  font-size: 20px;
  font-weight: bold;
  color: #098d16;
}

.container {
  margin-top: 40px;
  padding: 0px 20px;
}
</style>
