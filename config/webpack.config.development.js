const webpack = require('webpack');
const configuration = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, configuration, {
  entry: {
    main: configuration.entry.main,
  },
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Test',
    }),
  ],
  module: {
    rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=[name].[ext]',
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
          }
    ]
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    publicPath: configuration.output.publicPath,
    hot: true,
    compress: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});
