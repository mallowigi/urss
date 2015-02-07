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
    const LS_LIST = 'urss.list';
    const LS_ACTIVE = 'urss.active';

    /**
     * Get the feed list that is in the local storage
     * @returns {*}
     */
    this.getList = function getList () {
      var list = localStorage.getItem(LS_LIST) || '[]';
      return JSON.parse(list);
    };

    /**
     * Write the list of feeds in the LS
     * @param {Array} list
     */
    this.writeList = function writeList (list) {
      localStorage.setItem(LS_LIST, JSON.stringify(list));
    };

    this.getActive = function getActive () {
      var active = localStorage.getItem(LS_ACTIVE) || '';
      return JSON.parse(active);
    };

    /**
     * Write the current active item in the LS
     * @param active
     */
    this.writeActive = function writeActive (active) {
      localStorage.setItem(LS_ACTIVE, JSON.stringify(active));
    };
  }]
);
