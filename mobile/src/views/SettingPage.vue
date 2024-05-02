<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div>
          <input :value="change">
      </div>
      <div>
          <input :value="price">
      </div>
      <div>
          <input type="number" v-model.number="cash">
          <h3>Cash: {{ cash }}</h3>
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
      cash: 0,
      price: 420,
    }
  },
  computed: {
    change() {
      return this.cash - this.price
    }
  },
  methods:{
  }
};
</script>
