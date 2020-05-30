<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <StackLayout orientation="horizontal">
        <!-- <Button 
          text="Remove Marker"
          @tap="removeMarker('user')"
        /> -->
        <Button
          class="-primary -rounded-sm m-x-0"
          text="Nuevo"
          @tap="newSecurityArea('user')"
        />
        <Button
          class="-primary -rounded-sm m-x-0"
          text="Ocultar"
          @tap="showSecurityArea('user', false)"
        />
        <Button
          class="-primary -rounded-sm m-x-0"
          text="Mostrar"
          @tap="showSecurityArea('user', true)"
        />
        <Button
          class="-primary -rounded-sm m-x-0"
          text="Borrar"
          @tap="removeSecurityArea('user')"
        />
        <Button
          class="-primary -rounded-sm m-x-0"
          text="Centrar"
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
      <!-- <StackLayout>
        <Slider
          class="radiusSlider"
          minValue="0"
          maxValue="10"      
          :value="radius"
          @valueChange="onRadiusValueSliderChange" 
        />
        <StackLayout orientation="horizontal">
          <Label 
            text="0" 
            textWrap="true" 
          />
          <Label 
            text="1" 
            textWrap="true"
          />
        </StackLayout>
      </StackLayout> -->
      <StackLayout>
        <Slider
          class="opacitySlider"
          minValue="0"
          maxValue="10"      
          :value="fillOpacity"
          @valueChange="onOpacityValueSliderChange" 
        />
        <StackLayout orientation="horizontal">
          <Label 
            text="0" 
            textWrap="true" 
          />
          <Label 
            text="1" 
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
import { mapToken } from '@/setup/map'

import { Color } from 'tns-core-modules/color/color'
import * as map from '@/api/map'
import { getCurrentUserLocation } from '@/services/geolocation'

import { Coordinates, Marker, PolygonOptions } from '@/utils/types'

import userLocation from '@/store/userLocation'
import securityArea from '@/store/securityArea'

import MapComponent from '@/components/Main/MapComponent.vue'

export default {
  name: 'Map',

  components: {
    MapComponent,
  },

  data() {
    return {
      accessToken: mapToken,
      centerMap: {
        lat: '',
        lng: '',
      },
      map: void 0,
      radius: 10,
      fillColor: 'green',
      fillOpacity: 5,

      activeUser: void 0
    }
  },

  computed: {
    currentUserLocation(): Coordinates {
      return userLocation.getCurrentUserLocation()
    },
    getRadius: {
      get: () => this.radius,
      set: (value: number) => {
        this.radius = value
      }
    },
    getFillOpacity: {
      get: () => this.fillOpacity,
      set: function (value: number) {
        this.fillOpacity = value
      }
    }
  },

  created() {
    console.log('created()')
    this.setInitialUserLocation()
  },

  methods: {
    onRadiusValueSliderChange({value}) {
      this.getRadius = value
      console.log(`value: ${value}`)
    },

    onOpacityValueSliderChange({value}) {
      this.getFillOpacity = value
      console.log(`opacity: ${this.fillOpacity}`)
    },

    /***** MAP *****/

    setInitialUserLocation() {
      console.log('setInitialCoordinates()')
      getCurrentUserLocation().then((coordinates) => {
        this.centerMap.lat = String(coordinates.lat)
        this.centerMap.lng = String(coordinates.lng)
      })
    },

    onMapReady(args) {
      console.log('onMapReady()')
      this.map = args.map
      this.showMarkers()
    },

    setCenter() {
      console.log('setCenter()')
      map.setCenter(this.map)
    },

    /***** SECURITY AREA ******/

    newSecurityArea(id: string) {
      if (securityArea.getSecurityArea(id)) {
        console.log(`${id} exist, choose another name`)
        return
      }
      const polygonOptions: PolygonOptions = {
        id: id,
        radius: this.radius,
        fillColor: new Color(this.fillColor),
        fillOpacity: this.fillOpacity / 10,
        isVisible: true
      } 
      map.setSecurityArea(this.map, polygonOptions) 
    },

    showSecurityArea(id: string, value:boolean) {
      map.showSecurityArea(this.map, id, value)  
    },

    removeSecurityArea(id: string) {
      console.log(`remove polygon: ${id}`)
      map.removeSecurityArea(this.map, id)
    },

    /***** markers *****/
    addMarker(id: string) {
      const coordinates = this.currentUserLocation
      const marker: Marker = {
        id: id,
        lat: coordinates.lat,
        lng: coordinates.lng,
        title: id,
        selected: true,
        onTap: () => this.newSecurityArea(id),
      }
      
      map.addMarker(this.map, marker)
    },
    updateMarker(id: string) {
      map.updateMarker(this.map, id)
    },
    removeMarker(id: string) {
      this.map.removeMarkers(this.map, id)
    },
    showMarkers() {
      this.activeUser = 'user'
      this.addMarker(this.activeUser)
      console.log('showMarkers')
      console.dir(JSON.stringify(this.markers))
    }
  }
}
</script>
<style lang="scss">
</style>
