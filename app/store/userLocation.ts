import Vue from 'Vue'
import { Coordinates } from '@/utils/types'

const state = Vue.observable({
    currentUserLocation: {
        lat: 0,
        lng: 0
    }
})

export const getOriginLocation = () => { 
    const originLocation = {
        lat: String(state.currentUserLocation.lat),
        lng: String(state.currentUserLocation.lng)
    }
    return originLocation
}
export const getCurrentUserLocation = () => state.currentUserLocation


// export const setUserLocation = (coordinates: UserLocation) => {
//     // Object.assign({state}, coordinates) // TODO: Change coordinates name to userLocation
//     state.userLocation.lat = coordinates.lat
//     state.userLocation.lng = coordinates.lng
// }
export const setCurrentUserLocation = (coordinates: Coordinates) => state.currentUserLocation = coordinates


export default {
    getOriginLocation,
    getCurrentUserLocation,
    setCurrentUserLocation,
}
