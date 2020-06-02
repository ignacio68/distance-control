<template>
  <GridLayout
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
</template>

<script lang="ts">
import Map from '../main/Map.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'
export default {
  name: "MainContent",
  components: {
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