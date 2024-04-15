<template>
  <ion-page>
    <ion-content
      :fullscreen="true"
      class="ion-no-margin ion-no-padding home-content-container"
    >
      <div class="container">
        <ion-input
          class="input-margin"
          label="Customer Name"
          fill="outline"
          label-placement="floating"
          placeholder="Name"
        ></ion-input>
        <div class="delivery-confirmation">
          <span class="delivery-title">Delivery:</span>
          <ion-radio-group
            value="custom-checked"
            class="delivery-confirmation-toggle"
          >
            <ion-radio value="pineapple">YES</ion-radio>
            <ion-radio value="cherries">NO</ion-radio>
          </ion-radio-group>
        </div>
      </div>
      <div class="container">
        <ion-input
          class="input-margin"
          fill="outline"
          label="Name"
          label-placement="floating"
          placeholder="Name"
        ></ion-input>
        <div class="stacked-inputs">
          <ion-input
            class="input-margin"
            fill="outline"
            label="Contact No."
            label-placement="floating"
            placeholder="Contact"
          ></ion-input>
          <ion-input
            class="input-margin"
            fill="outline"
            label="Delivery Date & Time"
            label-placement="floating"
            placeholder="DateTime"
          ></ion-input>
        </div>
        <ion-input
          class="input-margin"
          fill="outline"
          label="Address"
          label-placement="floating"
          placeholder="Address"
        ></ion-input>
        <ion-input
          class="input-margin"
          fill="outline"
          label="Notes"
          label-placement="floating"
          placeholder="Notes"
        ></ion-input>
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
            <ion-input
            class="input-margin"
            fill="outline"
            label-placement="stacked"
            placeholder="P69,420.00"
          ></ion-input>
          </div>
          <div class="credit-input">
            <h3 class="delivery-total-info">Change</h3>
            <ion-input
            class="input-margin"
            fill="outline"
            label-placement="stacked"
            placeholder="P0.00"
          ></ion-input>
          </div>
        </div>
      </div>
      <!-- <VariantModal :item="selectedItem" :isOpen="isOpen"  @close="closeModal"/>
      <ItemCard v-for="item in items" :key="item.id" :item="item" @onSelectedItem="onSelectedItem" /> -->
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonItem,
  IonInput,
  IonList,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";


export default {
  components: {
    IonPage,
    IonContent,
    IonSearchbar,
    IonItem,
    IonInput,
    IonList,
    IonRadio,
    IonRadioGroup,
  },
};
</script>

<style scoped>
.delivery-title {
  font-size: 14px;
  color: #333;
  margin-right: 20px;
  text-transform: uppercase;
}

.container {
  margin-top: 40px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.input-margin {
  margin-bottom: 15px;
}

.stacked-inputs {
  display: flex;
  margin-bottom: 10px;
}

.stacked-inputs:first-child{
  background: red;
  font-size: 10px;
}

.stacked-info {
  /* width: 230px; */
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
}

.credit-input{
  display: flex;
  flex-direction: column;
}

.credit-input:first-child{
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

ion-input:nth-child(1){
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
</style>
