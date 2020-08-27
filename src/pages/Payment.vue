<template>
    <section class="cart-section">
        <v-container v-if="!loading">
            <v-row>
                <v-col cols="12" class="px-0 cart-title">
                    <h2 class="font-weight-medium h3"><v-icon class="pa-1" color="white">mdi-cart</v-icon> &nbsp; Pembayaran</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8" class="pl-0" v-if="getCarts && getCarts.length > 0">
                    <ProductComponent v-for="(cart, i) in getCarts" :key="i" :data="cart" />
                </v-col>
                <v-col cols="4" class="pl-0">
                    <div class="cart-address py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div class="font-weight-medium h4">Pilih Pembayaran</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-3">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        color="primary"
                                        dark
                                        block
                                        depressed
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                        {{ selectedPayment == null ? 'Pilih Pembayaran' : selectedPayment.name_bank }}
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                        v-for="(item, index) in listPayment"
                                        :key="index"
                                        @click="selectPayment(index)"
                                        >
                                        <v-list-item-title>{{ item.name_bank }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div class="font-weight-medium h4">Pilih Pengiriman</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            block
                                            depressed
                                            v-bind="attrs"
                                            v-on="on"
                                            >
                                            {{ selectedShipping == null ? 'Pilih Pengiriman' : `${selectedShipping.label} (${price_rupiah(selectedShipping.value)})` }}
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="(item, index) in listOngkir"
                                            :key="index"
                                            @click="selectShipping(index)"
                                            >
                                            <v-list-item-title>{{ item.label }} ({{ price_rupiah(item.value) }})</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pb-0 pt-1">
                                <span class="text--secondary">Estimasi Pengiriman: {{ selectedShipping == null ? '0 hari' : selectedShipping.estimate }}</span>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="cart-checkout py-5 px-3">
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">Subtotal</div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-medium">{{ price_rupiah(subtotalCart) }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">Ongkos Kirim</div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-medium">{{ selectedShipping == null ? price_rupiah(0) : price_rupiah(selectedShipping.value) }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-2 pb-2">
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="py-2">
                                <div class="font-weight-bold">Total Bayar</div>
                            </v-col>
                            <v-col cols="6" class="py-2 d-flex justify-end">
                                <div class="font-weight-bold price-payment">{{ selectedShipping == null ? price_rupiah(subtotalCart + 0) : price_rupiah(subtotalCart + selectedShipping.value) }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-btn color="primary" block depressed class="font-weight-bold" :loading="loadingSubmit" :disabled="disabledButtonCheckout" @click="submit();loadingSubmit = true">Checkout</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row>
                <v-col cols="5" class="pl-0">
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
                            <v-col cols="3" class="pt-12">
                                <v-skeleton-loader
                                    type="heading"
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
                            <v-col cols="12" class="py-0">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="40px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-5 pb-3">
                                <v-skeleton-loader
                                    type="heading"
                                    ref="skeleton"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
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
                            <v-col cols="8" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="20px"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col cols="4" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="20px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="20px"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col cols="4" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="20px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-2 pb-2">
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="20px"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col cols="4" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="20px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-skeleton-loader
                                    type="image"
                                    ref="skeleton"
                                    height="36px"
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProductComponent from '../components/PaymentProduct.vue'
import $axios from '../api.js'
export default {
    computed: {
        ...mapGetters('cart', ['getCarts']),
        ...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
        ...mapGetters('checkout', ['getAddress']),
        totalWeight() {
            const carts = this.getCarts
            let total_weight = 0
            carts.map(cart => {
                total_weight += cart.total_weight
            })
            return total_weight
        },
        subtotalCart() {
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
        },
        disabledButtonCheckout() {
            if (this.selectedShipping == null || this.selectedPayment == null) {
                return true
            } else {
                return false
            }
        }
    },
    components: {
        ProductComponent
    },
    mounted() {
        if (this.getAddress == null) {
            this.$router.push('/cart')
        }
        this.getPayments()
        this.getOngkir()
        this.setSeo()
    },
    methods: {
        ...mapActions(['setMessage']),
        ...mapMutations('cart', ['SET_COUNT', 'SET_CART', 'CLEAR_CART']),
        getOngkir() {
            if (this.isAuth) {
                this.listOngkir = []
                $axios.post('v1/checkout/get-cost', {
                    city_id: this.getAddress.city_id,
                    weight: this.totalWeight
                }, {
                    headers: {
                        token: `Bearer ${this.getToken}`
                    }
                }).then(res => {
                    const data = res.data
                    if (data.status == 'success') {
                        data.data.map(ongkir => {
                            let dataOngkir = ongkir[0]
                            if(dataOngkir.costs.length > 0) {
                                let code = dataOngkir.code.toUpperCase()
                                dataOngkir.costs.map(cost => {
                                    let service = cost.service
                                    let value = cost.cost[0].value
                                    let etd = cost.cost[0].etd
                                    if(!etd.includes("HARI")) {
                                        etd += ' HARI'
                                    }
                                    this.listOngkir.push({
                                        code: code,
                                        service: service,
                                        value: value,
                                        name: `${code}-${service}`,
                                        label: `${code} ${service}`,
                                        estimate: etd.toLowerCase()
                                    })
                                })
                            }
                        })
                        // console.log(this.listOngkir)
                        this.loading = false
                    }
                }).catch(err => {
                    console.warn(err.message);
                })
            }
        },
        getPayments() {
            this.listPayment = []
            $axios.get('v1/checkout/get-payment', {
                headers: {
                    token: `Bearer ${this.getToken}`
                }
            }).then(res => {
                const data = res.data
                if (data.status == 'success') {
                    this.listPayment = data.data
                }
            }).catch(err => {
                console.warn(err.message);
            })
        },
        selectShipping(index) {
            this.selectedShipping = this.listOngkir[index]
        },
        price_rupiah(number) {
            let reverse = number.toString().split('').reverse().join('')
            let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
        },
        selectPayment(index) {
            this.selectedPayment = this.listPayment[index]
        },
        submit() {
            const books = []
            const carts = this.getCarts
            let subtotal = 0
            const customerId = this.getUser.id
            const shippingCost = this.selectedShipping.value
            const paymentMethodId = this.selectedPayment.id
            const shippingCourier = this.selectedShipping.label
            const address = this.getAddress.address
            const provinceId = this.getAddress.province_id
            const cityId = this.getAddress.city_id
            const district = this.getAddress.district
            const postcode = this.getAddress.postcode
            carts.map(cart => {
                books.push({
                    id: cart.bookId,
                    quantity: cart.quantity,
                    price: cart.price,
                    subtotal: cart.total_price,
                    total_weight: cart.total_weight
                })
                subtotal += cart.total_price
            })
            const totalPrice = subtotal + shippingCost
            $axios.post('v1/checkout/add-order', {
                customerId,
                paymentMethodId,
                books,
                subtotal,
                totalPrice,
                shippingCost,
                address,
                cityId,
                provinceId,
                district,
                postcode,
                shippingCourier
            }, {
                headers: {
                    token: `Bearer ${this.getToken}`
                }
            }).then(res => {
                const data = res.data
                if(data.status == 'success') {
                    this.CLEAR_CART()
                    this.$router.push('/order/detail/' + data.id)
                }
                this.loadingSubmit = false
            }).catch(err => {
                this.setMessage({
                    type: 'set',
                    data: err.message,
                    color: 'error'
                })
            })
        },
        setSeo() {
            document.title = `Pembayaran - ${this.$store.state.site_name}`
             const check_meta = document.querySelectorAll('meta')
            let count_check = 0

            check_meta.forEach(check => {
                if (check.getAttribute('name') == 'description' || check.getAttribute('name') == 'title' || check.getAttribute('name') == 'robots') {
                    if (check.getAttribute('name') == 'description') {
                        check.setAttribute('content', this.$store.state.description)
                    }

                    if (check.getAttribute('name') == 'title') {
                        check.setAttribute('content', `Pembayaran - ${this.$store.state.site_name}`)
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
                meta_title.setAttribute('content', `Pembayaran - ${this.$store.state.site_name}`)
                document.getElementsByTagName('head')[0].appendChild(meta_title)

                const meta_robots = document.createElement('meta')
                meta_robots.setAttribute('name', 'robots')
                meta_robots.setAttribute('content', 'noindex, nofollow')
                document.getElementsByTagName('head')[0].appendChild(meta_robots)
            } 
        }
    },
    data() {
        return {
            listOngkir: [],
            loading: true,
            listPayment: [],
            selectedShipping: null,
            selectedPayment: null,
            loadingSubmit: false
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles.scss";
    .price-payment {
        color: $info;
    }
</style>