<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <StackLayout orientation="horizontal">
        <!-- <Button 
          text="Remove Marker"
          @tap="removeMarker('user')"
        /> -->
        <Button
          text="Seguridad"
          @tap="setSecurityArea('user')"
        />
        <Button
          text="Borrar Area"
          @tap="removePolygon('user')"
        />
        <Button
          text="Center"
          @tap="setCenter()"
        />
      </StackLayout>
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="centerMap.lat"
        :userLongitude="centerMap.lng"
        @onMapReady="onMapReady($event)"
      />
      <StackLayout>
        <Slider
          minValue="0"
          maxValue="100"      
          :value="radius"
          @valueChange="onValueSliderChange" 
        />
        <StackLayout orientation="horizontal">
          <Label 
            text="0" 
            textWrap="true" 
          />
          <Label 
            text="100km" 
            textWrap="true"
          />
        </StackLayout>
      </StackLayout>
      

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
import { Color } from 'tns-core-modules'
import { MapboxMarker, LatLng, AddPolygonOptions } from 'nativescript-mapbox'
import { mapboxToken } from '@/setup/Mapbox'

import { setCenter } from '@/api/map'
import { getCurrentUserLocation } from '@/services/geolocation'
import { getSecurityAreaPoints } from '@/services/map'

import userLocation from '@/store/userLocation'

import MapComponent from '@/components/Main/MapComponent.vue'

export default {
  name: 'Map',

  components: {
    MapComponent,
  },

  data() {
    return {
      accessToken: mapboxToken,
      centerMap: {
        lat: '',
        lng: '',
      },
      markers: [],
      map: null,
      radius: 10,
      fillColor: 'green',
      fillOpacity: 0.5,
      isSecurityAreaList:[],
      isSecurityArea: false
    }
  },

  computed: {
    currentUserLocation(): LatLng {
      return userLocation.getCurrentUserLocation()
    },
  },

  created() {
    console.log('created()')
    this.setInitialUserLocation()
  },

  methods: {
    onValueSliderChange({value}) {
      console.log(`value: ${value}`)
      this.radius = value
    },
    setInitialUserLocation() {
      console.log('setInitialCoordinates()')
      getCurrentUserLocation().then((coordinates) => {
        this.centerMap.lat = String(coordinates.lat)
        this.centerMap.lng = String(coordinates.lng)
      })
    },

    setSecurityArea(name) {
      console.log('setSecurityArea()')
        if (this.isSecurityArea) return
        getSecurityAreaPoints(this.radius).then( points => {
        console.log(`setSecurityArea point[15]: ${points[15]}`)
        const circleProps: AddPolygonOptions ={
        id: name,
        points: points,
        fillColor: new Color(this.fillColor),
        fillOpacity: this.fillOpacity
      }  
        this.map.addPolygon(circleProps).then(() => this.isSecurityArea = true)
        
        })
    },

    removePolygon(name) {
      if (!this.isSecurityArea) return
      console.log(`remove polygon: ${name}`)
      this.map.removePolygons(name).then(() => this.isSecurityArea = false)
      
    },
    setHomeMarker() {
      const homeCoordinates = this.originLocation
      const homeMarkerProps = {
        id: 'home',
        lat: Number(homeCoordinates.lat),
        lng: Number(homeCoordinates.lng),
        title: 'Esta es tu localización original',
        selected: true,
      }
      return homeMarkerProps
    },
    setCenter() {
      console.log('setCenter()')
      getCurrentUserLocation().then((coordinates) => {
        this.map.setCenter({
          lat: coordinates.lat,
          lng: coordinates.lng,
          animate: true,
        })
        this.map.setZoomLevel({
          level: 15
        })
        console.log('coordinates: ')
        console.dir(coordinates)
      })
      // setCenter(this.map)
    },
    setUserMarker() {
      const coordinates = this.currentUserLocation
      const userMarker: MapboxMarker = {
        id: 'user',
        lat: coordinates.lat,
        lng: coordinates.lng,
        title: 'Tu localización',
        selected: true,
        onTap: () => this.setSecurityArea('user'),
      }
      // return markerProps
      this.markers.push(userMarker)
    },
    addMarker(args, marker) {
      args.map.addMarkers(marker)
    },
    updateMarker(args, marker) {
      args.map.updateMarker(marker)
    },
    removeMarker(markerId) {
      this.map.removeMarkers(markerId)
    },
    showMarkers() {
      this.setUserMarker()
      console.log('showMarkers')
      console.dir(JSON.stringify(this.markers))
      this.map.addMarkers(this.markers)
    },
    onMapReady(args) {
      console.log('onMapReady()')
      this.map = args.map
      console.log(`map: ${this.map}`)
      this.showMarkers()
    },
  },
}
</script>
