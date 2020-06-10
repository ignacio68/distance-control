import { SecureStorage } from 'nativescript-secure-storage'

let storage = new SecureStorage()

export const setStorage = (key: string, value: object) => {
  const set = storage
    .set({
      key: key,
      value: JSON.stringify(value),
    })
    .then((success) => {
      console.log(`Successfully set a value? + ${success}`)
      return success
    })
  return set
}

export const getStorage = (key: string): any => {
  const get = storage
    .get({
      key: key,
    })
    .then((value) => JSON.parse(value))
  return get
}

export const removeStorage = (key: string): any => {
  const remove = storage
    .remove({
      key: key,
    })
    .then((success) => {
      console.log(`Successfully removed a value? + ${success}`)
      return success
    })
  return remove
}

export const removeAllStorage = (): any => {
  const removeAll = storage.removeAll().then((success) => {
    console.log(`Successfully removed a values? + ${success}`)
    return success
  })
  return removeAll
}
