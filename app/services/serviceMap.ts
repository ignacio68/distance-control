import { getCurrentUserLocation } from '@/services/serviceGeolocation'
import { getCirclePointsCoordinates } from '@/utils/circle'

import { Coordinates, Circle } from '@/utils/types'

import userLocation from '@/store/userLocation'

// TODO: eliminar
export const coordinates: Coordinates = userLocation.getCurrentUserLocation()

export const getSecurityAreaPoints = (radius: number) => {
  console.log('getSecurityAreaPoints')

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
