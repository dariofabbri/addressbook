define([
	"underscore", 
	"backbone",
	"addressbook/views/login"], 
	function(_, Backbone, LoginView) {

	var main = Backbone.Router.extend({
		
		routes: {
			"login": "login",
			"home": "home"				
		},
		
		login: function() {
			new LoginView();
		},
		
		home: function() {
			new NavbarView();
		}
		
	});
	
	return main;
});
