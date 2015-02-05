/**
 * Created by eliorb on 30/10/14.
 */
var changelog = require('conventional-changelog'),
    fs        = require('fs');

module.exports = function (gulp, $, gutil, helpers, src, pkg) {
  'use strict';
  gulp.task('changelog', 'Updates changelog', function (done) {
    function changeParsed (err, log) {
      if (err) {
        return done(err);
      }
      fs.writeFile('CHANGELOG.md', log, done);
    }

    changelog({
      repository: pkg.repository.url,
      version: gutil.env.to || pkg.version,
      subtitle: pkg.subtitle,
      from: gutil.env.version,
      to: gutil.env.to || 'HEAD'
    }, changeParsed);

  });
};
