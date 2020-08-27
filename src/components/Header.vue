<template>
    <header id="header">
        <v-app-bar
            class="header-bar"
            height="100px"
            >
            <v-container>
                <v-row>
                    <v-toolbar-title><router-link to="/">BookStore.co</router-link></v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn
                        style="margin-right: 15px;"
                        outlined
                        color="primary" @click="dialog('login', true)"
                        v-if="!isAuth">Masuk</v-btn>
                    <v-btn
                        depressed
                        color="primary" @click="dialog('register', true)"
                        v-if="!isAuth">Daftar</v-btn>
                    <!-- <v-btn text large v-if="isAuth" color="black" tile style="border-radius: 3px;">
                        <v-icon>mdi-cart</v-icon>
                    </v-btn> -->
                    <v-badge
                    v-if="isAuth"
                        bordered
                        color="error"
                        overlap
                        class="mr-3"
                        offset-x="20"
                        offset-y="20"
                        :content="countCart > 0 ? countCart.toString() : '0'"
                    >
                        <v-btn
                        icon
                        color="black"
                        depressed
                        tile
                        :to="'/cart'"
                        style="border-radius: 4px"
                        >
                            <v-icon medium>mdi-cart</v-icon>
                        </v-btn>
                    </v-badge>
                    <v-menu offset-y open-on-hover left v-if="isAuth">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-on="on" v-bind="attrs" text large color="black" class="py-6" depressed style="text-transform: capitalize;letter-spacing: normal;">
                                <v-icon>mdi-account</v-icon> &nbsp;
                                {{ user.name }}
                            </v-btn>
                        </template>
                        <v-list nav dense class="pa-4">
                            <v-list-item-group color="primary">
                                <v-list-item
                                    to="/order"
                                    >
                                    <v-list-item-icon>
                                        <v-icon v-text="`mdi-history`" small></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="`Riwayat Pembelian`"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    @click="logoutAction()"
                                    >
                                    <v-list-item-icon>
                                        <v-icon v-text="`mdi-logout`" small></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="`Logout`"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </v-row>
            </v-container>
        </v-app-bar>

        <v-dialog v-model="dialogLogin" persistent max-width="450px">
            <v-card>
                <v-card-title>
                    <span class="headline text-center">Masuk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="formLogin" ref="formLogin" @submit.prevent="loginAction">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Email" type="email" required v-model="login.email" :rules="[v => !!v || 'Email harus diisi!']"></v-text-field>
                                    <v-text-field label="Password" type="password" required v-model="login.password" :rules="[v => !!v || 'Password harus diisi!']"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn color="primary" block depressed type="submit">Masuk</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn color="gray" block depressed @click="dialog('login', false)">Tutup</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogRegister" persistent max-width="450px">
            <v-card>
                <v-card-title>
                    <span class="headline text-center">Daftar Sekarang!</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="formRegister" ref="formRegister" @submit.prevent="registerAction">
                            <v-row>
                                <v-col cols="6" style="padding-bottom: 0px;">
                                    <v-text-field label="Email" type="email" required v-model="register.email" :rules="[v => !!v || 'Email harus diisi!']"></v-text-field>
                                </v-col>
                                <v-col cols="6" style="padding-bottom: 0px;">
                                    <v-text-field label="Nama Lengkap" required v-model="register.name" :rules="[v => !!v || 'Nama Lengkap harus diisi!']"></v-text-field>
                                </v-col>
                                <v-col cols="12" style="padding-top: 0px;">
                                    <v-text-field label="Password" type="password" required v-model="register.password" :rules="[v => !!v || 'Password harus diisi!']"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn color="primary" block depressed type="submit">Daftar</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn color="gray" block depressed @click="dialog('register', false)">Tutup</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </header>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import $axios from '../api.js'
export default {
    name: 'Header',
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
            register: {
                email: '',
                password: '',
                name: ''
            },
            formLogin: true,
            formRegister: true
        }
    },
    methods: {
        ...mapActions(['setDialog', 'setMessage']),
        ...mapActions('auth', ['loginApi', 'logout', 'registerApi']),
        ...mapMutations('cart', ['CLEAR_CART', 'SET_CART', 'SET_COUNT']),
        dialog(type, data) {
            this.setDialog({
                type: type,
                data: data
            })
            if (this.$refs.formLogin) {
                this.$refs.formLogin.reset()
            }
            if (this.$refs.formRegister) {
                this.$refs.formRegister.reset()
            }
        },
        loginAction() {
            if (this.$refs.formLogin.validate()) {
                if (/.+@.+\..+/.test(this.login.email) == false) {
                    this.setMessage({
                        type: 'set',
                        data: 'Email tidak valid!',
                        color: 'error'
                    })
                } else {
                    this.loginApi(this.login).then(res => {
                        if (res.status == 'success') {
                            this.setMessage({
                                type: 'set',
                                data: res.message,
                                color: 'success'
                            })
                            this.setDialog({
                                type: 'login',
                                data: false
                            })
                            this.getCart()
                        }
                    })
                }
            }
        },
        registerAction() {
            if (this.$refs.formRegister.validate()) {
                if (/.+@.+\..+/.test(this.register.email) == false) {
                    this.setMessage({
                        type: 'set',
                        data: 'Email tidak valid!',
                        color: 'error'
                    })
                } else {
                    this.registerApi(this.register).then(res => {
                        if (res.status == 'success') {
                            this.setMessage({
                                type: 'set',
                                data: res.message,
                                color: 'success'
                            })
                            this.setDialog({
                                type: 'register',
                                data: false
                            })
                            this.getCart()
                        }
                    })
                }
            } 
        },
        logoutAction() {
            this.logout()
            this.CLEAR_CART()
            this.$router.push('/')
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
        ...mapState(['dialogLogin', 'dialogRegister']),
        ...mapGetters('auth', ['isAuth', 'getToken', 'getUser']),
        ...mapState('auth', ['user']),
        ...mapState('cart', ['countCart'])
    },
    mounted() {
        // console.log(this.countCart)
    }
}
</script>

<style lang="scss">
$color-pack: false;
</style>