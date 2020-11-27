import Cookie from 'js-cookie'
import { token } from '../config'

const { key, expires } = token

export function getToken() {
  return Cookie.get(key)
}

export function setToken(token) {
  Cookie.set(key, token, { expires })
}

export function removeToken() {
  Cookie.remove(key)
}
