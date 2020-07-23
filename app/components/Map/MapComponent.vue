<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="false"
  >
    <GridLayout
      columns="*, auto"
      rows="*"
      class="map"
    >
      <MapBox
        ref="map"
        row="0"
        col="0"
        colSpan="2"
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
      <GridLayout
        class="right-menu"
        rows="auto, auto"
        columns="auto"
        row="0"
        col="1"
      >
        <MDFloatingActionButton
          ref="locationFAB"
          row="0"
          class="location_fab m-t-48 m-r-16"
          rippleColor="white"
          :elevation="elevationFAB"
          src="res://ic_my_location_white_24dp"
          @tap="setCenter"
        />
        <MDFloatingActionButton
          ref="mapStyle"
          row="1"
          class="map-style_fab m-r-16 m-t-64"
          rippleColor="white"
          :elevation="elevationFAB"
          src="res://ic_map_black_24dp"
          @tap="changeMapStyle"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import { setMap, getMap as map } from '@/store/map'
import { Elevation } from '@/utils/elevations'

import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue'
Vue.use(FloatingActionButtonPlugin);

// icon="res://ic_add_white"

export default Vue.extend({
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
  data() {
    return {
      // mapStyle: null,
      customMapStyle: 'mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot',
      satelliteMapStyle:'satellite_streets',
      defaultMapStyle:'traffic_day',
      isSatelliteMap: false,
      elevationFAB: Elevation.FAB_RESTING
    }
  },
  computed:{
    map,
    mapStyle() {
      if(this.customMapStyle) { return this.customMapStyle }
      else { return this.defaultMapStyle }
    }
  },
  mounted() {
      // this.mapStyle = this.customMapStyle |
    },
  methods: {
     onMapReady(e) {
      console.log('MAP READY!')
      const map = e.map
      setMap(map)
      this.$emit('on-map-ready', e)
    },
    setCenter(e) {
      this.$refs.locationFAB.nativeView.elevation = Elevation.FAB_PRESSED
      this.$emit('set-center', e)
    },
    changeMapStyle() {
      console.dir('changeMapStyle()')
      this.$refs.mapStyle.nativeView.elevation = Elevation.FAB_PRESSED
      this.isSatelliteMap = !this.isSatelliteMap
      this.isSatelliteMap ? this.map.setMapStyle(this.satelliteMapStyle) : this.map.setMapStyle(this.mapStyle)
    }
  }
})
</script>

<style lang="scss" scoped>
  @import '../../app-variables';

  .right-menu {
    background-color: transparent;
  }
  .location_fab {
    background-color: $background;
    color:$secondary;
    horizontal-align:  right;
    vertical-align: top;
  }
  .map-style_fab{
    background-color: $background;
    color: $secondary;
    horizontal-align:  right;
    vertical-align: bottom;
  }
</style>
