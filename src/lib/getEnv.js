
export default function () {
  const ua = window.navigator.userAgent

  const env = {
    isMobi: /mobile/i.test(ua),
    isIOS: /(iphone|ipad)/i.test(ua),
    isAndroid: /android/i.test(ua),
    isWeChat: /micromessenger/i.test(ua),
    isMiniProgram: /(miniprogram|swan)/i.test(ua) // 全平台小程序判断
  }

  env.isWeApp = env.isWeChat && env.isMiniProgram

  // 兼容微信 7.0 以下小程序 WebView UserAgent 无 miniProgram 的情况
  env.checkWeApp = function () {
    return new window.Promise((resolve, reject) => {
      if (this.isWeChat) {
        if (this.isMiniProgram) {
          resolve(true)
        } else {
          const ready = function () {
            resolve(/miniprogram/i.test(window.__wxjs_environment))
          }

          if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
            window.document.addEventListener('WeixinJSBridgeReady', ready, false)
          } else {
            ready()
          }
        }
      } else {
        resolve(false)
      }
    })
  }

  return env
}
