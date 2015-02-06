/**
 * Created by Elior on 07/02/2015.
 */
angular.module('urss.feedViewer')
/**
 * @ngdoc directive
 * @name validateDuplicates
 *
 * @description
 * Directive validateDuplicates
 */
  .directive('validateDuplicates', [function validateDuplicatesDirective () {
    'use strict';

    return {
      restrict: 'A',
      require: ['ngModel', '^feedHistory'],
      link: function validateDuplicatesLink (scope, elem, attrs, ctrls) {
        var ngModel = ctrls[0],
            feedHistory = ctrls[1];

        /**
         * Look for duplicates on the feedHistory Model
         * Note: we could have used a Shared service instead of require ^feedHistory, or even pass the list as an attribute.
         * I just went to this solution, whatever
         *
         * @param model
         * @returns {boolean}
         */
        ngModel.$validators.duplicates = function validateDuplicates (model) {
          return feedHistory.feeds.indexOf(model) === -1;
        };
      }
    };
  }]
);
