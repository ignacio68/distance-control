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
      <MainContent ~mainContent />
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import ActionBarContent from '@/components/UI/ActionBarContent.vue'
import MainContent from './drawer/MainContent.vue'
import DrawerMenu from './drawer/DrawerMenu.vue'

export default {
  name: 'AppNavigator',
  components: {
    MainContent,
    ActionBarContent,
    DrawerMenu,
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
</style>
