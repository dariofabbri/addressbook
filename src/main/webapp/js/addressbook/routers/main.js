define([
	"underscore", 
	"backbone",
	"addressbook/views/login/login",
	"addressbook/views/common/navbar",
	"addressbook/views/common/footer"], 
	function(
			_, 
			Backbone, 
			LoginView, 
			NavbarView,
			FooterView) {

	var main = Backbone.Router.extend({
		
		routes: {
			"login": "login",
			"home": "home"
		},
		
		login: function() {
			this.close("#navbar");
			this.close("#footer");

			var view = new LoginView();
			this.show(view, "#container");
		},
		
		home: function() {
			this.close("#container");

			var navbar = new NavbarView();
			this.show(navbar, "#navbar");
			
			var footer = new FooterView();
			this.show(footer, "#footer");
		}
	});

	return main;
});
