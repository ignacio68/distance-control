import { doLogin, onError } from '@/services/serviceFirebase'
import { setStorage, getStorage } from '@/services/serviceStorage'
import { User } from '@/utils/types'
import { userInfo } from 'os'

export const userLogin = async(phoneNumber: string) => {
  await doLogin(phoneNumber).then(async (userData) => {
    if (!userData) {
      onError()
      return
    }
    const user: User = {
      id: userData.phoneNumber,
      phoneNumber: userData.phoneNumber
    }
    await setStorage(user.id, user)
    console.log(`Phone login OK: ${JSON.stringify(user)}`)
  })
}
