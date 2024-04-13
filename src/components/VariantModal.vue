<template>
  <ion-modal :is-open="isOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @didDismiss="closeModal">
    <div class="block">
      <div class="variant-title-wrapper">
        <span class="variant--title">{{item.name}}</span>
        <span class="variant--price">P420.00</span>
        <span class="variant--qty">12</span>
      </div>

      <hr>

      <div>
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <!-- <ion-col>
                <div>
                  <span class="card-content--qty">UNITS:</span>
                  <ion-grid>
                    <ion-row>
                      <div>12</div>
                      <div>12</div>
                    </ion-row>
                  </ion-grid>
                </div>
              </ion-col> -->
            <ion-col>
              <div>
                <ion-grid>

                  <ion-row>
                    <ion-col size="3">
                      <span class="card-content--qty">UNITS:</span>
                    </ion-col>
                    <ion-col size="9">

                      <div style="display: flex; flex-wrap: wrap;">
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          PIECE
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          BOX
                        </div>
                      </div>
                    </ion-col>
                  </ion-row>

                  <ion-row>
                    <ion-col size="3">
                      <span class="card-content--qty">VARIANTS:</span>
                    </ion-col>
                    <ion-col size="9">

                      <div style="display: flex; flex-wrap: wrap;">
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>
                        <div
                          style="padding: 5px; margin-left: 5px; margin-bottom: 5px; border: solid 1px #ddd; font-size: 14px;">
                          8MM
                        </div>

                      </div>
                    </ion-col>
                  </ion-row>


                  <ion-row>
                    <ion-col>
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div><span class="card-content--qty">QUANTITY:</span></div>
                        <div style="display: flex; align-items: center; justify-content: end;">
                          <ion-button fill="outline" size="small" class="btn--add">+</ion-button>
                          <ion-input style="width: 30px; text-align: center;" placeholder="1"></ion-input>
                          <ion-button fill="outline" size="small" class="btn--add">-</ion-button>
                        </div>
                      </div>
                    </ion-col>
                  </ion-row>

                  <hr>

                  <ion-row>
                    <ion-col>
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div><span class="card-content--qty">Total:</span></div>
                        <div style="display: flex; align-items: center; justify-content: end;">
                          <ion-text class="variant--total">P420.00</ion-text>
                        </div>
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>
            </ion-col>


            <!-- <ion-col>
                <ion-row>
                  <ion-col>
                    <div class="card-content-btn">
                      <ion-button size="small">ADD</ion-button>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col> -->
          </ion-row>
        </ion-grid>

      </div>
      <div class="variant-confrim--btn">
        <ion-button expand="block" shape="round" @click="closeModal">CONFIRM</ion-button>
      </div>
    </div>
  </ion-modal>
</template>

<script>
import { IonGrid, IonCol, IonRow, IonModal, IonButton, IonInput, IonText } from "@ionic/vue";

export default {
  components: {
    IonModal,
    IonButton,
    IonInput, IonGrid, IonCol, IonRow, IonText
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
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
    closeModal() {
      console.log("closing")
      this.$emit('close');
    }
  }
}
</script>

<style>
.block {
  width: 100%;
}

.variant-confrim--btn {
  margin: 12px;
}

ion-modal {
  --height: auto;
}

.variant-title-wrapper {
  margin: 20px;
}

.variant--title {
  font-size: 16px;
}

.variant--price,
.variant--qty {
  font-size: 10px;
  padding: 5px;
  color: #fff
}

.variant--price {
  background-color: rgb(3, 124, 9);
  margin-left: 8px;
}

.variant--qty {
  background-color: rgb(245, 88, 15);
  margin-left: 5px;
}

hr {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn--add {
  --border-radius: 50px;
  --border-color: #000;
  height: 20px;
  width: 30px;
  color: #000
}

.variant--total {
  font-size: 20px;
  font-weight: 6 00;
  color: rgb(3, 124, 9);
}
</style>
