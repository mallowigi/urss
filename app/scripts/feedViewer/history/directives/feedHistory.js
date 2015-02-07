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
        'FeedViewerManager',
        function feedHistoryCtrl ($scope,
                                  $log,
                                  $timeout,
                                  utils,
                                  urlValidator,
                                  saveManager,
                                  FeedViewerManager) {

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
            if (!list || !angular.isArray(list)) {
              return;
            }

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

            if (this.feeds.indexOf(url) > -1) {
              $log.warn('This feed already exists!');
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
            if (index >= this.selected.length) {
              $log.warn(`Invalid index: ${index}`);
              return;
            }

            this.selected = this.feeds[index];

            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          this.deleteFeed = function deleteFeed (index) {
            if (index >= this.feeds.length) {
              $log.warn(`Invalid index: ${index}`);
              return;
            }

            utils.remove(this.feeds, index);

            // Set selected to the feed at index, otherwise the last one
            var length = this.feeds.length;
            this.selected = (index < length) ? this.feeds[index] : this.feeds[length - 1];

            // Update the save
            saveManager.writeList(this.feeds);

            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          function loadFeedIntoViewer () {
            $timeout(() => FeedViewerManager.loadFeed(this.selected));
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
