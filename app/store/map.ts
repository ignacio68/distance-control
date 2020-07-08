import Vue from 'Vue'

const state = Vue.observable({
  map: null
})

export const getMap = (): void => state.map

export const setMap = (map) => state.map = map

export default {
  getMap,
  setMap
}
