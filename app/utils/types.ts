type Coordinates = {
  lat: number,
  lng: number
}

interface Circle {
  center: Coordinates
  radius: number
  numberOfPoints: number
}

interface GetCoordinates {
  theta: number
  radius: number
  lat: number
  lng: number
}

export { Coordinates, Circle, GetCoordinates }
