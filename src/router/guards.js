
export function beforeEach (to, from, next) {
  if (/(http[s]*:\/\/|\/\/)/.test(to.fullPath)) {
    // 兼容带 Protocol 的地址
    const _url = to.fullPath.slice(to.fullPath.match(/(http[s]*:\/\/|\/\/)/).index)

    // 避免空字符串导致死循环
    if (_url) {
      window.location.href = _url
    } else {
      next()
    }
  } else {
    next()
  }
}

export default {
  beforeEach
}
