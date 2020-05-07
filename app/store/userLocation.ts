import Vue from 'Vue'
import { UserLocation } from './types'

export const state = Vue.observable({
    userLocation: {
        lat: '',
        lng: ''
    },
    userCurrentLocation: {
        lat: '',
        lng: ''
    }
})

export const getUserLocation = () => state.userLocation
export const getUserCurrentLocation = () => state.userCurrentLocation

export const setUserLocation = (coordinates: UserLocation) => state.userLocation = coordinates
export const setUserCurrentLocation = (coordinates: UserLocation) => state.userCurrentLocation = coordinates

export default { state, getUserLocation, getUserCurrentLocation, setUserLocation, setUserCurrentLocation }
