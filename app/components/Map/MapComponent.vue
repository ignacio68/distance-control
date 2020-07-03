<template>
  <Page 
    actionBarHidden="true" 
    backgroundSpanUnderStatusBar="false"
  >
    <GridLayout 
      rows="auto, *" 
      class="map"
    >
      <MapBox
        ref="map"
        row="1"
        left="0"
        top="0"
        width="100%"
        height="100%"
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :latitude="userLatitude"
        :longitude="userLongitude"
        :zoomLevel="zoomLevel"
        :hideCompass="true"
        :disableRotation="true"
        :disableScroll="false"
        :disableZoom="false"
        :showUserLocation="true"
        @mapReady="onMapReady"
      />
      <Fab
        row="1"
        rippleColor="#f1f1f1"
        class="center-button"
        @tap="$emit('set-center')"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from '@vue/composition-api'

// icon="res://ic_add_white"

export default defineComponent({
  name: 'MapComponent',
  props: {
    accessToken: {
      type: String,
      required: true
    },
    zoomLevel: {
      type: Number,
      default: 12
    },
    userLatitude: {
      type: String,
      required: true
    },
    userLongitude: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }){
    // const mapStyle = '../../assets/maps/styles/dark_green/style.json',
    const mapStyle = ref('')
    const anotherMapStyle = 'traffic_day'

    const onMapReady = (e) => {
      console.log('MAP READY!')
      emit('on-map-ready', e)
    }

    onMounted (() => {
      mapStyle.value = 'mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot'
    })

    return { mapStyle, anotherMapStyle, onMapReady}
  }
})
</script>

<style lang="scss" scoped>
  .center-button {
  height: 70;
  width: 70; 
  margin: 15;
  background-color: #ff4081;
  horizontal-align: right;
  vertical-align: top;
}
</style>
