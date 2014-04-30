var express = require('express'),
	app 	= express(),
	path	= require('path');



app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/app/views');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));
app.use(app.router);
app.use('/', express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	res.render('index.jade');
});

app.listen(3000, function () {
	console.log('Server up at 3000');
});

module.exports = app;