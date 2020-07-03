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
          @tap-drawer-menu="onTap('on-tap-drawer-menu')"
          @tap-visibility="onTapVisibility()"
          @tap-search="onTapSearch()"
          @tap-overflow-menu="onTapOverflowMenu()"
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
import { ref, defineComponent } from '@vue/composition-api'

import ActionBarContent from '@/components/UI/ActionBarContent.vue'
import Map from '../main/Map.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'

export default defineComponent({
  name: "MainContent",
  components: {
    Map,
    BottomAppBar,
    ActionBarContent
  },
  setup(props, { emit }) {
    const isVisible = ref(true)

    const onTapVisibility = () => isVisible.value = !isVisible.value
    const onTap = (action) => emit(action)
    // TODO: change actions
    const onTapSearch = () => console.log("Tap search action!")
    const onTapOverflowMenu = () => console.log("Tap on extended menu")

    return { isVisible, onTapVisibility, onTap, onTapSearch, onTapOverflowMenu }
  }
})
</script>

<style lang="scss" scoped>

</style>