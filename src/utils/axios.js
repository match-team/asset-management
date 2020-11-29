import Axios from 'axios'
import { service } from '../config'

const instance = Axios.create({
  baseURL: service.getBaseUrl(),
  headers: {
    'Content-Type': service.getJsonHeaderContentType()
  }
})
instance.defaults.withCredentials = true
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const { data } = response

    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
