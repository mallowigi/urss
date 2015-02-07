/**
 * Created by eliorb on 07/02/2015.
 */
angular.module('urss.common')
/**
 * @ngdoc filter
 * @name moment
 *
 * @description
 * Format out a date to a given format but using moment instead of dateFilter, and provide support for custom input format
 */
  .filter('moment', function () {
    'use strict';

    return function momentFilter (input, format, inputFormat) {
      if (!moment) {
        throw Error('Moment.js is undefined');
      }

      // If no input return empty string
      if (!input) {
        return '';
      }

      // If no format specified, return the input as is
      if (!format || !angular.isString(format)) {
        return input;
      }

      // If the input is a date, simply format it
      if (angular.isDate(input)) {
        return moment(input).format(format);
      }
      // If the input is a timestamp, format it
      else if (angular.isNumber(input)) {
        return moment(input).format(format);
      }
      // finally if it is a string
      else {
        // If no input format, sinply use the regular moment
        if (!inputFormat) {
          return moment(input).format(format);
        }
        else {
          // Else use moment to parse the input according to the input format
          return moment(input, inputFormat).format(format);
        }
      }

    };
  }
);
