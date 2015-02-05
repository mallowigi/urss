/**
 * Created by eliorb on 29/08/2014.
 */
module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  gulp.task('usemin:src', 'Attach the compiled scripts to the page without the vendors', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .on('error', helpers.logError)
      .pipe($.usemin({
        css: [$.csso(), $.rev(), $.concatUtil.header(helpers.banner(options))],
        js: [$.ngAnnotate(), $.uglify(), $.rev(), $.concatUtil.header(helpers.banner(options))]
      }))
      .pipe(gulp.dest(src.dist));
  });

  gulp.task('usemin', 'Attach the compiled scripts and styles to the index.html page', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .pipe($.usemin({
        css: [$.minifyCss(), $.rev(), $.concatUtil.header(helpers.banner(options))],
        js: [$.uglify(), $.rev(), $.concatUtil.header(helpers.banner(options))],
        vendor: [$.ngAnnotate(), $.uglify(), $.rev()],
        vendorcss: [$.minifyCss(), $.rev()]
      }))
      .on('error', helpers.logError)
      .pipe(gulp.dest(src.dist));
  });
};
