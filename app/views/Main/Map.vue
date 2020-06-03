<template>
  <Page 
    actionBarHidden="true"
  >
    <StackLayout
      orientation="vertical"
      class="map"
    >
      <MapComponent
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="centerMap.lat"
        :userLongitude="centerMap.lng"
        @onMapReady="onMapReady($event)"
      />
      <Slider
        class="radiusSlider"
        minValue="0"
        maxValue="100"      
        :value="radius"
        @valueChange="onRadiusValueSliderChange" 
      />

      <Slider
        class="opacitySlider"
        minValue="0"
        maxValue="10"      
        :value="fillOpacity"
        @valueChange="onOpacityValueSliderChange" 
      />
      <!-- <Label>
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
      </Label> -->
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

import MapComponent from '@/components/Map/MapComponent.vue'

export default {
  name: 'Map',

  components: {
    MapComponent
  },

  props:{
    isVisible: {
      type: Boolean,
      default: true
    }
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
      get: function() { return this.radius },
      set: function (value: number) {
        this.radius = value
      }
    },
    getFillOpacity: {
      get: function () {return this.fillOpacity},
      set: function (value: number) {
        this.fillOpacity = value
      }
    }
  },

  watch: {
    isVisible: function(newValue) {
      console.log(`is visible: ${this.isVisible}`)
      this.showSecurityArea('user', newValue)
    }
  },

  created() {
    console.log('created()')
    // this.setInitialUserLocation()
  },

  mounted() {
    console.log('mounted()')
    this.setInitialUserLocation()
    this.$root.$on('newSecurityArea', value =>  this.newSecurityArea(value.name))
    this.$root.$on('removeSecurityArea', value => this.removeSecurityArea(value.name))
    this.$root.$on('setCenter', () => this.setCenter())
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
      // this.showMarkers()
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
  .map {
    border: 2, solid, red
  }
</style>
