<template>
  <q-dialog full-height v-model="dialogOpen">
    <div class="dialog sheet column">
      <q-tabs v-model="tab">
        <q-tab name="driver">Drivers</q-tab>

        <q-tab name="bus">Buses</q-tab>

        <q-tab name="route">Routes</q-tab>

        <q-tab name="way">Ways</q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" class="col">
        <q-tab-panel name="driver" class="column">
          <driver-editor />
        </q-tab-panel>

        <q-tab-panel name="bus" class="column">
          <bus-editor />
        </q-tab-panel>

        <q-tab-panel name="route" class="column">
          <route-editor />
        </q-tab-panel>

        <q-tab-panel name="way" class="column">
          <way-editor />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-dialog>
</template>

<script>
import DialogMixin from 'src/mixins/DialogMixin'
import DriverEditor from 'src/components/DriverEditor.vue'
import BusEditor from 'src/components/BusEditor.vue'
import RouteEditor from 'src/components/RouteEditor.vue'
import WayEditor from 'src/components/WayEditor.vue'

export default {
  mixins: [DialogMixin],

  components: {
    DriverEditor,
    BusEditor,
    RouteEditor,
    WayEditor
  },

  data () {
    return {
      tab: 'driver'
    }
  }
}
</script>
