<template>
  <Frame>
    <Page>
      <ActionBar
        id="actionBar" 
        flat="true"
        :height="56"
      >
        <ActionBarContent 
          :isVisible="isVisible"
          @tapDrawerMenu="$emit('ontapDrawerMenu')"
          @tapVisibility="onTapVisibility()"
          @tapSearch="onTapSearch()"
          @tapOverflowMenu="onTapOverflowMenu()"
        />
      </ActionBar>
      <GridLayout 
        class="drawerContent"
        rows="*, auto"
      >
        <!-- <Frame row="0"> -->
        <Map
          row="0"
          :isVisible="isVisible" 
        />
        <!-- </Frame> -->
        <BottomAppBar row="1" />
      </GridLayout>
    </Page>
  </Frame>
</template>

<script lang="ts">
import Vue from 'vue'

import ActionBarContent from '@/components/UI/ActionBarContent.vue'
import Map from '../main/Map.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'

export default Vue.extend({
  name: "MainContent",
  components: {
    Map,
    BottomAppBar,
    ActionBarContent
  },
  data() {
    return {
      isVisible: true
    }
  },

  methods: {
    onTapVisibility() {
      console.log("Change control areas visibility")
      this.isVisible = !this.isVisible
      
    },
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
Page {
  background-color: white;
}
ActionBar {
  background-color:#004842;
}
</style>