/**
 * @description 查找对象数组指定 key - value 的索引值
 * @param {Array} list 对象数组
 * @param {String} key 指定的对象 key
 * @param {*} value 指定需要判断的 key 对应的值
 */
export function indexOfObjectArray(list, key, value) {
  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    if (item[key] === value) {
      return index
    }
  }

  return -1
}

/**
 * @description 防抖
 * @param {Function} func
 * @param {Number} delay
 */
export function debounce(func, delay = 150) {
  let timeout

  return function() {
    clearTimeout(timeout)

    const context = this
    const args = arguments

    timeout = setTimeout(function() {
      func.apply(context, args)
    }, delay)
  }
}

/**
 * @description 节流
 * @param {Function} func
 * @param {Number} threshhold
 */
export function throttle(func, threshhold = 150) {
  let timeout
  let start = new Date()

  return function() {
    const context = this
    const args = arguments
    const current = new Date() - 0

    clearTimeout(timeout)

    if (current - start >= threshhold) {
      func.apply(context, args)
      start = current
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, threshhold)
    }
  }
}

/**
 *
 * @param {Object} originObject 需要查询 key 的对象
 * @param {Function} func 需要返回一个 Boolean 决定是否满足条件，函数参数为 key 对应的 value
 * @param {Any} fallback 如果没找到符合条件的 key，默认返回的值
 */
export function findKeyFromObject(originObject, func, fallback = '') {
  for (const key in originObject) {
    const item = originObject[key]
    if (func(item)) {
      return key
    }
  }

  return fallback
}
