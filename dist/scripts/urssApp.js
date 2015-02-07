"use strict";angular.module("urss.common",["ngAnimate","ngMessages","ngSanitize","angular.filter"]),angular.module("urss.config",[]),angular.module("urss.feedViewer",["urss.common","urss.config"]),angular.module("urssApp",["urss.common","urss.config","urss.feedViewer"]),angular.module("urss.common").filter("moment",function(){return function(e,t,i){if(!moment)throw Error("Moment.js is undefined");return e?t&&angular.isString(t)?angular.isDate(e)?moment(e).format(t):angular.isNumber(e)?moment(e).format(t):i?moment(e,i).format(t):moment(e).format(t):e:""}}),angular.module("urss.common").config(["$httpProvider",function(e){e.defaults.withCredentials=!0,e.defaults.useXDomain=!0,delete e.defaults.headers.common["X-Requested-With"]}]).factory("googleFeedLoader",["$q","$http","$parse",function(e,t,i){var r="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";return{getRSSFeed:function(s){var n=e.defer();return t.jsonp(r+encodeURIComponent(s)).then(function(e){var t=i("data.responseData.feed")(e);t?n.resolve(t):n.reject("Error: No such feed at "+s)})["catch"](function(e){return n.reject(e.data)}),n.promise}}}]),angular.module("urss.common").service("urlValidator",[function(){var e=/https?\:\/\/(.*)/;this.validate=function(t){var i=decodeURIComponent(t.trim().toLowerCase());return e.test(i)}}]),angular.module("urss.common").factory("utils",[function(){return{replaceArray:function(e,t){e.length=0,Array.prototype.splice.apply(e,[0,0].concat(t))},remove:function(e,t){if(0>t||t>e.length)throw Error("Invalid index: "+t);Array.prototype.splice.call(e,t,1)}}}]),angular.module("urss.feedViewer").directive("feedHistory",["$document",function(e){return{restrict:"E",templateUrl:"views/partials/feedHistory.html",scope:{},controller:["$scope","$log","$timeout","utils","urlValidator","saveManager","feedHistoryStack","FeedViewerManager",function(e,t,i,r,s,n,a,l){function d(){var e=this;i(function(){return l.loadFeed(e.selected)})}function o(){n.writeList(this.feeds),n.writeActive(this.selected)}this.feeds=[],this.selected="",this.feed="",this.initFeeds=function(){var e=n.getList(),t=n.getActive();e&&angular.isArray(e)&&(r.replaceArray(this.feeds,e),t&&(this.selected=t,a.push(this.selected),d.call(this)))},this.addFeed=function(){var e=this.feed;return e&&s.validate(e)?this.feeds.indexOf(e)>-1?void t.warn("This feed already exists!"):(this.feeds.unshift(e),this.selected=e,this.feed="",a.push(e),o.call(this),void d.call(this)):void t.warn("Invalid url: "+e)},this.selectFeed=function(e){return e>=this.feeds.length?void t.warn("Invalid index: "+e):(this.selected=this.feeds[e],a.push(this.selected),o.call(this),void d.call(this))},this.deleteFeed=function(e){if(e>=this.feeds.length)return void t.warn("Invalid index: "+e);r.remove(this.feeds,e);var i=this.feeds.length;this.selected=i>e?this.feeds[e]:this.feeds[i-1],o.call(this),d.call(this)},this.goBack=function(){var e,t=a.back();console.log(t),t&&(e=this.feeds.indexOf(t),e>-1&&(this.selected=this.feeds[e],o.call(this),d.call(this)))}}],controllerAs:"feedHistory",bindToController:!0,link:function(t,i,r,s){s.initFeeds(),e.on("keydown",function(e){8===e.which&&s.goBack()})}}}]),angular.module("urss.feedViewer").directive("validateDuplicates",[function(){return{restrict:"A",require:["ngModel","^feedHistory"],link:function(e,t,i,r){var s=r[0],n=r[1];s.$validators.duplicates=function(e){return-1===n.feeds.indexOf(e)}}}}]),angular.module("urss.feedViewer").service("feedHistoryStack",[function(){this.history=[],this.current=-1,this.back=function(){return this.current<=0?void 0:(this.current--,this.history[this.current])},this.forward=function(){return this.current>=this.history.length-1?void 0:(this.current++,this.history[this.current])},this.push=function(e){return this.current++,Array.prototype.splice.call(this.history,this.current,this.history.length,e),this.history[this.current]}}]),angular.module("urss.feedViewer").directive("feedViewer",[function(){return{restrict:"E",templateUrl:"views/partials/feedViewer.html",scope:{},controller:["$scope","FeedViewerManager",function(e,t){Object.defineProperties(this,{isLoading:{get:function(){return t.isLoading}},title:{get:function(){return t.title}},feedUrl:{get:function(){return t.feedUrl}},displayedArticles:{get:function(){return t.displayedArticles}},error:{get:function(){return t.error}},moreArticles:{get:function(){return t.hasMoreArticles()}}}),this.loadMore=function(){t.loadMore()}}],controllerAs:"feedViewer",bindToController:!0}}]),angular.module("urss.feedViewer").directive("feedViewerArticle",[function(){return{restrict:"E",require:"^feedViewer",replace:!0,templateUrl:"views/partials/feedViewerArticle.html",scope:{article:"=",dateInputFormat:"@"}}}]),angular.module("urss.feedViewer").service("saveManager",[function(){var e="urss.list",t="urss.active";this.getList=function(){var t=localStorage.getItem(e)||"[]";return JSON.parse(t)},this.writeList=function(t){localStorage.setItem(e,JSON.stringify(t))},this.getActive=function(){var e=localStorage.getItem(t)||"";return JSON.parse(e)},this.writeActive=function(e){localStorage.setItem(t,JSON.stringify(e))}}]),angular.module("urss.feedViewer").provider("FeedViewerManager",[function(){var e=5;this.setNumArticles=function(t){return e=t,this},this.$get=["$log","$parse","utils","googleFeedLoader",function(t,i,r,s){return Object.defineProperties({isLoading:!1,numArticles:e,feed:{},error:null,loadFeed:function(i){var r=this;t.info("Loading url "+i),this.isLoading=!0,s.getRSSFeed(i).then(function(e){t.info(e),r.feed=e,r.error=null})["catch"](function(i){t.error(i),r.feed={},r.error=i,r.numArticles=e})["finally"](function(){r.isLoading=!1})},hasMoreArticles:function(){var e=this.displayedArticles.length,t=this.articles.length;return t>e},loadMore:function(){this.numArticles+=e}},{title:{get:function(){return i("feed.title")(this)},enumerable:!0,configurable:!0},feedUrl:{get:function(){return i("feed.feedUrl")(this)},enumerable:!0,configurable:!0},articles:{get:function(){return i("feed.entries")(this)},enumerable:!0,configurable:!0},displayedArticles:{get:function(){return i("feed.entries | limitTo:numArticles")(this)},enumerable:!0,configurable:!0}})}]}]),angular.module("urssApp").run(["$templateCache",function(e){e.put("views/partials/feedHistory.html",'<div class="ui segment"><form class="ui form" name="addFeed" ng-class="{\'error\': addFeed.$invalid}" ng-submit="feedHistory.addFeed()"><div class="ui small error message" ng-messages="addFeed.add.$error"><p ng-message="url">Invalid Url Address.</p><p ng-message="duplicates">This feed is already on the list</p></div><div class="ui field action input" ng-class="{\'error\': addFeed.$invalid}"><input type="url" title="Search" placeholder="Add a feed URL" name="add" id="addText" validate-duplicates ng-keydown="$event.stopPropagation()" ng-model="feedHistory.feed"><div class="ui icon button" ng-click="feedHistory.addFeed()"><i class="search icon"></i></div></div></form><div class="ui divider"></div><div class="ui selection list list_feed"><div class="item item_feed transition" ng-repeat="feed in feedHistory.feeds" ng-click="feedHistory.selectFeed($index)" ng-class="{\'active\': feedHistory.selected === feed}"><div class="content">{{ ::feed }} <i class="right floated close icon" ng-click="feedHistory.deleteFeed($index)"></i></div></div></div></div>'),e.put("views/partials/feedViewer.html",'<div class="ui segment" ng-class="{\'loading\': feedViewer.isLoading}"><div ng-if="feedViewer.title"><header class="ui center aligned vertical segment"><h1 class="ui header">{{ feedViewer.title }}</h1><h3 class="ui header">{{ feedViewer.feedUrl }}</h3></header><feed-viewer-article ng-repeat="article in feedViewer.displayedArticles" article="article"></feed-viewer-article><div class="fluid ui green button center aligned" ng-click="feedViewer.loadMore()" ng-show="feedViewer.moreArticles">Load More Articles</div></div><div ng-if="!feedViewer.title"><header class="ui center aligned vertical segment"><h1 class="ui header">No feed loaded</h1></header><article class="ui center aligned vertical segment"><p class="content">Please select a feed on the list</p></article><article ng-show="feedViewer.error"><p class="content ui error message">{{ feedViewer.error }}</p></article></div></div>'),e.put("views/partials/feedViewerArticle.html",'<article class="ui segment"><header class="ui header"><h3 class="ui header">{{::article.title }} - {{ ::article.publishedDate | moment:\'DD/MM/YYYY\' }}</h3></header><p class="content" ng-bind-html="::article.content"></p></article>')}]);