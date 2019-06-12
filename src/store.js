import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const state = {
    roleId: 2,
    list: [],
    permission: [{ path: '/page', permission: [1, 4, 5] }],
    1: [{ path: '/page', permission: [1] }, { path: '/about', permission: [1, 2] }],
    2: [{ path: '/about', permission: [1, 2] }],
}
const mutations = {
    setMode: (state, data) => {
        state.mode = data
    },
    setList: (state, data) => {
        state.list = data
    }
}
const actions = {
    getPermission({ commit }) {
        console.log(state[state.roleId])
        commit('setList', state[state.roleId])
        return state[state.roleId]
    }
}
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})
