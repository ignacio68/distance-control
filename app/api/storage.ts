import * as storage from '@/services/serviceStorage'

export const setStorage = (id: string, values?: object) => storage.setStorage(id, values).then(success => success)

export const getStorage = (id: string) => storage.getStorage(id)

export const removeStorage = (id: string) => storage.removeStorage(id)

export const removeAllStorage = () => storage.removeAllStorage()
