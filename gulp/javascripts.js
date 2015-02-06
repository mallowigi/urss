/**
 * Created by eliorb on 29/08/2014.
 */
module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  // -------------------------------------------

  gulp.task('js', 'Compiles the app', function () {
    // Remember to not include env files
    return gulp.src([src.main, src.modules, src.scripts], {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      .pipe($.sourcemaps.init())
      .pipe($['6to5']())
      // Create file pkgname.js
      .pipe($.concat(options.name + '.min.js'))
      // uglify
      .pipe($.uglify({
        outSourceMap: true
      }))
      .pipe($.sourcemaps.write())
      // then write the min file
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.size())
      .pipe($.connect.reload());
  });

};
