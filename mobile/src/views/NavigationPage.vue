<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-button router-link="/cart-page" fill="clear" color="medium">
          <ion-icon class="cart" aria-hidden="true" :icon="cartOutline" />
        </ion-button>
        <ion-tab-button tab="delivery" href="/delivery">
          <ion-icon aria-hidden="true" :icon="cubeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="transaction" href="/transaction">
          <ion-icon aria-hidden="true" :icon="receiptOutline" />
        </ion-tab-button>
        <ion-tab-button tab="setting" href="/setting">
          <ion-icon aria-hidden="true" :icon="settingsOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { homeOutline, receiptOutline, settingsOutline, cubeOutline, cartOutline } from "ionicons/icons";
</script>

<style scoped>
  .cart{
    font-size: 28px;
    color: #666;
  }
</style>
