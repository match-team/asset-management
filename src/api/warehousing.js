// import moment from 'moment'
// import axiosClass from 'axios'
import axios from '@/utils/axios'
import { service } from '@/config'

export function getwarehousingList({ searchKey, ownerCompany, current, size }) {
  return axios.get('goodsRecord/list', {
    params: {
      ...(searchKey && { searchKey }),
      ...(ownerCompany && { ownerCompany }),
      current,
      size
    }
  })
}

export function warehousingAdd(form) {
  return axios.post('goodsRecord/add', form, {
    headers: {
      'Content-Type': service.getUploadHeaderContentType()
    }
  })
}
//盘点明细
export function inventoryDetail(id) {
  return axios.get('rest/check/detail', {
    params: {
      id
    }
  })
}
