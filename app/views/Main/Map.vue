<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="userLocation.latitude"
        :userLongitude="userLocation.longitude"
        @onMapReady="onMapReady($event)"
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
      markerCoordinates: [{
        id: 1,
        lat: 40.4561397,
        lng: -3.6806146,
        title: 'Tu localización',
        selected: true,  
        onTap: () => console.log('Buena localización!!')
      }],
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
    // getUserCurrentLocation()
  },
  methods: {
    setCenter(args) {
      args.map.setCenter(
        {
          lat: Number(this.userLocation.latitude),
          lng: Number(this.userLocation.longitude)
        }
      )
    },
    setUserMarker() {
      const coordinates = state.userLocation
      const markerCoordinates = [{
        id: 1,
        lat: 40.4561397,
        lng: -3.6806146,
        title: 'Tu localización',
        selected: true,  
        onTap: () => console.log('Buena localización!!')
      }]
      return markerCoordinates
    },
    showMarkers(args) {
      args.map.addMarkers(this.setUserMarker())
      // console.log(`Este es el Home marker: ${JSON.stringify(this.markerCoordinates)}`)
    },
    onMapReady(args) {
      this.setCenter(args)
      this.showMarkers(args)
    },
    addCircle(args) {
      args.map.addLayer({
        "id": "circle",
    "type": 'circle',
    "radius-meters": 500,   // FIXME: radius in meters used for in-circle click detection. 
    "source": {
      "type": 'geojson',
      "data": {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [ Number(this.userLocation.longitude), Number(this.userLocation.latitude) ]
        }
      }
    }, 
    "paint": {
      "circle-radius": {
        "stops": [
          [0, 0],
          [20, 10000 ]
        ],
        "base": 2
      },
      'circle-opacity': 0.05,
      'circle-color': '#ed6498',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ed6498'
    } 
      })
    }


  },
}
</script>
