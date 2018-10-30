import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default {
    // 状态
  state: {
    count: 0,
    city: '广州',
    code: ''
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
}