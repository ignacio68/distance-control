import Vue from 'vue'
import BottomSheetPlugin from 'nativescript-material-bottomsheet/vue' 
import ButtonPlugin from 'nativescript-material-button/vue'
import SliderPlugin from 'nativescript-material-slider/vue'
import TextFieldPlugin from 'nativescript-material-textfield/vue'

const v = <any>Vue

// Material Bottom Sheet
v.use(BottomSheetPlugin)

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