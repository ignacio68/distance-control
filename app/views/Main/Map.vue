<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="originLocation.lat"
        :userLongitude="originLocation.lng"
        @onMapReady="onMapReady($event)"
      />
      <Label>
        <FormattedString>
          <Span text="Latitude: " />
          <Span :text="originLocation.lat" />
        </FormattedString>
      </Label>
      <Label>
        <FormattedString>
          <Span text="Longitude: " />
          <Span :text="originLocation.lng" />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import { mapboxToken } from '@/setup/Mapbox'

import { fetchCurrentUserLocation, getUserCurrentLocation } from '@/services/geolocation'
import { circleProps, coordinates } from '@/services/map'

import userLocation from '@/store/userLocation'

import { UserLocation } from '@/store/types'

import MapComponent from '@/components/Main/MapComponent.vue'

export default {
  name: 'Map',
  components: {
    MapComponent,
  },
  data() {
    return {
      accessToken: mapboxToken,
      originLocation: {
        lat: '',
        lng: '',
      },
      markers: null,
    }
  },
  computed: {
    // originLocation() {
    //   console.log('originLocation()')
    //   return this.setInitialCoordinates()
    // }, 
    userLocation(): UserLocation {
      console.log(
        `userLocation latitude: ${userLocation.getUserLocation().lat}`
      )
      return userLocation.getUserLocation()
    },
    currentUserLocation(): UserLocation {
      return userLocation.getUserCurrentLocation()
    },
  },
  created() {
    console.log('created()')
    this.setInitialCoordinates()
  },
  // mounted() {
  //   console.log('mounted()')
  //   this.$nextTick(this.setCenter())
  // },
  methods: {
    showSecurityArea(args) {
      args.map.addPolygon(circleProps)
      console.log('showSecurityArea() coordinates: ' + JSON.stringify(coordinates))
      // console.dir(circleProps)
    },
    setInitialCoordinates(){
      console.log('setInitialCoordinates()')
      fetchCurrentUserLocation().then(coordinates => {
        this.originLocation.lat = String(coordinates.lat)
        this.originLocation.lng = String(coordinates.lng)
        })
    },
    async setCenter(args) {
      console.log('setCenter()')
      await getUserCurrentLocation().then(() => {
        const coordinates = this.userLocation
        args.map.setCenter({
          lat: coordinates.lat,
          lng: coordinates.lng,
          zoomLevel: 15
        })
        console.log('coordinates: ')
        console.dir(coordinates)
      })
    },
    setUserMarker(args) {
      const coordinates = this.userLocation
      const markerCoordinates = [
        {
          id: 1,
          lat: coordinates.lat,
          lng: coordinates.lng,
          title: 'Tu localización',
          selected: true,
          onTap: () => this.showSecurityArea(args),
        },
      ]
      return markerCoordinates
    },
    showMarkers(args) {
      args.map.addMarkers(this.setUserMarker(args))
    },
    onMapReady(args) {
      console.log('onMapReady()')
      this.setCenter(args).then(() => this.showMarkers(args))
    },
  },
}
</script>
