/**
 * Created by eliorb on 29/08/2014.
 */
var run = require('run-sequence');

module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';
  // livereload to dev
  gulp.task('connect', 'Connect and serve dist directory', function () {
    $.connect.server({
      root: [src.cwd],
      port: options.port,
      livereload: gutil.env.livereload || true
    });
  });

  // OPEN BROWSER

  // Open index.html onto the url provided
  gulp.task('open', 'Open a browser to the served application', function () {
    gulp.src(src.index, {cwd: src.cwd})
      .pipe($.open('', {url: 'http://localhost:' + options.port}));
  });

  // WATCH
  gulp.task('watch', 'Watch the src directory for changes', function () {
    // When any of the files change
    $.watch(src.index, {cwd: src.cwd, name: 'index'}).pipe($.connect.reload());

    // When compass files change, recompile
    $.watch(src.sass, {cwd: src.cwd, name: 'sass'}, function () {
      run(['sass']);
    });

    // When templates change
    $.watch(src.templates, {cwd: src.cwd, name: 'templates'}, function () {
      run('templates');
    });

    // When scripts change, rewrite the concat file
    $.watch(src.scripts, {cwd: src.cwd, name: 'javascripts'}, function () {
      run(['js']);
    });

    // When bower.json change, run bower to inject
    $.watch(['bower.json'], {name: 'bower'}, function () {
      run(['bower']);
    });

    $.watch(['gulp/*.js', 'gulpfile.js'], {name: 'gulp'}, function () {
      run(['dev-build']);
    });

  });

};
