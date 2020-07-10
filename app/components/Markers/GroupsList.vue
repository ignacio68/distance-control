<template>
  <GridLayout
    class="GroupsList"
    rows="*"
    columns="auto, auto"
  >
    <Label
      class="GroupsList_label"
      col="0"
      :width="labelWidth"
      verticalAlignment="center"
      :text="labelText"
    />
    <ListView
      ref="groups-list"
      class="GroupsList_list"
      col="1"
      for="group in groups"
      @itemTap="onItemTap"
    >
      <v-template>
        <Label
          class="GroupsList_list-item p-l-8 font-sz-m"
          :text="group.id"
        />
      </v-template>
    </ListView>
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'vue'

import { getAllGroups as groups } from '@/store/groups'

export default Vue.extend({
  
  name: 'GroupsList',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 80
    },
    labelText: {
      type: String,
      default: ''
    },
  },
  data() {
    return{ 
    }
  },
  computed() {
    groups
  },
  mounted() {
    console.log(`groups: ${JSON.stringify(this.groups, null, 2)}`)
  },
  methods: {
    onItemTap(values) {
       this.$emit('selected-group', values)
    },
  }
})
</script>
<style lang="scss" scoped>

</style>