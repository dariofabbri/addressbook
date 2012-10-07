var MainRouter = Backbone.Router.extend({
	
	routes: {
		"login": "login"
	},
	
	login: function() {
		var view = new LoginView({model: Application.loginInfo});
		view.render();
	}
	
});