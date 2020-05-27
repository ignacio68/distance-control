import { Color } from 'tns-core-modules'
import { getCircleCoordinates } from '@/utils/circle'
import { Coordinates } from '@/utils/types'
import userLocation from '@/store/userLocation'

export const coordinates: Coordinates = userLocation.getUserLocation()

const origin: Coordinates = {
  lat: coordinates.lat,
  lng: coordinates.lng
}

const circlePoints: Coordinates[] = getCircleCoordinates({
  center: origin,
  radius: 1000,
  numberOfPoints: 64,
})

export const circleProps = {
  id: 'circle',
  fillColor: new Color('green'),
  fillOpacity: 0.7,
  points: circlePoints,
}
