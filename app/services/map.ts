import { Color } from 'tns-core-modules'
import { getCircleCoordinates } from '@/utils/circle'
import { Coordinates } from '@/utils/types'
import userLocation from '@/store/userLocation'

const coordinates = userLocation.getUserCurrentLocation()

const origin: Coordinates = {
  lat: Number(coordinates.lat),
  lng: Number(coordinates.lng)
}

const circlePoints: Coordinates[] = getCircleCoordinates({
  center: origin,
  radius: 1000,
  numberOfPoints: 18,
})

export const circleProps = {
  id: 'circle',
  fillColor: new Color('red'),
  fillOpacity: 0.7,
  points: circlePoints,
}
