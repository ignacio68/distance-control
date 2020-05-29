import { Color } from 'tns-core-modules/color/color'
import { getCurrentUserLocation } from '@/services/geolocation'
import { getSecurityAreaPoints } from '@/services/map'

import securityArea from '@/store/securityArea'
import markers from '@/store/markers'

import { AddPolygonOptions, Marker } from '@/utils/types'

export const setCenter = (map) => {
  getCurrentUserLocation().then((coordinates) => {
    map.setCenter({
      lat: coordinates.lat,
      lng: coordinates.lng,
      animate: true,
    })
    map.setZoomLevel({
      level: 15,
    })
    console.log('coordinates: ')
    console.dir(coordinates)
  })
}

/****** SECURITY AREA ******/

export const setSecurityArea = (map, polygonOptions) => {
  getSecurityAreaPoints(polygonOptions.radius).then((points) => {
    polygonOptions.points = points
    polygonOptions.isVisible = true

    map.addPolygon(polygonOptions).then(() => {
      polygonOptions.isVisible = true
      securityArea.setNewSecurityArea(polygonOptions)
    })
  })
}

export const showSecurityArea = (id: string, value: boolean) => {
    const isSecurityArea = securityArea.getSecurityArea(id)
    if (!isSecurityArea) {
        console.log("The security area not exist")
        return
    }
    const isVisible = securityArea.getIsVisible(id)
    console.log(isVisible)
    isVisible ? securityArea.isVisible(id, value) :  securityArea.isVisible(id, value)
}

export const updateSecurityArea = (id: string) => {
  const updatedSecurityArea = securityArea.getSecurityArea(id)
}

export const removeSecurityArea = (map, id: string) => {
    map.removePolygons(id).then(() => securityArea.removeSecurityArea(id))
}  

/****** MARKERS ******/

export const showMarkers = () => {}

export const addMarker = (map, marker: Marker) => {
    const newMarkers = []
    newMarkers.push(marker)
  map.addMarkers(newMarkers).then(() => markers.setNewMarker(markers))
}

export const updateMarker = (map, id) => {
  map.updateMarker(id)
}

export const removeMarker = (map, id) => map.removeMarkers(id)
