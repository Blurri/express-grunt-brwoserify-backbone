;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Router = require('./router');
var test = require('./models/test');
var $

module.exports = App = function App() {};

App.prototype.start = function(){
	router = new Router();
	Backbone.history.start();

};

},{"./models/test":3,"./router":4}],2:[function(require,module,exports){
var App = require('./app'),
	myapp = new App(),
	backbone = require('backbone'),
	jquery = require('jquery');

backbone.$ = jquery;

myapp.start();
},{"./app":1}],3:[function(require,module,exports){


var test = Backbone.Model.extend();

module.exports = test;
},{}],4:[function(require,module,exports){


module.exports = Router = Backbone.Router.extend({
	routes : {
		'' : 'index'
	},
	index : function () {
		console.log('Hello WORLD');
	}
});
},{}]},{},[2])
;