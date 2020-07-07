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
          @tap-visibility="onTapVisibility()"
          @tap-search="onTapSearch()"
          @tap-overflow-menu="onTapOverflowMenu()"
        />
        <!-- <Frame row="0"> -->
        <Map
          row="1"
          :isVisible="isVisible" 
        />
        <!-- </Frame> -->
        <BottomAppBar row="2" />
      </GridLayout>
    </Page>
  </Frame>
</template>

<script lang="ts">
import Vue from 'vue'
// import { ref, defineComponent } from '@vue/composition-api'

import ActionBarContent from '@/components/UI/ActionBarContent.vue'
import Map from '../main/Map.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'

export default Vue.extend({
  name: "MainContent",
  components: {
    Map,
    BottomAppBar,
    ActionBar: ActionBarContent
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
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
    }
  }
})
</script>

<style lang="scss" scoped>
</style>