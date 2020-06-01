<template>
  <Page actionBarHidden="false">
    <ActionBarArea
      @tapDrawerMenu="$refs.drawer.nativeView.showDrawer()"
      @tapVisibility="onTapVisibility()"
      @tapSearch="onTapSearch()"
      @tapOverflowMenu="onTapOverflowMenu()"
    />
    <!-- <ActionBar>
      <GridLayout
        width="100%"
        columns="auto, *, auto, auto, auto"
      >
        <FontIcon
          class="fonticon"
          type="fas"
          name="fa-bars"
          color="white"
          :fontSize="16"
          col="0"
          @tap="$refs.drawer.nativeView.showDrawer()"
        />

        <Label
          class="actionBar_title"
          text="AREAS DE CONTROL"
          col="1"
        />

        
          <FontIcon
          class="fonticon actionBar_visibility-button"
          type="fas"
          name="fa-eye"
          col="2"
          @tap="onTapVisibility()"
        />

        <FontIcon
          class="fonticon actionBar_search-button"
          type="fas"
          name="fa-search"
          col="3"
          @tap="onTapSearch()"
        />

        <FontIcon
          class="fonticon actionBar_overflowMenu-button"
          type="far"
          name="fa-ellipsis-v"
          col="4"
          @tap="onTapOverflowMenu()"
        />
      </GridLayout>
    </ActionBar> --> -->

    <RadSideDrawer ref="drawer">
      <StackLayout
        ~drawerContent
        backgroundColor="#ffffff"
      >
        <DrawerMenu />
      </StackLayout>

      <StackLayout
        ~mainContent
      >
        <Frame>
          <Map 
            :isVisible="isVisible"
          />
        </Frame>
        <BottomAppBar />
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
// import FontIcon from '@/components/UI/FontIcon.vue'
import ActionBarArea from '@/components/UI/ActionBarArea.vue'
import DrawerMenu from '@/components/UI/DrawerMenu.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'
import Map from './Main/Map.vue'

export default {
  name: 'AppNavigator',
  components: {
    ActionBarArea,
    DrawerMenu,
    Map,
    // FontIcon,
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

.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
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
  border: 1, solid, red;
}
</style>
