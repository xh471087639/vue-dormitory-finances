const webpack = require('webpack');
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  // axios: 'axios',
}

const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      // 'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    ]
  }
}

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: './',
  outputDir: 'dormitoryFinance',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8008
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('js', resolve('src/js'))
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args;
    })

    return config
  },
  configureWebpack: () => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      myConfig.externals = externals
    }
    if (process.env.NODE_ENV === 'development') {
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    myConfig.plugins=[

      new webpack.ProvidePlugin({

        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        Popper: ["popper.js", "default"]
      })

    ]

    return myConfig
  }
}

