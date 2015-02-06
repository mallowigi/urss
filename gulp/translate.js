/**
 * Created by eliorb on 29/08/2014.
 */
var path = require('path'),
run = require('run-sequence');

module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  gulp.task('extract:strings', 'Extract strings from the application', function () {
    return gulp.src(['index.html', '404.html', src.templates, src.scripts], {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      // Extract strings into the templatePo file
      .pipe($.angularGettext.extract(options.templatePo))
      // Write it in the translations dir
      .pipe(gulp.dest(src.translationsDir, {cwd: src.cwd}));
  });

  gulp.task('compile:trans', 'Compile .pot files in translations.js', function () {
    return gulp.src(src.pot, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      // Compile pot files in js format under the module specified
      .pipe($.angularGettext.compile({module: options.module}))
      // Append all languages into one file
      .pipe($.concat(options.translationsFile))
      // Write it in the config directory
      .pipe(gulp.dest(path.join(src.scriptsDir, 'config'), {cwd: src.cwd}));
  });

  gulp.task('translate', 'Extract and compile translations', function () {
    return run(['extract:strings', 'compile:trans'])
  });
};
