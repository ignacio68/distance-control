<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="userLocation.latitude"
        :userLongitude="userLocation.longitude"
        @onMapReady="showMarkers($event)"
      />
      <Label>
        <FormattedString>
          <Span text="Latitude: " />
          <Span :text="userLocation.latitude" />
        </FormattedString>
      </Label>
      <Label>
        <FormattedString>
          <Span text="Longitude: " />
          <Span :text="userLocation.longitude" />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>
<script lang="ts">
import { mapboxToken } from '@/setup/Mapbox'
import { getUserCurrentLocation } from '@/services/geolocation'
import { state } from '@/store/geolocation'
import { UserLocation } from '@/store/types'
// import { setUserHomeMarker } from '@/services/map'
import MapComponent from '@/components/Main/MapComponent.vue'

export default {
  name: 'Map',
  components: {
    MapComponent,
  },
  data() {
    return {
      accessToken: mapboxToken,
      markers: null,
    }
  },
  computed: {
    // getMarkers() {
    // // return this.userHomeMarker()
    //   return console.log('getMarkers()')
    // },
    userLocation(): UserLocation {
      console.log(`userLocation latitude: ${state.userLocation.latitude}`)
      return state.userLocation
    }
  },
  created() {
    // isLocationServicesEnabled()
    getUserCurrentLocation()
  },
  methods: {
    setUserMarker() {
      const markerCoordinates = {
        lat: this.userLocation.latitude,
        lng: this.userLocation.longitude
      }
      return markerCoordinates
    },
    showMarkers(args) {
      args.map.addMarkers(this.setUserMarker)
      console.log(`Este es el Home marker: ${JSON.stringify(this.setUserMarker)}`)
    },
  },
}
</script>
