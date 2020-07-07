<template>
  <GridLayout
    class="action-bar"
    verticalAlignment="middle"
    height="56"
    width="100%"
    columns="48, *, 48, 48, 48"
  >
    <Icon
      col="0"
      class="action-bar_menu-button"
      name="res://ic_menu_white_24dp"
      @onTap="onTap('tap-drawer-menu')"
    />

    <Label
      col="1"
      class="action-bar_title"
      verticalAlignment="middle"
      :text="$t('lang.components.actionBar.title')"
    />

    <Icon
      col="2"
      class="action-bar_visibility-button m-r-0"
      :name="visibilityIcon"
      @onTap="onTap('tap-visibility')"
    />

    <Icon
      col="3"
      class="action-bar_search-button m-r-0"
      name="res://ic_search_white_24dp"
      @onTap="onTap('tap-search')"
    />

    <Icon
      col="4"
      class="action-bar_overflowMenu-button"
      name="res://ic_more_vert_white_24dp"
      color="white"
      @onTap="onTap('tap-overflow-menu')"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import Icon from '@/components/UI/Icon.vue'

export default Vue.extend({
  name: 'ActionBarContent',
  components: {
    Icon
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    visibilityIcon() {
      return this.isVisble ? 'res://ic_visibility_off_white_24dp' : 'res://ic_visibility_white_24dp'
    }
  },
  methods: {
    onTap(action) {
      this.$emit(action)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.action-bar_menu-button {
  margin-left: 4;
}

.action-bar_title {
  margin-left: 20;
  font-weight: 700;
  font-size: 20;
  background-color: $primary-variant;
  color:$onPrimary;
}

.action-bar_overflowMenu-button {
  margin-right: 4;
}
</style>