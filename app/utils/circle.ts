import {
  range,
  degreesToRadians as radians,
  radiansToDegrees as degrees
} from './maths'

import { Coordinates, Circle, Azimuth, LocationInCircle } from './types'

const PI = Math.PI
const EARTH_RADIUS = 6378 // km

const getPointCoordinates = ({ theta, radius, center }: Azimuth) => {

  const dy = Math.sin(radians(theta)) * radius
  const dx = Math.cos(radians(theta)) * radius
  // const dx = radius / (111.320 * Math.cos(radians(center.lat)))
  // const dy = radius / 110.574
  const newLatitude = center.lat + degrees(dy / EARTH_RADIUS)
  const newLongitude =
    center.lng + (degrees(dx / EARTH_RADIUS)) / Math.cos(radians((center.lat * PI) / 180))

  const coordinates: Coordinates = { lat: newLatitude, lng: newLongitude }

  return coordinates
}

const getCirclePointsCoordinates = ({ center, radius, numberOfPoints }: Circle) => {
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
  * @param lng{number} longitude to check
  * @param lat{number} latitude to check
  * @param circleLng{number} longitude center of circle
  * @param circleLat{number} latitude center of circle
  * @param circleRadius{number} radius of circle in meters
  *
  * @return {boolean} true if the point is within the given geofence.
  *
  * @link https://stackoverflow.com/questions/24680247/check-if-a-latitude-and-longitude-is-within-a-circle-google-maps
  */

const isLocationInCircle = ({ lng, lat, circleLng, circleLat, circleRadius }: LocationInCircle ) => {
  const ky = 111.11111111
  const kx = Math.cos( Math.PI * circleLat / 180.0 ) * ky
  const dx = Math.abs( circleLng - lng ) * kx
  const dy = Math.abs( circleLat - lat ) * ky

  const distance = Math.sqrt(dx * dx + dy * dy)

  // return (distance < circleRadius / 1000) ? true : false
  return distance < circleRadius / 1000

}

export { getCirclePointsCoordinates, isLocationInCircle }
