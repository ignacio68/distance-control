import Vue from 'Vue'

const state = Vue.observable({
    securityArea: []
})

const find = (id: string) => state.securityArea.find( securityArea => securityArea.id = id)
const findIndex = (id: string) => state.securityArea.findIndex( securityArea => securityArea.id = id)

export const getIsVisible = (id: string) => find(id).isVisible
export const getSecurityArea = (id: string) => {
    const securityArea = find(id)
    console.log(`security area: ${securityArea}`)
    return securityArea
}

export const setNewSecurityArea = (securityArea) => state.securityArea.push(securityArea)
export const isVisible = (id: string, value: boolean) => {
    const index = findIndex(id)
    state.securityArea[index].isVisible= value
    console.log(`Is visible ${id}? ${state.securityArea[index].isVisible}`)
}
export const removeSecurityArea = (id: string) => {
    const index = findIndex(id)
    state.securityArea.splice(index, 1)
    console.log("removed element!!")
}

export default {
    getIsVisible,
    getSecurityArea,
    setNewSecurityArea,
    isVisible,
    removeSecurityArea
}
