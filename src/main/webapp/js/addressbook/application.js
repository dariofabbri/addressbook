require.config({

	baseUrl: "js",
	
	paths: {
		"jquery": "jquery/jquery-1.8.2",
		"underscore": "underscore/underscore",
		"backbone": "backbone/backbone",
		"text": "require/text",
		"bootstrap": "bootstrap/bootstrap",
	},
	
	shim: {
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		underscore: {
			exports: "_"
		},
		bootstrap: {
			deps: ["jquery"]
		}
	}
});

var application = {
};

require([
	"jquery",
	"underscore",
	"backbone",
	"addressbook/routers/main",
	"addressbook/models/logininfo",
	"bootstrap"], 
	function($, _, Backbone, MainRouter, LoginInfo) {
	$(function() {
	
		Backbone.View.prototype.close = function() {
			this.$el.fadeOut();
			this.$el.empty();
			//this.remove();
			this.unbind();
		};
		
		Backbone.View.prototype.show = function() {
			this.$el.hide();
			this.render();
			this.$el.fadeIn();
		};
		
		new MainRouter();
		application.loginInfo = new LoginInfo();
		
		Backbone.history.start({root: "/addressbook"});
		Backbone.history.navigate("#login", true);		
	});
});