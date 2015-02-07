/**
 * Created by Elior on 07/02/2015.
 */
angular.module('urss.feedViewer')
/**
 * @ngdoc directive
 * @name feedViewerArticle
 *
 * @description
 * Directive feedViewerArticle
 */
  .directive('feedViewerArticle', [function feedViewerArticle () {
    'use strict';

    return {
      restrict: 'E',
      require: '^feedViewer',
      replace: true,
      templateUrl: 'views/partials/feedViewerArticle.html',
      scope: {
        article: '=',
        dateInputFormat: '@'
      }
    };
  }]
);
