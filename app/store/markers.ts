import Vue from 'Vue'

const state = Vue.observable({
    markers: [],
})

const find = (id: string): string => state.markers.find(marker => marker.id = id)

export const getMarker = (id: string): string => find(id)
export const setNewMarker = (marker) => state.markers.push(marker)
export const deleteMarker = (id: string) => {
    // TODO: deploy the code
    const marker = find(id)
}

// export default {
//     getMarker,
//     setNewMarker,
//     deleteMarker
// }