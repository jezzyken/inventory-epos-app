<template>
  <ion-card>
    <ion-grid>
      <ion-row>
        <ion-col class="card-content ion-no-padding" size="3">
          <div style="width: 100px" class="card-content-wrapper--image">
            <img class="test-image" alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png" />
          </div>
        </ion-col>
        <ion-col class="card-content--main" size="9">
          <ion-card-header class="ion-no-padding">
            <ion-card-title><span class="card-content--title">{{ item.name }}</span></ion-card-title>
          </ion-card-header>

          <hr />

          <ion-card-content class="ion-no-padding">
            <h5 class="card-content--body">
              {{ item.description }}
            </h5>
          </ion-card-content>

          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col>
                <ion-text>
                  <span class="card-content--price">P{{ item.price }}</span>
                </ion-text>
              </ion-col>
              <ion-col>
                <div>
                  <span class="card-content--qty">Qty:</span>
                  <span>{{ item.quantity }}</span>
                </div>
              </ion-col>
              <ion-col>
                <ion-row>
                  <ion-col>
                    <div class="card-content-btn">
                      <ion-button size="small" @click="onClickItem(item)">ADD</ion-button>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-grid>

        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

<script>

import { IonCard, IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, IonText, IonCardHeader, IonButton } from "@ionic/vue";

export default {
  components: {
    IonCard, IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, IonText, IonCardHeader, IonButton
  },
  props:{
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onClickItem(item){
      this.$emit("on-selected-item", item)
    } 
  }
}
</script>

<style scoped>

.card-content--main {
  padding: 10px 10px 0 10px;
}

.card-content--price {
  font-size: 15px;
  font-weight: 600;
  color: rgb(3, 124, 9);

}

ion-grid {
  --ion-grid-padding: 0px;
}

hr {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

ion-img {
  /* height: 300px; */

}

.card-content--title {
  font-size: 16px;
  font-weight: 300;
}

.card-content--body {
  font-size: 12px;
  color: #747474
}

.card-content--qty {
  padding: 10px;
  border-left: 1px solid #eee
}

.card-content-btn {
  display: flex;
  align-items: end;
  justify-content: end;
}


.card-content-wrapper--image {
  height: 100%;
  display: flex;
}

.test-image {
  margin: auto;
  height: 100px;
  padding: 10px;
}

.content--card {
  margin-bottom: 2px;
}

ion-button {
  --background: #f89500;
  --color: #fff;
}
</style>