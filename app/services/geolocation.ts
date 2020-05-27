import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import { UserLocation } from '@/store/types'
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
  geolocation.getCurrentLocation({}).then((result): UserLocation => {
    const location: UserLocation = {
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
//       const coordinates: UserLocation = {
//         lat: location.latitude,
//         lng: location.longitude,
//       }
//       console.log('fetchCurrentUserLocation()')
//       console.dir(coordinates)
//       userLocation.setUserLocation(coordinates)
//     })
//     .catch((e) =>console.log(`getCurrentLocation() error: ${e.message || e}`))
// }
const getUserCurrentLocation = async () => {
  console.log('getUserCurrentLocation()')
  const isEnabled = isLocationServicesEnabled()
  if (!isEnabled) {
    console.log(`It cannot return the user current coordinates`)
    return
  }
  const fetchUserLocation = await fetchCurrentUserLocation().catch((e) =>
    console.log(`getCurrentLocation() error: ${e.message || e}`)
  )
  if (fetchUserLocation) {
    console.log('fetchCurrentUserLocation()')
    console.dir(fetchUserLocation)
    userLocation.setUserLocation(fetchUserLocation)
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

export { fetchCurrentUserLocation, getUserCurrentLocation, isLocationServicesEnabled, watchUserLocation }
