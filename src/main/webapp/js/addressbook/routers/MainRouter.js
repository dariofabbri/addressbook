define([
	"underscore", 
	"backbone",
	"addressbook/views/LoginView"], 
	function(_, Backbone, LoginView) {

	var MainRouter = Backbone.Router.extend({
		
		routes: {
			"login": "login"
		},
		
		login: function() {
			var view = new LoginView();
		}
		
	});
	
	return MainRouter;
});
