/**
 * Created by Elior on 07/02/2015.
 */
angular.module('urss.feedViewer')
/**
 * @ngdoc directive
 * @name feedViewer
 *
 * @description
 * Directive feedViewer
 */
  .directive('feedViewer', [function feedViewer () {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'views/partials/feedViewer.html',
      scope: {},
      controller: [
        '$scope',
        'FeedViewerManager',
        function ($scope, FeedViewerManager) {
          // Here we store the data into a backed model so we can access it from outer directives
          $scope.feedViewerManager = FeedViewerManager;
        }
      ],
      controllerAs: 'feedViewer',
      bindToController: true,
      link: function (scope, elem, attrs, ctrl) {
      }
    };
  }]
);
