import Vue from 'vue'
import Vuex from 'vuex'

import driver from './driver'
import bus from './bus'
import route from './route'
import way from './way'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      driver,
      bus,
      route,
      way
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
