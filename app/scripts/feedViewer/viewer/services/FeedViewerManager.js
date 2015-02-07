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
      '$http',
      '$log',
      'utils',
      function FeedViewerManager ($http, $log, $utils) {
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
           * The Title of the feed (url)
           */
          title: '',

          /**
           * The list of fetched articles
           */
          articles: [],

          /**
           * A subset of articles
           */
          shownArticles: [],

          /**
           * Load feed into view
           * @param url
           */
          loadFeed (url) {

            // Set loading state
            this.isLoading = true;
            this.title = url;

            $http.get(url)

              .then((feed) => {
                this.articles = feed;
                // Get first x articles
                this.shownArticles = this.articles.slice(0, this.numArticles);
              })

              .finally(() => {
                // Hide loader
                this.isLoading = false;
              }
            );
          }

        };
      }
    ];
  }]
);
