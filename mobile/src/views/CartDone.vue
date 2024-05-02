<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
        <ion-text>
          <h1 class="done-header">Order Sent</h1>
        </ion-text>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          class="ion-margin"
          expand="block"
          @click="backToHome"
        >
          <span>Back To Home</span>
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>


<script>
  import { IonButton, IonContent, IonFooter, IonIcon, IonPage, IonText, IonToolbar, } from '@ionic/vue';
  import { checkmarkCircleOutline } from 'ionicons/icons';

  export default{
    components: {
      IonPage,
      IonFooter,
      IonToolbar,
      IonButton,
      IonContent,
      IonText,
      IonIcon,
    },
    setup() {
      return { checkmarkCircleOutline };
    },

    methods: {
      backToHome(){
        console.log('back to home')
        this.$router.push({path: "/home"})
      }
    }
  }
</script>

<style scoped>
  .container{
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .done-header{
    color: #333;
    display: block;
    text-align: center;
  }

  ion-icon{
    font-size: 100px;
    color: #098d16;
    font-weight: 300;
  }

  ion-button {
  --background: #ff4500;
  }

  h3{
    text-transform: capitalize;
  }
</style>