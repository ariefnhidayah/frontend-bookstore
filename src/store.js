import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

// IMPORT MODULE
import auth from './stores/auth.js'
import cart from './stores/cart.js'
import checkout from './stores/checkout.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        cart,
        checkout
    },
    state: {
        dialogLogin: false,
        dialogRegister: false,
        snackbarStatus: false,
        snackbarText: '',
        snackbarColor: '',
        url: 'http://localhost:3000/',
        site_name: 'BookStore',
        description: 'Tempat Beli Buku Murah dan Berkualitas'
    },
    getters: {
        getSnackbarStatus: (state) => {
            return state.snackbarStatus
        }
    },
    mutations: {
        SET_DIALOG_LOGIN(state, payload) {
            state.dialogLogin = payload
        },
        SET_DIALOG_REGISTER(state, payload) {
            state.dialogRegister = payload
        },
        SET_MESSAGE(state,payload) {
            state.snackbarText = payload
        },
        SET_SNACKBAR(state, payload) {
            state.snackbarStatus = payload.status
            state.snackbarColor = payload.color
        },
        CLOSE_SNACKBAR(state) {
            state.snackbarStatus = false
        }
    },
    actions: {
        setDialog({ commit }, payload) {
            if (payload.type == 'login') {
                commit('SET_DIALOG_LOGIN', payload.data)
            } else {
                commit('SET_DIALOG_REGISTER', payload.data)
            }
        },
        setMessage({ commit }, payload) {
            if (payload.type == 'set') {
                commit('SET_MESSAGE', payload.data)
                commit('SET_SNACKBAR', {
                    status: true,
                    color: payload.color
                })
            } else {
                commit('SET_MESSAGE', '')
                commit('CLOSE_SNACKBAR')
            }
        }
    },
    strict: false,
    plugins: [createPersist({
        namespace: 'auth',
        initialState: {},
        // ONE_WEEK
        expires: 7 * 24 * 60 * 60 * 1e3,
        modules: {
            auth
        }
    })]
})

export default store