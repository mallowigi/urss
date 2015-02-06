/**
 * Created by eliorb on 29/08/2014.
 */
var lazypipe   = require('lazypipe'),
mainBowerFiles = require('main-bower-files');

//jshint camelcase:false
module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  // Leveraging lazypipe
  var sassTask = lazypipe()
    .pipe($.sass)
    // Autoprefix properties which last version are still red
    .pipe($.autoprefixer, options.autoprefix)
    // Concat css file
    .pipe($.concat, options.name + '.css')
    .pipe($.concatUtil.header, helpers.banner(options));

  // Minify css
  var minifyCssTask = lazypipe()
    // Add min js extension
    .pipe($.rename, {suffix: '.min'})
    // uglify
    .pipe($.minifyCss)
    // Add header on top on the minified file
    .pipe($.concatUtil.header, helpers.banner(options));

  // --------------------------------------------

  // Run compass
  gulp.task('sass', 'Compile sass files', function () {
    return gulp.src(src.sass, {cwd: src.cwd})
      // Only process changed files
      .pipe($.changed(src.stylesDir))
      .pipe($.sourcemaps.init())
      .pipe(sassTask())
      .on('error', helpers.logError)
      // And write in the styles dir
      .pipe(minifyCssTask())
      .pipe($.sourcemaps.write())
      // then write the min file
      .pipe(gulp.dest(src.stylesDir, {cwd: src.tmp}))
      .pipe($.size())
      .pipe($.connect.reload());

  });

  gulp.task('minifycss', 'Minify css', function () {
    // Exclude min css
    return gulp.src([src.css, '!**/*.min.css'], {cwd: src.tmp})
      .pipe(minifyCssTask())
      .on('error', helpers.logError)
      // then write the min file
      .pipe(gulp.dest(src.stylesDir, {cwd: src.tmp}))
      .pipe($.size());
  });

  gulp.task('vendors:css', 'Compiles the vendors', function () {
    return gulp.src(mainBowerFiles({filter: /css/}))
      .pipe($.concatUtil('_vendors.css'))
      .on('error', helpers.logError)
      // Add the banner at the top
      .pipe($.concatUtil.header(helpers.banner(options)))
      .pipe(gulp.dest(src.stylesDir, {cwd: src.tmp}))
      .pipe($.size())

      // If --min is set, uglify and create a min file
      .pipe($.if(gutil.env.min, minifyCssTask()))
      // then write the min file
      .pipe($.if(gutil.env.min, gulp.dest(src.stylesDir, {cwd: src.tmp})))
      .pipe($.if(gutil.env.min, $.size()));
  });
};
