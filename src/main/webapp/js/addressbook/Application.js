var Application = {
	
	loginInfo: new LoginInfo(),
		
	routers: [
	          new MainRouter()
	],

	init: function() {
		Backbone.history.start({root: "/addressbook"});
		Backbone.history.navigate("#login", true);		
	}
};

$(function() {

	Application.init();

});