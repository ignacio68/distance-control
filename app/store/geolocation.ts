import Vue from 'Vue'
import { UserLocation } from './types'

export const state = Vue.observable({
    userLocation: {
        latitude: '',
        longitude: ''
    }
})

export const setUserLocation = (coordinates: UserLocation) => state.userLocation = coordinates

export const getUserLocation = () => state.userLocation
