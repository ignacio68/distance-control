import { SecureStorage } from 'nativescript-secure-storage'

let storage = new SecureStorage()

export const setStorage = (key: string, value: any): any => {
  storage
    .set({
      key: key,
      value: value,
    })
    .then((success) => {
      console.log(`Successfully set a value? + ${success}`)
      return success
    }), (error) => {
      console.log(`setStorage error: ${error}`);
    }
}

export const getStorage = (key: string): any => {
  storage
    .get({
      key: key,
    })
    .then((value) => value), (error) => {
      console.log(`getStorage error: ${error}`);
    }
}

export const removeStorage = (key: string): any => {
  storage
    .remove({
      key: key,
    })
    .then((success) => {
      console.log(`Successfully removed a value? + ${success}`)
      return success
    }), (error) => {
      console.log(`removeStorage error: ${error}`);
    }
}

export const removeAll = (): any => {
  storage.removeAll().then((success) => {
    console.log(`Successfully removed a values? + ${success}`)
    return success
  }), (error) => {
    console.log(`removeAllStorage error: ${error}`);
  }
}
