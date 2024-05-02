<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <div class="container accordion-collapsed">
        <ion-input class="input-margin" fill="outline" placeholder="Name"></ion-input>
        <div class="delivery-confirmation">
          <span class="delivery-title">Delivery:</span>
          <ion-radio-group allow-empty-selection="false" value="custom-checked" class="delivery-confirmation-toggle">
            <ion-radio @click="onToggleBtn(true)" value="pineapple">YES</ion-radio>
            <ion-radio @click="onToggleBtn(false)" value="cherries">NO</ion-radio>
          </ion-radio-group>
        </div>
      </div>
      <div class="form-container" :class="toggleDelivery ? 'show' : 'hide'">
        <ion-list>
          <ion-input v-model="items.name" class="input-margin" fill="outline" placeholder="Name"></ion-input>
          <div class="stacked-inputs">
            <ion-input v-model="items.contact" class="input-margin" fill="outline" placeholder="Contact"></ion-input>
            <ion-input v-model="items.date" class="input-margin" fill="outline" placeholder="DateTime"></ion-input>
          </div>
          <ion-input v-model="items.address" class="input-margin" fill="outline" placeholder="Address"></ion-input>
          <ion-input v-model="items.note" class="input-margin" fill="outline" placeholder="Notes"></ion-input>
        </ion-list>
      </div>
      <div class="container">
        <h3 class="delivery-total-info">Payment Info:</h3>
        <div class="stacked-info">
          <h3 class="delivery-total-info">Total Items:</h3>
          <h3 class="delivery-total-info">1</h3>
        </div>
        <div class="stacked-info">
          <h3 class="delivery-total-info">Total Price:</h3>
          <h3 class="delivery-total-info">P420.00</h3>
        </div>
        <div class="stacked-info">
          <div class="credit-input">
            <h3 class="delivery-total-info">Cash</h3>
            <ion-input class="input-margin" fill="outline" placeholder="P69,420.00"></ion-input>
          </div>
          <div class="credit-input">
            <h3 class="delivery-total-info">Change</h3>
            <ion-input :disabled="true" class="input-margin" fill="outline" placeholder="P0.00"></ion-input>
          </div>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar class="ion-padding-horizontal">
        <ion-button expand="block" router-link="/confirmation-order">
          <span>Confirm Order</span>
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonList,
  IonPage,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonContent,
  IonInput,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";

export default {
  components: {
    IonList,
    IonPage,
    IonHeader,
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonContent,
    IonInput,
    IonRadio,
    IonRadioGroup,
  },
  data() {
    return {
      toggleDelivery: false,
      items: {},
    };
  },
  methods: {
    onToggleBtn(toggle) {
      this.toggleDelivery = toggle;
      if (toggle === false) {
        for (const [key] of Object.entries(this.items)) {
            this.items[key] = ""
        }
      }
    },
  },
};
</script>

<style scoped>
ion-button {
  --background: #ff4500;
}

.delivery-title {
  font-size: 14px;
  color: #333;
  margin-right: 20px;
  text-transform: uppercase;
}

.container {
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.input-margin {
  margin-bottom: 15px;
}

h3 {
  color: #333;
}

.stacked-inputs {
  display: flex;
  margin-bottom: 10px;
}

.stacked-inputs:first-child {
  background: red;
  font-size: 10px;
}

.stacked-info {
  /* width: 230px; */
  display: flex;
  justify-content: space-between;
}

.credit-input {
  display: flex;
  flex-direction: column;
}

.credit-input:first-child {
  margin-right: 20px;
}

.delivery-total-info {
  font-size: 16px;
  text-align: start;
}

.delivery-confirmation {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

ion-input:nth-child(1) {
  margin-right: 10px;
}

ion-radio {
  --border-radius: 4px;
  --inner-border-radius: 4px;
  --color: #ddd;
  font-size: 12px;
  padding-right: 5px;
  --color-checked: #333;
}

ion-radio.ios::part(container) {
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.radio-checked.ios::part(container) {
  border-color: #333;
}

.form-container {
  margin-top: 15px;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
  max-height: 0;
}

.show {
  max-height: 300px;
}

.hide {
  max-height: 0;
}
</style>
