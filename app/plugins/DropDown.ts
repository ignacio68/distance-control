// Dropdown Menu
import Vue from 'vue'

const v = <any>Vue

v.registerElement(
  'DropDown',
  () => require('nativescript-drop-down').DropDown
)