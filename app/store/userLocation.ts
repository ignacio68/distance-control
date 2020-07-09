import Vue from 'Vue'
import { InitialCoordinates, Coordinates} from '@/utils/types'

const state = Vue.observable({
    currentUserLocation: {
        lat: 0,
        lng: 0
    }
})

export const getOriginLocation = (): InitialCoordinates => { 
    const originLocation: InitialCoordinates = {
        lat: String(state.currentUserLocation.lat),
        lng: String(state.currentUserLocation.lng)
    }
    return originLocation
}
export const getCurrentUserLocation = () => state.currentUserLocation

export const setCurrentUserLocation = (coordinates: Coordinates) => {
    // state.currentUserLocation = coordinates
    state.currentUserLocation.lat = coordinates.lat
    state.currentUserLocation.lng = coordinates.lng
}

export default {
    getOriginLocation,
    getCurrentUserLocation,
    setCurrentUserLocation,
}
