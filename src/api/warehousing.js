// import moment from 'moment'
// import axiosClass from 'axios'
import axios from '@/utils/axios'
// import { service } from '@/config'

export function getwarehousingList() {
  return axios.post('goodsRecord/list', {
    // mobile: telephone,
    // scene: type
  })
}
