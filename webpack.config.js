const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'umd'
  },

  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块，
  // 这些模块使用外部的，不能被打包进输出的代码里，防止它们出现多次。
  externals: /^(jquery|swiper|babel-runtime)/,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist')
  ],

  devtool: 'source-map',
}
