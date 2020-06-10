<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer">
      <DrawerContent ~drawerContent />
      <MainContent
        ~mainContent 
        @onTapDrawerMenu="$refs.drawer.nativeView.showDrawer()"
      />
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import MainContent from './drawer/MainContent.vue'
import DrawerContent from './drawer/DrawerContent.vue'

export default {
  name: 'AppNavigator',
  components: {
    MainContent,
    DrawerContent,
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
