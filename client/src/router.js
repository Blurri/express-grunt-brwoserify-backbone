

module.exports = Router = Backbone.Router.extend({
	routes : {
		'' : 'index'
	},
	index : function () {
		console.log('Hello WORLD');
	}
});