/**
 * Created by eliorb on 29/08/2014.
 */
module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  gulp.task('usemin', 'Attach the compiled scripts and styles to the index.html page', function () {
    return gulp.src(src.index, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      .pipe($.usemin({
        css: [$.minifyCss(), $.concatUtil.header(helpers.banner(options))],
        js: [$.uglify(), $.concatUtil.header(helpers.banner(options))],
        vendor: [$.ngAnnotate(), $.uglify()],
        vendorcss: [$.minifyCss()]
      }))
      .pipe(gulp.dest(src.dist));
  });
};
