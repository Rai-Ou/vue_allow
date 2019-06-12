import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const state = {
  mode: 'login',
  list: [],
  permission: [{ path: '/page', permission: [1, 4, 5] }]
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
    console.log(api.permission.getPermission())

    commit('setList', state.permission)
    return state.permission
  }
}
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})
