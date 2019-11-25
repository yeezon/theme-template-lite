
import store from '../store'
import oSetting from '../../public/configs/settings_data.json'

async function initConfig () {
  // Configs
  // 缺省图跟着主题走
  // JSSDK 自举 - window.document.currentScript

  window.productImage = '53f649ffe2931e0b91000007/noimage.png'
  window.vendorImage = '578fc93402282e4f18000003/noimage.png'
  window.iconImage = '57acb51702282e3f00000003/noimage.ico'
  window.shareImage = '57acb53a02282e3f00000007/noimage.png'
  window.assetPath = '//asset.ibanquan.com/image/'
  window.postImage = '581a3b0402282e2bcc000003/s.png'
  window.captchaPath = '//captcha.ibanquan.com'
  window.ajaxToken = ''
}

async function initSetting () {
  if (process.env.NODE_ENV !== 'production') {
    window.$$setting = oSetting.current
  }

  // 优先拿后端渲染的数据
  if (window.$$setting) {
    return new window.Promise((resolve, reject) => {
      store.dispatch('setSetting', {
        setting: window.$$setting
      })

      resolve()
    })
  } else {
    return store.dispatch('getSetting')
  }
}

// Shop 数据
async function initSite () {
  // 优先拿后端渲染的数据
  if (window.$$site) {
    return new window.Promise((resolve, reject) => {
      store.dispatch('setSite', window.$$site)

      resolve()
    })
  } else {
    return store.dispatch('getSite')
  }
}

async function init () {
  initConfig()

  return window.Promise.all([initSetting(), initSite()])
}

export default init
