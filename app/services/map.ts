import { getCurrentUserLocation } from '@/services/geolocation'
import { getCirclePointsCoordinates } from '@/utils/circle'

import { Coordinates, Circle } from '@/utils/types'

import userLocation from '@/store/userLocation'


export const coordinates: Coordinates = userLocation.getCurrentUserLocation()

export const getSecurityAreaPoints = (radius: number) => {
  console.log('etSecurityAreaPoints')
  
  const points = getCurrentUserLocation().then( center => {
    const circlePolygonProps: Circle = {
    center: center,
    radius: radius,
    numberOfPoints: 32,
  }
    return getCirclePointsCoordinates(circlePolygonProps)
  })
  return points 
}
