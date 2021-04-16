<template>
  <div class="row col">
    <div class="col-8 column">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>Title</q-toolbar-title>
      </q-toolbar>

      <q-scroll-area class="col">
        <div
          v-if="record"
          class="row q-col-gutter-md q-pr-sm"
        >
          <slot name="form" :record="record" />
        </div>
      </q-scroll-area>

      <q-toolbar class="q-pl-none q-pr-sm">
        <q-btn
          v-if="record && record._id"
          outline
          color="red"
          label="Delete"
          @click="$emit('click:remove')"
        />

        <q-space />

        <q-btn
          v-if="record"
          outline
          color="primary"
          label="Save"
          @click="$emit('click:save')"
        />
      </q-toolbar>
    </div>

    <div class="col-4 column">
      <q-toolbar class="q-px-none">
        <q-space />

        <q-btn
          outline
          color="green"
          label="New"
          @click="$emit('click:new')"
        />
      </q-toolbar>

      <q-scroll-area class="col">
        <q-list class="q-pl-sm">
          <q-input label="Search" v-model="search" />

          <template v-for="curRecord in filteredRecords">
            <slot name="item" :record="curRecord" :active="record && (curRecord._id === record._id)" />
          </template>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
    },

    records: {
      type: Array,
    }
  },

  data () {
    return {
      search: ''
    }
  },

  computed: {
    filteredRecords () {
      return this.records.filter(record => {
        for (const key in record) {
          if (record[key].toString().toLowerCase().includes(this.search.toLowerCase())) {
            return true
          }
        }
        return false
      })
    }
  }
};
</script>
