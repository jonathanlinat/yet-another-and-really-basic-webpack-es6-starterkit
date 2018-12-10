const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, options) => {
  const isProductionMode = (options.mode === 'production')

  const src = path.resolve('./src')
  const dist = path.resolve('./dist')

  let webpackConfig = {
    entry: {
      app: [
        'babel-polyfill',
        src + '/app.js',
        src + '/app.sass',
        src + '/index.html'
      ]
    },
    devServer: {
      host: '127.0.0.1',
      open: true,
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin([dist]),
      new MiniCssExtractPlugin(),
      new HtmlWebPackPlugin({
        template: src + '/index.html'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false
            }
          }
        },
        {
          test: /\.sass$/,
          use: [
            isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        }
      ]
    },
    optimization: {
      minimize: isProductionMode,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin(),
        new HtmlWebPackPlugin({
          template: src + '/index.html',
          hash: true,
          cache: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            decodeEntities: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            useShortDoctype: true
          }
        })
      ]
    }
  }

  return webpackConfig
}
