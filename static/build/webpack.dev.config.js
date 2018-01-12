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
      host: 'sw.c5game.cn',
      proxy: {
        target: 'sw.c5game.cn',
        // ws: true
      },
      // browser: "google chrome"
    }),
  ],
});
