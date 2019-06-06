import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mode: 'login',
  list: [],
  permission: [{ aaa: 'ddd' }]
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
    console.log(state.permission)
    commit('setList', state.permission)
    return state.permission
  }
}
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})
