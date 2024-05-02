<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div>
        <h3>Setting</h3>
        <ion-radio-group
          allow-empty-selection="false"
          value="turtles"
          class="ion-margin"
        >
          <ion-radio value="dogs">Dogs</ion-radio><br />
          <ion-radio value="cats">Cats</ion-radio><br />
          <ion-radio value="turtles">Turtles</ion-radio><br />
          <ion-radio value="fish">Fish</ion-radio><br />
        </ion-radio-group>
        <ion-list>
          <ion-input
          v-model="inputValue"
          class="input-margin"
          fill="outline"
          placeholder="Name"
        ></ion-input>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonRadio,
  IonRadioGroup,
  IonList,
  IonItem,
  IonInput,
} from "@ionic/vue";
export default {
  components: {
    IonPage,
    IonContent,
    IonRadio,
    IonRadioGroup,
    IonList,
    IonItem,
    IonInput,
  },
  data(){
    return{
      inputValue: []
    }
  },
};
</script>
