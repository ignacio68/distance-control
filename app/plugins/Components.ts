import Vue from 'vue'
import BottomSheetPlugin from 'nativescript-material-bottomsheet/vue' 
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import ButtonPlugin from 'nativescript-material-button/vue'
import SliderPlugin from 'nativescript-material-slider/vue'
import TextFieldPlugin from 'nativescript-material-textfield/vue'

const v = <any>Vue

// Material Bottom Sheet
v.use(BottomSheetPlugin)

// TODO: Change to material design version
v.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
)

// //  Font Icon
// TNSFontIcon.debug = false
// TNSFontIcon.paths = {
//   fa: 'assets/styles/css/font-awesome/fontawesome.css',
//   far: 'assets/styles/css/font-awesome/regular.css',
//   fas: 'assets/styles/css/font-awesome/solid.css',
//   fab: 'assets/styles/css/font-awesome/brands.css',
//   // mdi: 'assets/styles/css/material-design/materialIcons.css',
//   mdi: 'material-design-icons.css'
// }
// TNSFontIcon.loadCss()
// v.filter('fonticon', fonticon)

// Material Button
v.use(ButtonPlugin)

// Material Slider
v.use(SliderPlugin)

// Material Text Field
v.use(TextFieldPlugin)

// Side Drawer
v.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)