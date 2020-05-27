import Vue from 'Vue'

const state = Vue.observable({
    isSecurityArea: false
})
export const getIsSecurityArea = () => state.isSecurityArea
export const setIsSecurityArea = () => !state.isSecurityArea

export default {
    getIsSecurityArea,
    setIsSecurityArea
}