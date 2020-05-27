import { getUserCurrentLocation } from '@/services/geolocation'

const userCurrentLocation = () => getUserCurrentLocation()

export {
    userCurrentLocation
}
