<template>
  <Frame>
    <Page actionBarHidden="true">
      <GridLayout
        class="drawerContent"
        rows="56,*,56"
        columns="*"
      >
        <ActionBar
          class="action-bar"
          row="0"
          width="100%"
          :isVisible="isVisible"
          @tap-drawer-menu="onTap('on-tap-drawer-menu')"
          @tap-visibility="onTapVisibility"
          @tap-search="onTapSearch"
          @tap-overflow-menu="onTapOverflowMenu"
        />
        <Map
          class="Map"
          row="1"
          :isVisible="isVisible"
          :isMarkerMenuShowing="isMarkerMenuShowing"
          @enabled-fab="onEnabledFab"
        />
        <BottomAppBar
          class="BottomBar"
          row="2"
        />
        <MDFloatingActionButton
          ref="add-marker"
          row="2"
          class="add-marker"
          rippleColor="white"
          :isEnabled="isEnabledFAB"
          :elevation="elevationFAB"
          src="res://ic_person_pin_white_24dp"
          @tap="showMarkerMenu"
        />
      </GridLayout>
    </Page>
  </Frame>
</template>

<script lang="ts">
import Vue from 'vue'

import { Elevation } from '@/utils/elevations'

import * as application from "@nativescript/core/application"

import { onBackEvent, clearBackEvent } from '@/utils/backButton'

import ActionBarContent from '@/components/UI/ActionBarContent.vue'
import Map from '@/components/Map/Map.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'
import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue'
Vue.use(FloatingActionButtonPlugin);

export default Vue.extend({
  name: "MainContent",
  components: {
    Map,
    BottomAppBar,
    ActionBar: ActionBarContent
  },
  data() {
    return {
      isVisible: false,
      isMarkerMenuShowing: false,
      isEnabledFAB: true,
      elevationFAB: Elevation.FAB_RESTING
    }
  },
  created() {
    onBackEvent(this.backEvent)
  },
  beforeDestroy() {
    clearBackEvent(this.backEvent)
  },
  methods: {
    onEnabledFab(bool) {
      this.isEnabledFAB = bool
      console.log(`isEnabledFAB: ${this.isEnabledFAB}`)
    },

    backEvent() {
      console.log('Has presionado el boton de volver de Android!!')
      application.android.foregroundActivity.finish();
    },
    onTapVisibility() {
      this.isVisible = !this.isVisible
    },
    onTap(action) {
      this.$emit(action)
    },
    // TODO: change actions
    onTapSearch() {
      console.log("Tap search action!")
    },
    onTapOverflowMenu() {
      console.log("Tap on extended menu")
    },
    showMarkerMenu() {
      console.log(`showMarkerMenu()`)
      this.isMarkerMenuShowing = !this.isMarkerMenuShowing
      console.log(`isMarkerMenuShowing: ${this.isMarkerMenuShowing}`)
    },
  }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.add-marker {
  margin-bottom: 64;
  height: 56;
  width: 56;
  color: $onPrimary;
}
</style>