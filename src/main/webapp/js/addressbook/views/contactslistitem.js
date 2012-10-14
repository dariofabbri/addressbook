define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/contactslistitem.html"], 
	function(_, Backbone, $, itemTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "tr",
		
		events: {
			"click a#remove": "remove",
			"click a#edit": "edit"
		},
		
		render: function() {
			
			this.$el.append(_.template(itemTemplate, this.model.toJSON()));
			return this;
		},
		
		remove: function() {
			alert("Remove! " + this.model.get("id"));
		},
		
		edit: function() {
			alert("Edit! " + this.model.get("id"));
		}
	});
	
	return view;
});
