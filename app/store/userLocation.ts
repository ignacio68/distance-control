import Vue from 'Vue'
import { UserLocation } from './types'

export const state = Vue.observable({
    userLocation: {
        lat: 0,
        lng: 0
    },
    userCurrentLocation: {
        lat: 0,
        lng: 0
    },
    isSecurityArea: false
})

export const getOriginLocation = () => { 
    const originLocation = {
        lat: String(state.userLocation.lat),
        lng: String(state.userLocation.lng)
    }
    return originLocation
}
export const getUserLocation = () => state.userLocation
export const getUserCurrentLocation = () => state.userCurrentLocation
export const getIsSecurityArea = () => state.isSecurityArea

export const setUserLocation = (coordinates: UserLocation) => {
    // Object.assign({state}, coordinates) // TODO: Change coordinates name to userLocation
    state.userLocation.lat = coordinates.lat
    state.userLocation.lng = coordinates.lng
}
export const setUserCurrentLocation = (coordinates: UserLocation) => state.userCurrentLocation = coordinates
export const setIsSecurityArea = !state.isSecurityArea

export default {
    state,
    getOriginLocation,
    getUserLocation,
    getUserCurrentLocation,
    getIsSecurityArea,
    setUserLocation,
    setUserCurrentLocation,
    setIsSecurityArea
}
