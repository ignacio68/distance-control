<template>
  <GridLayout
    class="bottom-app-bar"
    orientation="horizontal"
    height="56"
    columns="48, *, 48"
  >
    <Icon  
      col="0"
      class="add_marker-button"
      name="res://ic_person_pin_white_24dp"
      @onTap="showMarkerMenu"
    />
    <Icon
      col="2"
      class="delete_area-button"
      name="res://ic_layers_clear_white_24dp"
      @onTap="tapRemoveSecurityArea"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import Icon from '@/components/UI/Icon.vue'

export default Vue.extend({
  name: 'BottomAppBar',
  components: {
    Icon
  },
  methods: {
    showMarkerMenu() {
      console.log(`showMarkerMenu()`)
    },
    tapRemoveSecurityArea() {
      this.$root.$emit('remove-security-area', { name: 'user' })
    }, 
  }
})
</script>

<style lang="scss" scoped>
  .add_marker-button {
    margin-left: 4;
  }
  .delete_area-button {
    margin-right: 4;
  }
</style>