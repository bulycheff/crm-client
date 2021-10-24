import axios from '../../../axios'
import { server_api_work } from '../../config'

export default {
  actions: {
    addNewPurchaseToList: async ( { dispatch }, form ) => {
      await axios.post(`${ server_api_work }purchase/new`, form)
      await dispatch('refreshValuesInPurchaseList')
      console.log(form)
    },
    refreshValuesInPurchaseList: async ( { getters, commit } ) => {
      const order_id = getters.orderToEditId
      // console.log(`ORDER ID ${order_id}`)
      const response = await axios.get(`${ server_api_work }purchase/all?order_id=${order_id}`)
      console.log(response)
      commit('updatePurchaseList', response.data)

    }
  },
  mutations: {
    updatePurchaseList: ( state, newPurchaseList ) => {
      state.purchaseList = newPurchaseList
    }
  },
  getters: {
    purchaseList: state => state.purchaseList ? state.purchaseList : null,
    purchaseListTotal: state => {
      let sum = 0
      if (state.purchaseList) {
        for (let i = 0; i<state.purchaseList.length; i++) {
          sum += state.purchaseList[i].price_final
        }
        return sum
      } else return 0
    },
    purchaseListLength: state => state.purchaseList ? state.purchaseList.length : 0

  },
  state: {
    purchaseList: null,
  }
}
