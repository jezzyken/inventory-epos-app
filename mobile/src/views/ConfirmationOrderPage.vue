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
        <ion-input
          v-model="items.name1"
          class="input-margin"
          fill="outline"
          placeholder="Name"
        ></ion-input>
        <div class="delivery-confirmation">
          <span class="delivery-title">Delivery:</span>
          <ion-list>
            <ion-radio-group
              v-model="items.deliveryStatus"
              allow-empty-selection="false"
              value="custom-checked"
              class="delivery-confirmation-toggle"
            >
              <ion-radio @click="onToggleBtn(true)" value="true">YES</ion-radio>
              <ion-radio @click="onToggleBtn(false)" value="false"
                >NO</ion-radio
              >
            </ion-radio-group>
          </ion-list>
        </div>
      </div>
      <div class="form-container" :class="toggleDelivery ? 'show' : 'hide'">
        <ion-list>
          <ion-input
            v-model="delivery.name"
            class="input-margin"
            fill="outline"
            placeholder="Name"
          ></ion-input>
          <div class="stacked-inputs">
            <ion-input
              v-model="delivery.contact"
              class="input-margin"
              fill="outline"
              placeholder="Contact"
            ></ion-input>
            <ion-input
              v-model="delivery.date"
              class="input-margin"
              fill="outline"
              placeholder="DateTime"
            ></ion-input>
          </div>
          <ion-input
            v-model="delivery.address"
            class="input-margin"
            fill="outline"
            placeholder="Address"
          ></ion-input>
          <ion-input
            v-model="delivery.note"
            class="input-margin"
            fill="outline"
            placeholder="Notes"
          ></ion-input>
        </ion-list>
      </div>
      <div class="container">
        <h3 class="delivery-total-info">Payment Info:</h3>
        <ion-row class="ion-align-items-center ion-justify-content-between">
          <h3 class="delivery-total-info">Total Items:</h3>
          <ion-input
            class="delivery-total-items-info"
            :value="items.totalItems"
          ></ion-input>
        </ion-row>
        <ion-row class="ion-align-items-center ion-justify-content-between">
          <h3 class="delivery-total-info">Total Price:</h3>
          <ion-input
            :disabled="true"
            class="delivery-total-price-info"
            :value="items.price"
          ></ion-input>
        </ion-row>
        <ion-row class="ion-align-items-center ion-justify-content-between">
          <div class="credit-input">
            <h3 class="delivery-total-info">Cash</h3>
            <ion-input
              v-model="items.cash"
              @change="calculateChange"
              class="input-margin delivery-cash-input"
              fill="outline"
              placeholder="P0.00"
            ></ion-input>
          </div>
          <div class="credit-input">
            <h3 class="delivery-total-info">Change</h3>
            <ion-input
              v-model="items.change"
              :disabled="true"
              class="input-margin delivery-change-input"
              fill="outline"
              placeholder="P0.00"
            ></ion-input>
          </div>
        </ion-row>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          @click="submitForm"
          class="ion-margin"
          type="submit"
          value="submit"
          expand="block"
          router-link="/cart-done"
        >
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
  IonRow,
  IonItemGroup,
  IonLabel,
  IonItem,
  IonTextarea,
} from "@ionic/vue";

export default {
  components: {
    IonTextarea,
    IonItem,
    IonLabel,
    IonRow,
    IonItemGroup,
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
      items: {
        totalItems: 10,
        cash: "",
        price: 420,
      },

      delivery: {

      }
    };
  },
  // computed: {
  //   "items.change"() {
  //     return this.items.cash - this.items.price
  //   }
  // },
  methods: {
    onToggleBtn(toggle) {
      this.toggleDelivery = toggle;
      if (toggle === false) {
        for (const [key] of Object.entries(this.delivery)) {
          this.delivery[key] = "";
        }
      }
    },
    submitForm() {
      console.log({...this.items, ...this.delivery});
    },
    calculateChange() {
      if (this.items.cash > this.items.price) {
        return (this.items.change = this.items.cash - this.items.price);
      }
      this.items.change = 0;
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
  display: inline-block;
}

.stacked-inputs {
  display: flex;
  margin-bottom: 10px;
}

.stacked-inputs:first-child {
  background: red;
  font-size: 10px;
}

.credit-input {
  display: flex;
  flex-direction: column;
}

.credit-input:first-child {
  margin-right: 20px;
}

.delivery-total-price-info {
  font-size: 16px;
  color: #333;
  text-align: end;
  width: 100px;
}

.delivery-total-info {
  font-size: 16px;
  text-align: start;
}

.delivery-total-items-info {
  font-size: 16px;
  color: #333;
  text-align: end;
  width: 100px;
}

.delivery-cash-input {
  font-size: 16px;
  color: #333;
  text-align: start;
  width: 150px;
}

.delivery-change-input {
  font-size: 16px;
  color: #333;
  text-align: start;
  width: 150px;
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
  max-height: 400px;
}

.hide {
  max-height: 0;
}
</style>
