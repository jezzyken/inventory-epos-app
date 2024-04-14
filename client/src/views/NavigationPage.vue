<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="cart" href="/navs/cart">
          <ion-icon aria-hidden="true" :icon="ellipse" />
        </ion-tab-button>
        <ion-tab-button tab="delivery" href="/navs/delivery">
          <ion-icon aria-hidden="true" :icon="square" />
        </ion-tab-button>
        <ion-tab-button tab="home" href="/navs/home">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="transaction" href="/navs/transaction">
          <ion-icon aria-hidden="true" :icon="square" />
        </ion-tab-button>
        <ion-tab-button tab="setting" href="/navs/setting">
          <ion-icon aria-hidden="true" :icon="square" />
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
import { ellipse, square, triangle } from "ionicons/icons";
</script>
