module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';
  // -----------------------------------

  gulp.task('inject', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .on('error', helpers.logError)
      // Inject css styles
      .pipe($.inject(gulp.src(src.css, {cwd: src.cwd}), {addRootSlash: false, read: false}))
      // Inject javascript sources, excluding env
      .pipe($.inject(gulp.src([src.main, src.modules, src.scripts, '!**/env_*'], {cwd: src.cwd}), {addRootSlash: false, read: false}))
      .pipe(gulp.dest(src.cwd))
      .pipe($.size());
  });

  gulp.task('inject:env', function () {
    var env     = gutil.env.env || 'dev',
        envFile = 'env_' + env + '.js';

    helpers.logInfo('Loading ' + env + ' environment');

    return gulp.src(src.index, {cwd: src.cwd})
      .on('error', helpers.logError)
      // Inject env file
      .pipe($.inject(gulp.src(src.env + envFile, {cwd: src.cwd}), {addRootSlash: false, starttag: '<!-- inject:env -->'}))
      .pipe(gulp.dest(src.cwd))
      .pipe($.size());
  });

  // Same process as inject, but inject concat files instead
  gulp.task('inject:dist', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .on('error', helpers.logError)
      // Context based environment variables
      .pipe($.preprocess({context: options.context}))
      // Inject the concatenated js
      .pipe($.inject(gulp.src([src.scripts, '!**/*.min.js', '!**/*env*'], {cwd: src.tmp}),
        {relative: true, addRootSlash: false}))
      // Inject the env
      .pipe($.inject(gulp.src(['**/*env*'], {cwd: src.tmp}),
        {relative: true, addRootSlash: false, starttag: '<!-- inject:env -->'}))
      // Inject the css
      .pipe($.inject(gulp.src([src.css, '!**/*.min.css'], {cwd: src.tmp}),
        {relative: true, addRootSlash: false}))
      .pipe(gulp.dest(src.cwd))
      .pipe($.size());
  });

  gulp.task('inject:karma', function () {
    var env     = gutil.env.env || 'dev',
        envFile = 'env_' + env + '.js';

    helpers.logInfo('Loading ' + env + ' environment');

    return gulp.src(src.karma, {cwd: src.testDir})
      .on('error', helpers.logError)
      // Inject javascript sources, excluding env
      .pipe($.inject(gulp.src([src.main, src.modules, src.scripts, '!**/env_*', '!**/QA/*'], {cwd: src.cwd}),
        {
          relative: true,
          addRootSlash: false,
          starttag: '// inject:js',
          endtag: '// endinject',
          transform: function (filepath) {
            return '\'' + filepath + '\'' + ',';
          }
        }))
      // Inject env file
      .pipe($.inject(gulp.src(src.env + envFile, {cwd: src.cwd}),
        {
          relative: true,
          addRootSlash: false,
          starttag: '// inject:env',
          endtag: '// endinject',
          transform: function (filepath) {
            return '\'' + filepath + '\'' + ',';
          }
        }))
      .pipe(gulp.dest(src.testDir))
      .pipe($.size());
  });

  gulp.task('inject:karma:dist', function () {
    return gulp.src(src.karma, {cwd: src.testDir})
      .on('error', helpers.logError)
      // Inject the concatenated js
      .pipe($.inject(gulp.src([src.scripts, '!**/*.min.js'], {cwd: src.tmp, read: false}),
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
