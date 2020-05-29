import {
  range,
  degreesToRadians as radians,
  radiansToDegrees as degrees
} from './core'

import { Coordinates, Circle, PointsCoordinates } from './types'

const PI = Math.PI
const EARTH_RADIUS = 6378 // km

const getPointCoordinates = (options: PointsCoordinates) => {
  const { theta, radius, center } = options
  console.log('getPointCoordinates()')

  const dy = Math.sin(radians(theta)) * radius
  const dx = Math.cos(radians(theta)) * radius
  const newLatitude = center.lat + degrees(dy / EARTH_RADIUS) 
  const newLongitude =
    center.lng + (degrees(dx / EARTH_RADIUS)) / Math.cos(radians((center.lat * PI) / 180))
  
  const coordinates: Coordinates = { lat: newLatitude, lng: newLongitude }

  return coordinates
}

const getCirclePointsCoordinates = (options: Circle) => {
  const { center, radius, numberOfPoints } = options
  console.log('getCirclePointsCoordinates()')

  const thetasList = range(0, 360, 360 / numberOfPoints)

  const allPointsCoordinates: Coordinates[] = thetasList.map((theta) => {
    return getPointCoordinates({ theta, radius, center })
  })

  return allPointsCoordinates  
}

export { getCirclePointsCoordinates }
