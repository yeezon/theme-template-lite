
const ASSETS_URL = (((((window.document.currentScript || {}).src || '').match(/(.+\/)[^/]+\.js/) || [])[1]) || '').replace(/js\/$/, '') || '/'
const EPOCH = (((window.document.currentScript || {}).src || '').match(/v=([0-9_]+)/) || [])[1] || ''

function assetURL (asset) {
  let _assetURL = asset || ''

  if ((/^\/[^/]/.test(asset))) {
    if (process.env.NODE_ENV === 'production') {
      _assetURL = ASSETS_URL + (asset.match(/\/([^/]*)$/) || [])[1] || ''
    }

    _assetURL += `?v=${EPOCH}`
  }

  return _assetURL
}

export default assetURL
