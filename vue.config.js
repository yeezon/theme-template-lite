
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const ProxyURL = 'https://theme-template-lite.wodavip.com' // https://theme-template-lite.wodavip.com

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: ProxyURL,
        ws: false,
        changeOrigin: true,
        headers: {
          referer: ProxyURL,
          origin: ProxyURL
        }
      }
    }
  },

  configureWebpack: config => {
    config.output.filename = '[name].raw.js'
    config.output.chunkFilename = '[id]-[chunkhash].raw.js'
  },

  chainWebpack: config => {
    // ESLint
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.fix = true // Auto Fix
        return options
      })
      .end()

    // Docs Block
    // 后面加上输出原始文本
    // ExtractTextPlugin.extract('raw-loader') & new ExtractTextPlugin('docs.md')
    config.module
      .rule('docs')
      .resourceQuery(/blockType=docs/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()

    // Shop UI SVG Sprite
    config.module
      .rule('shop-ui-svg')
      .test(/\.svg$/)
      .include
      .add(resolve('src/shop-ui/icons'))
      .end()
      .use('file-loader') // 修改原 SVG Rule 的
      .loader('svg-sprite-loader')
      .tap(options => {
        const _options = options || {}

        delete _options.name
        _options.symbolId = 'su-icon-[name]'

        return _options
      })
      .end()

    // Shop Kit SVG Sprite
    config.module
      .rule('shop-kit-svg')
      .test(/\.svg$/)
      .include
      .add(resolve('src/shop-kit/icons'))
      .end()
      .use('file-loader') // 修改原 svg Rule 的
      .loader('svg-sprite-loader')
      .tap(options => {
        const _options = options || {}

        delete _options.name
        _options.symbolId = 'sk-icon-[name]'

        return _options
      })
      .end()

    // SVG Sprite
    const iconsDir = resolve('src/icons')
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include
      .add(iconsDir)
      .end()
      .use('file-loader') // 修改原 svg Rule 的
      .loader('svg-sprite-loader')
      .tap(options => {
        const _options = options || {}

        delete _options.name

        _options.symbolId = filePath => {
          const oPath = path.parse(filePath)
          const dirs = oPath.dir.replace(iconsDir).split(path.sep)
          const prefix = dirs.slice(2).join('-') // 只获取 svg 的子目录
          return `icon-${prefix ? (prefix + '-') : ''}${oPath.name}`
        }

        return _options
      })
      .end()

    // Delete Plugins
    // config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },

  filenameHashing: false,
  productionSourceMap: false,

  css: {
    extract: !(process.env.NODE_ENV === 'production') ? false : {
      filename: '[name].raw.css',
      chunkFilename: '[id]-[chunkhash].raw.css'
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
