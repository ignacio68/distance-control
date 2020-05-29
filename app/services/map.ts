import { Color } from 'tns-core-modules'

import { getCurrentUserLocation } from '@/services/geolocation'
import { getCirclePointsCoordinates } from '@/utils/circle'
import { setSecurityArea } from '@/api/map'

import { Coordinates, Circle, Marker } from '@/utils/types'

import userLocation from '@/store/userLocation'
import marker from '@/store/markers'


export const coordinates: Coordinates = userLocation.getCurrentUserLocation()

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
