/**
 * Created by Elior on 06/02/2015.
 */
angular.module('urss.feedViewer')
/**
 * @ngdoc directive
 * @name feedHistory
 *
 * @description
 * Directive feedHistory
 */
  .directive('feedHistory', [function feedHistoryDirective () {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'views/partials/feedHistory.html',
      scope: {},
      controller: [
        '$scope',
        '$log',
        '$timeout',
        'utils',
        'urlValidator',
        'saveManager',
        function feedHistoryCtrl ($scope,
                                  $log,
                                  $timeout,
                                  utils,
                                  urlValidator,
                                  saveManager) {

          /**
           * The list of feeds
           * @type {Array}
           */
          this.feeds = [
            'http://www.feedforall.com/sample.xml',
            'http://www.feedforall.com/sample-feed.xml',
            'http://www.feedforall.com/blog-feed.xml',
            'http://www.rss-specifications.com/blog-feed.xml'
          ];

          /**
           * Currently selected feed
           * @type {string}
           */
          this.selected = '';

          /**
           * The ngModel
           * @type {string}
           */
          this.feed = '';

          /**
           * Init feeds from Local storage
           */
          this.initFeeds = function initFeeds () {
            var list = saveManager.getList();
            utils.replaceArray(this.feeds, list);
          };

          /**
           * Add a new feed to the list
           */
          this.addFeed = function addFeed () {
            var url = this.feed;

            if (!url || !urlValidator.validate(url)) {
              $log.warn(`Invalid url: ${url}`);
              return;
            }

            // add in list
            this.feeds.unshift(url);

            // set active
            this.selected = url;

            // reset value
            this.feed = '';

            // Save in local storage
            saveManager.writeList(this.feeds);

            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          /**
           * Select the feed at a given index
           * @param {Number} index
           */
          this.selectFeed = function selectFeed (index) {
            if (index > this.selected.length) {
              $log.warn(`Invalid index: ${index}`);
            }

            this.selected = this.feeds[index];

            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          function loadFeedIntoViewer () {

          }

        }
      ],
      controllerAs: 'feedHistory',
      bindToController: true,
      link: function (scope, element, attrs, ctrl) {
        ctrl.initFeeds();
      }
    };
  }]
);
