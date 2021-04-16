import Vue from 'vue'

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

export const mutations = {
  [SET_RECORDS]: (state, payload) => {
    state.records = payload
  },

  [SET_RECORD]: (state, payload) => {
    state.record = clone(payload)
    state.errors = {}
  },

  [SELECT_RECORD]: (state, payload) => {
    const record = state.records.find(r => r._id === payload)

    state.record = clone(record)
    state.errors = {}
  },

  [CREATE_RECORD]: (state) => {
    state.records = state.records.concat(clone(state.record))
  },

  [UPDATE_RECORD]: (state) => {
    state.records = state.records.map(r => r._id === state.record._id ? clone(state.record) : r)
  },

  [DELETE_RECORD]: (state) => {
    state.records = state.records.filter(r => r._id !== state.record._id)
  },

  [SET_ERROR]: (state, payload) => {
    Vue.set(state.errors, payload.key, payload.msg)
  },

  [SET_VALUE]: (state, payload) => {
    Vue.set(state.record, payload.key, payload.value)
  }
}

function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}
