<template>
  <section class="landing-page">
      <v-container v-if="!loading">
          <v-row>
              <v-col cols="12">
                  <Banner :data="data" v-for="(data, i) in banner" :key="i" />
              </v-col>
          </v-row>
          <v-row style="margin-top: 50px;" class="pb-5">
              <v-col cols="12" class="px-0">
                  <h2>Daftar Buku</h2>
              </v-col>
              <v-col cols="3" v-for="(book, i) in books" :key="i">
                  <Product :data="book" />
              </v-col>
              <v-col cols="12" class="text-center mt-5" v-if="countProduct < allProduct">
                  <v-btn color="primary" outlined large @click="loadMore(lastBook)">Muat Lainnya</v-btn>
              </v-col>
          </v-row>
      </v-container>
      <v-container v-else>
          <v-row>
                <v-col cols="12" class="banner-skeleton">
                    <v-skeleton-loader
                        type="image"
                        min-height="550px"
                        min-width="100%"
                        ref="skeleton"
                    ></v-skeleton-loader>
                </v-col>
          </v-row>
          <v-row style="margin-top: 20px;" class="pb-5">
              <v-col cols="12">
                    <v-skeleton-loader
                        type="heading"
                        ref="skeleton"
                    ></v-skeleton-loader>
              </v-col>
              <v-col cols="3" v-for="i in 8" :key="i">
                    <v-skeleton-loader
                        type="card"
                        ref="skeleton"
                    ></v-skeleton-loader>
              </v-col>
          </v-row>
      </v-container>
  </section>
</template>

<script>
import Banner from '../components/Banner.vue'
import Product from '../components/Product.vue'
import $axios from '../api.js'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    components: {
        Banner,
        Product
    },
    data() {
        return {
            books: null,
            banner: null,
            lastBook: null,
            allProduct: 0,
            countProduct: 0,
            loading: true
        }
    },
    methods: {
        ...mapActions(['setMessage']),
        ...mapMutations('cart', ['SET_CART', 'SET_COUNT']),
        ...mapMutations('checkout', ['SET_ADDRESS']),
        getBooks() {
            $axios.get('v1/landing-page/books').then(res => {
                const data = res.data
                if (data.status == 'success') {
                    this.books = data.data
                    data.data.map(book => {
                        this.lastBook = book.createdAt
                        this.countProduct++
                    })
                } else {
                    this.setMessage({
                        type: 'set',
                        data: 'Terjadi suatu kesalahan',
                        color: 'error'
                    })
                }
            }).catch(err => {
                this.setMessage({
                    type: 'set',
                    data: err.message,
                    color: 'error'
                })
            })
        },
        getBanner() {
            $axios.get('v1/landing-page/banner').then(res => {
                const data = res.data
                if (data.status == 'success') {
                    this.banner = data.data
                } else {
                    this.setMessage({
                        type: 'set',
                        data: 'Terjadi suatu kesalahan',
                        color: 'error'
                    })
                }
            }).catch(err => {
                this.setMessage({
                    type: 'set',
                    data: err.message,
                    color: 'error'
                })
            })
        },
        loadMore(lastBook) {
            $axios.post('v1/landing-page/more-books', {
                createdAt: lastBook
            }).then(res => {
                const data = res.data
                data.data.map(book => {
                    this.books.push(book)
                    this.lastBook = book.createdAt
                    this.countProduct++
                })
            }).catch(err => {
                this.setMessage({
                    type: 'set',
                    data: err.message,
                    color: 'error'
                })
            })
        },
        countAllProduct() {
            $axios.get('v1/landing-page/count-product').then(res => {
                const data = res.data
                if (data.status == 'success') {
                    this.allProduct = data.data
                    this.loading = false
                } else {
                    this.setMessage({
                        type: 'set',
                        data: 'Terjadi suatu kesalahan!',
                        color: 'error'
                    })
                }
            }).catch(err => {
                this.setMessage({
                    type: 'set',
                    data: err.message,
                    color: 'error'
                })
            })
        },
        setSeo() {
            document.title = `${this.$store.state.description} - ${this.$store.state.site_name}`
            const check_meta = document.querySelectorAll('meta')
            let count_check = 0
            
            check_meta.forEach(check => {
                if (check.getAttribute('name') == 'description' || check.getAttribute('name') == 'title' || check.getAttribute('name') == 'robots') {
                    if (check.getAttribute('name') == 'description') {
                        check.setAttribute('content', this.$store.state.description)
                    }

                    if (check.getAttribute('name') == 'title') {
                        check.setAttribute('content', `${this.$store.state.description} - ${this.$store.state.site_name}`)
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
                meta_description.setAttribute('content', this.$store.state.description);
                document.getElementsByTagName('head')[0].appendChild(meta_description);

                const meta_title = document.createElement('meta')
                meta_title.setAttribute('name', 'title')
                meta_title.setAttribute('content', `${this.$store.state.description} - ${this.$store.state.site_name}`)
                document.getElementsByTagName('head')[0].appendChild(meta_title)

                const meta_robots = document.createElement('meta')
                meta_robots.setAttribute('name', 'robots')
                meta_robots.setAttribute('content', 'index, follow')
                document.getElementsByTagName('head')[0].appendChild(meta_robots)
            } 
        }
    },
    mounted() {
        this.getBooks()
        this.getBanner()
        this.countAllProduct()
        this.setSeo()
        this.SET_ADDRESS(null)
        window.scroll(0, 0)
    },
    computed: {
        ...mapGetters('auth', ['isAuth', 'getUser', 'getToken'])
    }
}
</script>

<style lang="scss">
.landing-page {
    .banner-skeleton {
        .v-skeleton-loader__image {
            height: 550px !important;
        }
    }
}
</style>