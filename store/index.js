import JSSoup from 'jssoup';
import URI from 'urijs';
import * as index from '~/plugins/get_index'

export const state = () => ({
  'index': null,
  'languages': null
})

export const mutations = {
  SET_INDEX (state, payload) {
    state.index = payload['index']
    state.languages = payload['languages']
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }){
    await dispatch('GET_INDEX')
  },
  async GET_INDEX ({ commit }) {
    let objects = await index.get_index()
    let languages = []

    objects.forEach((obj) => {
      if (obj.languages !== undefined) {
        Object.keys(obj.languages).forEach((lang) => {
          if (!languages.includes(lang)) {
            languages.push(lang)
          }
        })
      }
    })

    commit('SET_INDEX', {'index': objects, 'languages': languages})
  }
}
