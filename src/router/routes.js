import platform from './platform'
import bill from './bill'
import give from './give'
import back from './back'
import login from './login'
import scrap from './scrap'

export default [
  {
    path: '/',
    redirect: '/platform'
  },

  ...platform,
  ...bill,
  ...give,
  ...back,
  ...login,
  ...scrap,
]
