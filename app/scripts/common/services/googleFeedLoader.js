/**
 * Created by Elior on 07/02/2015.
 */
angular.module('urss.common')
/**
 * @ngdoc factory
 * @name feedLoader
 *
 * @description
 * Represents a feedLoader
 */
  .factory('googleFeedLoader', [
    '$q',
    '$http',
    '$parse',
    function feedLoader ($q, $http, $parse) {
      'use strict';
      const GOOG_URL = `http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=`;

      return {
        /**
         * Parse a feed URL with Google Feed API
         * @param url
         * @returns {*}
         */
        getRSSFeed (url) {
          // I wanted to use the new Promise API but since it has no support for finally, I abandoned the idea
          var deferred = $q.defer();

          $http.get(GOOG_URL + url)

            .then((response) => {
              // Feed is contained inside a chain of properties
              let feedData = $parse('data.responseData.feed')(response);

              if (feedData) {
                deferred.resolve(feedData);
              }
              else {
                deferred.reject(`Error: No such feed at ${url}`);
              }
            })

            .catch((reason) => deferred.reject(reason.data))
          ;

          return deferred.promise;

        }
      };
    }
  ]
);
