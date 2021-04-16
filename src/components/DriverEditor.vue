<template>
  <base-editor
    :record="record"
    :records="drivers"
    @click:save="save"
    @click:remove="remove"
    @click:new="reset"
  >
    <template #form="{ record }">
      <div class="col-6">
        <q-input
          label="Num"
          :value="record.num"
          :error="!!errors.num"
          :error-message="errors.num || ''"
          @input="setValue({ key: 'num', value: $event })"
        />
      </div>

      <div class="col-6">
        <q-input
          label="Name"
          :value="record.name"
          :error="!!errors.name"
          :error-message="errors.name || ''"
          @input="setValue({ key: 'name', value: $event })"
        />
      </div>

      <div class="col-6">
        <q-select
          v-model="bus"
          use-input
          label="Bus"
          :input-debounce="0"
          :options="filteredBuses"
          :error="!!errors.bus"
          :error-message="errors.bus || ''"
          @filter="filterFn"
        />
      </div>
    </template>

    <template #item="{ record, active }">
      <q-item
        :active="active"
        clickable
        @click="select(record._id)"
      >
        <q-item-section>
          <q-item-label>{{ record.num }}</q-item-label>
          <q-item-label caption>{{ record.bus }} - {{ record.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </base-editor>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BaseEditor from 'components/BaseEditor.vue'

const { mapState: mapDriverState, mapActions: mapDriverActions } = createNamespacedHelpers('driver')
const { mapState: mapBusState, mapActions: mapBusActions } = createNamespacedHelpers('bus')

export default {
  components: {
    BaseEditor
  },

  data () {
    return {
      filteredBuses: this.buses
    }
  },
  
  computed: {
    ...mapDriverState([
      'records',
      'record',
      'errors'
    ]),

    ...mapDriverState({
      drivers (state) {
        return state.records.map(record => ({
          ...record,
          bus: this.populateBus(record.bus)?.label
        }))
      }
    }),

    ...mapBusState({
      buses (state) {
        return state.records.map(record => ({
          label: record.num,
          value: record._id
        }))
      }
    }),

    bus: {
      get: vm => vm.buses.find(b => b.value === vm.record.bus),

      set (bus) {
        this.setValue({ key: 'bus', value: bus.value })
      }
    }
  },

  methods: {
    ...mapDriverActions([
      'fetch',
      'reset',
      'select',
      'save',
      'remove',
      'setValue'
    ]),

    ...mapBusActions({
      fetchBuses: 'fetch'
    }),

    populateBus (busId) {
      return this.buses.find(b => b.value === busId)
    },

    filterFn (val, update) {
      update(() => {
        const needle = val?.toLowerCase()
        this.filteredBuses = this.buses.filter(b => b.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  },

  created () {
    this.fetch()
    this.fetchBuses()
  }
}
</script>
