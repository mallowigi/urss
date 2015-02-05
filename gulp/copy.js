/**
 * Created by eliorb on 29/08/2014.
 */
var run = require('run-sequence');

module.exports = function (gulp, $, gutil, helpers, src) {
  'use strict';
  gulp.task('copy:images', 'Copy and optimize images', function () {
    return gulp.src([src.images], {cwd: src.cwd})
      // cache and set download to progressive
      //.pipe(cache(imagemin({
      //  progressive: true,
      //  interlaced: false
      //})))
      .pipe(gulp.dest('images', {cwd: src.dist}))
      .pipe($.size());
  });

  gulp.task('copy:fonts', 'Copy fonts', function () {
    return gulp.src([src.fonts], {cwd: src.cwd})
      .pipe(gulp.dest('fonts', {cwd: src.dist}))
      .pipe($.size());
  });

  gulp.task('copy:resources', 'Copy resources', function () {
    return gulp.src([src.resources], {cwd: src.cwd})
      .pipe(gulp.dest('resources', {cwd: src.dist}))
      .pipe($.size());
  });

  gulp.task('copy:other', 'Copy other resources', function () {
    return gulp.src(['favicon.ico', '404.html', 'config.json'], {cwd: src.cwd})
      .pipe(gulp.dest(src.dist))
      .pipe($.size());
  });

  gulp.task('copy', function () {
    if (gutil.env.nocopy) {
      helpers.logWarn('--nocopy option, skipping copy');
      return;
    }

    return run(
      ['copy:fonts', 'copy:images', 'copy:resources', 'copy:other']
    );
  });
};
