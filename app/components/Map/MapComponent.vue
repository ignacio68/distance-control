<template>
  <AbsoluteLayout class="map">
    <MapBox
      ref="map"
      left="0"
      top="0"
      width="100%"
      height="70%"
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
  </AbsoluteLayout>
</template>


<script lang="ts">
// mapStyle="mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot"

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
  data() {
    return {
      // mapStyle: '../../assets/maps/styles/dark_green/style.json',
      mapStyle:'mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot',
      anotherMapStyle: 'traffic_day'
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
