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
      @tap="tapNewSecurityArea()"
    />
    <Label
      col="1"
      text="Borrar"
      horizontalAlignment="center"
      @tap="tapRemoveSecurityArea()"
    />
    <Label
      col="2"
      text="Centrar"
      horizontalAlignment="center"
      @tap="tapSetCenter()"
    />
  </GridLayout>
</template>

<script lang="ts">
export default {
  name: 'BottomAppBar',
  methods: {
    tapNewSecurityArea() {
      this.$root.$emit('newSecurityArea', { name: 'user' })
    },
    tapRemoveSecurityArea() {
      this.$root.$emit('removeSecurityArea', { name: 'user' })
    }, 
    tapSetCenter() {
      this.$root.$emit('setCenter')
    }
  }
}
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
    background-color: purple;
  }
</style>