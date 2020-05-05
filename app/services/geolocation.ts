import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import { UserLocation } from '@/store/types'
import { setUserLocation } from '@/store/geolocation'

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
  geolocation.getCurrentLocation({}).then(result => result)

const getUserCurrentLocation = async () => {
  console.log('fakeUserCurrentLocation()')
  const isEnabled = isLocationServicesEnabled()
  if (!isEnabled) {
    console.log(`It cannot return the user current coordinates`)
    return
  }
  const fetchUserLocation = await fetchCurrentUserLocation().catch(e => console.log(`getCurrentLocation() error: ${e.message || e}`))
  if (fetchUserLocation) {
    console.dir(`fetchUserLocation: ${console.log(fetchUserLocation)}`)
    const userLocation: UserLocation = {
      latitude: String(fetchUserLocation.latitude),
      longitude: String(fetchUserLocation.longitude),
    }
    setUserLocation(userLocation)
  }
}

export {
  getUserCurrentLocation,
  isLocationServicesEnabled,
}
