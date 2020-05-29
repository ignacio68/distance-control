import { Color } from "tns-core-modules/color/color"

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

export interface Marker extends Coordinates {
  id: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  iconPath?: string;
  onTap?: Function;
  onCalloutTap?: Function;
  selected?: boolean;
  update?: (newSettings: Marker) => void;
  ios?: any;
  android?: any;
}

export interface AddPolygonOptions {
id: any
points: Coordinates[]
fillColor?: string | Color
fillOpacity?: number
strokeColor?: string | Color
strokeWidth?: number
strokeOpacity?: number
isVisible?: boolean
}
