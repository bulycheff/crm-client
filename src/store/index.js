import axios from 'axios'
import { createStore } from 'vuex'

import auth from './modules/auth'
import work from './modules/work'
import user from './modules/user'
import order from './modules/order'
import purchase from './modules/purchase'

axios.defaults.headers.common['Authorization'] = localStorage.token

export default createStore({
  actions: {
    onReload: async ({dispatch}) => {
      await dispatch('apiStatus')
      await dispatch('setDays')
      await dispatch('refreshOrderList')
    }
  },
  mutations: {},
  getters: {},
  state: {},
  modules: { user, auth, work, order, purchase }
})
