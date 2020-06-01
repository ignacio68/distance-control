<template>
  <Page actionBarHidden="false">
    <ActionBar
      id="actionBar" 
      flat="true"
      :height="56"
    >
      <ActionBarContent 
        :isVisible="isVisible"
        @tapDrawerMenu="$refs.drawer.nativeView.showDrawer()"
        @tapVisibility="onTapVisibility()"
        @tapSearch="onTapSearch()"
        @tapOverflowMenu="onTapOverflowMenu()"
      />
    </ActionBar>
    <RadSideDrawer ref="drawer">
      <DrawerMenu ~drawerContent />
      <GridLAyout
        ~mainContent
        class="drawerContent"
        rows="*, auto"
      >
        <Frame row="0">
          <Map            
            :isVisible="isVisible"
          />
        </Frame>
        <BottomAppBar
          row="1"
        />
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import ActionBarContent from '@/components/UI/ActionBarContent.vue'
import DrawerMenu from '@/components/UI/DrawerMenu.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'
import Map from './Main/Map.vue'

export default {
  name: 'AppNavigator',
  components: {
    ActionBarContent,
    DrawerMenu,
    Map,
    BottomAppBar
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
}
</script>

<style lang="scss" scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.drawerContent {
  background-color: peru;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #53ba82;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}

.fonticon {
  border: 2px solid red;
}
</style>
