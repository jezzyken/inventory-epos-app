<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-img
        :src="items.image"
        >
        </ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-row class="ion-align-items-center ion-justify-content-between">
        <ion-col class="ion-no-padding">
          <span class="product-name">{{ items.name }}</span>
        </ion-col>
        <ion-col class="ion-no-padding">
          <span class="product-cost"> 999 </span>
        </ion-col>
      </ion-row>
      <ion-col class="ion-no-padding">
        <div>
          <p
            :class="
              items.status === 'available'
                ? 'card-product-status-available'
                : 'card-product-status-out-of-stock'
            "
          >
            {{ items.status }}
          </p>
        </div>
        <div class="ion-margin-top">
          <span class="product-brand">{{ items.productBrand }}</span>
          <span class="product-code">{{ items.productCode }}</span>
        </div>
      </ion-col>
      <ion-col>
        <span class="category-title">Category:</span>
        <ion-row>
          <ion-card
            class="ion-no-margin"
            v-for="category in items.prices"
            :key="category._id"
          >
            <ion-card-header>
              <span class="product-category-title">{{
                category.variant.name
              }}</span>
            </ion-card-header>
            <ion-card-content>
              <ion-col>
                <span class="product-category-price">{{
                  category.categoryPrice
                }}</span>
                <span
                  :class="
                    category.categoryStatus === 'In Stock'
                      ? 'product-category-status-available'
                      : 'product-category-status-out-of-stock'
                  "
                  >{{ category.categoryStatus }}</span
                >
              </ion-col>
            </ion-card-content>
          </ion-card>
        </ion-row>
      </ion-col>
      <ion-col>
        <span class="description-title">Description</span>
        <div>
          <span class="description-text"
            >{{ items.description }}...<strong class="read-more"
              >Read More</strong
            ></span
          >
        </div>
      </ion-col>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-row
          class="ion-justify-content-between ion-align-items-center ion-padding-horizontal"
        >
          <ion-row class="ion-align-items-center">
            <span class="ion-margin-end product-total-title" color="medium"
              >Price:</span
            >
            <p class="product-total-price"> filteredItems.cost </p>
          </ion-row>
          <ion-button expand="block" router-link="/confirmation-order">
            <span>Add to Cart</span>
          </ion-button>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonToolbar,
  IonHeader,
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
  IonBackButton,
  IonButtons,
  IonFooter,
} from "@ionic/vue";
import { filter } from "ionicons/icons";
import axios from 'axios';


export default {
  components: {
    IonFooter,
    IonButtons,
    IonBackButton,
    IonToolbar,
    IonHeader,
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
  },
  created() {
    this.getProduct()

  },
  data() {
    return {
      items: [],
    };
  },
  methods:{
    async getProduct(){
      const response = await axios.get(`https://inventory-epos-app.onrender.com/api/v1/node/products/${this.$route.params.id}`)
      console.log(response.data.result)

      this.items = response.data.result
    },
  },
};
</script>

<style scoped>
ion-card,
.card-ios,
.card-md {
  box-shadow: none;
  border: #e9e9e9 1px solid;
  margin-right: 16px;
  margin-bottom: 16px;
}

.product-cost {
  display: block;
  text-align: right;
  color: #098d16;
  font-size: 24px;
  font-weight: 600;
}

.product-name {
  display: block;
  color: #333;
  font-size: 20px;
  font-weight: 500;
}

.product-brand {
  display: block;
  color: #797979;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.product-code {
  display: block;
  text-transform: uppercase;
  color: #b1b1b1;
  font-size: 12px;
}

.card-product-status-available,
.card-product-status-available p {
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  font-size: 10px;
  color: #fff;
  background: #098d16;
  border-radius: 2px;
  padding: 4px;
}

.card-product-status-out-of-stock,
.card-product-status-out-of-stock p {
  text-transform: uppercase;
  display: inline-block;
  font-weight: bold;
  font-size: 10px;
  color: #fff;
  background: #fbbc04;
  border-radius: 2px;
  padding: 4px;
}

.category-title {
  display: block;
  text-transform: uppercase;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.product-category-title {
  display: block;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.product-category-price {
  display: block;
  text-align: start;
  text-transform: uppercase;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.product-category-status-available {
  display: block;
  text-align: start;
  color: #098d16;
  font-size: 12px;
  font-weight: 500;
}

.product-category-status-out-of-stock {
  display: block;
  text-align: start;
  color: #fbbc04;
  font-size: 12px;
  font-weight: 500;
}

.description-title {
  display: block;
  color: #333;
  font-size: 16px;
  font-weight: 300;
}

.description-text {
  color: #797979;
  font-size: 14px;
  font-weight: 300;
}

.product-total-price {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.product-total-title {
  font-size: 16px;
  font-weight: 700;
  color: #555;
}

.read-more {
  color: #333;
}

ion-buttons {
  /* z-index: 1; */
  position: absolute;
}

ion-button {
  --background: #f89501;
}

ion-card-header {
  border-bottom: 1px #eaeaea solid;
}
</style>
