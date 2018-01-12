'use strict';
const merge = require('webpack-merge');
const webpack = require('webpack');
// 浏览器自动刷新;
const baseWebpackConfig = require('./webpack.base.config');
const BroserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  resolve: {
    alias: {
      config: process.cwd() + '/static/assets/js/common/config.local.js',
    },
  },
  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new BroserSyncPlugin({
      open: 'external',
      host: '127.0.0.1',
      proxy: {
        target: '127.0.0.1:7001',
        // ws: true
      },
      // browser: "google chrome"
    }),
  ],
});
