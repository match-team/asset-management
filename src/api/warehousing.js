// import moment from 'moment'
// import axiosClass from 'axios'
import axios from '@/utils/axios'
// import { service } from '@/config'

export function getwarehousingList({ searchKey, ownerCompany, pageNum, pageSize }) {
  return axios.get('goodsRecord/list', {
    params: {
      ...(searchKey && { searchKey }),
      ...(ownerCompany && { ownerCompany }),
      pageNum,
      pageSize
    }
  })
}

export function warehousingAdd(form) {
  return axios.post('goodsRecord/add', { ...form })
}
