define([
	"underscore", 
	"backbone",
	"addressbook/views/login",
	"addressbook/views/navbar"], 
	function(_, Backbone, LoginView, NavbarView) {

	var main = Backbone.Router.extend({
		
		views: {
			loginView: new LoginView(),
			navbarView: new NavbarView()
		},
		
		routes: {
			"login": "login",
			"home": "home"				
		},
		
		login: function() {
			this.views.navbarView.close();
			this.views.loginView.show();
		},
		
		home: function() {
			this.views.loginView.close();
			this.views.navbarView.show();
		}

	});

	return main;
});
