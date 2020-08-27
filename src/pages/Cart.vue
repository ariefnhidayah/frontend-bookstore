<template>
    <section class="cart-section">
        <v-container v-if="!loading">
            <v-row>
                <v-col cols="12" class="px-0 cart-title">
                    <h2 class="font-weight-medium h3"><v-icon class="pa-1" color="white">mdi-cart</v-icon> &nbsp; Keranjang</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8" class="pl-0" v-if="getCarts && getCarts.length > 0">
                    <CartComponent v-for="(cart, i) in getCarts" :key="i" :data="cart" />
                </v-col>
                <v-col cols="8" class="pl-0 d-flex" v-else>
                    <h3 class="text-center">Keranjang Kosong!</h3>
                </v-col>
                <v-col cols="4" class="pl-0">
                    <div class="cart-address py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div class="font-weight-medium h4">Masukkan Alamat</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-text-field label="Alamat" v-model="address.address" dense outlined></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-select
                                    v-model="address.province_id"
                                    dense
                                    label="Provinsi"
                                    outlined
                                    :items="listProvince"
                                    :item-text="`province`"
                                    :item-value="`province_id`"
                                    @change="getCities()"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <v-select
                                    v-model="address.city_id"
                                    dense
                                    label="Kota"
                                    :items="listCities"
                                    :item-text="`city_name`"
                                    :item-value="`city_id`"
                                    outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-text-field
                                    outlined
                                    label="Kecamatan"
                                    v-model="address.district"
                                    dense>

                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <v-text-field
                                    outlined
                                    label="Kode Pos"
                                    v-model="address.postcode"
                                    dense>

                                </v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="cart-checkout py-5 px-3">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-2">
                                <div class="font-weight-medium h4">Total Belanja</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <div class="font-weight-bold price">{{ price_rupiah(grandTotal) }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-btn color="primary" block depressed class="font-weight-bold" :disabled="disabledBtnCheckout" @click="submit()">Lanjutkan</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row>
                <v-col cols="4" class="px-0 cart-title">
                    <v-skeleton-loader
                        type="heading"
                        ref="skeleton"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8" class="pl-0">
                    <div class="cart-product py-5 px-3 mb-5" v-for="i in 3" :key="i">
                        <v-row>
                            <v-col cols="3" class="cart-image py-0">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="135px"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col cols="3" class="pt-5">
                                <div>
                                    <v-skeleton-loader
                                        type="heading"
                                        ref="skeleton"
                                    ></v-skeleton-loader>
                                    <v-skeleton-loader
                                        type="text"
                                        ref="skeleton"
                                        class="mt-5"
                                    ></v-skeleton-loader>
                                    <v-skeleton-loader
                                        type="text"
                                        ref="skeleton"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="3"></v-col>
                            <v-col cols="3" class="pt-5">
                                <v-skeleton-loader
                                    type="button"
                                    ref="skeleton"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="4" class="pl-0">
                    <div class="cart-address py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-3">
                                <v-skeleton-loader
                                    type="heading"
                                    ref="skeleton"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-3">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="40px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-3">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="40px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-3">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="40px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-3">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="40px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="cart-checkout py-5 px-3">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-2">
                                <v-skeleton-loader
                                    type="heading"
                                    ref="skeleton"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-skeleton-loader
                                    type="text"
                                    ref="skeleton"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="48px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import CartComponent from '../components/CartProduct.vue'
import $axios from '../api.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        CartComponent
    },
    data() {
        return {
            listProvince: [],
            listCities: [],
            address: {
                province_id: '',
                city_id: '',
                district: '',
                postcode: '',
                address: ''
            },
            loading: true
        }
    },
    methods: {
        ...mapMutations('checkout', ['SET_ADDRESS']),
        price_rupiah(number) {
            let reverse = number.toString().split('').reverse().join('')
            let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
        },
        getProvincies() {
            $axios.get('v1/cart/get-provincies').then(res => {
                const data = res.data
                if (data.status == 'success') {
                    const rajaongkir = data.data.rajaongkir
                    this.listProvince = rajaongkir.results
                    this.loading = false
                }
            }).catch(err => {
                console.warn(err.message)
            })
        },
        getCities() {
            $axios.post('v1/cart/get-cities', {
                province: this.address.province_id
            }).then(res => {
                const data = res.data
                if (data.status == 'success') {
                    const rajaongkir = data.data.rajaongkir
                    this.listCities = rajaongkir.results.map(city => {
                        return {
                            city_id: city.city_id,
                            city_name: `${city.type} ${city.city_name}`,
                        }
                    })
                }
            }).catch(err => {
                console.warn(err.message);
            })
        },
        submit() {
            this.$router.push('/payment')
            this.SET_ADDRESS(this.address)
        },
        setSeo() {
            document.title = `Keranjang - ${this.$store.state.site_name}`
             const check_meta = document.querySelectorAll('meta')
            let count_check = 0

            check_meta.forEach(check => {
                if (check.getAttribute('name') == 'description' || check.getAttribute('name') == 'title' || check.getAttribute('name') == 'robots') {
                    if (check.getAttribute('name') == 'description') {
                        check.setAttribute('content', this.$store.state.description)
                    }

                    if (check.getAttribute('name') == 'title') {
                        check.setAttribute('content', `Keranjang - ${this.$store.state.site_name}`)
                    }

                    if (check.getAttribute('name') == 'robots') {
                        check.setAttribute('content', 'noindex, nofollow')
                    }
                    count_check = 1
                }
            })

            if (count_check == 0) {
                var meta_description = document.createElement('meta');
                meta_description.setAttribute('name', 'description')
                meta_description.setAttribute('content', this.$store.state.description)
                document.getElementsByTagName('head')[0].appendChild(meta_description);

                const meta_title = document.createElement('meta')
                meta_title.setAttribute('name', 'title')
                meta_title.setAttribute('content', `Keranjang - ${this.$store.state.site_name}`)
                document.getElementsByTagName('head')[0].appendChild(meta_title)

                const meta_robots = document.createElement('meta')
                meta_robots.setAttribute('name', 'robots')
                meta_robots.setAttribute('content', 'noindex, nofollow')
                document.getElementsByTagName('head')[0].appendChild(meta_robots)
            } 
        }
    },
    computed: {
        ...mapGetters('cart', ['getCarts']),
        ...mapGetters('auth', ['isAuth']),
        disabledBtnCheckout() {
            if (this.isAuth) {
                const carts = this.getCarts
                if (carts.length > 0 && this.address.address != '' && this.address.province_id != '' && this.address.city_id != '' && this.address.postcode != '' && this.address.district != '') {
                    return carts.some(cart => cart.quantity == 0 || cart.quantity > cart.book.stock)
                } else {
                    return true
                }
            } else {
                return true
            }
        },
        grandTotal() {
            let total = 0
            if (this.isAuth) {
                const carts = this.getCarts
                if (carts.length > 0) {
                    carts.map(cart => total += cart.total_price)
                } 
                return total
            } else {
                return total
            }
        }
    },
    mounted() {
        // console.log(this.getCarts)
        this.getProvincies()
        this.SET_ADDRESS(null)
        this.setSeo()
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles.scss";
.cart-section {
    h2 {
        color: $primary;
    }
    .cart-title {
        .v-icon {
            background-color: $primary;
            border-radius: 4px;
        }
    }

    .cart-address {
        border: 1px solid #C1C1C1;
        border-radius: 4px;
    }
    .cart-checkout {
        border: 1px solid #C1C1C1;
        border-radius: 4px;

        .price {
            color: $info;
            font-size: 24px;
        }
    }
}
</style>