<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="userCoordinates.lat"
        :userLongitude="userCoordinates.lng"
        @onMapReady="onMapReady($event)"
      />
      <Label>
        <FormattedString>
          <Span text="Latitude: " />
          <Span :text="currentUserLocation.lat" />
        </FormattedString>
      </Label>
      <Label>
        <FormattedString>
          <Span text="Longitude: " />
          <Span :text="currentUserLocation.lng" />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import { mapboxToken } from '@/setup/Mapbox'

import { fetchCurrentUserLocation, getCurrentUserLocation } from '@/services/geolocation'
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
      userCoordinates: {
        lat: '',
        lng: '',
      },
      markers: null,
    }
  },

  computed: {
    getUserCurrentLocation(): UserLocation {
      return userLocation.getCurrentUserLocation()
    },
  },

  created() {
    console.log('created()')
    this.setCurrentUserLocation()
  },

  methods: {
    setCurrentUserLocation(){
      console.log('setInitialCoordinates()')
      getCurrentUserLocation().then((coordinates) => {
        this.userCoordinates.lat = String(coordinates.lat)
        this.userCoordinates.lng = String(coordinates.lng)
        })
    },
    showSecurityArea(args) {
      args.map.addPolygon(circleProps)
      console.log('showSecurityArea() coordinates: ' + JSON.stringify(coordinates))
      // console.dir(circleProps)
    },
    setHomeMarker(){
      const homeCoordinates = this.originLocation
      const homeMarkerProps = {
        id: "home",
        lat: Number(homeCoordinates.lat),
        lng: Number(homeCoordinates.lng),
        title: 'Esta es tu localización original',
        selected: true,
      }
    },
    // setCenter(args) {
    //   console.log('setCenter()')
    //   getCurrentUserLocation().then(() => {
    //     const coordinates = this.getUserLocation
    //     args.map.setCenter({
    //       lat: coordinates.lat,
    //       lng: coordinates.lng,
    //       zoomLevel: 15
    //     })
    //     console.log('coordinates: ')
    //     console.dir(coordinates)
    //   })
    // },
    setUserMarker(args) {
      const coordinates = this.currentUserLocation
      const markerProps = [
        {
          id: 1,
          lat: coordinates.lat,
          lng: coordinates.lng,
          title: 'Tu localización',
          selected: true,
          onTap: () => this.showSecurityArea(args),
        },
      ]
      return markerProps
    },
    showMarkers(args) {
      args.map.addMarkers(this.setUserMarker(args))
    },
    onMapReady(args) {
      console.log('onMapReady()')
      // this.setCenter(args).then(() => this.showMarkers(args))
      this.showMarkers(args)
    }
  }
}
</script>
