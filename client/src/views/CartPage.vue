<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-margin ion-no-padding home-content-container">
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
                  </ion-row>
                </ion-card-header>
                <hr>
                <ion-card-content class="ion-no-padding">
                  <div class="card-input-var">
                    <button class="var-button">
                      6MM
                    </button>
                    <button class="var-button">
                      8MM
                    </button>
                  </div>
                  <ion-row size="auto" class="card-options">
                    <h3 class="card-price">P240.00</h3>
                    <ion-row class="card-input-qty">
                      <button class="card-add-button">
                        +
                      </button>
                      <ion-input class="input-items" type="number" value="69"></ion-input>
                      <button class="card-minus-button">
                        <hr>
                      </button>
                    </ion-row>
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
import { IonPage, IonContent, IonSearchbar } from "@ionic/vue";
import ItemCard from "@/components/ItemCard.vue";
import VariantModal from "@/components/VariantModal.vue"

export default {
  components: {
    IonPage,
    IonContent,
    IonSearchbar,
    ItemCard,
    VariantModal
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
      selectedItem: {}
    };
  },

  methods: {
    onSelectedItem(item) {
      this.selectedItem = item
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    }
  }
};
</script>

<style scoped>
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
  color: #5F5F5F;
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

ion-row {
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-input-var{
  margin: 5px 0px;
  display: flex;
  align-items: center;
}

.var-button{
  font-size: 12px;
  text-transform: uppercase;
  color: #333;
  border: solid 1px #d9d9d9;
  background: none;
  padding: 5px 5px;
  margin-right: 10px;
}


.card-price {
  color: #098D16;
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

.input-items{
  text-align: center;
  width: 30px;
  padding: 0px 5px;
}

.card-add-button,
.card-minus-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: none;
  margin: 0;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 1px solid #333;
}

.card-minus-button hr {
  height: 1px;
  background: #333;
  width: 6px;
}
</style>
