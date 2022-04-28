import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    people: []
  },
  mutations: {
    addPerson (state, payload) {
      state.people.push(payload)
    },
    setPeople (state, payload) {
      state.people = payload
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  getters: {
    getPeople (state) {
      return state.people
    },
    getToken (state) {
      return state.token
    }
  }
})
