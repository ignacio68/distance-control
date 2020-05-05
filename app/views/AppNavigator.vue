<template>
  <Page>
    <ActionBar>
      <GridLayout
        width="100%"
        columns="auto, *"
      >
        <Label
          text="MENU"
          col="0"
          @tap="$refs.drawer.nativeView.showDrawer()"
        />
        <Label
          class="title"
          text="COVID 19 DISTANCE CONTROL"
          col="1"
        />
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout
        ~drawerContent
        backgroundColor="#ffffff"
      >
        <Label
          class="drawer-header"
          text="Drawer"
        />

        <Label
          class="drawer-item"
          text="Item 1"
        />
        <Label
          class="drawer-item"
          text="Item 2"
        />
        <Label
          class="drawer-item"
          text="Item 3"
        />
      </StackLayout>

      <StackLayout
        ~mainContent
      >
        <Frame>
          <Map />
        </Frame>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import Map from './Main/Map.vue'
export default {
  name: 'AppNavigator',
  components: {
    Map
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped lang="scss">
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
</style>
