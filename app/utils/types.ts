import { Color } from 'tns-core-modules/color/color'

export interface InitialCoordinates {
  lat: string
  lng: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Circle {
  center: Coordinates
  radius: number
  numberOfPoints: number
}

export interface Azimuth {
  theta: number
  radius: number
  center: Coordinates
}

export interface Marker extends Coordinates {
  id: string
  group?: string
  title?: string
  subtitle?: string
  icon?: string
  iconPath?: string
  onTap?: Function
  onCalloutTap?: Function
  selected?: boolean
  isFollowed?: boolean
  update?: (newSettings: Marker) => void
  ios?: any
  android?: any
}

export interface PolygonOptions {
  id: string
  group?: string
  points?: Coordinates[]
  radius?: number
  fillColor?: string | Color
  fillOpacity?: number
  oldFillOpacity?: number
  strokeColor?: string | Color
  strokeWidth?: number
  strokeOpacity?: number
  isVisible?: boolean
}

export interface LocationInCircle {
  lng: number
  lat: number
  circleLng: number
  circleLat: number
  circleRadius: number
}

export interface Layer {
  id: string
  source?: string
  sourceLayer?: string
  type?: string
}

export interface CircleLayer extends Layer {
  circleColor?: string | Color
  circleOpacity?: number
  circleRadius?: number
  circleStrokeColor?: string | Color
  circleStrokeWidth?: number
}

export interface User{
  id: string
  location?: Coordinates
  phoneNumber: string
}