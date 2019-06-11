const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const configuration = require('./webpack.config');

module.exports = Object.assign({}, configuration, {
  mode: 'production',
   module: {
    rules: [
          {
                test: /\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: false
                    },
                },
                'css-loader',
                ],
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
  plugins: [
    new CopyWebpackPlugin([{ from: 'public' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
});