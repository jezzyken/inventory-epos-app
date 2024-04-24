<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-margin ion-no-padding home-content-container">
      <div class="delivery-header">
        <span class="delivery-title">Delivery</span>
        <ion-button color="light" size="small"><ion-icon :icon="filter"></ion-icon></ion-button>
      </div>
      <div>
        <div class="delivery-lists">
          <ion-item class="delivery-delivered" detail lines="full" v-for="n in 5" :key="n">
            <ion-label>
              <ion-row>
                <div>
                  <h3>Ochinchin Orewa</h3>
                  <p>Planet Pinku, Omniverse 420</p>
                </div>
                <h3 class="status-delivered">
                  delivered
                </h3>
              </ion-row>
            </ion-label>
          </ion-item>
          <ion-item class="delivery-pending" detail lines="full" v-for="n in 4" :key="n">
            <ion-label>
              <ion-row>
                <div>
                  <h3>Ochinchin Orewa</h3>
                  <p>Planet Pinku, Omniverse 420</p>
                </div>
                <h3 class="status-pending">
                  Pending
                </h3>
              </ion-row>
            </ion-label>
          </ion-item>
        </div>
      </div>
      <!-- <VariantModal :item="selectedItem" :isOpen="isOpen"  @close="closeModal"/>
      <ItemCard v-for="item in items" :key="item.id" :item="item" @onSelectedItem="onSelectedItem" /> -->
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSearchbar, IonIcon, IonButton } from "@ionic/vue";
import { filter } from 'ionicons/icons';
import ItemCard from "@/components/ItemCard.vue";
import VariantModal from "@/components/VariantModal.vue"

export default {
  components: {
    IonPage,
    IonContent,
    IonSearchbar,
    ItemCard,
    VariantModal,
    IonIcon,
    IonButton
  },
  setup() {
      return { filter };
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
.delivery-header {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-title {
  font-size: 2rem;
  color: #333;
}

.delivery-lists{
  margin: 0px 20px;
}

.delivery-delivered{
  border-left: 3px solid #098D16 ;
  margin-bottom: 20px;
}

.delivery-pending{
  border-left: 3px solid #FBBC04 ;
  margin-bottom: 20px;
}

.status-delivered{
  color: #098D16;
  text-transform: capitalize;
}

.status-pending{
  color: #FBBC04;
  text-transform: capitalize;
}

h3 {
  line-height: 150%;
  font-weight: 300;
  text-align: left;
  font-size: 15px;
  color: #333;
}

p{
  color: #5F5F5F;
  font-size: 12px;
}

ion-row {
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
