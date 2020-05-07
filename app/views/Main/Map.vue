<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="userLocation.lat"
        :userLongitude="userLocation.lng"
        @onMapReady="onMapReady($event)"
      />
      <Label>
        <FormattedString>
          <Span text="Latitude: " />
          <Span :text="userLocation.lat" />
        </FormattedString>
      </Label>
      <Label>
        <FormattedString>
          <Span text="Longitude: " />
          <Span :text="userLocation.lng" />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>

<script lang="ts">

import { mapboxToken } from '@/setup/Mapbox'

import { getUserCurrentLocation } from '@/services/geolocation'
import { circleProps } from '@/services/map'

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
      markers: null,
    }
  },
  computed: {
     userLocation(): UserLocation {
      console.log(`userLocation latitude: ${userLocation.getUserLocation().lat}`)
      return userLocation.getUserLocation()
    },
    currentUserLocation(): UserLocation {
      return userLocation.getUserCurrentLocation()
    }
  },
  created() {
    this.$nextTick(this.setCenter())
  },
  methods: {
    showSecurityArea(args) {
      args.map.addPolygon(circleProps)
    },
    async setCenter(args) {
      const coordinates = this.userLocation
      await getUserCurrentLocation().then(() => {
        args.map.setCenter({
          lat: Number(coordinates.lat),
          lng: Number(coordinates.lng)
        })
      })
    },
    setUserMarker(arg) {
      const coordinates = this.userLocation
      const markerCoordinates = [
        {
          id: 1,
          lat: Number(coordinates.lat),
          lng: Number(coordinates.lng),
          title: 'Tu localización',
          selected: true,
          onTap: () => this.showSecurityArea(arg)
        },
      ]
      return markerCoordinates
    },
    showMarkers(args) {
      args.map.addMarkers(this.setUserMarker(args))
    },
    onMapReady(args) {
      this.setCenter(args)
      this.showMarkers(args)
    },    
  },
}
</script>
