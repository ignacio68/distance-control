<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="13"
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
import { getUserCurrentLocation, isLocationServicesEnabled } from '@/services/geolocation'
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
      // userLocation: {
      //   latitude: '40.4165001',
      //   longitude: '-3.7025599'
      // },
      // userLatitude: null,
      // userLongitude: null,
      markers: null,
    }
  },
  computed: {
    getMarkers() {
    // return this.userHomeMarker()
      return console.log('getMarkers()')
    },
    userLocation() {
      console.log('userLocation()')
      return this.getUserLocation()
    }
  },
  created() {
    console.log('created()')
    // isLocationServicesEnabled()
    // this.getUserLocation()
    return this.userLocation
    // console.log(`user latitude: ${this.userLocation.latitude}`)
    // console.log(`use longitude: ${this.userLocation.longitude}`)
  },
  methods: {
    // setUserMarker() {
    //   const markerCoordinates = setUserHomeMarker()
    // },
    showMarkers(args) {
      // args.map.addMarkers(this.getMarkers)
      console.log(`Este es el Home marker: ${this.getMarkers}`)
    },
    getUserLocation() {
      console.log('getUserLocation()')
      const userCurrentLocation = getUserCurrentLocation()
      console.log(`userCurrentLocation: ${userCurrentLocation}`)
      return userCurrentLocation
    },
    // userHomeMarker() {
    //   const userHomeMarkerCoordinates = setUserHomeMarker()
    //   return userHomeMarkerCoordinates
    // }
    
  },
}
</script>
