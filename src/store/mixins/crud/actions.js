import {
  SET_RECORDS,
  SET_RECORD,
  SELECT_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  SET_VALUE,
  SET_ERROR
} from './constants'

export const actions = (api, validators = {}) => ({
  async fetch ({ commit }) {
    commit(SET_RECORD, null)

    const records = await api.findAll()
  
    commit(SET_RECORDS, records)
  },
  
  async save ({ dispatch, state, getters, commit }) {
    await dispatch('validateAll')

    if (getters.hasError) {
      return
    }

    if (state.record._id) {
      const record = await api.update(state.record._id, state.record)
  
      commit(SET_RECORD, record)
      commit(UPDATE_RECORD)
    } else {
      const record = await api.create(state.record)
  
      commit(SET_RECORD, record)
      commit(CREATE_RECORD)
    }
  },
  
  async remove ({ state, commit }) {
    await api.remove(state.record._id)
  
    commit(DELETE_RECORD)
    commit(SET_RECORD, null)
  },

  reset ({ commit }) {
    commit(SET_RECORD, {})
  },

  select ({ commit }, payload) {
    commit(SELECT_RECORD, payload)
  },

  validate ({ commit, state }, payload) {
    const key = payload
    if (!validators[key]) {
      return
    }
    const value = state.record[key]

    for (const fn of validators[key]) {
      const msg = fn(value)

      if (msg) {
        commit(SET_ERROR, { key, msg })
        return
      }
    }

    if (state.errors[key]) {
      commit(SET_ERROR, { key, msg: '' })
    }
  },

  async validateAll ({ dispatch }) {
    const keys = Object.keys(validators)
    const promises = keys.map(key => dispatch('validate', key))

    await Promise.all(promises)
  },

  setValue ({ commit, dispatch }, payload) {
    commit(SET_VALUE, payload)
    dispatch('validate', payload.key)
  }
})
