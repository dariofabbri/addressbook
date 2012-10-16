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
		
		autofocus: "#firstname",

		save: function() {
						
			var firstName = $("#firstname").val();
			var lastName = $("#lastname").val();
			var phoneNumber = $("#phonenumber").val();

			this.model.set("firstName", firstName);
			this.model.set("lastName", lastName);
			this.model.set("phoneNumber", phoneNumber);
			
			if(!this.model.id) {
				var max = _.max(application.contacts.toJSON(), function(contact) {
					return contact.id;
				});
				
				this.model.id = max.id + 1;
				application.contacts.add(this.model);
			}
			
			Backbone.history.navigate("ContactsList", true);			
		},
		
		cancel: function() {
			
			Backbone.history.navigate("ContactsList", true);
		}
	});
	
	return view;
});
