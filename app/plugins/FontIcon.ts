// FontIcon
import Vue from 'vue'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'

const v = <any>Vue

TNSFontIcon.debug = false
TNSFontIcon.paths = {
  fa: './assets/styles/css/font-awesome/fontawesome.min.css',
  far: './assets/styles/css/font-awesome/regular.min.css',
  fas: './assets/styles/css/font-awesome/solid.min.css',
  fab: './assets/styles/css/font-awesome/brands.min.css'
}
TNSFontIcon.loadCss()
v.filter('fonticon', fonticon)
