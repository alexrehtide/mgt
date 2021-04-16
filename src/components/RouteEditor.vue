<template>
  <base-editor
    :record="record"
    :records="records"
    @click:save="save"
    @click:remove="remove"
    @click:new="reset"
  >
    <template #form="{ record }">
      <div class="col-6">
        <q-input
          label="Num"
          :value="record.num"
          @input="setValue({ key: 'num', value: $event })"
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
        </q-item-section>
      </q-item>
    </template>
  </base-editor>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BaseEditor from 'components/BaseEditor.vue'

const { mapState, mapActions } = createNamespacedHelpers('route')

export default {
  components: {
    BaseEditor
  },
  
  computed: {
    ...mapState([
      'records',
      'record'
    ])
  },

  methods: {
    ...mapActions([
      'fetch',
      'reset',
      'select',
      'save',
      'remove',
      'setValue'
    ])
  },

  created () {
    this.fetch()
  }
}
</script>
