import PlatformLayout from '@/views/home/index'
import Inventory from '@/views/inventory/index'

import Servicing from '@/views/servicing/index'
export default [
  {
    path: '/platform',
    component: PlatformLayout,
    meta: {
      name: '资产入库'
    }
  },

  {
    path: '/inventory',
    component: Inventory,
    meta: {
      name: '盘点管理'
    }
  },

  {
    path: '/servicing',
    component: Servicing,
    meta: {
      name: '维修管理'
    }
  }
]
