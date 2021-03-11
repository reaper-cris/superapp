import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
  cartList: []
}
const mutations = {
  addCart(state, goods) {
    state.cartList.push(goods)
  },
  addCount(state, index) {
    state.cartList[index].count += 1
  }
}
const getters = {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
const actions = {
  addToCart({state, commit}, info) {
    return new Promise((resolve) => {
      // 1.查看该商品是否已经添加到cartList中
      const oldInfo = state.cartList.find(item => item.iid === info.iid)

      // 2.如果oldInfo存在, 那么原来的数量加1
      if (oldInfo) {
        const index = state.cartList.indexOf(oldInfo)
        commit('addCount', index)
      } else {
        info.count = 1
        info.checked = true
        commit('addCart', info)
      }

      resolve()
    })
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
