import axios from 'axios'
import { server_api_auth } from '../../config'

export default {
  actions: {
    apiStatus: async ({dispatch})=>{
      if (localStorage.token) {
        await dispatch('setToken', localStorage.token)
        try {
          const response = await axios.get(`${ server_api_auth }status/`)
          // console.log(response.data)
          await dispatch('setUser', response.data)
        } catch ( e ) {
          console.log(e)
        }
      } else {
        await dispatch('setUser', null)
        await dispatch('setToken', null)
      }
    },

    setToken: async ( { commit }, token ) => {
      await commit('setToken', token)
    },

    setUser: async ( { commit }, user ) => {
      await commit('setUser', user)
    },

    logIn: async ( { dispatch }, payload ) => {
      try {
        const { username, password } = JSON.parse(payload)
        const res = await axios.post(`${ server_api_auth }login/`, { username, password })
        await dispatch('setToken', res.data.token)
        await dispatch('setUser', res.data.user)

        localStorage.token = res.data.token
        axios.defaults.headers.common['Authorization'] = localStorage.token

        console.log('Logged in...')
      } catch ( e ) {
        console.log(e)
      }
    },

    logOut: async ( { dispatch } ) => {
      localStorage.removeItem('token')
      await dispatch('setDays', null)
      await dispatch('setToken', null)
      await dispatch('setUser', null)
      axios.defaults.headers.common['Authorization'] = null
      console.log('Logged out ...')
    }
  },

  mutations: {
    setToken: ( state, token ) => {
      state.token = token
    },

    setUser: ( state, user ) => {
      state.user = user
    }
  },

  getters: {
    token: state => state.token,
    fullname: state => state.user ? state.user.fullname : '',
    username: state => state.user ? state.user.username : '',
    isAuth: state => !!state.user,
    isAdmin: state => !!state.user && state.user.role.includes('ADMIN')
  },

  state: {
    token: null,
    user: null
  },
}
