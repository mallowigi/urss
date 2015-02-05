/**
 * Created by eliorb on 29/08/2014.
 */
'use strict';
var chalk = require('chalk'),
    gutil = require('gulp-util');

var helpers = {};

helpers.banner = function (pkg) {
  gutil.template('/**\n' +
                 ' * <%= pkg.name %>\n' +
                 ' * @version v<%= pkg.version %> - <%= today %>\n' +
                 ' * @link <%= pkg.homepage %>\n' +
                 ' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)});
};

helpers.logTrace = function (message) {
  gutil.log(chalk.white(message));
};

helpers.logError = function (err, exit) {
  gutil.log(chalk.red(err));
  if (exit) {
    process.exit(1);
  }
};

helpers.logInfo = function (message, exit) {
  gutil.log(chalk.blue(message));
  if (exit) {
    process.exit(0);
  }
};

helpers.logWarn = function (message, exit) {
  gutil.log(chalk.yellow(message));
  if (exit) {
    gutil.beep();
    process.exit(1);
  }
};

/**
 * rename a path and add min.js
 * @param path
 */
helpers.getMinFilename = function (path) { path.extname = '.min.js'; };

/**
 * Generate the module name
 * @returns {*}
 * @param pkg
 */
helpers.getModuleName = function (pkg) {
  return pkg.name;
};

helpers.next = function next (defer) {
  return function (err) {
    if (err) {
      defer.reject(err);
    }
    else {
      defer.resolve();
    }
  };
};

module.exports = helpers;
