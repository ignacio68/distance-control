import { getCurrentUserLocation } from '@/services/serviceGeolocation'

const userCurrentLocation = () => getCurrentUserLocation()

export {
    userCurrentLocation
}
