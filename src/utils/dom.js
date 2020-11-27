function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function hasClass(el, cls) {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') > -1) {
    throw new Error('className should not contain space.')
  }
  return el.classList ? el.classList.contains(cls) : ` ${el.className} `.indexOf(` ${cls} `) > -1
}

export function addClass(el, cls) {
  if (!el || !cls) {
    return
  }
  const classes = cls.split(' ')
  let currentClass = el.className
  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }
    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      currentClass += ` ${clsName}`
    }
  }
  // Compatible with ie 9
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility
  !el.classList && (el.className = currentClass)
}

export function removeClass(el, cls) {
  if (!el || !cls) {
    return
  }
  const classes = cls.split(' ')
  let currentClass = ` ${el.className} `
  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }
    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      currentClass = currentClass.replace(` ${clsName} `, ' ')
    }
  }
  // Compatible with ie 9
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility
  !el.classList && (el.className = trim(currentClass))
}

export function on(el, event, handler) {
  if (el && event && handler) {
    el.addEventListener(event, handler, false)
  }
}

export function off(el, event, handler) {
  if (el && event && handler) {
    el.removeEventListener(event, handler)
  }
}
