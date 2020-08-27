const state = () => ({
    address: null
})

const mutations = {
    SET_ADDRESS(state, data) {
        state.address = data
    }
}

const getters = {
    getAddress(state) {
        return state.address
    }
}

export default {
    state,
    mutations,
    namespaced: true,
    getters
}