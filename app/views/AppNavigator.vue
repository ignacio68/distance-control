<template>
  <Page 
    actionBarHidden="true"
    androidStatusBarBackground="#00251e"
  >
    <RadSideDrawer ref="drawer">
      <DrawerContent ~drawerContent />
      <MainContent
        ~mainContent 
        @on-tap-drawer-menu="$refs.drawer.nativeView.showDrawer()"
      />
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api'

import MainContent from './drawer/MainContent.vue'
import DrawerContent from './drawer/DrawerContent.vue'

export default defineComponent({
  name: 'AppNavigator',
  components: {
    MainContent,
    DrawerContent,
  },
  setup() {
    const isVisible = ref(true)

    const onTapVisibility = () => isVisible.value = !isVisible.value

    const onTapSearch = () => console.log("Tap search action!")
    const onTapOverflowMenu = () => console.log("Tap on extended menu")

    return { isVisible, onTapVisibility, onTapSearch, onTapOverflowMenu }
  }
})
</script>

<style lang="scss" scoped>
</style>
