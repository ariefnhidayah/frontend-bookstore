<template>
  <v-card max-width="285px" class="product-card" min-height="450px">
      <router-link :to="`product/${data.seo_url}`">
        <div class="image-cover" style="min-height: 300px;">
          <v-img :src="$store.state.url + data.image" style="width: 150px" class="mx-auto" />
        </div>
      </router-link>
      <v-card-title><router-link class="product-name" :to="`product/${data.seo_url}`">{{ data.name.length > 20 ? data.name.substr(0, 20) + '...' : data.name }}</router-link></v-card-title>
      <v-card-subtitle class="product-price">{{ priceRupiah(data.price) }}</v-card-subtitle>
      <v-card-actions style="position: absolute; left: 0; right: 0;bottom: 0;">
          <v-btn block color="info" depressed @click="addToCart()">Tambah Keranjang</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import $axios from '../api.js'
export default {
    name: 'Product',
    props: {
      data: Object
    },
    methods: {
      ...mapActions(['setDialog', 'setMessage']),
      ...mapMutations('cart', ['SET_CART', 'SET_COUNT']),
      priceRupiah(number) {
        let reverse = number.toString().split('').reverse().join('')
        let ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp. ' + ribuan;
      },
      addToCart() {
        if (this.isAuth) {
          $axios.post('v1/cart/add', {
            book_id: this.data.id,
            customer_id: this.getUser.id,
            qty: 1
          }, {
            headers: {
              token: 'Bearer ' + this.getToken
            }
          }).then(res => {
            const data = res.data
            if (data.status == 'success') {
              this.getCart()
              this.setMessage({
                  type: 'set',
                  data: data.message,
                  color: 'success'
              })
            }
          }).catch(err => {
            this.setMessage({
                type: 'set',
                data: err.message,
                color: 'error'
            })
          })
        } else {
          this.setDialog({
              type: 'login',
              data: true
          })
          if (this.$refs.formLogin) {
              this.$refs.formLogin.reset()
          }
          if (this.$refs.formRegister) {
              this.$refs.formRegister.reset()
          }
        }
      },
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
      ...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
      ...mapState('auth', ['user'])
    }
}
</script>

<style scoped lang="scss">

</style>