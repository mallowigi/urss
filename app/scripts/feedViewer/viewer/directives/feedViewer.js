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
        function feedViewerCtrl ($scope, FeedViewerManager) {

          // Create some getters to the feedViewerManager
          Object.defineProperties(this, {
            isLoading: {
              get: () => FeedViewerManager.isLoading
            },

            title: {
              get: () => FeedViewerManager.title
            },

            feedUrl: {
              get: () => FeedViewerManager.feedUrl
            },

            displayedArticles: {
              get: () => FeedViewerManager.displayedArticles
            },

            error: {
              get: () => FeedViewerManager.error
            },

            moreArticles: {
              get: () => FeedViewerManager.hasMoreArticles()
            }

          });

          /**
           * Load more articles
           */
          this.loadMore = function loadMore () {
            FeedViewerManager.loadMore();
          };
        }
      ],
      controllerAs: 'feedViewer',
      bindToController: true
    };
  }]
);
