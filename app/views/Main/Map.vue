<template>
  <GridLayout>
    <Frame id="map-page">
      <MapComponent
        row="0"
        height="100%"
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="initialLocation.lat"
        :userLongitude="initialLocation.lng"
        @on-map-ready="onMapReady($event)"
        @set-center="centerCamera()"
      />
    </Frame>
    <Frame
      id="bottomSheet-page"
      ref="bottomSheet"
      borderTopLeftRadius="16"
      borderTopRightRadius="16"
      backgroundColor="white"
      verticalAlignment="top"
      @loaded="loadBottomSheet"
    >
      <NewMarker
        class="newMarker"
        backgroundColor="white"
        :hasError="hasNewMarkerError"
        @on-marker-cancel="hideBottomSheet()"
        @on-marker-done="addMarker"
        @on-radius-change="onRadiusChange"
      />
    </Frame>
  </GridLayout>
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
</template>

<script lang="ts">
import Vue from 'vue'

import { mapToken } from '@/setup/map'

import * as map from '@/api/map'
import { getCurrentUserLocation } from '@/services/serviceGeolocation'
import { setStorage } from '@/api/storage'
import { Color } from '@nativescript/core/color'
import { screen } from '@nativescript/core/platform'
import { CubicBezierAnimationCurve } from  '@nativescript/core/ui/animation'

import { Coordinates, Marker, PolygonOptions } from '@/utils/types'

import userLocation from '@/store/userLocation'
import securityArea from '@/store/securityArea'

import MapComponent from '@/components/Map/MapComponent.vue'
import NewMarker from '@/components/Map/NewMarker.vue'

export default Vue.extend({
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

  // setup(props) {
  //   watchEffect(() => {
  //     function isVisible (props.isVisible) {
  //     console.log(`is visible: ${props.isVisible}`)
  //     this.showSecurityArea('user', props.isVisible)
  //   }
  //   })
  //   return {}
  // },

  data() {
    return {
      accessToken: mapToken,
      initialLocation: {
        lat: '0',
        lng: '0',
      },
      map: void 0,
      radius: 10,
      fillColor: 'green',
      fillOpacity: 5,
      activeUser: void 0,
      newMarkerMenu: false,
      hasNewMarkerError: false
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

  mounted() {
    console.log('mounted()')
    // this.setInitialUserLocation()
    this.$root.$on('setNewMarker', () =>  this.showBottomSheet())
    this.$root.$on('removeSecurityArea', value => this.removeSecurityArea(value.name))
  },

  methods: {
      onRadiusChange(value) {
       this.getRadius = value
    },

    /***** BOTTOM SHEET *****/
    loadBottomSheet() {
      console.log('loadBottomSheet()')
      const bottomSheet = this.$refs.bottomSheet.nativeView
      this.hasNewMarkerError = false
      bottomSheet.translateY = screen.mainScreen.heightDIPs
    },
    showBottomSheet() {
      console.log('showBottomSheet()')
      const bottomSheet = this.$refs.bottomSheet.nativeView
      this.hasNewMarkerError = false

      bottomSheet.animate({
        duration: 1000,
        translate: { x: 0, y: screen.mainScreen.heightDIPs - 500 },
        curve: new CubicBezierAnimationCurve(.44, .63, 0, 1)
      })
    },
    hideBottomSheet() {
      console.log('hideBottomSheet()')
      const bottomSheet = this.$refs.bottomSheet.nativeView
      this.hasNewMarkerError = false

      bottomSheet.animate({
        duration: 1000,
        translate: { x: 0, y: screen.mainScreen.heightDIPs },
        curve: new CubicBezierAnimationCurve(.44, .63, 0, 1)
      })
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

    /***** markers *****/
    addMarker(values) {
      console.log(`addMarker()`)
      if(!values.id || !values.coordinates) {
        this.hasNewMarkerError = true
        return
      }
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
      this.hideBottomSheet()
      setStorage(marker.id, marker).then(success => {
        console.log(`setStorage? ${success}`)
        if(success){
           map.addMarker(this.map, marker)
        }
      })
     
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
    }
  }
})
</script>
<style lang="scss" scoped>
.newMarker {
  margin-top: 16;
  padding{
    left: 16;
    right: 16;
  }
}
</style>
