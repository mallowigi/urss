/**
 * Created by eliorb on 29/08/2014.
 */
module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  // --------------------------------------------

  // Run compass
  gulp.task('sass', 'Compile sass files', function () {
    return gulp.src(src.sass, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      // Only process changed files
      .pipe($.changed(src.stylesDir))
      .pipe($.sourcemaps.init())
      .pipe($.sass())
      // Autoprefix properties which last version are still red
      .pipe($.autoprefixer(options.autoprefix))
      // Concat css file
      .pipe($.concat(options.name + '.css'))
      .pipe($.concatUtil.header(helpers.banner(options)))
      // And write in the styles dir
      // Add min js extension
      .pipe($.rename({suffix: '.min'}))
      // uglify
      .pipe($.minifyCss())
      // Add header on top on the minified file
      .pipe($.concatUtil.header(helpers.banner(options)))
      .pipe($.sourcemaps.write())
      // then write the min file
      .pipe(gulp.dest(src.stylesDir, {cwd: src.tmp}))
      .pipe($.size())
      .pipe($.connect.reload());

  });

};
