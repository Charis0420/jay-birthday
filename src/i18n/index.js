import { createI18n } from 'vue-i18n'
import zh from './locales/zh.js'
import en from './locales/en.js'
import ko from './locales/ko.js'
import ja from './locales/ja.js'

const STORAGE_KEY = 'jay-birthday-locale'
const savedLocale = localStorage.getItem(STORAGE_KEY)

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale || 'zh',
  fallbackLocale: 'zh',
  messages: { zh, en, ko, ja },
})

export function setLocale(code) {
  i18n.global.locale.value = code
  localStorage.setItem(STORAGE_KEY, code)
}
