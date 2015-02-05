/**
 * Created by eliorb on 29/08/2014.
 */
var lazypipe       = require('lazypipe'),
    mainBowerFiles = require('main-bower-files');

module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';
  // lazypipe for the uglify task
  var uglifyTask = lazypipe()
    // Add min js extension
    .pipe($.rename, {suffix: '.min'})
    // uglify
    .pipe($.uglify)
    // Add header on top on the minified file
    .pipe($.concatUtil.header, helpers.banner(options));

  // -------------------------------------------

  gulp.task('vendors:js', 'Compiles the vendors', function () {
    return gulp.src(mainBowerFiles({filter: /js/}))
      .pipe($.concatUtil('_vendors.js'))
      // Add the banner at the top
      .pipe($.concatUtil.header(helpers.banner(options)))
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.size())

      // If --min is set, uglify and create a min file
      .pipe($.if(gutil.env.min, uglifyTask()))
      // then write the min file
      .pipe($.if(gutil.env.min, gulp.dest(src.scriptsDir, {cwd: src.tmp})))
      .pipe($.if(gutil.env.min, $.size()));
  });

  gulp.task('js', 'Compiles the app', function () {
    // Remember to not include env files
    return gulp.src([src.main, src.modules, src.scripts, '!' + src.envFiles], {cwd: src.cwd})
      .on('error', helpers.logError)
      // Context based environment variables
      .pipe($.preprocess({context: options.context}))
      // Run jsTask
      // ng annotate
      .pipe($.ngAnnotate())
      .on('error', helpers.logError)
      // Create file pkgname.js
      .pipe($.concatUtil(options.name + '.js'))
      // Add the banner at the top
      .pipe($.concatUtil.header(helpers.banner(options)))
      // Generate the js file
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.connect.reload())
      .pipe($.size())
      // If --min is set, uglify and create a min file
      .pipe($.if(gutil.env.min, uglifyTask()))
      // then write the min file
      .pipe($.if(gutil.env.min, gulp.dest(src.scriptsDir, {cwd: src.tmp})))
      .pipe($.if(gutil.env.min, $.size()));
  });

  gulp.task('uglify', 'Minifies the app', function () {
    // For each js file not minified
    return gulp.src([src.scripts, '!**/*.min.js'], {cwd: src.tmp})
      .on('error', helpers.logError)
      // Add min js extension
      .pipe(uglifyTask())
      // then write the min file
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.size());
  });

  gulp.task('env', 'Load env dependent files', function () {
    var env     = gutil.env.env || 'dev',
        envFile = 'env_' + env + '.js';

    helpers.logInfo('Loading ' + env + ' environment');

    return gulp.src(src.env + envFile, {cwd: src.cwd})
      .pipe($.changed(src.env))
      // ngmin minification
      .pipe($.ngAnnotate())
      .on('error', helpers.logError)
      // Create file pkgname.js
      .pipe($.concat(options.name + '.env.js'))
      // Add the banner at the top
      .pipe($.concatUtil.header(helpers.banner(options)))
      // If --min is set, uglify and create a min file
      .pipe($.if(gutil.env.min, uglifyTask()))
      // Generate the js file
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.size())
  });
};
