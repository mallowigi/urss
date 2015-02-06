/**
 * Created by Elior on 06/02/2015.
 */
angular.module('urss.common')
/**
 * @ngdoc service
 * @name urlValidator
 *
 * @description
 * Represents a urlValidator
 */
  .service('urlValidator', [function urlValidator () {
    'use strict';

    const LINK_RE = /https?\:\/\/(.*)/;

    /**
     * Validate a link
     * @param url
     */
    this.validate = function validate (url) {
      var urlToTest = decodeURIComponent(url.trim().toLowerCase());

      return LINK_RE.test(urlToTest);
    };
  }]
);
