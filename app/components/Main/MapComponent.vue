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
      :disableRotation="true"
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
