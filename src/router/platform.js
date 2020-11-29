import PlatformLayout from '@/views/home/index'
import Inventory from '@/views/inventory/index'
import Scarp from '@/views/scrap/index'
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
    path: '/scrap',
    component: Scarp
  },
  {
    path: '/inventory',
    component: Inventory
  },
  {
    path: '/scrap',
    component: Scarp
  },
  {
    path: '/servicing',
    component: Servicing
  }
]
