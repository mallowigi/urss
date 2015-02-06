/**
 * Created by Elior on 06/02/2015.
 */

/* global localStorage */
angular.module('urss.feedViewer')
/**
 * @ngdoc service
 * @name saveManager
 *
 * @description
 * A save manager using local storage
 */
  .service('saveManager', [function saveManager () {
    'use strict';
    const LS_PREFIX = 'urss.list';

    this.getList = function getList () {
      var list = localStorage.getItem(LS_PREFIX) || '[]';
      return JSON.parse(list);
    };

    this.writeList = function writeList (list) {
      localStorage.setItem(LS_PREFIX, JSON.stringify(list));
    };
  }]
);
