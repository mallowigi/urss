module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';
  gulp.task('coffee', 'Compile coffeescript files', function () {
    return gulp.src([src.coffee], {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      // Generate source maps
      .pipe($.sourcemaps.init())
      // Compile the coffee files
      .pipe($.coffee({bare: true, sourceMap: true}))
      // Write the source maps in the current dir
      .pipe($.sourcemaps.write())
      // Then dump in the tmp dir
      .pipe(gulp.dest(src.tmpDir, {cwd: src.cwd}))
      .pipe($.size());
  });

};
