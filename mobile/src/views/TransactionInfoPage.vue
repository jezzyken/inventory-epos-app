<template>
  <ion-page>
    <ion-content
      :fullscreen="true"
      class="ion-no-margin ion-no-padding home-content-container"
    >
      <div class="container">
        <ion-grid>
          <ion-row>
            <ion-col
              ><h3 class="transaction-title">Transaction Info</h3></ion-col
            >
            <ion-col class="ion-text-end transaction-cost">
              <div><h3>P5,000.00</h3></div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div class="transaction-info-title">Transaction No.</div>
              <div class="transaction-info-text">XXXXX69420</div>
            </ion-col>
            <ion-col>
              <div class="transaction-info-title">Customer</div>
              <div class="transaction-info-text">Ochinchin Orewa</div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <span class="transaction-info-title">Date & Time</span>
              <div class="transaction-info-text">
                <span>01-24-2024 4:20PM</span>
              </div>
            </ion-col>
          </ion-row>
          <ion-col>
            <h3 class="transaction-title">Purchased Items</h3>
          </ion-col>
          <ion-col>
            <ion-item
              class="item-list"
              detail="false"
              lines="full"
              v-for="n in 3"
              :key="n"
            >
              <ion-label>
                <ion-row>
                  <div class="list-container">
                    <ion-col size="3">
                        <h3 class="list-title">Unit(3)</h3>
                    </ion-col>
                    <ion-col>
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
ion-item{
  --inner-padding-end: 0px;
  --padding-end: 0px;
}

.item-list{
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
