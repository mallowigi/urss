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
  .directive('feedHistory', ['$document', function feedHistoryDirective ($document) {
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
        'feedHistoryStack',
        'FeedViewerManager',
        function feedHistoryCtrl ($scope,
                                  $log,
                                  $timeout,
                                  utils,
                                  urlValidator,
                                  saveManager,
                                  feedHistoryStack,
                                  FeedViewerManager) {

          /**
           * The list of feeds
           * @type {Array}
           */
          this.feeds = [];

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
            var list = saveManager.getList(),
                active = saveManager.getActive();

            if (!list || !angular.isArray(list)) {
              return;
            }

            // Set the list of feeds
            utils.replaceArray(this.feeds, list);

            // Set currently selected and load viewer
            if (active) {
              this.selected = active;
              // add to history
              feedHistoryStack.push(this.selected);
              // Load into viewer
              loadFeedIntoViewer.call(this);
            }
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

            // add to history
            feedHistoryStack.push(url);

            // Save in local storage
            saveState.call(this);
            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          /**
           * Select the feed at a given index
           * @param {Number} index
           */
          this.selectFeed = function selectFeed (index) {
            if (index >= this.feeds.length) {
              $log.warn(`Invalid index: ${index}`);
              return;
            }

            this.selected = this.feeds[index];

            // add to history
            feedHistoryStack.push(this.selected);

            // Update the save
            saveState.call(this);

            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          /**
           * Delete a feed at a given index
           * @param index
           */
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
            saveState.call(this);

            // Load feed into viewer
            loadFeedIntoViewer.call(this);
          };

          /**
           * Go back at the history
           */
          this.goBack = function goBack () {
            var url = feedHistoryStack.back(),
                urlIndex;

            console.log(url);

            if (url) {
              urlIndex = this.feeds.indexOf(url);

              if (urlIndex > -1) {
                this.selected = this.feeds[urlIndex];
                // Update the save
                saveState.call(this);

                // Load feed into viewer
                loadFeedIntoViewer.call(this);
              }
            }
          };

          /**
           * Load feed into the feedviewer
           */
          function loadFeedIntoViewer () {
            $timeout(() => FeedViewerManager.loadFeed(this.selected));
          }

          /**
           * Save in local storage
           */
          function saveState () {
            saveManager.writeList(this.feeds);
            saveManager.writeActive(this.selected);
          }

        }
      ],
      controllerAs: 'feedHistory',
      bindToController: true,
      link: function feedHistoryLink (scope, element, attrs, ctrl) {
        // Init feeds on start
        ctrl.initFeeds();

        // Go back on backspace
        $document.on('keydown', function (event) {
          // Backspace
          if (event.which === 8) {
            ctrl.goBack();
          }
        });
      }
    };
  }]
);
