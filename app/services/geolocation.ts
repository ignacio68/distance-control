import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'

const enableLocationRequest = (option: boolean) =>
  geolocation.enableLocationRequest(option).then(() => {
    console.log('enableLocationRequest(')
    console.log('Enable location request')
  })

const isLocationServicesEnabled = () =>
  geolocation.isEnabled().then((isEnabled) => {
    console.log('isLocationServicesEnabled')
    if (!isEnabled) {
      enableLocationRequest(true)
    }
    console.log('The location service is enabled')
    return isEnabled
  })

const getUserCurrentLocation = () => {
  console.log('getUserCurrentLocation()')
  const isEnabled = isLocationServicesEnabled()
  if (isEnabled) {
    console.log(`Is enabled? ${isEnabled}`)
    geolocation
      .getCurrentLocation({ desiredAccuracy: Accuracy.high })
      .then((result) => {
        console.log(`las coordenadas son 
                longitud: ${result.longitude}
                latitud:  ${result.latitude}`)
        //   const result = {
        //     latitude: '40.4165001',
        //     longitude: '-3.7025599'
        //     }
        return result
      })
      .catch((error) =>
        console.log(`getUserCurrentLocation error: ${error.message || error}`)
      )
  } else {
    console.log(`Is enabled? ${isEnabled}`)
  }

  // .catch((error) =>
  //   console.log(`getUserCurrentLocation error: ${error.message || error}`)
  // )
}
// const getUserCurrentLocation = () =>{
//   console.log('getUserCurrentLocation()')
//   isLocationServicesEnabled()
//       .then((isEnabled) => {
//           if (isEnabled) {
//               console.log(`Is enabled? ${isEnabled}`)
//             //   geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high }).then((result) => {
//             //       console.log(`las coordenadas son
//             //         longitud: ${result.longitude}
//             //         latitud:  ${result.latitude}`)
//               const result = {
//                 latitude: '40.4165001',
//                 longitude: '-3.7025599'
//                 }
//             return result
//             //   })
//           } else {
//             console.log(`Is enabled? ${isEnabled}`)
//             //   isLocationServicesEnabled()
//           }
//     })
//     // geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high }).then((result) => {
//     //     console.log('getCurrentLocation(')
//     //     console.log(`las coordenadas son: ${result}`)
//     //     console.log(`las coordenadas son
//     //                 longitud: ${result.longitude}
//     //                 latitud:  ${result.latitude}`)
//     //     return result
//     //   })
//     .catch((error) =>
//       console.log(`getUserCurrentLocation error: ${error.message || error}`)
//     )
// }
export { getUserCurrentLocation, isLocationServicesEnabled, enableLocationRequest }
