import * as storage from '@/services/serviceStorage'

export const setStorage = (key: string, value: any) => storage.setStorage(key, value)

export const getStorage = (key: string) => storage.getStorage(key)

export const removeStorage = (key: string) => storage.removeStorage(key)

export const removeAllStorage = () => storage.removeAll()
