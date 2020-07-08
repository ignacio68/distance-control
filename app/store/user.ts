import Vue from 'Vue'

const state = Vue.observable({
  user: {
    phoneNumber: '',
    isLogged: false
  }
})

const updateUser = (args) => { }

export const getUser = state.user

export const setUser = (args) => updateUser(args)
