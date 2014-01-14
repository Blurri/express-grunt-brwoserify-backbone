var App = require('./app'),
	myapp = new App(),
	backbone = require('backbone'),
	jquery = require('jquery');

backbone.$ = jquery;

myapp.start();