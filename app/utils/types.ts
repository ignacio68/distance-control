interface InitialCoordinates {
  lat: string
  lng: string
 }

interface Coordinates {
  lat: number
  lng: number
}

interface Circle {
  center: Coordinates
  radius: number
  numberOfPoints: number
}

interface PointsCoordinates {
  theta: number
  radius: number
  center: Coordinates
}

export { InitialCoordinates, Coordinates, Circle, PointsCoordinates }
