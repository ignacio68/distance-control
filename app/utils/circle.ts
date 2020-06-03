import {
  range,
  degreesToRadians as radians,
  radiansToDegrees as degrees
} from './core'

import { Coordinates, Circle, Azimuth, LocationInCircle } from './types'

const PI = Math.PI
const EARTH_RADIUS = 6378 // km

const getPointCoordinates = (options: Azimuth) => {
  const { theta, radius, center } = options
  
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



  /**
  * Is the current location within the given circle? 
  *
  * @param {number} longitude to check
  * @param {number} latitude to check
  * @param {number} longitude center of circle
  * @param {number} latitude center of circle
  * @param {number} radius of circle in meters
  *
  * @return {boolean} true if the point is within the given geofence.
  *
  * @link https://stackoverflow.com/questions/24680247/check-if-a-latitude-and-longitude-is-within-a-circle-google-maps
  */
// lng: number, lat: number, circleLng: number, circleLat: number, circleRadius: number
const isLocationInCircle = (options: LocationInCircle ) => {
  const { lng, lat, circleLng, circleLat, circleRadius } = options 
  const ky = 111.11111111
  const kx = Math.cos( Math.PI * circleLat / 180.0 ) * ky
  const dx = Math.abs( circleLng - lng ) * kx
  const dy = Math.abs( circleLat - lat ) * ky

  const distance = Math.sqrt(dx * dx + dy * dy) 

  // return (distance < circleRadius / 1000) ? true : false
  return distance < circleRadius / 1000

}

export { getCirclePointsCoordinates, isLocationInCircle }
