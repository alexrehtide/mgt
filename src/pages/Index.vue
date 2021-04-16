<template>
  <q-page>
    <q-btn @click="showDialog" label="Show" />
  </q-page>
</template>

<script>
import { Dialog } from 'quasar'
import MultiformDialog from 'components/MultiformDialog.vue'

export default {
  name: 'PageIndex',

  methods: {
    showDialog () {
      Dialog.create({
        component: MultiformDialog,
        root: this
      })
    }
  }
}
</script>
