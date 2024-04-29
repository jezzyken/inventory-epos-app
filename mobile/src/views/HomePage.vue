<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-col>
          <div class="ion-padding-horizontal">
            <div class="searchbar">
              <input type="text" placeholder="Search.." />
              <button class="camera-button">
                <ion-icon :icon="cameraOutline"></ion-icon>
              </button>
              <button class="search-button">
                <ion-icon :icon="searchOutline"></ion-icon>
              </button>
            </div>
            <ion-row class="ion-align-items-center ion-justify-content-between">
              <span class="filter-all">All</span>
              <ion-chip v-for="n in 3" :key="n">
                <ion-label>Sample</ion-label>
                <ion-icon class="filter" :icon="close"></ion-icon>
              </ion-chip>
            </ion-row>
          </div>
        </ion-col>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding-vertical">
      <ion-card v-for="item in items" :key="item.id" :router-link="{name: 'product-description', params: {id: item._id}}">
        <ion-grid>
          <ion-row>
            <ion-col
              size="auto"
              style="width: 100px"
              class="card-img ion-no-padding"
            >
              <img
                alt="Silhouette of mountains"
                size="small"
                src="https://miro.medium.com/v2/resize:fit:1224/0*5nT8Skkw8wQs9Pzz"
              />
            </ion-col>
            <ion-col class="ion-padding-start">
              <ion-card-header class="ion-no-padding">
                <ion-row
                  class="ion-align-items-center ion-justify-content-between"
                >
                  <ion-card-title class="card-title">{{ item.name }}</ion-card-title>
                  <p :class="
                    item.stocksQuantity > 0
                      ? 'card-product-status-available'
                      : 'card-product-status-out-of-stock'
                  "
                  >{{  item.stocksQuantity > 0 ? 'available' : 'out of stock' }}</p>
                </ion-row>
              </ion-card-header>
              <hr />
              <ion-card-content class="ion-no-padding">
                <h3 class="ion-margin-bottom">
                  {{ item.description }}
                </h3>
                <ion-row
                  size="auto"
                  class="ion-align-items-center ion-justify-content-between"
                >
                  <h3 class="card-price">{{ item.prices[0].salePrice }}</h3>
                  <ion-row>
                    <div class="card-qty">
                      <h3>QTY:</h3>
                    </div>
                    <h3 class="ion-padding-start">{{ item.stocksQuantity }}</h3>
                  </ion-row>
                  <ion-button size="small" class="card-button">ADD</ion-button>
                </ion-row>
              </ion-card-content>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonLabel,
  IonToolbar,
  IonHeader,
  IonChip,
  IonCardTitle,
  IonImg,
  IonCard,
  IonCol,
  IonRow,
  IonCardContent,
  IonButton,
  IonCardHeader,
  IonGrid,
  IonPage,
  IonContent,
  IonSearchbar,
  IonInput,
  IonIcon,
} from "@ionic/vue";
import { cameraOutline, close, searchOutline } from "ionicons/icons";
import ItemCard from "@/components/ItemCard.vue";
import VariantModal from "@/components/VariantModal.vue";
import axios from 'axios';

export default {
  components: {
    IonLabel,
    IonToolbar,
    IonHeader,
    IonChip,
    IonCardTitle,
    IonImg,
    IonCard,
    IonCol,
    IonRow,
    IonCardContent,
    IonButton,
    IonCardHeader,
    IonGrid,
    IonPage,
    IonContent,
    IonSearchbar,
    ItemCard,
    IonIcon,
    IonInput,
  },
  setup() {
    return { cameraOutline, close, searchOutline };
  },
  created(){
    this.getProduct()
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getProduct(){
      const response = await axios.get('https://inventory-epos-app.onrender.com/api/v1/node/products')
      console.log(response.data.result)

      this.items = response.data.result
    },
    onSelectedItem(item) {
      this.selectedItem = item;
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
ion-icon {
  font-size: 24px;
}

.filter {
  font-size: 16px;
}

ion-chip {
  --background: #f8c101;
  --color: #fff;
}

.searchbar {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e3e3e3;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

textarea:focus,
input:focus {
  outline: none;
}

.camera-button {
  background-color: #fff;
  padding: 6px;
  border: 1px solid #e3e3e3;
  border-right: none;
}

.camera-button:active {
  transform: scale(0.98);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.12);
  /* Lowering the shadow */
}

.search-button {
  color: #fff;
  background-color: #f89501;
  padding: 6px;
  border: 1px solid #f89501;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.search-button:active {
  transform: scale(0.98);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.12);
  /* Lowering the shadow */
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

h3 {
  line-height: 150%;
  font-weight: 300;
  text-align: left;
  font-size: 12px;
  color: #5f5f5f;
}

hr {
  padding: 0;
  margin: 5px 0px;
  height: 0.5px;
  width: 100%;
  background-color: #eee;
}

.card-title {
  color: #333;
  font-size: 20px;
  font-weight: 400;
}

.card-product-status-available,
.card-product-status-available p {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 5px;
  color: #fff;
  background: #098d16;
  border-radius: 2px;
  padding: 4px;
}

.card-product-status-out-of-stock,
.card-product-status-out-of-stock p {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 5px;
  color: #fff;
  background: #fb0404;
  border-radius: 2px;
  padding: 4px;
}

.card-price {
  color: #098d16;
  font-size: 13px;
  font-weight: bold;
}

.card-qty h3 {
  font-weight: bold;
  margin: none;
  border-left: solid 1px #d9d9d9;
  color: #333;
  padding-left: 14px;
}

ion-button {
  --background: #f89501;
}
</style>
