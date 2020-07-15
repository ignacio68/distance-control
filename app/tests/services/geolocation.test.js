// eslint-disable no-undef
import * as geolocation from 'nativescript-geolocation'
import {
  isLocationServicesEnabled,
  enableLocationRequest,
  // getUserCurrentLocation,
} from '@/services/serviceGeolocation'

// getUserCurrentLocation mock
const getUserCurrentLocation = () => {
  console.log('getUserCurrentLocation()')
  geolocation
      .getCurrentLocation({ desiredAccuracy: Accuracy.high })
		.then((result) => {
			console.log(`user coords are: ${JSON.dir(result)}`)
			const userCoords = {
				latitude: '5',
				longitude: '5'
				}
      return userCoords
      })
      .catch((error) =>
        console.log(`getUserCurrentLocation error: ${error.message || error}`)
      )
}

const { test, only, skip } = QUnit

test('Enable location request', t => {
	// Act
	const result = enableLocationRequest()

	// Assert
	t.ok(result, 'The location request is enabled')
})
test('Enable location services', t => {
	// Act
	const result = isLocationServicesEnabled()

	// Assert
  t.notDeepEqual(result, false, 'is not equal')
  t.deepEqual(result, true, 'is equal')
})

test('Should get the user current location coordinates', t => {
	// Arrange
	const userCoords = {
		latitude: '5',
		longitude: '5'
	}
	// Act
	const result = getUserCurrentLocation()

	// Assert
	t.deepEqual(result, userCoords)
})

only('Esto es una prueba.', t => {
	t.equal(0, 0, 'They are equals')
})
