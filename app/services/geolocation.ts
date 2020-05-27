import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import { Coordinates } from '@/utils/types'
import userLocation from '@/store/userLocation'

const enableLocationRequest = (option: boolean) =>
  geolocation.enableLocationRequest(option).then(() => {
    console.log('enableLocationRequest()')
  })

const isLocationServicesEnabled = () =>
  geolocation.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      console.log('The location service is not enabled')
      enableLocationRequest(true)
    }
    console.log('The location service is enabled')
    return isEnabled
  })

const fetchCurrentUserLocation = () =>
  geolocation.getCurrentLocation({}).then((result): Coordinates => {
    const location: Coordinates = {
      lat: result.latitude,
      lng: result.longitude
    }
    return location
  })

// const getUserCurrentLocation = async () => {
//   console.log('getUserCurrentLocation()')
//   isLocationServicesEnabled()
//     .then(async (isEnabled) => {
//       if (!isEnabled) {
//         return
//       }
//       const location = await fetchCurrentUserLocation()
//       const coordinates: Coordinates = {
//         lat: location.latitude,
//         lng: location.longitude,
//       }
//       console.log('fetchCurrentUserLocation()')
//       console.dir(coordinates)
//       userLocation.setUserLocation(coordinates)
//     })
//     .catch((e) =>console.log(`getCurrentLocation() error: ${e.message || e}`))
// }
const getCurrentUserLocation = async () => {
  console.log('getUserCurrentLocation()')
  const isEnabled = isLocationServicesEnabled()
  if (!isEnabled) {
    console.log(`It cannot return the user current coordinates`)
    return
  }
  const location = await fetchCurrentUserLocation().catch((e) =>
    console.log(`getCurrentLocation() error: ${e.message || e}`)
  )
  if (location) {
    console.log('fetchCurrentUserLocation()')
    console.dir(location)
    userLocation.setCurrentUserLocation(location)
    return location
  }
}

const watchUserLocation = () => {
  // TODO: revisar sintaxis
  console.log('watchUserLocation()')
  geolocation.watchLocation(
    position => {
      const currentLocation: UserLocation = {
        lat: position.latitude,
        lng: position.longitude,
      }
      return currentLocation
    },
    (e) => {
      console.log(`failed to get location: ${e}`)
    },
    {
      desiredAccuracy: Accuracy.high,
      minimumUpdateTime: 500,
    }
  )
}

export { fetchCurrentUserLocation, getCurrentUserLocation, isLocationServicesEnabled, watchUserLocation }
