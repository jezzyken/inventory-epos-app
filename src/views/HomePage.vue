<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-margin ion-no-padding">
      <div>
        <ion-searchbar></ion-searchbar>
      </div>
      <!-- <div>
        <ion-card>
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

      <div>
        <ion-card v-for="(n, i) in 3" :key="i" class="content--card">
          <ion-grid>
            <ion-row>
              <ion-col class="card-content ion-no-padding" size="3">
                <div style="width: 100px"  class="card-content-wrapper--image">
                  <img class="test-image" alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png"/>
                </div>
              </ion-col>
              <ion-col class="card-content--main" size="9">
                <ion-card-header class="ion-no-padding">
                  <ion-card-title><span class="card-content--title">Card Title</span></ion-card-title>
                </ion-card-header>

                <hr />

                <ion-card-content class="ion-no-padding">
                  <h5 class="card-content--body">
                    Here's a small text description for the card content.
                    Nothing more, nothing less.
                  </h5>
                </ion-card-content>

                <ion-grid>
                  <ion-row class="ion-align-items-center">
                    <ion-col>
                      <ion-text>
                        <span class="card-content--price">P420.00</span>
                      </ion-text>
                    </ion-col>
                    <ion-col>
                      <div>
                        <span class="card-content--qty">Qty:</span>
                        <span>10</span>
                      </div>
                    </ion-col>
                    <ion-col>
                      <ion-row>
                        <ion-col>
                          <div class="card-content-btn">
                            <ion-button size="small">ADD</ion-button>
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonSearchbar,
} from "@ionic/vue";
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

/* my version */

/* .card-img {
  background-color: red;
}

.card-content {
  background-color: blue;
} */

.card-content--main{
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

ion-img{
  /* height: 300px; */
  
}

.card-content--title{
  font-size: 16px;
  font-weight: 300;
}

.card-content--body{
  font-size: 12px;
 color: #747474
}

.card-content--qty{
  padding: 10px;
  border-left: 1px solid #eee
}

.card-content-btn{
  display: flex;
    align-items: end;
    justify-content: end;
}


.card-content-wrapper--image{
  height: 100%;
  display: flex;
}

.test-image{
  margin: auto;
  height: 100px;
  padding: 10px;
}

.content--card{
  margin-bottom: 2px;
}

ion-button {
    --background: #f89500;
    --color: #fff;
  }
</style>
