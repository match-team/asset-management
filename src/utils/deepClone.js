export function deepClone(value, hash = new WeakMap()) {
  if (value == undefined) return value

  if (typeof value !== 'object') return value
  if (value instanceof RegExp) return new RegExp(value)
  if (value instanceof Date) return new Date(value)
  let v = hash.get(value)

  if (v) {
    return v
  }

  let instance = new value.constructor()

  hash.set(value, instance)

  for (let key in value) {
    // eslint-disable-next-line no-prototype-builtins
    if (value.hasOwnProperty(key)) {
      instance[key] = deepClone(value[key], hash)
    }
  }

  return instance
}
