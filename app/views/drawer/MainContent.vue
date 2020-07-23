<template>
  <Frame>
    <Page actionBarHidden="true">
      <GridLayout
        class="drawerContent"
        rows="56,*, auto, 56"
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
          rowSpan="2"
          :isVisible="isVisible"
          :isNewMarkerMenuShowing="isNewMarkerMenuShowing"
          :isNewAreaMenuShowing="isNewAreaMenuShowing"
          @enabled-fab="onEnabledFAB"
        />
        <GridLayout
          v-if="isFABMEnuShowing"
          class="FAB-menu m-b-0"
          row="2"
          columns="56, *, 56"
        >
          <MDFloatingActionButton
            ref="add-new-marker"
            col="0"
            class="add-new-marker m-t-0"
            rippleColor="white"
            :elevation="elevationFAB"
            src="res://ic_person_pin_white_24dp"
            @tap="showNewMarkerMenu"
          />
          <MDFloatingActionButton
            ref="add-new-area"
            col="2"
            class="add-new-area m-t-0"
            rippleColor="white"
            :elevation="elevationFAB"
            src="res://ic_adjust_white_24dp"
            @tap="showNewAreaMenu"
          />
        </GridLayout>
        <BottomAppBar
          class="BottomBar"
          row="3"
        />
        <MDFloatingActionButton
          ref="show-FAB"
          row="3"
          class="show-FAB"
          rippleColor="white"
          :isEnabled="isEnabledFAB"
          :elevation="elevationFAB"
          src="res://ic_add_circle_white_24dp"
          @tap="showFABMenu"
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
      isFABMEnuShowing: false,
      isNewMarkerMenuShowing: false,
      isNewAreaMenuShowing: false,
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
    onEnabledFAB(bool) {
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
    showFABMenu() {
      if(!this.isNewMarkerMenuShowing && !this.isNewAreaMenuShowing && !this.isFABMEnuShowing) {
        this.isFABMEnuShowing = true
      } else if ((!this.isNewMarkerMenuShowing || !this.isNewAreaMenuShowing) && this.isFABMEnuShowing) {
        this.isFABMEnuShowing = false
      } else {
        this.isNewMarkerMenuShowing = false
        this.isNewAreaMenuShowing = false
        this.isFABMEnuShowing = false
      }
    },
    showNewMarkerMenu() {
      this.isFABMEnuShowing = false
      this.isNewAreaMenuShowing = false
      this.isNewMarkerMenuShowing = true
      console.log(`isNewMarkerMenuShowing: ${this.isNewMarkerMenuShowing}`)
    },
    showNewAreaMenu() {
      this.isFABMEnuShowing = false
      this.isNewMarkerMenuShowing = false
      this.isNewAreaMenuShowing = true
      console.log(`isNewAreaMenuShowing: ${this.isNewAreaMenuShowing}`)
    },
  }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.show-FAB {
  margin-bottom: 64;
  height: 56;
  width: 56;
  color: $onPrimary;
}
.FAB-menu {
  height: 120;
  width: 180;
  background-color: transparent;
}
.add-new-marker {
  height: 56;
  width: 56;
  color: $onPrimary;
  background-color: #195f6b;
}
.add-new-area {
  height: 56;
  width: 56;
  color: $onPrimary;
  background-color: #a53c36;
}
</style>