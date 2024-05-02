<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <ion-text class="ion-margin-bottom">
          <h1 class="done-header">Welcome :)</h1>
        </ion-text>
        <ion-list class="ion-margin-horizontal">
          <ion-item class="ion-margin-bottom">
            <ion-input placeholder="Username">
            <ion-icon size="small" slot="start" :icon="personCircleOutline"></ion-icon>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input placeholder="Password">
              <ion-icon size="small" slot="start" :icon="lockClosedOutline"></ion-icon>
            </ion-input>
          </ion-item>
        </ion-list>
        <ion-button router-link="/home" class="ion-margin" expand="block">
          <span>Login</span>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/vue";
import { personCircleOutline, lockClosedOutline } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonInput,
    IonItem,
    IonList,
    IonFooter,
    IonToolbar,
    IonButton,
    IonContent,
    IonText,
    IonIcon,
  },
  setup() {
    return { personCircleOutline, lockClosedOutline };
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.done-header {
  color: #333;
  display: block;
  text-align: center;
}

ion-button {
  --background: #ff4500;
}

h3 {
  text-transform: capitalize;
}
</style>
