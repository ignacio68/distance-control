import * as geolocation from 'nativescript-geolocation'
import { Coordinates} from '@/utils/types'
import { Accuracy } from 'tns-core-modules/ui/enums'
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
  geolocation.getCurrentLocation({}).then(
    result => {
      const location: Coordinates = {
        lat: result.latitude,
        lng: result.longitude,
      }
      return location
    }
  )

export const getCurrentUserLocation = async() => {
  console.log('getUserCurrentLocation()')
  const isEnabled = isLocationServicesEnabled()
  if (!isEnabled) {
    console.log(`It cannot return the user current coordinates`)
    return
  }
  const location = await fetchCurrentUserLocation().catch(error =>
    console.log(`getCurrentLocation() error: ${error.message || error}`)
  )
  if (location) {
    console.log('fetchCurrentUserLocation()')
    console.dir(location)
    userLocation.setCurrentUserLocation(location)
    return location
  }
}

export const watchUserLocation = () => {
  // TODO: revisar sintaxis
  console.log('watchUserLocation()')
  geolocation.watchLocation(
    position => {
      const currentLocation: Coordinates = {
        lat: position.latitude,
        lng: position.longitude,
      }
      return currentLocation
    },
    (error) => {
      console.log(`failed to get location: ${error}`)
    },
    {
      desiredAccuracy: Accuracy.high,
      minimumUpdateTime: 500,
    }
  )
}

// const getCurrentUserLocation = async () => {
//   console.log('getUserCurrentLocation()')
//   isLocationServicesEnabled()
//     .then(async (isEnabled) => {
//       if (!isEnabled) {
//         return
//       }
//     })
//     .then( async () => {
//       const location = await fetchCurrentUserLocation()
//       console.log('fetchCurrentUserLocation()')
//       console.dir(location)
//       userLocation.setCurrentUserLocation(location)
//       return location
//     })
//     .catch((e) => console.log(`getCurrentLocation() error: ${e.message || e}`))
// }
