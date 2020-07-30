import * as geolocation from 'nativescript-geolocation'
import http from '@nativescript/core/http'
import { Accuracy } from 'tns-core-modules/ui/enums'
import { Coordinates } from '@/utils/types'
import { mapToken } from '@/setup/map'
import userLocation from '@/store/userLocation'

export const enableLocationRequest = (option: boolean) =>
  geolocation.enableLocationRequest(option).then(() => {
    console.log('enableLocationRequest()')
  })

export const isLocationServicesEnabled = () =>
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

// const observableModule = require("data/observable");
// var ObservableArray = require("data/observable-array").ObservableArray;
// const map_token = mapToken

// const SearchViewModel = (): [any] => {
//     var viewModel = new ObservableArray([]);
//     viewModel.search = function(text) {
//         let userLoc;
//         //remove spaces
//         let a = text.replace(/\s+/g, "%20");
//         return geolocation.getCurrentLocation({
//             desiredAccuracy: 3,
//             updateDistance: 10,
//             maximumAge: 20000,
//             timeout: 20000 })
//         .then((loc) => {
//             if (loc) {
//                 userLoc = `&proximity=${JSON.stringify(loc.longitude)},${JSON.stringify(loc.latitude)}`;
//             }else{userLoc="";}
//             console.log(userLoc);
//           http.getJSON("https://api.mapbox.com/geocoding/v5/mapbox.places/" + a + ".json?" + userLoc + "&types=poi,address,neighborhood,place&access_token=" + map_token)
//             .then(function (r) {
//             // Argument (r) is JSON!
//             viewModel.set("feature",r.features);
//             }, function (e) {
//             // Argument (e) is Error!
//             console.log('error');
//             console.log(e);
//             });
//         })
//     }
// return viewModel;
// }

export const searchLocation = async (text: string) => {
  //remove spaces
  const cleanText = text.replace(/\s+/g, "%20")

  let userLocation: string

  const result: Coordinates = await fetchCurrentUserLocation()
  if (result) {
    userLocation = `&proximity=${result.lng},${result.lat}`
  } else {
    userLocation = ""
  }
  const location = http.getJSON("https://api.mapbox.com/geocoding/v5/mapbox.places/" + cleanText + ".json?" + userLocation + "&types=poi,address,neighborhood,place&access_token=" + mapToken)
    .then(response => {
      console.log(`Location: ${JSON.stringify(location)}`)
      return response
    }, error => console.log(`location error: ${error}`))

  return location
}
