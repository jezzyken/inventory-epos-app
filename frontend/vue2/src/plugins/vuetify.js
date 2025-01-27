import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
 theme: {
   themes: {
     light: {
       primary: '#000249',
       secondary: '#0F4392', 
       accent: '#FF4949',
       error: '#DD1717'
     }
   }
 }
})