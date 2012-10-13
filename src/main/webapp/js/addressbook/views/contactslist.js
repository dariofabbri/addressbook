define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/contactslist.html"], 
	function(_, Backbone, $, contactsListTemplate) {
	
	var view = Backbone.View.extend({
	
		events: {
		},
		
		render: function() {
			
			this.$el.html(_.template(contactsListTemplate));
			return this;
		},
	});
	
	return view;
});
