<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Cart</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-card v-for="n in 10" :key="n" class="ion-margin">
          <ion-grid>
            <ion-row>
              <ion-col
                size="auto"
                style="width: 100px"
                class="card-img ion-no-padding"
              >
                <img
                  alt="Silhouette of mountains"
                  src="https://miro.medium.com/v2/resize:fit:1224/0*5nT8Skkw8wQs9Pzz"
                />
              </ion-col>
              <ion-col class="ion-padding-start">
                <ion-card-header class="ion-no-padding">
                  <ion-row>
                    <ion-card-title
                      >Card Title</ion-card-title
                    >
                  </ion-row>
                </ion-card-header>
                <hr />
                <ion-card-content class="ion-no-padding">
                  <ion-row
                    class="ion-align-items-center ion-no-margin"
                  >
                    <ion-button color="medium" size="small"
                      >6MM</ion-button
                    >
                    <ion-button fill="outline" color="medium" size="small"
                      >8MM</ion-button
                    >
                  </ion-row>
                  <ion-row
                    size="auto"
                    class="ion-justify-content-between ion-align-items-center"
                  >
                    <h3 class="card-price">P240.00</h3>
                    <ion-row
                      class="ion-justify-content-between ion-align-items-center"
                    >
                      <ion-buttons>
                        <ion-button
                          size="small"
                          shape="round"
                          color="medium"
                          fill="outline"

                        >
                          <ion-icon
                            slot="icon-only"
                            color="dark"
                            :icon="add"
                          ></ion-icon>
                        </ion-button>
                        <ion-input
                          class="input-items"
                          type="number"
                          value="69"
                          placeholder="69"
                        ></ion-input>
                        <ion-button
                          size="small"
                          shape="round"
                          color="medium"
                          fill="outline"
                        >
                          <ion-icon
                            slot="icon-only"
                            color="dark"
                            :icon="remove"
                          ></ion-icon>
                        </ion-button>
                      </ion-buttons>
                    </ion-row>
                  </ion-row>
                </ion-card-content>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-row
          class="ion-justify-content-between ion-align-items-center ion-padding-horizontal"
        >
          <ion-row class="ion-align-items-center">
            <span class="ion-margin-end cart-total-title" color="medium"
              >Total:</span
            >
            <p class="cart-total-price">P165,600.00</p>
          </ion-row>
            <ion-button expand="block" router-link="/confirmation-order">
              <span>Checkout</span>
            </ion-button>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonRow,
  IonGrid,
  IonCol,
  IonButtons,
  IonBackButton,
  IonPage,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonCard,
  IonContent,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { add, remove } from "ionicons/icons";
</script>

<style scoped>
ion-icon{
  font-size: 13px !important;
}

ion-button{
  --border-width: 1px;
  --background: #FF4500;
}

.ion-padding-start {
  padding-left: 10px;
}

.card-img {
  display: flex;
  align-items: center;
}

img {
  width: 100px;
  max-height: 100%;
  height: fit-content;
}

hr {
  padding: 0;
  margin: 5px 0px;
  height: 0.5px;
  width: 100%;
  background-color: #eee;
}

.cart-total-title {
  font-size: 18px;
  font-weight: 700;
  color: #555;
}

.cart-total-price {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.card-price {
  color: #098d16;
  font-size: 13px;
  font-weight: bold;
}

.input-items {
  text-align: center;
  width: 30px;
  padding: 0px 5px;
}
</style>
