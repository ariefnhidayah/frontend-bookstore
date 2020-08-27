<template>
    <div class="cart-product py-5 px-7 mb-5">
        <v-row>
            <v-col cols="3">
                <div>
                    <div class="text--secondary up-text">{{ timeConvert }}</div>
                    <div class="font-weight-bold down-text">{{ data.code }}</div>
                </div>
            </v-col>
            <v-col cols="3">
                <div>
                    <div class="text--secondary up-text">Status</div>
                    <div class="font-weight-bold down-text" v-if="data.status == 0">Pesanan Baru</div>
                    <div class="font-weight-bold down-text" v-else-if="data.status == 1">Pesanan Dikirim</div>
                    <div class="font-weight-bold down-text" v-else-if="data.status == 2">Pesanan Selesai</div>
                    <div class="font-weight-bold down-text" v-else-if="data.status == 3">Pesanan Ditolak</div>
                    <div class="font-weight-bold down-text" v-else-if="data.status == 4">Pesanan Diproses</div>
                </div>
            </v-col>
            <v-col cols="3">
                <div>
                    <div class="text--secondary up-text">Total Bayar</div>
                    <div class="font-weight-bold down-text cart-price">{{ price_rupiah(Number(data.total_price) + Number(data.transfer_code)) }}</div>
                </div>
            </v-col>
            <v-col cols="3" class="d-flex align-center justify-end">
                <div>
                    <v-btn color="primary" outlined :to="`/order/detail/${data.id}`">Lihat Detail Pesanan</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <div>
                    <div class="text--secondary up-text">Daftar Buku</div>
                    <v-row v-for="(product, i) in data.products" :key="i">
                        <v-col cols="3" class="d-flex align-center pt-1">
                            <v-img :src="$store.state.url + product.book.image"></v-img>
                        </v-col>
                        <v-col cols="9" class="d-flex align-center pt-1">
                            <div>
                                <router-link :to="`/product/${product.book.seo_url}`">{{ product.book.name }}</router-link>
                                <div class="up-text">
                                    <span class="cart-price">{{ price_rupiah(product.price) }}</span>
                                    <span class="text--secondary"> x {{ product.quantity }}</span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col cols="3">
                <div>
                    <div class="text--secondary up-text">Total Harga</div>
                    <div class="down-text cart-price">{{ price_rupiah(data.subtotal) }}</div>
                </div>
            </v-col>
            <v-col cols="3">
                <div>
                    <div class="text--secondary up-text">Ongkos Kirim</div>
                    <div class="down-text cart-price">{{ price_rupiah(data.shipping_cost) }}</div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    computed: {
        timeConvert() {
            const date = new Date(this.data.createdAt)
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }
    },
    methods: {
        price_rupiah(number) {
            let reverse = number.toString().split('').reverse().join('')
            let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
        },
    }
}
</script>

<style lang="scss">
.order-history-page {
	.up-text {
		font-size: 14px;
	}

	.down-text {
		font-size: 16px;
	}
}
</style>