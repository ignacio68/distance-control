import { PI, range, degreesToRadians as radians } from './core'

import { Coordinates, Circle, GetCoordinates } from './types'

const EARTH_RADIUS = 6378 // km

const getCoordinates = (options: GetCoordinates) => {
  const { theta, radius, lat, lng } = options

  const dy = Math.sin(radians(theta)) * radius
  const dx = Math.cos(radians(theta)) * radius
  const newLatitude = lat + (dy / EARTH_RADIUS) * (180 / PI)
  console.log(`getCoordinates().newLatitude: ${newLatitude}`)
  const newLongitude =
    lng + ((dx / EARTH_RADIUS) * (180 / PI)) / Math.cos(radians((lat * PI) / 180))
  const coordinates: Coordinates = { lat: newLatitude, lng: newLongitude }
  return coordinates
}

const getCircleCoordinates = (options: Circle) => {
  const { center, radius, numberOfPoints } = options

  const lat = center.lat
  const lng = center.lng
  console.log(`getCircleCoordinates lat: ${lat}`)

  const thetaList = range(0, 360, 360 / numberOfPoints)
  const circleCoordinates: Coordinates[] = thetaList.map((theta) => {
    const circleCoordinates = getCoordinates({ theta, radius, lat, lng })
    return circleCoordinates
  })
  return circleCoordinates
}

export { getCircleCoordinates }
