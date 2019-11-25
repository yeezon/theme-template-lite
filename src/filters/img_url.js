
const THEME_ASSETS_URL = (((((window.document.currentScript || {}).src || '').match(/(.+\/)[^/]+\.js/) || [])[1]) || '').replace(/js\/$/, '') || '/'
const THEME_EPOCH = (((window.document.currentScript || {}).src || '').match(/v=([0-9_]+)/) || [])[1] || ''

const CDN_URL = '//asset.ibanquan.com'

const defImgPath = '/common/img/default_image.png'
const assetPath = '/image/'

// 改成 import JSSDK
function getImageURL (imgID, imgName, imgSize, imgEpoch) {
  if (!imgID || !imgName) {
    // 后面加上 imgSize 支持
    return CDN_URL + defImgPath
  }

  let sURL = `${CDN_URL}${assetPath}${imgID}/`

  let sFileName = imgName
  if (imgSize) {
    const aSplit = imgName.split('.')

    const nLen = aSplit.length

    if (nLen > 1) {
      const sImgSize = 's_' + imgSize
      const sFileExtName = aSplit.pop()

      sFileName = sImgSize + '.' + sFileExtName
    } else {
      // 文件没有后缀名
    }
  }

  sURL = sURL + sFileName

  if (imgEpoch) {
    sURL = sURL + '?v=' + imgEpoch
  }

  return sURL
}

function imgURL (img, size = '') {
  // size 为 '' 即为原尺寸

  // 根据屏幕自动优化大小，暂时最大二倍，后面根据网络环境再判断
  const nDevicePixelRatio = (window.devicePixelRatio % 3) || 2
  let [width, height] = size.split('x')

  width = nDevicePixelRatio * Number(width || 0)
  height = nDevicePixelRatio * Number(height || 0)

  if (width && height) {
    size = `${width}x${height}`
  }

  let _imgURL = ''

  if (typeof img === 'object') {
    _imgURL = getImageURL(img.image_id, img.image_name, size, img.image_epoch)
  } else if ((/^\/[^/]/.test(img))) {
    // 处理主题自身图片
    if (process.env.NODE_ENV === 'production') {
      const _imgName = img.match(/\/([^./]+\.[^/]+$)/)[1] || ''

      _imgURL = THEME_ASSETS_URL + _imgName.replace(/\.[^.]+$/, '')
    } else {
      _imgURL = THEME_ASSETS_URL + img.replace(/^\//, '')
    }

    _imgURL += `?v=${THEME_EPOCH}`
  } else {
    const imgID = (img.match(/\/image\/([^/]*)/) || [null, img])[1] || ''
    const imgEpoch = (img.match(/v=([\d]*)/) || [])[1] || ''

    _imgURL = getImageURL(imgID, 's.png', size, imgEpoch)
  }

  return _imgURL
}

export default imgURL
