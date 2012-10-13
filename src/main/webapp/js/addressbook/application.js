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
	"addressbook/viewmanager",
	"addressbook/routers/main",
	"addressbook/routers/contacts",
	"addressbook/models/logininfo",
	"bootstrap"], 
	function($, _, Backbone, viewManager, MainRouter, ContactsRouter, LoginInfo) {
	
	$(function() {
	
		Backbone.Router.prototype.show = function(view, selector) {

			// Clean from selector, just in case.
			//
			this.close(selector);
			
			// Store new view in view manager.
			//
			viewManager[selector] = view;
			
			// Show the new view, with style.
			//
			$(selector).hide();
			$(selector).html(view.render().el);
			$(selector).fadeIn();
		};
		
		Backbone.Router.prototype.close = function(selector) {
			
			// Get existing view from view manager.
			// If found, remove it.
			//
			var oldView = viewManager[selector];
			if(oldView) {
				delete viewManager[selector];
			}
			
			$(selector).fadeOut();
			if(oldView) {
				oldView.remove();
				oldView.unbind();
			}
		};
		
		new MainRouter();
		new ContactsRouter();
		
		application.loginInfo = new LoginInfo();
		
		Backbone.history.start({root: "/addressbook"});
		Backbone.history.navigate("#login", true);		
	});
});