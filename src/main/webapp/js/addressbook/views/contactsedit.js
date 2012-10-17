define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/contactsedit.html"], 
	function(_, Backbone, $, editTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		events: {
			"click a#save": "save",
			"click a#cancel": "cancel"
		},
		
		render: function() {

			this.$el.append(_.template(editTemplate, this.model.toJSON()));
			return this;
		},
		
		initialize: function() {
			
			this.model.on("error", this.showErrors, this);
		},
		
		autofocus: "#firstname",

		save: function() {
						
			var firstName = $("#firstname").val();
			var lastName = $("#lastname").val();
			var phoneNumber = $("#phonenumber").val();

			var result = this.model.set({
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber
			});
			if(!result) {
				return;
			}
			
			if(!this.model.id) {
				var max = _.max(application.contacts.models, function(contact) {
					return contact.id;
				});

				if(max) {
					this.model.id = max.id + 1;
				}
				else {
					this.model.id = 1;
				}
				
				application.contacts.add(this.model);
			}
			
			Backbone.history.navigate("ContactsList", true);			
		},
		
		cancel: function() {
			
			Backbone.history.navigate("ContactsList", true);
		},
		
		showErrors: function(model, errors) {
			
			if(errors.firstName) {
				$("#firstname", this.el)
					.closest(".control-group")
					.removeClass()
					.addClass("control-group")
					.addClass("error");
				$("#firstname", this.el)
					.next("span")
					.text(errors.firstName);
			}
			else {
				$("#firstname", this.el)
					.closest(".control-group")
					.removeClass()
					.addClass("control-group")
					.addClass("success");
				$("#firstname", this.el)
					.next("span")
					.text("");				
			}
			
			if(errors.lastName) {
				$("#lastname", this.el)
					.closest(".control-group")
					.removeClass()
					.addClass("control-group")
					.addClass("error");
				$("#lastname", this.el)
					.next("span")
					.text(errors.lastName);
			}
			else {
				$("#lastname", this.el)
					.closest(".control-group")
					.removeClass()
					.addClass("control-group")
					.addClass("success");
				$("#lastname", this.el)
					.next("span")
					.text("");
			}
			
			if(errors.phoneNumber) {
				$("#phonenumber", this.el)
					.closest(".control-group")
					.removeClass()
					.addClass("control-group")
					.addClass("error");
				$("#phonenumber", this.el)
					.next("span")
					.text(errors.phoneNumber);
			}
			else {
				$("#phonenumber", this.el)
					.closest(".control-group")
					.removeClass()
					.addClass("control-group")
					.addClass("success");
				$("#phonenumber", this.el)
					.next("span")
					.text("");
			}
		}
	});
	
	return view;
});
