import storage from 'redux-persist/lib/storage'
import session from 'redux-persist/lib/storage/session'
import lf from 'localforage'

const keyPrefix = 'vite-pwa:'
lf.config({
  name: 'vite-pwa'
})

export const localStorage = storage
export const sessionStorage = session
export const localforage = lf

export const getLocalStorageConfig = (key: string, version = '1.0') => ({
  keyPrefix,
  key,
  storage: localStorage,
})

export const getSessionStorageConfig = (key: string, version = '1.0') => ({
  keyPrefix,
  key,
  storage: sessionStorage,
})

export const getLocalforageConfig = (key: string, version = '1.0') => ({
  keyPrefix,
  key,
  storage: localforage,
})
