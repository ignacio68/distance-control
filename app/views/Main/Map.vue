<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="3"
        userLatitude="39.8729940"
        userLongitude="-3.67089492"
        @onMapReady="showMarkers($event)"
      />
    </StackLayout>
  </Page>
</template>
<script lang="ts">
import { mapboxToken } from '@/setup/Mapbox'
import MapComponent from '@/components/Main/MapComponent.vue'

export default {
  name: 'Map',
  components: {
    MapComponent,
  },
  data() {
    return {
      accessToken: mapboxToken,
      markers:''
    }
  },
  computed: {
    getMarkers() {
      return this.markers
    },
  },
  methods: {
    showMarkers(args) {
      // args.map.addMarkers(this.getMarkers)
      console.log('Add Markers')
    },
  },
}
</script>
