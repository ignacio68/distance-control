import Vue from 'vue'

const v = <any>Vue

v.registerElement('MDropdownList', () => require('nativescript-materialdropdownlist').MaterialDropdownList)
