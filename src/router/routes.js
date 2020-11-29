import platform from './platform'
import bill from './bill'
import give from './give'
import back from './back'

export default [
  {
    path: '/',
    redirect: '/platform'
  },

  ...platform,
  ...bill,
  ...give,
  ...back,
]
