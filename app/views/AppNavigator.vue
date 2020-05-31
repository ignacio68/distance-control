<template>
  <Page actionBarHidden="false">
    <ActionBar>
      <!-- TODO: cambiar titulos por iconos -->
      <GridLayout
        width="100%"
        columns="auto, *, auto, auto, auto"
      >
        <!-- TODO: icono hamburguesa -->
        <Label
          class="actionBar_drawerMenu-button"
          text="MENU"
          col="0"
          @tap="$refs.drawer.nativeView.showDrawer()"
        />
        <Label
          class="actionBar_title"
          text="AREAS DE CONTROL"
          col="1"
        />
        <!-- TODO: visibilidad de las areas de control -->
        <!-- TODO: icono ojo - cambia según selección -->
        <Label
          class="actionBar_visibility-button"
          text="VIS"
          col="2"
          @tap="onTapVisibility()"
        />
        <!-- TODO: icono lupa -->
        <Label
          class="actionBar_search-button"
          text="SEARCH"
          col="3"
          @tap="onTapSearch()"
        />
        <!-- TODO: icono tres puntos -->
        <!-- <Label
          class="actionBar_overflowMenu-button"
          text="OVERFLOW MENU"
          col="4"
          @tap="onTapOverflowMnu()"
        /> -->
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout
        ~drawerContent
        backgroundColor="#ffffff"
      >
        <Label
          class="drawer-header"
          text="USUARIO"
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
          <Map 
            :isVisible="isVisible"
          />
        </Frame>
        <!-- <BottomNavigation selectedIndex="0">
          <TabStrip>
            <TabStripItem>
              <Label text="Map" />
              <Image
                src="font://&#xf015;"
                class="fas"
              />
            </TabStripItem>

            <TabStripItem class="special">
              <Label text="Settings" />
              <Image
                src="font://&#xf007;"
                class="fas"
              />
            </TabStripItem>


            <TabStripItem class="messages">
              <Label text="Messages" />
              <Image
                src="font://&#xf00e;"
                class="fas"
              />
            </TabStripItem>
          </TabStrip>

          <TabContentItem>
            <Frame>
              <Map />
            </Frame>
          </TabContentItem>
          <TabContentItem>
            <GridLayout>
              <Label
                text="Settings Page"
                class="h2 text-center"
              />
            </GridLayout>
          </TabContentItem>
          <TabContentItem>
            <GridLayout>
              <Label
                text="Messages Page"
                class="h2 text-center"
              />
            </GridLayout>
          </TabContentItem>
        </BottomNavigation> -->
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
  }
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
