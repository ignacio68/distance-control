<template>
  <AbsoluteLayout class="map">
    <MapBox
      left="0"
      top="0"
      width="100%"
      height="80%"
      :accessToken="accessToken"
      mapStyle="traffic_day"
      :latitude="userLatitude"
      :longitude="userLongitude"
      :zoomLevel="zoomLevel"
      :hideCompass="true"
      :disableRotation="false"
      :disableScroll="false"
      :disableZoom="false"
      :showUserLocation="true"
      @mapReady="onMapReady"
    />
  </AbsoluteLayout>
</template>

<script lang="ts">
export default {
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
  methods: {
    onMapReady(e) {
      console.log('MAP READY!')
      this.$emit('onMapReady', e)
    }
  }
}
</script>
