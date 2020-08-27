<template>
    <section class="product-page">
        <v-container v-if="!loading">
            <v-row>
                <v-col cols="12" class="pl-0">
                    Home / <span class="breadcrumb-active">{{ book.name }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5" class="image-cover d-flex justify-center align-center" style="min-height: 450px; border: 1px solid #C1C1C1; border-radius: 10px;">
                    <v-img :src="book.image ? $store.state.url + book.image : ''" :max-width="255"></v-img>
                </v-col>
                <v-col cols="7" class="product-detail">
                    <div class="product-name-detail">
                        <h1>{{ book.name }}</h1>
                    </div>
                    <div class="product-author-detail">
                        <span class="first-span">Penulis</span>
                        <span class="second-span">{{ book.author }}</span>
                    </div>
                    <div class="product-price-detail">
                        <span class="first-span">Harga</span>
                        <span class="second-span">{{ priceRupiah(book.price) }}</span>
                    </div>
                    <div class="product-quantity-detail">
                        <span class="first-span">Jumlah Buku</span>
                        <div class="py-2" style="border-bottom: none;">
                            <div class="quantity-wrapper py-0">
                                <v-btn color="info" x-small fab tile depressed style="border-radius: 5px 0 0 5px" @click="updateQty('minus')" :disabled="disabledButtonMin">
                                    <v-icon color="white" small>mdi-minus</v-icon>
                                </v-btn>
                                <input type="number" class="qty-input" v-model="quantity" @keyup="updateQty()">
                                <v-btn color="success" x-small fab tile depressed style="border-radius: 0 5px 5px 0" @click="updateQty('plus')" :disabled="disabledButtonPlus">
                                    <v-icon color="white" small>mdi-plus</v-icon>
                                </v-btn>
                                <span class="quantity-error" v-if="disabledButtonBuy">
                                    {{ errorMessage }}
                                </span>
                            </div>
                        </div>
                        <div style="margin: 15px 0;">
                            <v-btn color="info" depressed outlined class="mr-4" style="text-transform: capitalize; letter-spacing: normal;" :disabled="disabledButtonBuy" @click="addToCart('buy_now')">Beli Sekarang</v-btn>
                            <v-btn color="info" depressed style="text-transform: capitalize; letter-spacing: normal;" :disabled="disabledButtonBuy" @click="addToCart('add_cart')">Tambah Ke Keranjang</v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-5">
                <v-col cols="12" class="px-0">
                    <h3 class="mb-3">Deskripsi</h3>
                    {{ book.description }}
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row>
                <v-col cols="4" class="pl-0">
                    <v-skeleton-loader
                        type="heading"
                        ref="skeleton"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5" class="image-cover skeleton-image" style="min-height: 450px; border: 1px solid #C1C1C1; border-radius: 10px;">
                    <v-skeleton-loader
                        type="image"
                        ref="skeleton"
                        height="100%"
                    ></v-skeleton-loader>
                </v-col>
                <v-col cols="7" class="product-detail">
                    <div class="product-name-detail">
                        <v-skeleton-loader
                            type="text"
                            ref="skeleton"
                        ></v-skeleton-loader>
                    </div>
                    <div class="product-author-detail">
                        <v-skeleton-loader
                            type="text"
                            ref="skeleton"
                        ></v-skeleton-loader>
                    </div>
                    <div class="product-price-detail">
                        <v-skeleton-loader
                            type="text"
                            ref="skeleton"
                        ></v-skeleton-loader>
                    </div>
                    <div class="product-quantity-detail">
                        <v-skeleton-loader
                            type="button"
                            ref="skeleton"
                        ></v-skeleton-loader>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-5">
                <v-col cols="12" class="px-0">
                    <v-skeleton-loader
                        type="heading"
                        ref="skeleton"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                        type="paragraph"
                        ref="skeleton"
                        class="mt-5"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                        type="paragraph"
                        ref="skeleton"
                        class="mt-5"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                        type="paragraph"
                        ref="skeleton"
                        class="mt-5"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import $axios from '../../api'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    mounted() {
        this.getBook()
        if (process.browser) {
            window.scrollTo(0, 0)
        }
    },
    methods: {
        ...mapActions(['setMessage', 'setDialog']),
        ...mapMutations('cart', ['SET_CART', 'SET_COUNT']),
        getBook() {
            let url = this.$route.path.split('/').pop()
            $axios.get(`v1/book/${url}`).then(res => {
                const data = res.data
                if (data.status == 'success') {
                    this.book = data.data
                    this.loading = false
                    this.setSeo()
                } 
            }).catch(err => {
                this.setMessage({
                    type: 'set',
                    data: err.message,
                    color: 'error'
                })
            })
        },
        priceRupiah(number) {
            if (number) {
                let reverse = number.toString().split('').reverse().join('')
                let ribuan = reverse.match(/\d{1,3}/g);
                ribuan = ribuan.join('.').split('').reverse().join('');
                return 'Rp. ' + ribuan;
            } else {
                return ''
            }
        },
        updateQty(type = null) {
            if (type == 'minus') {
                if (this.quantity == 0) {
                    this.quantity = 0
                } else {
                    this.quantity--
                }
            } else if (type == 'plus') {
                this.quantity++
            } else {
                if (this.quantity == '' || this.quantity < 0) {
                    this.quantity = 0
                } else {
                    this.quantity = Number(this.quantity)
                }
            }
        },
        setMessageError(message) {
            this.errorMessage = message
        },
        addToCart(type) {
            if (this.isAuth) {
                if (type == 'buy_now') {
                    $axios.post('v1/cart/add', {
                        book_id: this.book.id,
                        customer_id: this.getUser.id,
                        qty: this.quantity
                    }, {
                        headers: {
                            token: `Bearer ${this.getToken}`
                        }
                    }).then(res => {
                        const data = res.data
                        if (data.status == 'success') {
                            this.setMessage({
                                type: 'set',
                                data: data.message,
                                color: 'success'
                            })
                            this.getCart()
                            this.$router.push('/cart')
                        }
                    }).catch(err => {
                        this.setMessage({
                            type: 'set',
                            data: err.message,
                            color: 'error'
                        })
                    })
                } else {
                    $axios.post('v1/cart/add', {
                        book_id: this.book.id,
                        customer_id: this.getUser.id,
                        qty: this.quantity
                    }, {
                        headers: {
                            token: `Bearer ${this.getToken}`
                        }
                    }).then(res => {
                        const data = res.data
                        if (data.status == 'success') {
                            this.setMessage({
                                type: 'set',
                                data: data.message,
                                color: 'success'
                            })
                            this.getCart()
                        }
                    }).catch(err => {
                        this.setMessage({
                            type: 'set',
                            data: err.message,
                            color: 'error'
                        })
                    })
                }
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
        },
        setSeo() {
            document.title = `${this.book.name} - ${this.$store.state.site_name}`
            const check_meta = document.querySelectorAll('meta')
            let count_check = 0

            check_meta.forEach(check => {
                if (check.getAttribute('name') == 'description' || check.getAttribute('name') == 'title' || check.getAttribute('name') == 'robots') {
                    if (check.getAttribute('name') == 'description') {
                        check.setAttribute('content', this.book.description.substring(0, 200))
                    }

                    if (check.getAttribute('name') == 'title') {
                        check.setAttribute('content', `${this.book.name} - ${this.$store.state.site_name}`)
                    }

                    if (check.getAttribute('name') == 'robots') {
                        check.setAttribute('content', 'index, follow')
                    }
                    count_check = 1
                }
            })

            if (count_check == 0) {
                var meta_description = document.createElement('meta');
                meta_description.setAttribute('name', 'description')
                meta_description.setAttribute('content', this.book.description.substring(1, 50));
                document.getElementsByTagName('head')[0].appendChild(meta_description);

                const meta_title = document.createElement('meta')
                meta_title.setAttribute('name', 'title')
                meta_title.setAttribute('content', `${this.book.name} - ${this.$store.state.site_name}`)
                document.getElementsByTagName('head')[0].appendChild(meta_title)

                const meta_robots = document.createElement('meta')
                meta_robots.setAttribute('name', 'robots')
                meta_robots.setAttribute('content', 'index, follow')
                document.getElementsByTagName('head')[0].appendChild(meta_robots)
            } 
        }
    },
    data() {
        return {
            book: {},
            quantity: 1,
            errorMessage: '',
            loading: true
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
        disabledButtonMin() {
            if (this.quantity <= 1) {
                return true
            } else {
                return false
            }
        },
        disabledButtonPlus() {
            if (this.quantity >= this.book.stock) {
                return true
            } else {
                return false
            }
        },
        disabledButtonBuy() {
            if (this.quantity > this.book.stock) {
                this.setMessageError(`Maksimal pembelian ${this.book.stock} buku`)
                return true
            } else if (this.quantity < 1) {
                this.setMessageError('Minimal pembelian 1 buku')
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/styles.scss";

.breadcrumb-active {
    color: $primary;
}

.product-detail {
    .quantity-error {
        font-size: 13px;
        position: absolute;
        margin-top: 5px;
        color: $danger;
        display: block;
    }
    .product-name-detail {
        h1 {
            font-size: 32px;
        }
    }
    .product-price-detail {
        span{
            &:last-child {
                color: $info;
            }
        }
    }
    div {
        padding-bottom: 20px;
        padding-top: 20px;
        border-bottom: 1px solid #C1C1C1;
        &:first-child {
            padding-top: 0px;
        }

        .first-span {
            color: #B0B0B0;
            font-size: 14px;
        }

        .second-span {
            display: block;
            font-size: 18px;
            font-weight: 450;
        }

        &:last-child {
            border-bottom: none;
        }
    }

    input[type=number] {
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        text-align: center;
        outline: none;
        border-top: 1px solid #C1C1C1;
        border-bottom: 1px solid #C1C1C1;
        border-radius: none;
        padding: 2px 0px;
        position: relative;
        height: 32px;
        width: 90px;
        top: 1px;
    }
}

.product-page {
    .skeleton-image {
        .v-skeleton-loader__image {
            height: 100%;
        }
    }
}
</style>