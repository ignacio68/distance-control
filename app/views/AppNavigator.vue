<template>
  <Page 
    actionBarHidden="true"
    androidStatusBarBackground="#00251e"
  >
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
import Vue from 'vue'
import MainContent from './drawer/MainContent.vue'
import DrawerContent from './drawer/DrawerContent.vue'

export default Vue.extend({
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
})
</script>

<style lang="scss" scoped>
</style>
