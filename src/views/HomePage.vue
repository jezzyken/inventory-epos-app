<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-margin ion-no-padding">
      <div>
        <ion-searchbar></ion-searchbar>
      </div>
     <!-- <div>
        <ion-card v-for="n in 10" :key="n">
          <ion-grid>
            <ion-row>
              <ion-col size="auto" style="width: 100px">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              </ion-col>
              <ion-col>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <h3>
                    Here's a small text description for the card content. Nothing
                    more, nothing less.
                  </h3>
                  <ion-row size="auto" class="centerInputs">
                    <h3>P240.00</h3>
                    <ion-row  >
                      <h3>QTY:</h3>
                      <h3 class="ion-padding-start">69</h3>
                    </ion-row>
                    <ion-button color="dark" fill="clear"><h3>ADD</h3></ion-button>
                  </ion-row>
                </ion-card-content>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </div> -->
      <VariantModal :item="selectedItem" :isOpen="isOpen"  @close="closeModal"/>
      <ItemCard v-for="item in items" :key="item.id" :item="item" @onSelectedItem="onSelectedItem" />
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
    closeModal(){
      this.isOpen = false
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  max-height: 100%;
  height: fit-content;
}

h3 {
  text-align: center;
  font-size: 11px;
}

.centerInputs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
