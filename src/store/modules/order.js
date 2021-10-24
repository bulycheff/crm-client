import axios from '../../../axios'
import { server_api_work } from '../../config'

export default {
  actions: {
    createNewOrder: async ( { dispatch }, payload ) => {
      const { client_name, day_id, is_new, from_where } = payload
      const day = `day_id=${day_id}`
      const client = `client_name=${client_name}`
      const type = `is_new=${is_new}`
      const from = `from_where=${from_where}`
      const url = `${ server_api_work }order/new?${day}&${client}&${type}&${from}`
      console.log(url)
      await axios.post(url)
      await dispatch('refreshOrderList')
    },

    refreshOrderList: async ( { commit, getters } ) => {
      // const { day_id } = payload
      const day_id = getters.day_id
      console.log(day_id)
      const allOrders = await axios.get(`${ server_api_work }order/all?day_id=${ day_id }`)
      commit('setOrderList', allOrders.data)
    },

    loadOrderToEditInStore: async ({commit}, orderId) => {
      const loaded = await axios.get(`${ server_api_work }order?id=${orderId}`)
      commit('setOrderToEdit', loaded.data)
      console.log(loaded.data)
    },

    closeOrder: async ({dispatch}, orderId) => {
      await axios.patch(`${ server_api_work }order/close/${orderId}`)
      dispatch('refreshOrderList')
    }
  },

  mutations: {
    setOrderList: ( state, orders ) => state.orders = orders,
    setOrderToEdit: ( state, orderToEdit ) => state.orderToEdit = orderToEdit
  },

  getters: {
    orders: state => state.orders,
    orderLength: state => state.orders ? state.orders.length : 0,
    orderToEdit: state => state.orderToEdit ? state.orderToEdit : null,
    orderToEditId: state => state.orderToEdit ? state.orderToEdit._id : null
  },

  state: {
    orders: null,
    orderToEdit: null
  },
}
