require.config({

	baseUrl: "js",
	
	paths: {
		"jquery": "jquery/jquery-1.8.2",
		"underscore": "underscore/underscore",
		"backbone": "backbone/backbone",
		"text": "require/text",
		"bootstrap": "bootstrap/bootstrap"
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
	"addressbook/collections/contacts",
	"addressbook/views/modaldialog",
	"bootstrap"], 
	function(
			$, 
			_, 
			Backbone, 
			viewManager, 
			MainRouter, 
			ContactsRouter, 
			LoginInfo,
			Contacts,
			ModalDialogView) {
	
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
			$(selector).fadeIn(function() {
				if(view.autofocus) {
					$(view.autofocus, $(selector)).focus();
				}
			});
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
		
		application.modalDialog = new ModalDialogView();
		$("#modaldialog").html(application.modalDialog.render().el);
		
		application.contacts = new Contacts();
		application.contacts.add([
            {
            	id: 1,
            	firstName: "Dario",
            	lastName: "Fabbri",
            	phoneNumber: "328.4414000"
            },
            {
            	id: 2,
            	firstName: "Selvana",
            	lastName: "Ruggieri",
            	phoneNumber: "328.0814868"
            },
            {
            	id: 3,
            	firstName: "Dario",
            	lastName: "Fabbri",
            	phoneNumber: "328.4414000"
            },
            {
            	id: 4,
            	firstName: "Selvana",
            	lastName: "Ruggieri",
            	phoneNumber: "328.0814868"
            }
		]);

		Backbone.history.start({root: "/addressbook"});
		Backbone.history.navigate("#login", true);	
	});
});
