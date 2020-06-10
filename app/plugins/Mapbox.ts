// MapBox
import Vue from 'vue'

const v = <any>Vue

v.registerElement('Mapbox', () => require('nativescript-mapbox').MapboxView)
