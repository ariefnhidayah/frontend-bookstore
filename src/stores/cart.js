const state = () => ({
    carts: [],
    countCart: 0
})

const mutations = {
    SET_CART(state, data) {
        state.carts = data
    },
    SET_COUNT(state, data) {
        state.countCart = data
    },
    CLEAR_CART(state) {
        state.carts = []
        state.countCart = 0
    }
}

const getters = {
    getCarts(state) {
        return state.carts
    }
}

export default {
    state,
    mutations,
    namespaced: true,
    getters
}