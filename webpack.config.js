const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './app/index.js',
  module: {
    rules: [
      {test: /\.svg$/, use: 'svg-inline-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.(js)$/, use: 'babel-loader'}
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  mode: process.env.NODE_ENV === 'production'? 'production' : 'development'
}
