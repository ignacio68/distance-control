<template>
  <GridLayout
    class="GroupsList"
    rows="*"
    columns="auto, auto"
  >
    <Label
      class="GroupsList_label p-t-8"
      col="0"
      :width="labelWidth"
      verticalAlignment="top"
      :text="labelText"
    />
    <ListView
      ref="groups-list"
      class="GroupsList_list"
      :width="listWidth"
      col="1"
      for="group in groups"
      @itemTap="onItemTap"
    >
      <v-template>
        <StackLayout
          class="GroupsList_list-item_wrapper"
          bacgroundColor="red"
          height="48"
        >
          <Label
            class="GroupsList_list-item p-l-8 font-sz-m"
            :text="group.id"
          />
        </StackLayout>
      </v-template>
    </ListView>
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'vue'

// import { getAllGroups as groups } from '@/store/groups'


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
    listWidth: {
      type: [String, Number],
      default: 80
    }
  },
  data() {
    return{ 
      groups: [
        {
          id: 'casa',
          color: '#31aec4'
        },
        {
          id: 'familia',
          color: '#a191ff'
        },
        {
          id: 'amigos',
          color: '#cc9633'
        },
      ]
    }
  },
  computed() {
    // groups
  },
  mounted() {
    console.log(`groups: ${JSON.stringify(this.groups, null, 2)}`)
  },
  methods: {
    onItemTap(e) {
      const id = this.groups[e.index].id
      this.$emit('selected-group', id)
    },
  }
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.GroupsList_list-item_wrapper {
  background-color: rgba($primary, .035);
}
.GroupsList_list-item {
   color: $primary-variant;
   background-color: transparent;
   font-weight: 700;
}
</style>