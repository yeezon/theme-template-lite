
import DateTime from './date_time'
import imgURL from './img_url'
import assetURL from './asset_url'

const date = function (date, format) {
  return DateTime(date, format)
}

const oFilters = {
  imgURL,
  assetURL,
  date
}

const install = function (Vue, options) {
  if (install.installed) return

  for (const key in oFilters) {
    const _fn = oFilters[key]

    Vue.filter(key, _fn)

    // 注册全局属性
    if (/(imgURL|assetURL)/.test(key)) {
      Vue.prototype[`$${key}`] = _fn
    }
  }

  install.installed = true
}

export default {
  install
}
