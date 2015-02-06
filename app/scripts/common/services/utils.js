/**
 * Created by Elior on 06/02/2015.
 */
angular.module('urss.common')
/**
 * @ngdoc factory
 * @name utils
 *
 * @description
 * Represents a utils factory
 */
  .factory('utils', [function utils () {
    'use strict';

    return {
      /**
       * Replace contents of an array with another array
       * @param arr
       * @param newArr
       */
      replaceArray: function replaceArray (arr, newArr) {
        arr.length = 0;
        Array.prototype.splice.apply(arr, [0, 0].concat(newArr));
      }
    };
  }]
);
