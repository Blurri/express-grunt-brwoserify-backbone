var Router = require('./router');
var test = require('./models/test');
var $

module.exports = App = function App() {};

App.prototype.start = function(){
	router = new Router();
	Backbone.history.start();

};
