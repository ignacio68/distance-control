import { getCurrentUserLocation } from '@/services/geolocation'

export const setCenter = (map) => {
    getCurrentUserLocation().then((coordinates) => {
        map.setCenter({
          lat: coordinates.lat,
          lng: coordinates.lng,
          animate: true,
        })
        map.setZoomLevel({
          level: 15
        })
        console.log('coordinates: ')
        console.dir(coordinates)
      })
}
