import PlatformLayout from '@/views/home/index'
import Scarp from '@/views/scrap/index'
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
  }
]
