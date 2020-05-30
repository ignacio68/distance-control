import Vue from 'Vue'

import { PolygonOptions } from '@/utils/types'

const state = Vue.observable({
    securityArea: []
})

const find = (id: string): PolygonOptions => state.securityArea.find( securityArea => securityArea.id = id)
const findIndex = (id: string): number => state.securityArea.findIndex( securityArea => securityArea.id = id)

export const getIsVisible = (id: string): boolean => {
    const index = findIndex(id)
    const isVisible: boolean = state.securityArea[index].isVisible
    return isVisible
}
export const getSecurityArea = (id: string): PolygonOptions => {
    const securityArea = find(id)
    return securityArea
}

export const setNewSecurityArea = (securityArea: PolygonOptions) => state.securityArea.push(securityArea)
export const isVisible = (id: string, value: boolean): boolean => {
    const index = findIndex(id)
    const isVisible: boolean = state.securityArea[index].isVisible
    if (isVisible === value) {
        console.log("The visibility is the same")
        return
    }
    return isVisible
}
export const removeSecurityArea = (id: string): void => {
    const index: number = findIndex(id)
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
