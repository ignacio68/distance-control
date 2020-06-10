// Side Drawer
import Vue from 'vue'

const v = <any>Vue

v.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)
