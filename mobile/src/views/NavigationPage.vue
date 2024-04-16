<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="cart" href="/navs/cart">
          <ion-icon aria-hidden="true" :icon="cartOutline" />
        </ion-tab-button>
        <ion-tab-button tab="delivery" href="/navs/delivery">
          <ion-icon aria-hidden="true" :icon="cubeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="home" href="/navs/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="transaction" href="/navs/transaction">
          <ion-icon aria-hidden="true" :icon="receiptOutline" />
        </ion-tab-button>
        <ion-tab-button tab="setting" href="/navs/setting">
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
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { homeOutline, receiptOutline, settingsOutline, cubeOutline, cartOutline } from "ionicons/icons";
</script>
