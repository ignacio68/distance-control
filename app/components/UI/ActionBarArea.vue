<template>
  <ActionBar>
    <GridLayout
      width="100%"
      columns="auto, *, auto, auto, auto"
    >
      <FontIcon
        class="fonticon"
        type="fas"
        name="fa-bars"
        color="white"
        :fontSize="24"
        col="0"
        @tap="$emit('tapDrawerMenu')"
      />

      <Label
        class="actionBar_title"
        text="AREAS DE CONTROL"
        col="1"
      />

      <!-- TODO: icono ojo - cambia según selección -->
      <FontIcon
        class="fonticon actionBar_visibility-button"
        type="fas"
        name="fa-eye"
        color="white"
        col="2"
        @tap="$emit('tapVisibility')"
      />

      <FontIcon
        class="fonticon actionBar_search-button"
        type="fas"
        name="fa-search"
        color="white"
        col="3"
        @tap="$emit('tapSearch')"
      />

      <FontIcon
        class="fonticon actionBar_overflowMenu-button"
        type="far"
        name="fa-ellipsis-v"
        col="4"
        @tap="$emit('tapOverflowMenu')"
      />
    </GridLayout>
  </ActionBar>
</template>

<script>
import FontIcon from '@/components/UI/FontIcon.vue'
export default {
  name: 'ActionBarArea',
  components: {
    FontIcon
  }
}
</script>

<style>

</style>