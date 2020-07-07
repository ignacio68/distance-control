import { android, AndroidApplication } from '@nativescript/core/application'
import { isAndroid } from '@nativescript/core/platform'

export const onBackEvent = (customEvent: () => void) => {
  if (!isAndroid) return
  android.on(AndroidApplication.activityBackPressedEvent, customEvent)
}

export const clearBackEvent = (customEvent: () => void) => {
  if (!isAndroid) return
  android.off(AndroidApplication.activityBackPressedEvent, customEvent)
}
