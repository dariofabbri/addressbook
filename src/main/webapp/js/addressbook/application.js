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
		
		Backbone.View.prototype.highlightField = function(fieldSelector, cssClass, text) {
			
			// Reset highlight class in field control group.
			//
			$(fieldSelector, this.el)
				.closest(".control-group")
				.removeClass()
				.addClass("control-group");
			
			// If specified, set highlight class.
			//
			if(cssClass) {
				$(fieldSelector, this.el)
					.closest(".control-group")
					.addClass(cssClass);
			}
			
			// If specified, set highlight text next to field.
			//
			if(text) {
				$(fieldSelector, this.el)
					.next("span")
					.text(text);
			}
			else {
				$(fieldSelector, this.el)
				.next("span")
				.text("");				
			}
		};
		
		new MainRouter();
		new ContactsRouter();
		
		application.loginInfo = new LoginInfo();
		
		application.modalDialog = new ModalDialogView();
		$("#modaldialog").html(application.modalDialog.render().el);
		
		Backbone.history.start({root: "/addressbook"});
		Backbone.history.navigate("#login", true);	
	});
});
