define([
	"underscore", 
	"backbone",
	"addressbook/views/login",
	"addressbook/views/navbar"], 
	function(_, Backbone, LoginView, NavbarView) {

	var main = Backbone.Router.extend({
		
		routes: {
			"login": "login",
			"home": "home"
		},
		
		login: function() {
			this.close("#navbar");

			var newView = new LoginView();
			this.show(newView, "#container");
		},
		
		home: function() {
			this.close("#container");

			var newView = new NavbarView();
			this.show(newView, "#navbar");
		},
	});

	return main;
});
