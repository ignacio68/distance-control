const firebase = require("nativescript-plugin-firebase")
const firebaseWebApi = require("nativescript-plugin-firebase/app")

import { PHONE_NUMBER } from '@/setup/firebase'

const myAppVerifier = "Introduce el código que te hemos enviado por SMS"

export const doLogin = async (phoneNumber: string , appVerifier: string = myAppVerifier) => {
  firebase.login({
    type: firebase.LoginType.PHONE,
    phoneOptions: {
      phoneNumber: phoneNumber,
      verificationPrompt: appVerifier, // default "Verification code"
      // Optional
      android: {
          timeout: 30 // The maximum amount of time you are willing to wait for SMS auto-retrieval to be completed by the library
      }
    }
  }).then(result => console.log(`Phone login OK: ${JSON.stringify(result)}`),
    errorMessage => {
      console.log(`firebase.init errorMessage: ${errorMessage}`)
      return errorMessage
    })
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