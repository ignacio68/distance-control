import Vue from 'Vue'

const state = Vue.observable({
  user: {
    phonenumber: '',
    isLogged: false
  }
})

export const user = () => state

export default {
  user
}
