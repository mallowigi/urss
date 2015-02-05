/**
 * Created by eliorb on 29/08/2014.
 */
// Add dependency templates test before running the task
// Run karma unit tests
var run = require('run-sequence'),
karma   = require('karma').server,
path    = require('path');

module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';
  gulp.task('karma', 'Run Karma Unit tests', function () {
    // run karma for
    return karma.start({
      configFile: path.resolve('test', src.karma),
      browsers: ['PhantomJS'],
      reporters: ['progress', 'coverage'],
      singleRun: true
    }, function (code) {
      gutil.log('Karma has exited with ' + code);
      process.exit(code);
    });
  });
};
