<template>
    <div class="cart-product py-5 px-3 mb-5">
        <v-row>
            <v-col cols="3" class="d-flex justify-center cart-image py-0">
                <router-link :to="`product/${data.book.seo_url}`">
                    <v-img :src="$store.state.url + data.book.image" max-width="85px"></v-img>
                </router-link>
            </v-col>
            <v-col cols="6" class="py-0 d-flex align-center">
                <div>
                    <router-link class="font-weight-medium d-block" style="font-size: 20px;" :to="`product/${data.book.seo_url}`">{{ data.book.name }}</router-link>
                    <div class="cart-price font-weight-medium h4 mb-3">{{ price_rupiah(data.book.price) }}</div>
                    <v-btn color="info" depressed dense @click="deleteDialog = true"><v-icon>mdi-trash-can</v-icon> &nbsp; Hapus</v-btn>
                </div>
            </v-col>
            <v-col cols="3" class="py-0 d-flex align-center">
                <div class="quantity-wrapper py-0">
                    <v-btn color="info" x-small fab tile depressed style="border-radius: 5px 0 0 5px;" @click="updateQty('minus')" :disabled="disabledButtonMin">
                        <v-icon color="white" small>mdi-minus</v-icon>
                    </v-btn>
                    <input type="number" class="qty-input" v-model="data.quantity" @keyup="updateQty()">
                    <v-btn color="success" x-small fab tile depressed style="border-radius: 0 5px 5px 0;" @click="updateQty('plus')" :disabled="disabledButtonPlus">
                        <v-icon color="white" small>mdi-plus</v-icon>
                    </v-btn>
                    <span class="quantity-error" v-if="disabledMessage">
                        {{ errorMessage }}
                    </span>
                </div>
            </v-col>
        </v-row>
        <v-dialog
        v-model="deleteDialog"
        max-width="400"
        >
        <v-card>
            <v-card-title class="headline">Yakin ingin menghapus buku?</v-card-title>

            <v-card-text>
                Buku akan dihapus permanen dari keranjang
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="info"
                @click="deleteDialog = false"
                outlined
                depressed
            >
                Tidak
            </v-btn>

            <v-btn
                color="info"
                @click="deleteCart()"
                depressed
            >
                Ya, Hapus!
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {  mapGetters, mapMutations, mapActions } from 'vuex'
import $axios from '../api.js'
export default {
    props: {
        data: Object
    },
    methods: {
        ...mapMutations('cart', ['SET_COUNT', 'SET_CART', 'CLEAR_CART']),
        ...mapActions(['setMessage']),
        price_rupiah(number) {
            let reverse = number.toString().split('').reverse().join('')
            let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
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
        updateCart() {
            if (this.isAuth) {
                $axios.post('v1/cart/update', {
                    qty: this.data.quantity,
                    id: this.data.id,
                    customer_id: this.getUser.id
                }, {
                    headers: {
                        token: 'Bearer ' + this.getToken
                    }
                }).then(res => {
                    const data = res.data
                    if (data.status == 'success') {
                        this.getCart()
                    }
                })
            }
        },
        updateQty(type = null) {
            if (type == 'minus') {
                if (this.data.quantity == 0) {
                    this.data.quantity = 0
                } else {
                    this.data.quantity--
                }
            } else if (type == 'plus') {
                this.data.quantity++
            } else {
                if (this.data.quantity == '' || this.data.quantity < 0) {
                    this.data.quantity = 0
                } else {
                    this.data.quantity = Number(this.data.quantity)
                }
            }
            this.updateCart()
        },
        setErrorMessage(message) {
            this.errorMessage = message
        },
        deleteCart() {
            if (this.isAuth) {
                $axios.post('v1/cart/delete', {
                    id: this.data.id,
                    customer_id: this.getUser.id
                }, {
                    headers: {
                        token: 'Bearer ' + this.getToken
                    }
                }).then(res => {
                    const data = res.data
                    if (data.status == 'success') {
                        this.setMessage({
                            type: 'set',
                            data: 'Keranjang berhasil dihapus',
                            color: 'success'
                        })
                        this.getCart()
                        this.deleteDialog = false
                    }
                }).catch(err => {
                    console.log(err.message)
                })
            }
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
        disabledButtonMin() {
            if (this.data.quantity <= 1) {
                return true
            } else {
                return false
            }
        },
        disabledButtonPlus() {
            if (this.data.quantity >= this.data.book.stock) {
                return true
            } else {
                return false
            }
        },
        disabledMessage() {
            if (this.data.quantity > this.data.book.stock) {
                this.setErrorMessage(`Maksimal pembelian ${this.data.book.stock} buku`)
                return true
            } else if (this.data.quantity < 1) {
                this.setErrorMessage(`Minimal pembelian 1 buku`)
                return true
            } else {
                return false
            }
        }
    },
    data() {
        return {
            errorMessage: '',
            deleteDialog: false
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles.scss";
.cart-product {
    border: 1px solid #C1C1C1;
    border-radius: 4px;

    .quantity-error {
        font-size: 13px;
        position: absolute;
        margin-top: 2px;
        color: $danger;
        display: block;
        width: 140px;
    }

    .cart-image {
        img {
            width: 85px !important;
        }
    }

    a {
        text-decoration: none;
        color: black;
        &:hover {
            color: $primary;
        }
    }

    .cart-price {
        color: $info
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
    top: 1.5px;
}
</style>