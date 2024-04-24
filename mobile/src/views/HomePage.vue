<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-margin ion-no-padding home-content-container">
      <div class="home-searchbar">
        <ion-col>
          <div class="searchbar">
            <input type="text" placeholder="Search..">
            <button class="camera-button">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </button>
            <button class="search-button">
              <ion-icon :icon="searchOutline"></ion-icon>
            </button>
          </div>
          <div class="filters">
            <span class="filter-all">All</span>
            <ion-chip v-for="n in 3" :key="n">
              <ion-label>Sample</ion-label>
              <ion-icon :icon="close"></ion-icon>
            </ion-chip>
          </div>
        </ion-col>
      </div>
      <div>
        <ion-card v-for="n in 10" :key="n">
          <ion-grid>
            <ion-row>
              <ion-col size="auto" style="width: 100px" class="card-img ion-no-padding">
                <img alt="Silhouette of mountains"
                  src="https://miro.medium.com/v2/resize:fit:1224/0*5nT8Skkw8wQs9Pzz" />
              </ion-col>
              <ion-col class="ion-padding-start">
                <ion-card-header class="ion-no-padding">
                  <ion-row>
                    <ion-card-title class="card-title">Card Title</ion-card-title>
                    <p class="card-product-status">Available</p>
                  </ion-row>
                </ion-card-header>
                <hr />
                <ion-card-content class="ion-no-padding">
                  <h3>
                    Here's a small text description for the card content.
                    Nothing more, nothing less.
                  </h3>
                  <ion-row size="auto" class="card-options">
                    <h3 class="card-price">P240.00</h3>
                    <ion-row>
                      <div class="card-qty">
                        <h3>QTY:</h3>
                      </div>
                      <h3 class="ion-padding-start">69</h3>
                    </ion-row>
                    <button class="card-button">ADD</button>
                  </ion-row>
                </ion-card-content>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
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
  IonInput,
  IonIcon,
} from "@ionic/vue";
import { cameraOutline, close, searchOutline } from "ionicons/icons";
import ItemCard from "@/components/ItemCard.vue";
import VariantModal from "@/components/VariantModal.vue";

export default {
  components: {
    IonPage,
    IonContent,
    IonSearchbar,
    ItemCard,
    VariantModal,
    IonIcon,
    IonInput

  },
  setup() {
    return { cameraOutline, close, searchOutline };
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Item 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, voluptate",
          price: 120,
          quantity: 10,
        },
        {
          id: 2,
          name: "Item 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, voluptate",
          price: 410,
          quantity: 20,
        },
        {
          id: 3,
          name: "Item 3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, voluptate",
          price: 30,
          quantity: 60,
        },
        {
          id: 4,
          name: "Item 4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, voluptate",
          price: 30,
          quantity: 60,
        },
        {
          id: 5,
          name: "Item 5",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, voluptate",
          price: 30,
          quantity: 60,
        },
      ],
      isOpen: false,
      selectedItem: {},
    };
  },

  methods: {
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

ion-chip {
  --background: #F8C101;
  --color: #fff;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-filters {
  position: absolute;
  width: 100%;
  margin-top: 20px;
  padding: 20px 20px 20px 20px;
  background-color: #fff;
  /* opacity: 1; */
  position: sticky;
  top: 70px;
  z-index: 1;
}


.filter-all {
  font-size: 20px;
  color: #333;
}

.filter-button {
  font-size: 10px;
  margin: 0;
  font-weight: 500;
  padding: 7px 15px;
  border-radius: 25px;
  background: #f8c101;
  color: #fff;
}

.home-searchbar {
  display: flex;
  align-items: center;
  background: #fff;
  /* opacity: 1; */
  padding: 10px;
  margin-top: 20px;
  position: sticky;
  top: 0;
  z-index: 1;
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

.card-product-status,
.card-product-status p {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 5px;
  color: #fff;
  background: #098d16;
  border-radius: 2px;
  padding: 4px;
}

ion-row {
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.card-button {
  margin: 0;
  font-size: 10px;
  font-weight: 400;
  padding: 7px 15px;
  border-radius: 5px;
  background: #f89501;
  color: #fff;
}
</style>
