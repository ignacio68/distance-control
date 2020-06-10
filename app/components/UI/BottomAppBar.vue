<template>
  <GridLayout
    class="bottomAppBar"
    orientation="horizontal"
    height="56"
    columns="auto, *, auto"
  >
    <Label  
      col="0"
      text="Nuevo"
      horizontalAlignment="center"
      @tap="newMarker"
    />
    <!-- <FontIcon  
      col="0"
      type="fas"
      name="fa-user-plus"
      color="white"
      :size="16"
      @tap="newMarker()"
    /> -->
    <Label
      col="1"
      text="Borrar"
      horizontalAlignment="center"
      @tap="tapRemoveSecurityArea"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import FontIcon from './FontIcon.vue'

export default Vue.extend({
  name: 'BottomAppBar',
  components: {
    FontIcon
  },
  methods: {
    newMarker() {
      this.$root.$emit('setNewMarker', { name: 'user' })
    },
    tapRemoveSecurityArea() {
      this.$root.$emit('removeSecurityArea', { name: 'user' })
    }, 
  }
})
</script>

<style lang="scss" scoped>
  Label {
    font-size: 20;
    padding: {
      top: 16;
      right: 16;
      left: 16;
    }
  }
  .bottomAppBar {
    background-color:#004842;
  }
</style>