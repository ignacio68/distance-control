import { getCurrentUserLocation } from '@/services/serviceGeolocation'
import { getSecurityAreaPoints } from '@/services/serviceMap'

import securityArea from '@/store/securityArea'
import { setNewMarker } from '@/store/markers'

import { PolygonOptions, Marker, CircleLayer } from '@/utils/types'

export const setCenter = (map: any) => {
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
// TODO: using layers
export const addSource = (map: any, id: string) => {
  map.addSource(id)
}

export const addCircleLayer = (map: any, options: CircleLayer) => {
  map.addLayer({
    id: options.id,
    source: options.source,
    type: 'circle',
    circleColor: 'red',
    circleRadius: 500,
    circleStrokeColor: 'blue',
    circleStrokeWidth: 3,
  })
}

export const setSecurityArea = (map: any, polygonOptions: PolygonOptions) => {
  console.log("setSecurityArea()")
  getSecurityAreaPoints(polygonOptions.radius).then((points) => {
    polygonOptions.points = points
    
    map.addPolygon(polygonOptions).then(() => {
      securityArea.setNewSecurityArea(polygonOptions)
    })
  })
}

export const showSecurityArea = (map: any, id: string, value: boolean) => {
  console.log("showSecurityArea()")
  const currentSecurityArea = securityArea.getSecurityArea(id)
  if (!currentSecurityArea) {
    console.log('The security area not exist')
    return
  }
  if (currentSecurityArea.isVisible === value) {
    console.log('The security visibility is the same!')
    return
  }
  
  changeSecurityAreaVisibility(map, currentSecurityArea, value)
}

const changeSecurityAreaVisibility = (map: any, securityArea: PolygonOptions, value: boolean): void => {
  console.log("changeSecurityAreaVisibility()")
  securityArea.isVisible = value
  console.log(`visibility value: ${value}`)
  console.log(`${securityArea.id} is visible?  ${securityArea.isVisible}`)

  if (value) {
    securityArea.fillOpacity = securityArea.oldFillOpacity
    console.log(`Opacity ${ securityArea.id}? ${ securityArea.fillOpacity}`)
  } else {
    securityArea.oldFillOpacity = securityArea.fillOpacity
    securityArea.fillOpacity = 0
    
    console.log(`Opacity ${ securityArea.id}? ${ securityArea.fillOpacity}`)
  }
  updateSecurityArea(map, securityArea)
 
}

export const updateSecurityArea = (map: any, securityArea: PolygonOptions) => {
  console.log("updateSecurityArea()")
  removeSecurityArea(map, securityArea.id).then(() => {
    setSecurityArea(map, securityArea)
    console.log("Security area is updated!")
  })
}

export const removeSecurityArea = async (map: any, id: string) => {
  console.log("removeSecurityArea()")
  const isSecurityArea = securityArea.getSecurityArea(id)
  if (!isSecurityArea) {
    console.log('SecurityArea not exist')
    return
  }
  map.removePolygons(id).then(() => securityArea.removeSecurityArea(id))
}

/****** MARKERS ******/

export const showMarkers = () => {}

export const addMarker = (map: any, marker: Marker) => {
  const newMarker = []
  newMarker.push(marker)
  map.addMarkers(newMarker).then(() => setNewMarker(marker))
}

export const updateMarker = (map: any, id: string) => {
  map.updateMarker(id)
}

export const removeMarker = (map: any, id: string) => map.removeMarkers(id)
