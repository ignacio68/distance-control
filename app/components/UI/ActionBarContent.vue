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
      @tap="onTap('tap-drawer-menu')"
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
      :name="visibilityIcon"
      color="white"
      :size="16"
      col="2"
      @tap="onTap('tap-visibility')"
    />

    <FontIcon
      class="fonticon actionBar_search-button"
      type="far"
      name="fa-search"
      color="white"
      :size="16"
      col="3"
      @tap="onTap('tap-search')"
    />

    <FontIcon
      class="fonticon actionBar_overflowMenu-button"
      color="white"
      :size="16"
      type="far"
      name="fa-ellipsis-v"
      col="4"
      @tap="onTap('tap-overflow-menu')"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, computed } from '@vue/composition-api'

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
  setup(props, { emit }) {
    const isVisible = ref(props.isVisible)
    const visibilityIcon = computed(() => isVisible ? 'fa-eye-slash' : 'fa-eye' )

    const onTap = (action) => emit(action)

    return { visibilityIcon, onTap }
  }
})
</script>

<style>
.fonticon {
  border: 1px, solid, white;
  padding: 12;
}
</style>