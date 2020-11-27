/**
 * @description 注册全局组件
 * @param {*} Vue Vue 构造函数
 * @param {*} requireGlobalComponent webpack require 函数
 * @example registerGlobalComponent(Vue, require.context('./components', false, /\.vue$/))
 */
export function registerGlobalComponent(Vue, requireGlobalComponent) {
  const components = transformComponentFiles(requireGlobalComponent)

  components.forEach(component => {
    const { name } = component
    Vue.component(name, component)
  })
}

/**
 * @description 注册本地组件
 * @param {*} requireLocalComponent webpack require 函数
 * @example const components = registerLocalComponent(require.context('./components', false, /\.vue$/))
 */
export function registerLocalComponent(requireLocalComponent) {
  const localComponents = {}
  const components = transformComponentFiles(requireLocalComponent)

  components.forEach(item => {
    localComponents[item.name] = item
  })

  return localComponents
}

function transformComponentFiles(files) {
  return files
    .keys()
    .map(key => files(key).default)
    .filter(item => item.name)
}
