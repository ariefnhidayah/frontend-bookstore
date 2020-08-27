import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4C40E0',
        secondary: '#3A329B',
        accent: '#82B1FF',
        error: '#d9534f',
        info: '#E34E4E',
        success: '#00A8A8',
        warning: '#FFC107',
      },
    },
  },
})