import $axios from '../api.js'
// let qs = require('qs')

const state = () => ({
    user: null,
    token: null
})

const mutations = {
    SET_USER(state, data) {
        state.user = data
    },
    SET_TOKEN(state, payload) {
        state.token = payload
    }
}

const getters = {
    isAuth: state => {
        return state.token != 'null' && state.token != null && state.user != null
    },
    getUser: state => {
        return state.user
    },
    getToken: state => {
        return state.token
    }
}

const actions = {
    loginApi({ commit }, payload) {
        // localStorage.setItem('token', null)
        commit('SET_TOKEN', null)
        commit('SET_USER', null)

        return new Promise((resolve) => {
            $axios.post('v1/auth/login', payload).then(res => {
                if (res.data.status == 'success') {
                    const data = res.data
                    commit('SET_USER', data.data)
                    commit('SET_TOKEN', data.api_token)
                    localStorage.setItem('token', data.api_token)
                } else {
                    commit('SET_MESSAGE', res.data.message, { root: true })
                    commit('SET_SNACKBAR', {
                        status: true,
                        color: 'error'
                    }, { root: true })
                }
                resolve(res.data)
            })
        })
    },
    logout({ commit }) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_MESSAGE', 'Berhasil logout', { root: true })
        commit('SET_SNACKBAR', {
            status: true,
            color: 'success'
        }, { root: true })
    },
    registerApi({ commit }, payload) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)

        return new Promise((resolve) => {
            $axios.post('v1/auth/register', payload).then(res => {
                if (res.data.status == 'success') {
                    const data = res.data
                    commit('SET_USER', data.data)
                    commit('SET_TOKEN', data.api_token)
                } else {
                    commit('SET_MESSAGE', res.data.message, { root: true })
                    commit('SET_SNACKBAR', {
                        status: true,
                        color: 'error'
                    }, { root: true})
                }
                resolve(res.data)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true,
    getters
}