<template>
    <section class="order-detail-page">
        <v-container v-if="!loading">
            <v-row>
                <v-col cols="12" class="pl-0">
                    Home / Pesanan / <span class="breadcrumb-active">{{ dataOrder.code }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="px-0">
                    <h2 class="font-weight-medium h3">Detail Pesanan</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8" class="pl-0">
                    <div class="cart-product py-5 px-3 mb-5">
                        <v-row v-for="(book, i) in dataOrder.books" :key="i" class="mb-7">
                            <v-col cols="3" class="d-flex justify-center cart-image py-0">
                                <router-link :to="`product/arial-adara`">
                                    <v-img :src="$store.state.url + book.book.image" max-width="85px"></v-img>
                                </router-link>
                            </v-col>
                            <v-col cols="6" class="py-0 d-flex align-center">
                                <div>
                                    <router-link class="font-weight-medium d-block" style="font-size: 20px;" :to="`/product/${book.book.seo_url}`">{{ book.book.name }}</router-link>
                                    <span class="cart-price font-weight-medium h4 mb-3">{{ priceRupiah(book.price) }}</span> <span class="text--secondary">x {{ book.quantity }}</span>
                                </div>
                            </v-col>
                            <v-col cols="3" class="py-0 d-flex align-center">
                                <div>
                                    <div class="cart-price font-weight-bold h4" style="font-size: 20px;">{{ priceRupiah(book.subtotal) }}</div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="4" class="pl-0">
                    <div class="order-section-child py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">Status Pesanan</div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div v-if="dataOrder.status == 0">Pesanan Baru</div>
                                <div v-else-if="dataOrder.status == 1">Pesanan Dikirim</div>
                                <div v-else-if="dataOrder.status == 2">Pesanan Selesai</div>
                                <div v-else-if="dataOrder.status == 3">Pesanan Ditolak</div>
                                <div v-else-if="dataOrder.status == 4">Pesanan Diproses</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">Status Pembayaran</div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <v-btn color="warning" depressed small v-if="dataOrder.payment_status == 0">Menunggu Pembayaran</v-btn>
                                <v-btn color="success" depressed small v-else-if="dataOrder.payment_status == 1">Sudah Dibayar</v-btn>
                                <v-btn color="error" depressed small v-else-if="dataOrder.payment_status == 2">Ditolak</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">Alamat Pengiriman</div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <!-- <div>Jl. Kamboja 1 no 93 karawaci kota tangerang banten, 15116</div> -->
                                <div>{{ `${dataOrder.address} ${dataOrder.district}, ${dataOrder.city}, ${dataOrder.province} ${dataOrder.postcode}` }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">Kurir Pengiriman</div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div>{{ dataOrder.shipping_courier }}</div>
                            </v-col>
                        </v-row>
                        <v-row v-if="dataOrder.status == 1">
                            <v-col cols="12" class="pb-0 pt-0">
                                <v-btn color="primary" depressed block @click="dialogConfirmProduct = true">Konfirmasi Barang</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="order-section-child py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">Subtotal</div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-medium">{{ priceRupiah(dataOrder.subtotal) }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">Ongkos Kirim</div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-medium">{{ priceRupiah(dataOrder.shipping_cost) }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">Kode Unik</div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-medium">{{ priceRupiah(dataOrder.transfer_code) }}</div>
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
                                <div class="font-weight-bold price-payment">{{ priceRupiah(dataOrder.total_price + dataOrder.transfer_code) }}</div>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="order-section-child py-5 px-3">
                        <v-row>
                            <v-col cols="8" class="pt-2 pb-2">
                                <div class="font-weight-medium">Metode Pembayaran</div>
                            </v-col>
                            <v-col cols="4" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-bold">{{ dataOrder.payment_method.name_bank }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8" class="pt-2 pb-2">
                                <div class="font-weight-medium">Transfer Ke</div>
                            </v-col>
                            <v-col cols="4" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-bold">{{ dataOrder.payment_method.account_number }}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">Atas Nama</div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 d-flex justify-end">
                                <div class="font-weight-bold">{{ dataOrder.payment_method.account_name }}</div>
                            </v-col>
                        </v-row>
                        <v-row v-if="dataOrder.payment_status == 0">
                            <v-col cols="12" class="pt-2 pb-2">
                                <v-btn block color="primary" depressed @click="dialogConfirm = true">Konfirmasi Pembayaran</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>

            <v-dialog
                v-model="dialogConfirm"
                max-width="350"
                >
                <v-card>
                    <v-card-title class="headline">Upload Bukti Transfer</v-card-title>

                    <v-card-text>
                        <input type="file" @change="fileHandler">
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        outlined
                        @click="dialogConfirm = false"
                    >
                        Batal
                    </v-btn>

                    <v-btn
                        color="primary"
                        depressed
                        @click="submitConfirm()"
                        :disabled="fileConfirm == '' ? true : false"
                    >
                        Submit
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogConfirmProduct"
                max-width="350"
                >
                <v-card>
                    <v-card-title class="headline">Konfirmasi Barang</v-card-title>

                    <v-card-text>
                        Apakah barang sudah sampai tujuan?. Jika memilih iya maka pesanan ini sudah selesai
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        outlined
                        @click="dialogConfirmProduct = false"
                    >
                        Tidak
                    </v-btn>

                    <v-btn
                        color="primary"
                        depressed
                        @click="confirmProduct()"
                    >
                        Iya
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
        <v-container v-else>
            <v-row>
                <v-col cols="6" class="pl-0">
                    <v-skeleton-loader
                        type="heading"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="px-0">
                    <v-col cols="6" class="pl-0">
                        <v-skeleton-loader
                            type="heading"
                        ></v-skeleton-loader>
                    </v-col>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8" class="pl-0">
                    <div class="cart-product py-5 px-3 mb-5" v-for="i in 3" :key="i">
                        <v-row>
                            <v-col cols="3" class="cart-image py-0">
                                <v-skeleton-loader
                                    type="image"
                                    height="120px"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col cols="6" class="pt-10">
                                <div>
                                    <v-skeleton-loader
                                        type="heading"
                                    ></v-skeleton-loader>
                                    <v-skeleton-loader
                                        type="text"
                                        width="180px"
                                        class="mt-3"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="3" class="pt-10">
                                <div>
                                    <v-skeleton-loader
                                        type="heading"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="4" class="pl-0">
                    <div class="order-section-child py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">
                                    <v-skeleton-loader
                                        type="heading"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div>
                                    <v-skeleton-loader
                                        type="text"
                                        width="190"
                                        class="mt-2"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">
                                    <v-skeleton-loader
                                        type="heading"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <v-skeleton-loader
                                    type="image"
                                    class="mt-2"
                                    height="36"
                                    width="190"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-2 pb-0">
                                <div class="font-weight-bold h4">
                                    <v-skeleton-loader
                                        type="heading"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div>
                                    <v-skeleton-loader
                                        width="300"
                                        type="paragraph"
                                        class="mt-2"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-0 pb-0">
                                <div class="font-weight-bold h4">
                                    <v-skeleton-loader
                                        type="heading"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-3">
                                <div>
                                    <v-skeleton-loader
                                        type="text"
                                        width="190"
                                        class="mt-2"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="order-section-child py-5 px-3 mb-5">
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 pl-15">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 pl-15">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 pl-15">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-2 pb-2">
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 pl-15">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="order-section-child py-5 px-3">
                        <v-row>
                            <v-col cols="6" class="pt-2 pb-2">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 pl-15">
                                <div class="font-weight-medium">
                                    <v-skeleton-loader
                                        type="text"
                                    ></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-2 pb-2">
                                <v-skeleton-loader
                                    type="image"
                                    height="36"
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
import $axios from '../../api'
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            loading: true,
            dataOrder: {},
            dialogConfirm: false,
            fileConfirm: '',
            dialogConfirmProduct: false
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuth', 'getToken', 'getUser'])
    },
    methods: {
        ...mapActions(['setMessage']),
        getOrder() {
            let id = this.$route.path.split('/').pop()
            $axios.post('v1/order/detail', {
                id: id,
                customer_id: this.getUser.id
            }, {
                headers: {
                    token: `Bearer ${this.getToken}`
                }
            }).then(({data}) => {
                if (data.status == 'success') {
                    this.dataOrder = data.data.order
                    this.dataOrder.books = data.data.order_books
                    this.loading = false
                    this.setSeo()
                } else {
                    this.$router.push('/')
                }
            }).catch(err => {
                console.warn(err.message)
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
        fileHandler(e) {
            // if (e.target.files[0]) {
            //     this.getBase64(e.target.files[0])
            // }
            this.fileConfirm = e.target.files[0]
        },
        // getBase64(fileObject) {
        //     const reader = new FileReader()
        //     reader.onload = e => {
        //         this.fileConfirm = e.target.result
        //     }
        //     reader.readAsDataURL(fileObject)
        // },
        submitConfirm() {
            let formData = new FormData()
            formData.append('image', this.fileConfirm)
            formData.append('id', this.dataOrder.id)
            $axios.post('v1/confirm-payment',
                formData, {
                headers: {
                    'token': `Bearer ${this.getToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({ data }) => {
                if (data.status == 'success') {
                    this.loading = true
                    this.dataOrder = {}
                    this.fileConfirm = ''
                    this.dialogConfirm = false
                    this.getOrder()
                } else {
                    this.fileConfirm = ''
                    this.dialogConfirm = false
                    this.setMessage({
                        type: 'set',
                        data: data.message,
                        color: 'error'
                    })
                }
            }).catch(err => {
                console.warn(err.message);
            })
        },
        confirmProduct() {
            $axios.post('v1/confirm-product', {
                id: this.dataOrder.id
            }, {
                headers: {
                    'token': `Bearer ${this.getToken}`,
                }
            }).then(({data}) => {
                if(data.status == 'success') {
                    this.loading = true
                    this.dataOrder = {}
                    this.dialogConfirmProduct = false
                    this.getOrder()
                } else {
                    this.dialogConfirmProduct = false
                    this.setMessage({
                        type: 'set',
                        data: data.message,
                        color: 'error'
                    })
                }
            }).catch(err => {
                console.warn(err.message);
            })
        },
        setSeo() {
            document.title = `Pesanan #${this.dataOrder.code} - ${this.$store.state.site_name}`
             const check_meta = document.querySelectorAll('meta')
            let count_check = 0

            check_meta.forEach(check => {
                if (check.getAttribute('name') == 'description' || check.getAttribute('name') == 'title' || check.getAttribute('name') == 'robots') {
                    if (check.getAttribute('name') == 'description') {
                        check.setAttribute('content', this.$store.state.description)
                    }

                    if (check.getAttribute('name') == 'title') {
                        check.setAttribute('content', `Pesanan #${this.dataOrder.code} - ${this.$store.state.site_name}`)
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
                meta_title.setAttribute('content', `Pesanan #${this.dataOrder.code} - ${this.$store.state.site_name}`)
                document.getElementsByTagName('head')[0].appendChild(meta_title)

                const meta_robots = document.createElement('meta')
                meta_robots.setAttribute('name', 'robots')
                meta_robots.setAttribute('content', 'noindex, nofollow')
                document.getElementsByTagName('head')[0].appendChild(meta_robots)
            } 
        }
    },
    mounted() {
        if (this.isAuth) {
            this.getOrder()
        } else {
            this.$router.push('/')
        }
        window.scroll(0, 0)
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/styles.scss";
.order-detail-page {
    .order-section-child {
        border: 1px solid #C1C1C1;
        border-radius: 4px;
    }
}
</style>