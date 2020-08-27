<template>
  <v-app id="app">
    <Header/>
    <router-view></router-view>
    <Footer />
    
    <v-snackbar
        v-model="snackbarStatus"
        :color="snackbarColor"
        top
        :timeout="2000"
    >
    {{ snackbarText }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="white"
                text
                icon
                v-bind="attrs"
                @click="$store.commit('CLOSE_SNACKBAR')"
            >
            <v-icon small>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { mapState, mapGetters, mapMutations } from 'vuex'
import $axios from './api.js'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapMutations('cart', ['SET_CART', 'SET_COUNT']),
    getCart() {
        if (this.isAuth) {
            $axios.post('v1/cart/get', {customer_id: this.getUser.id}, {
                headers: {
                    token: 'Bearer ' + this.getToken,
                }
            }).then(res => {
                const data = res.data
                if (data.status == 'success') {
                    this.SET_CART(data.data)
                    let count = 0;
                    if (data.data.length > 0) {
                        data.data.map(cart => {
                            count += cart.quantity
                        })
                        this.SET_COUNT(count)
                    } else {
                      this.SET_COUNT(count)
                    }
                }
            })
        } 
    }
  },
  computed: {
    ...mapState(['snackbarStatus', 'snackbarText', 'snackbarColor']),
    ...mapGetters(['getSnackbarStatus']),
    ...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
    snackbarStatus: {
      get() {
        return this.getSnackbarStatus
      },
      set(data) {
        this.$store.commit('SET_SNACKBAR', data)
      }
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";

.v-btn {
  letter-spacing: normal !important;
  text-transform: capitalize !important;
}
</style>
