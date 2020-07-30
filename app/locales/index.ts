/**
 * Import Dependency
 */
import Vue from "vue"
import VueI18n from "vue-i18n"

// Internationalization
// import i18n from "@/setup/i18n"
import { device } from '@nativescript/core/platform'

import enUS from './i18n/en_US'
import esES from './i18n/es_ES'
import { numberFormats } from './i18n/numberFormats'
import { dateTimeFormats } from './i18n/dateTimeFormats'

/**
 * Config
 */
Vue.use(VueI18n)

const loadLocaleMessages = () => {
  const locales = require.context("@/locales", true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {
    en: {
      lang: enUS
    },
    es: {
      lang: esES
    }
  }
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "es",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "es",
  messages: loadLocaleMessages(),
  dateTimeFormats,
  numberFormats
})

// Get device language
export const getLanguage = (): string => {
  const val = device.language
  const lang = val.slice(0, 2)
  return lang
}

// Set app language
export const setLanguage = (): void => {
    const lang = getLanguage()
    if (lang) {
      i18n.locale = lang
      console.log("El idioma del navegador es: " + lang)
    } else {
      console.log("No se encuentra el idioma del navegador")
    }
}
