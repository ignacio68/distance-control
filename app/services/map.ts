import { Color } from 'tns-core-modules'

import { getCurrentUserLocation } from '@/services/geolocation'
import { getCirclePointsCoordinates } from '@/utils/circle'

import { MapboxMarker, LatLng } from 'nativescript-mapbox'
import { Circle } from '@/utils/types'

import userLocation from '@/store/userLocation'


export const coordinates: LatLng = userLocation.getCurrentUserLocation()

export const getSecurityAreaPoints = (radius) => {
  console.log('etSecurityAreaPoints')
  
  const points = getCurrentUserLocation().then( center =>{
    const circlePolygonProps: Circle = {
    center: center,
    radius: radius,
    numberOfPoints: 64,
  }
    return getCirclePointsCoordinates(circlePolygonProps)
  })
  return points 
}
