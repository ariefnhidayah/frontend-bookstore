<template>
	<section class="order-history-page">
		<v-container v-if="!loading">
			<v-row>
				<v-col cols="12" class="pl-0">
					Home / <span class="breadcrumb-active">Pesanan</span>
				</v-col>
			</v-row>
			<v-row v-if="allCount > 0">
				<v-col cols="12" class="px-0" v-if="!loadingComponent">
					<OrderHistoryComponent v-for="(order, i) in orders" :key="i" :data="order" />
				</v-col>
				<v-col cols="12" class="px-0" v-else>
					<div class="cart-product py-2 px-7 mb-5" v-for="i in 3" :key="i">
						<v-skeleton-loader
							type="list-item-avatar-three-line"
							tile
						></v-skeleton-loader>
						<v-skeleton-loader
							type="list-item-avatar-three-line"
							tile
						></v-skeleton-loader>
					</div>
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col cols="12" class="px-0">
					<h3>Riwayat Pembelian Tidak Ada!</h3>
				</v-col>
			</v-row>
			<v-row v-if="allCount > perPage">
				<v-col cols="12" class="d-flex justify-center">
					<v-pagination
						v-model="page"
						:length="paginationLength"
						@input="pagination()"
					></v-pagination>
				</v-col>
			</v-row>
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
					<div class="cart-product py-2 px-7 mb-5" v-for="i in 3" :key="i">
						<v-skeleton-loader
							type="list-item-avatar-three-line"
							tile
						></v-skeleton-loader>
						<v-skeleton-loader
							type="list-item-avatar-three-line"
							tile
						></v-skeleton-loader>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
import $axios from '../../api'
import { mapGetters } from 'vuex'
import OrderHistoryComponent from '../../components/OrderHistory'
export default {
	data() {
		return {
			loading: true,
			page: 1,
			perPage: 4,
			orders: [],
			allCount: 0,
			loadingComponent: false
		}
	},
	methods: {
		pagination() {
			this.loadingComponent = true
			this.getOrders()
			window.scroll(0, 0)
		},
		getOrders() {
			this.orders = []
			this.count = 0
			$axios.post('v1/order', {
				customer_id: this.getUser.id,
				offset: (this.page - 1) * this.perPage,
				limit: this.perPage
			}, {
				headers: {
					token: `Bearer ${this.getToken}`
				}
			}).then(({data}) => {
				if (data.status == 'success') {
					this.orders = data.data
					this.allCount = data.count
				}
				this.loading = false
				this.loadingComponent = false
			})
		},
		setSeo() {
            document.title = `Riwayat Pembelian - ${this.$store.state.site_name}`
            const check_meta = document.querySelectorAll('meta')
            let count_check = 0

            check_meta.forEach(check => {
                if (check.getAttribute('name') == 'description' || check.getAttribute('name') == 'title' || check.getAttribute('name') == 'robots') {
                    if (check.getAttribute('name') == 'description') {
                        check.setAttribute('content', this.$store.state.description)
                    }

                    if (check.getAttribute('name') == 'title') {
                        check.setAttribute('content', `Riwayat Pembelian - ${this.$store.state.site_name}`)
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
                meta_title.setAttribute('content', `Riwayat Pembelian - ${this.$store.state.site_name}`)
                document.getElementsByTagName('head')[0].appendChild(meta_title)

                const meta_robots = document.createElement('meta')
                meta_robots.setAttribute('name', 'robots')
                meta_robots.setAttribute('content', 'noindex, nofollow')
                document.getElementsByTagName('head')[0].appendChild(meta_robots)
            } 
        }
	},
	computed: {
		...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
		paginationLength() {
			let temp = this.allCount / this.perPage
			return this.allCount % this.perPage > 0 ? Math.floor(temp + 1) : Math.floor(temp)
		}
	},
	mounted() {
		if (!this.isAuth) {
			this.$router.push('/')
		} else {
			this.getOrders()
		}
		this.setSeo()
		window.scroll(0, 0)
	},
	components: {
		OrderHistoryComponent
	}
}
</script>

<style lang="scss">
@import "../../assets/scss/styles.scss";

.order-history-page {
	.up-text {
		font-size: 14px;
	}

	.down-text {
		font-size: 16px;
	}
}

</style>