import * as geolocation from 'nativescript-geolocation'
import {
  isLocationServicesEnabled,
  enableLocationRequest,
  getUserCurrentLocation,
} from '@/services/geolocation'

// eslint-disable-next-line no-undef
QUnit.test('Enable Location Service', (assert) => {

  assert.equal(isLocationServicesEnabled(true), true, 'Location services enabled is true')
})
