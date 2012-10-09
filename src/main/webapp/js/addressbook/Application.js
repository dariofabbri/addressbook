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
	"addressbook/routers/MainRouter",
	"addressbook/models/LoginInfo",
	"bootstrap"], function($, MainRouter, LoginInfo) {
	$(function() {
	
		var router = new MainRouter();
		application.loginInfo = new LoginInfo();
		
		Backbone.history.start({root: "/addressbook"});
		Backbone.history.navigate("#login", true);		
	});
});