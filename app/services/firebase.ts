const firebase = require("nativescript-plugin-firebase")
import { PHONE_NUMBER } from '@/setup/firebase'

export const login = () => {
  firebase.login({
    type: firebase.LoginType.PHONE,
    phoneOptions: {
      phoneNumber: PHONE_NUMBER,
      verificationPrompt: "The received verification code", // default "Verification code"
      // Optional
      android: {
          timeout: 30 // The maximum amount of time you are willing to wait for SMS auto-retrieval to be completed by the library
      }
    }
  }).then(
      function (result) {
        JSON.stringify(result);
      },
      function (errorMessage) {
        console.log(errorMessage);
      }
  )
}
