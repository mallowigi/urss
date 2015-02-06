/* jshint camelcase:false */
'use strict';

var gulp    = require('gulp'),
    run     = require('run-sequence'),
    gutil   = require('gulp-util'),
    helpers = require('./gulp/helpers'),
    _       = require('lodash');
// Gulp load plugins
var $ = require('gulp-load-plugins')();

var pkg = require('./package.json');

// Global paths
var src = {
  cwd: 'app',
  dist: 'dist',
  main: 'scripts/**/*app.js',
  stylesDir: 'styles',
  scriptsDir: 'scripts',
  cssDir: 'app/styles/css',
  bowerDir: 'app/bower_components',
  translationsDir: 'translations',
  testDir: 'test',
  tmp: 'app/.tmp',
  images: 'images/**/*.{png,jpg,gif,ico}',
  fonts: 'fonts/**/*.{eof,woff,ttf,svg,css}',
  resources: 'resources/**/*.{json, tml, txt}',
  scripts: 'scripts/**/*.js',
  modules: 'scripts/**/*[mM]odule.js',
  tpls: 'scripts/**/*.tpl.js',
  env: 'scripts/config/env/',
  envFiles: '**/env_*.js',
  index: 'index.html',
  sass: 'styles/**/*.scss',
  css: 'styles/**/*.css',
  coffee: '**/*.coffee',
  templates: 'views/**/*.html',
  pot: 'translations/*.po',
  test: {
    tmp: 'test/.tmp',
    coverage: 'test/coverage'
  },
  karma: 'karma.conf.js'

};

// Gulp options, reading from package.json
var options = _.extend(pkg, {
  port: 9090,
  autoprefix: 'last 1 version',
  module: 'urssApp',
  templateModule: 'urss.views',
  templatePo: 'template.pot',
  translationsFile: 'translations.js',
  context: {
    ENV: gutil.env.env || 'dev',
    DEBUG: gutil.env.debug || false
  }
});

// ADD HELP
require('gulp-help')(gulp);

// CLEAN
require('./gulp/clean')(gulp, $, gutil, helpers, src, options);

// CONNECT
require('./gulp/watch')(gulp, $, gutil, helpers, src, options);

// JAVASCRIPTS
require('./gulp/javascripts')(gulp, $, gutil, helpers, src, options);

// TEMPLATES
require('./gulp/templates')(gulp, $, gutil, helpers, src, options);

// STYLES
require('./gulp/styles')(gulp, $, gutil, helpers, src, options);

// VIEWS
require('./gulp/usemin')(gulp, $, gutil, helpers, src, options);

// INSTALL
require('./gulp/install')(gulp, $, gutil, helpers, src, options);

// inject bower components
require('./gulp/bower')(gulp, $, gutil, helpers, src, options);

// INJECT SOURCES
require('./gulp/inject')(gulp, $, gutil, helpers, src, options);

// JSHINT
require('./gulp/jshint')(gulp, $, gutil, helpers, src, options);

// CHANGELOG
require('./gulp/changelog')(gulp, $, gutil, helpers, src, options);

// COPY
require('./gulp/copy')(gulp, $, gutil, helpers, src, options);

// TRANSLATIONS
require('./gulp/translate')(gulp, $, gutil, helpers, src, options);

// KARMA
require('./gulp/karma')(gulp, $, gutil, helpers, src, options);

// ***************************************
// TASKS
// ***************************************

gulp.task('dev-build', function () {
  run(
    ['sass', 'js', 'templates', 'resources']
  );
});

gulp.task('build', 'Create the distribution', function () {
  run(
    'clean',
    ['sass', 'js', 'templates', 'resources'],
    ['bower', 'inject:dist'],
    ['usemin', 'copy']
  );
});

gulp.task('serve', 'Serve the app and watch for changes', function () {
  run(
    'clean',
    ['bowerinstall', 'npminstall'],
    ['sass', 'js', 'templates', 'resources'],
    ['bower', 'inject:dist'],
    'connect',
    'watch', 'open'
  );
});

gulp.task('lint', 'Lint code', function () {
  run(
    'jshint',
    'jscs'
  );
});

gulp.task('test', 'Compile and run unit tests', function () {
  run(
    'clean:test',
    ['bower:karma', 'inject:karma'],
    'karma'
  );
});
// Default tasks
gulp.task('default', 'Run serve', ['serve']);
