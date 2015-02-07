/**
 * Created by Elior on 07/02/2015.
 */
angular.module('urss.feedViewer')
/**
 * @ngdoc service
 * @name feedHistoryStack
 *
 * @description
 * Represents a feedHistoryStack
 */
  .service('feedHistoryStack', [function feedHistoryStack () {
    'use strict';

    /**
     * A stack of url feeds selected
     * @type {Array}
     */
    this.history = [];

    /**
     * The current index
     * @type {number}
     */
    this.current = -1;

    /**
     * Go back in the history
     */
    this.back = function back () {
      if (this.current <= 0) {
        // do nothing
        return;
      }

      this.current--;
      return this.history[this.current];
    };

    this.forward = function forward () {
      if (this.current >= this.history.length - 1) {
        // do nothing
        return;
      }

      this.current++;
      return this.history[this.current];
    };

    this.push = function push (url) {
      //this.history.push(url);
      this.current++;
      // We do not push at the end of the history but instead rewrite from current
      Array.prototype.splice.call(this.history, this.current, this.history.length, url);

      return this.history[this.current];
    };

  }]
);
