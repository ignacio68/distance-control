<template>
  <Page 
    actionBarHidden="true"
  >
    <GridLayout
      class="mapPage"
      rows="auto,250"
    >
      <MapComponent
        row="0"
        height="100%"
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="initialLocation.lat"
        :userLongitude="initialLocation.lng"
        @onMapReady="onMapReady($event)"
        @setCenter="centerCamera()"
      />
      <NewMarker
        ref="backdropMenu"       
        row="1"
        @onMarkerCancel="hideBackdropMenu()"
        @onMarkerDone="addMarker"
        @onRadiusChange="onRadiusChange"
      />
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
  </Page>
</template>

<script lang="ts">
import { mapToken } from '@/setup/map'

import { Color } from 'tns-core-modules/color/color'
import * as map from '@/api/map'
import { getCurrentUserLocation } from '@/services/geolocation'
import {AnimationCurve} from "tns-core-modules/ui/enums"

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
    this.$root.$on('setNewMarker', () =>  this.showBackdropMenu())
    this.$root.$on('removeSecurityArea', value => this.removeSecurityArea(value.name))
  },

  methods: {
    showBackdropMenu() {
      const backdropMenu = this.$refs.backdropMenu.nativeView
      
      backdropMenu.animate({
        translate: { x: 0, y: -240},
        duration: 500,
        curve: AnimationCurve.easeIn
      }).then(() => {})
        .catch(() => {})
    },
    hideBackdropMenu() {
      const backdropMenu = this.$refs.backdropMenu.nativeView
      
      backdropMenu.animate({
        translate: { x: 0, y: 240},
        duration: 500,
        curve: AnimationCurve.easeOut
      }).then(() => {})
        .catch(() => {})
    },
    onScroll() {
      const scrollView = this.$refs.scrollView.nativeView
      const topView = this.$refs.topView.nativeView

      if(scrollView > 600) {
        const offset = scrollView.verticalOffset / 1.65
        if(scrollView.ios) {
          topView.animate({ translate: { x: 0, y: offset } }).then(() => {}, () => {})
        } else {
          topView.translateY = Math.floor(offset)
        }
      }
    },
    onRadiusChange(value) {
       this.getRadius = value
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
