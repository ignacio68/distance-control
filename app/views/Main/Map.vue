<template>
  <Page 
    actionBarHidden="true"
  >
    <StackLayout
      orientation="vertical"
      class="map"
    >
      <MapComponent
        height="70%"
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="initialLocation.lat"
        :userLongitude="initialLocation.lng"
        @onMapReady="onMapReady($event)"
        @setCenter="centerCamera()"
      />
      <!-- <Slider
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
      /> -->
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
      <NewMarker
        v-if="newMarkerMenu"
        @onMarkerCancel="newMarkerMenu = ! newMarkerMenu"
        @onMarkerDone="addMarker"
      />
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
import NewMarker from '@/components/Map/NewMarker.vue'

export default {
  name: 'Map',

  components: {
    MapComponent,
    NewMarker
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
      initialLocation: {
        lat: '',
        lng: '',
      },
      map: void 0,
      radius: 10,
      fillColor: 'green',
      fillOpacity: 5,
      activeUser: void 0,
      newMarkerMenu: false
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
    this.$root.$on('setNewMarker', () =>  this.newMarkerMenu = true)
    this.$root.$on('removeSecurityArea', value => this.removeSecurityArea(value.name))
  },

  methods: {
    prueba(values) {
      console.log('Esto es una prueba de funcionamiento')
      console.log(JSON.stringify(values))
    },
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
        this.initialLocation.lat = String(coordinates.lat)
        this.initialLocation.lng = String(coordinates.lng)
      })
    },

    onMapReady(args) {
      console.log('onMapReady()')
      this.map = args.map
      map.addSource(this.map, 'main') // TODO: Change source name
      // this.showMarkers()
    },

    centerCamera() {
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
    addMarker(values) {
      const coordinates = this.currentUserLocation
      const marker: Marker = {
        id: values.id,
        group: values.group,
        lat: coordinates.lat,
        lng: coordinates.lng,
        title: values.id,
        selected: true,
        onTap: () => this.newSecurityArea(values.id),
      }
      
      map.addMarker(this.map, marker) // TODO: convert to promise
      this.newMArker = false
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
