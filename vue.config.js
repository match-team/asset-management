const path = require('path')
const resolveResourcesPath = relativePath => path.resolve(__dirname, relativePath)
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('base', resolve('baseConfig'))
      .set('public', resolve('public'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolveResourcesPath('./src/styles/theme.less'),
        resolveResourcesPath('./src/styles/mixins.less')
      ]
    }
  },
  devServer: {
    port: 8888,
    host: '0.0.0.0',
    https: false,
    open: true
  }
}
