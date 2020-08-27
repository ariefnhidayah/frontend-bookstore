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
                    <div class="cart-price font-weight-medium h4 mb-3">{{ price_rupiah(data.book.price) }} <span style="color: #C1C1C1;">x {{ data.quantity }}</span></div>
                </div>
            </v-col>
            <v-col cols="3" class="py-0 d-flex align-center">
                <div class="cart-price font-weight-bold" style="font-size: 20px;">
                    {{ price_rupiah(data.total_price) }}
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    methods: {
        price_rupiah(number) {
            let reverse = number.toString().split('').reverse().join('')
            let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
        },
    },
    props: {
        data: Object
    }
}
</script>