/**
 * Created by Elior on 07/02/2015.
 */
angular.module('urss.feedViewer')
/**
 * @ngdoc factory
 * @name FeedViewerManager
 *
 * @description
 * Represents a FeedViewerManager factory
 */
  .provider('FeedViewerManager', [function FeedViewerManagerProvider () {
    'use strict';

    /**
     * Number of articles to display
     * @type {number}
     */
    var numArticles = 5;

    /**
     * Set the number of articles
     * @param {number} num new number of articles
     */
    this.setNumArticles = function setNumArticles (num) {
      numArticles = num;
      return this;
    };

    this.$get = [
      '$log',
      '$parse',
      'utils',
      'googleFeedLoader',
      function FeedViewerManager ($log,
                                  $parse,
                                  utils,
                                  googleFeedLoader) {
        return {
          /**
           * Whether the viewer is loading
           */
          isLoading: false,

          /**
           * How much articles to display, default numArticles
           */
          numArticles: numArticles,

          /**
           * The feed loaded
           */
          feed: {},

          /**
           * If there is an error
           */
          error: null,

          /**
           * The Title of the feed (url)
           */
          get title () {
            return $parse('feed.title')(this);
          },

          /**
           * The list of fetched articles
           */
          get articles () {
            return $parse('feed.entries')(this);
          },

          /**
           * A subset of articles
           */
          get displayedArticles () {
            // Use Parse to apply a limitTo filter (one can also inject the filter instead, useful for mocking)
            return $parse('feed.entries | limitTo:numArticles')(this);
          },

          /**
           * Load feed into view
           * @param url
           */
          loadFeed (url) {

            $log.info(`Loading url ${url}`);

            // Set loading state
            this.isLoading = true;

            googleFeedLoader.getRSSFeed(url)

              .then((feed) => {
                $log.info(feed);

                this.feed = feed;
                this.error = null;
              })

              .catch((err) => {
                $log.error(err);

                // Reset feed
                this.feed = {};
                this.error = err;
                // Reset numArticles
                this.numArticles = numArticles;
              })

              .finally(() => {
                // Hide loader
                this.isLoading = false;
              })
            ;
          }

        };
      }
    ];
  }]
);
