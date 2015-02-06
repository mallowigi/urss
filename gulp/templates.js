/**
 * Created by eliorb on 29/08/2014.
 */
module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  // combine all templates
  gulp.task('templates', 'Compile templates in templateCache', function () {
    return gulp.src(src.templates, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      // run htmlmin
      .pipe($.htmlmin({removeComments: true, collapseWhitespace: true}))
      // Run ngtemplate under the module
      .pipe($.angularTemplatecache({
        module: options.module,
        root: 'views',
        standalone: false
      }))
      .pipe($.ngAnnotate())
      // Concat all compiled templates in a .tpl.js file
      .pipe($.concat(options.name + '.tpl.js'))
      // Then do the same process
      .pipe($.concatUtil.header(helpers.banner(options)))
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.size())
      .pipe($.connect.reload());
  });

  gulp.task('resources', 'Compiles resources in templateCache', function () {
    return gulp.src(src.resources, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      .pipe($.angularTemplatecache({
        module: options.module,
        root: 'resources',
        standalone: false
      }))
      .pipe($.concat(options.name + '.json.js'))
      .pipe(gulp.dest(src.scriptsDir, {cwd: src.tmp}))
      .pipe($.size())
      .pipe($.connect.reload());

  });

};
