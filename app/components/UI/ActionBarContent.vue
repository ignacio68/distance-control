<template>
  <GridLayout
    width="100%"
    columns="auto, *, auto, auto, auto"
  >
    <FontIcon
      class="fonticon"
      type="far"
      name="fa-bars"
      color="white"
      :size="16"
      col="0"
      @tap="$emit('tapDrawerMenu')"
    />

    <Label
      class="actionBar_title"
      text="Areas de Control"
      :fontSize="16"
      col="1"
    />

    <FontIcon
      class="fonticon actionBar_visibility-button"
      type="far"
      :name="isVisibleIcon"
      color="white"
      :size="16"
      col="2"
      @tap="$emit('tapVisibility')"
    />

    <FontIcon
      class="fonticon actionBar_search-button"
      type="far"
      name="fa-search"
      color="white"
      :size="16"
      col="3"
      @tap="$emit('tapSearch')"
    />

    <FontIcon
      class="fonticon actionBar_overflowMenu-button"
      color="white"
      :size="16"
      type="far"
      name="fa-ellipsis-v"
      col="4"
      @tap="$emit('tapOverflowMenu')"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import FontIcon from '@/components/UI/FontIcon.vue'

export default Vue.extend({
  name: 'ActionBarContent',
  components: {
    FontIcon
  },
  props: {
    isVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isVisibleIcon() {
      return this.isVisible ? 'fa-eye-slash' : 'fa-eye'
    }
  }
})
</script>

<style>
.fonticon {
  border: 1px, solid, white;
  padding: 12;
}
</style>