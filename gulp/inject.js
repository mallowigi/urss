module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';
  // -----------------------------------

  gulp.task('inject', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))

      // Inject css styles
      .pipe($.inject(gulp.src(src.css, {cwd: src.cwd}), {addRootSlash: false, read: false}))
      // Inject javascript sources, excluding env
      .pipe($.inject(gulp.src([src.main, src.modules, src.scripts], {cwd: src.cwd}), {addRootSlash: false, read: false}))
      .pipe(gulp.dest(src.cwd))
      .pipe($.size());
  });

  // Same process as inject, but inject concat files instead
  gulp.task('inject:dist', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))

      // Context based environment variables
      .pipe($.preprocess({context: options.context}))
      // Inject the concatenated js
      .pipe($.inject(gulp.src(['**/*.min.js', src.scripts], {cwd: src.tmp}),
        {relative: true, addRootSlash: false}))
      // Inject the css
      .pipe($.inject(gulp.src(['**/*.min.css', src.css], {cwd: src.tmp}),
        {relative: true, addRootSlash: false}))
      .pipe(gulp.dest(src.cwd))
      .pipe($.size());
  });

  gulp.task('inject:karma', function () {
    return gulp.src(src.karma, {cwd: src.testDir})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))

      // Inject javascript sources, excluding env
      .pipe($.inject(gulp.src([src.main, src.modules, src.scripts], {cwd: src.cwd}),
        {
          relative: true,
          addRootSlash: false,
          starttag: '// inject:js',
          endtag: '// endinject',
          transform: function (filepath) {
            return '\'' + filepath + '\'' + ',';
          }
        }))
      .pipe(gulp.dest(src.testDir))
      .pipe($.size());
  });

};
