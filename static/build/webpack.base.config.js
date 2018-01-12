'use strict';

const glob = require('glob');
const webpack = require('webpack');
const publicFolder = 'dist';

const srcFolder = process.cwd() + '/static/assets/';
const jsFolder = srcFolder + 'js/';

//css抽取插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin('css/[name].css');
const extractComm = new ExtractTextPlugin('css/common.css');

/**
 * 编译sass的公用函数配置
 * @param obj
 * @param test
 * @returns {{text: *, user: *}}
 */

const cssRuleComm = (obj, test) => {
  return {
    test: test,
    use: obj.extract({
      fallback: "style-loader",
      use: [{
        loader: 'css-loader',
        options: {}
      }, 'sass-loader'],
      allChunks: true
    })
  };
};

/**
 * 自动遍历入口文件夹， 生成多个入口
 */

const getEntry = () => {
  let entry = {};
  let nLength = jsFolder.length;
  let srcDirName = jsFolder + 'modules/**/*.js';
  glob.sync(srcDirName).forEach(function (name) {
    let n = name.slice(name.lastIndexOf(jsFolder) + nLength, name.length - 3);
    entry[n] = name;
  });
  return entry;
}

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  entry: getEntry(), //入口文件
  output: {
    path: process.cwd() + '/app/public/' + publicFolder, //文件打包输出地址
    filename: 'js/[name].js', //打包后输出的文件名
    publicPath: publicFolder + '/', //指定资源文件引用的目录
  },
  module: {
    rules: [{
        test: /(\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/i,
        use: extractSass.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {}
          }, 'sass-loader'],
          allChunks: true
        }),
        exclude: [
          /common.scss$/i,
        ]
      },
      {
        test: /\.(ttf|eot|svg|gif|png|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
            loader: 'file-loader',
            options: {
              publicPath: '/public/dist/',
              outputPath: 'img/'
            }
        }]
      },
      cssRuleComm(extractComm, /common.scss$/i),
    ]
  },
  externals: {
    jquery: 'window.$'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js'
    }),
    extractSass,
    extractComm,
  ]
}