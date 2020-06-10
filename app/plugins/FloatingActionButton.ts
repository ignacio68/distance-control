// Floating action button
import Vue from 'vue'

const v = <any>Vue

v.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
)
