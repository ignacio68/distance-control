import { Color } from "tns-core-modules/color/color";

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

export interface PointsCoordinates {
  theta: number
  radius: number
  center: Coordinates
}

export interface PolygonOptions {
id?: any
points: Coordinates[]
fillColor?: string | Color
fillOpacity?: number
strokeColor?: string | Color
strokeWidth?: number
strokeOpacity?: number
isVisible: boolean
}
