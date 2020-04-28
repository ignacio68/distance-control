<template>
  <AbsoluteLayout class="map">
    <MapBox
      left="0"
      top="0"
      width="100%"
      height="100%"
      :accessToken="accessToken"
      mapStyle="traffic_night"
      :latitude="userLatitude"
      :longitude="userLongitude"
      :zoomLevel="zoomLevel"
      :hideCompass="true"
      :disableRotation="true"
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
      default: 5
    },
    userLatitude: {
      type: String,
      default: "45.137451890638886"
    },
    userLongitude: {
      type: String,
      default: "-68.13734351262877"
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
