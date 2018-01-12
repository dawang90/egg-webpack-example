'use strict';

const path = require('path');
const fs = require('fs');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515722954274_1100';

  // add your config here
  config.middleware = [ 'errorHandler']

  // config.notfound = {
  //   pageUrl: '/error',
  // }

  // config.onerror = {
  //   // 线上页面发生异常时，重定向到这个页面上
  //   errorPageUrl: '/error',
  // }

  config.siteFile = {
    '/favicon.ico': null //fs.readFileSync(path.join(appInfo.baseDir, 'favicon.ico')),
  };

  config.version = new Date().getTime();

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public')
  };

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1'
    }
  }

  return config;
};
