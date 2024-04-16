<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-margin ion-no-padding home-content-container">
      <div class="transaction-header">
        <span class="transaction-title">Transaction</span>
        <ion-button color="light" size="small"><ion-icon :icon="filter"></ion-icon></ion-button>
      </div>
      <div>
        <div class="transaction-lists">
          <ion-item detail lines="full" v-for="n in 12" :key="n">
            <ion-label>
              <ion-row>
                <div>
                  <h3>Product Item</h3>
                  <p>01 Dec, 24</p>
                </div>
                <h3 class="transaction-cost-color">
                  P5,000.00
                </h3>
              </ion-row>
            </ion-label>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonButton } from "@ionic/vue";
import { filter } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonButton
  },
  setup(){
    return{filter}
  },
}
</script>

<style scoped>
.transaction-header {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-title {
  font-size: 2rem;
  color: #333;
}

.transaction-lists{
  margin: 0px 20px;
}

.transaction-cost-color{
  color: #098D16;
  text-transform: capitalize;
}

h3 {
  line-height: 150%;
  font-weight: 300;
  text-align: left;
  font-size: 15px;
  color: #333;
}

p{
  color: #5F5F5F;
  font-size: 12px;
}

ion-row {
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
