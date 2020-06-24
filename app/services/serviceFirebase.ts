const firebase = require("nativescript-plugin-firebase")
const firebaseWebApi = require("nativescript-plugin-firebase/app")

import { User } from 'nativescript-plugin-firebase'

import { firebaseConst } from '@/setup/firebase'

const FAKE_PHONE_NUMBER = "+34786720676"
const myAppVerifier = "Por favor, introduce el código de verificación que te hemos enviado por SMS"

export const doLogin = async (phoneNumber: string = FAKE_PHONE_NUMBER, appVerifier: string = myAppVerifier) => {
  console.log(`doLogin service: ${phoneNumber}`)
  const userData: User = await firebase.login({
    type: firebase.LoginType.PHONE,
    phoneOptions: {
      phoneNumber: phoneNumber,
      verificationPrompt: appVerifier, // default: "Enter the received verification code"
      // Optional
      android: {
          timeout: 60 // TODO: Insertar una cuenta atrás en el mensaje
      }
    }
  }).then(result => {
    console.log(`result: ${JSON.stringify(result)}`)
    const userData = result
    return userData
  },
    errorMessage => {
      console.log(`firebase.doLogin errorMessage: ${errorMessage}`)
      // TODO: devuelve el mensaje y true
    }
  )
  return userData
}

export const doInit = () => {
  firebase
    .init({
      persist: true,
      onAuthStateChanged: data => {
        console.log(JSON.stringify(data))
        return data
      }
    })
    .then(data => {
        console.log('firebase.init done')
        return data.phoneNumber
      },
      errorMessage => {
        console.log(`firebase.init errorMessage: ${errorMessage}`)
        return errorMessage
      })
}

/**
 *  Get current user
 * */
export const doGetCurrentUser = () => {
  firebase
    .getCurrentUser()
    .then(userData => {
      const userPhoneNumber = userData.phoneNumber
      console.log(`El user es ${userPhoneNumber}`)
      return userPhoneNumber
    },
      errorMessage => {
      console.log(`Error doGetCurrentUse: ${errorMessage}`)
      return errorMessage
    })
}

 /**
  * Delete user
  */
export const doDeleteUser = () => {
  firebase.deleteUser()
    .then(() => console.log(`User deleted`),
      errorMessage => {
      console.log(`Error doDeleteUser: ${errorMessage}`)
      return errorMessage
    })
}

/**
 * Delete user
 */
export const doLogout = () => {
  firebase.logout()
    .then(() => {
      const userPhoneNumber = null
      return userPhoneNumber
    }
    ,errorMessage => {
      console.log(`Error doLogout: ${errorMessage}`)
      return errorMessage
    })
}

/**
 * On Error
 */
export const onError = () => {
  console.log('Te has equivocado')
}