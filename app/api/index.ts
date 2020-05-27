import { getCurrentUserLocation } from '@/services/geolocation'

const userCurrentLocation = () => getCurrentUserLocation()

export {
    userCurrentLocation
}
