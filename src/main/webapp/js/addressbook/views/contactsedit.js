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

			this.$el.html(_.template(editTemplate, this.model.toJSON()));
			return this;
		},
		
		initialize: function() {
			
			this.model.on("error", this.showErrors, this);
			this.model.on("change", this.render, this);
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
			
			if(result) {
				this.model.save({}, {
					success: function() {
						Backbone.history.navigate("ContactsList", true);		
					}
				});
			}
		},
		
		cancel: function() {
			
			Backbone.history.navigate("ContactsList", true);
		},
		
		showErrors: function(model, errors) {
			
			if(errors.firstName) {
				this.highlightField("#firstname", "error", errors.firstName);
			}
			else {
				this.highlightField("#firstname", "success");
			}
			
			if(errors.lastName) {
				this.highlightField("#lastname", "error", errors.lastName);
			}
			else {
				this.highlightField("#lastname", "success");
			}
			
			if(errors.phoneNumber) {
				this.highlightField("#phonenumber", "error", errors.phoneNumber);
			}
			else {
				this.highlightField("#phonenumber", "success");
			}
		}
	});
	
	return view;
});
