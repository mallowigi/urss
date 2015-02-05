/**
 * Created by eliorb on 29/08/2014.
 */
var wiredep = require('wiredep'),
    bower   = wiredep.stream;

module.exports = function (gulp, $, gutil, helpers, src, options) {
  'use strict';

  gulp.task('bower', 'Add bower components to the index page', function () {
    // Look in html files for the bower tag and inject components
    return gulp.src(src.index, {cwd: src.cwd})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      // Inject the bower components
      .pipe(bower({exclude: /bootstrap\./}))
      .pipe(gulp.dest(src.cwd));
  });

  gulp.task('bower:karma', 'Add bower components to the karma conf', function () {
    return gulp.src(src.karma, {cwd: src.testDir})
      .pipe($.plumber({
        errorHandler: helpers.logError
      }))
      .pipe(bower({
        exclude: /bootstrap\./,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }))
      .pipe(gulp.dest(src.testDir));
  });

};
