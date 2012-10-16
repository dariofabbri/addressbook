define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/contactslistitem.html"], 
	function(_, Backbone, $, itemTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "tr",
		
		events: {
			"click a#remove": "removeItem",
			"click a#edit": "editItem"
		},
		
		render: function() {
			
			this.$el.append(_.template(itemTemplate, this.model.toJSON()));
			return this;
		},
		
		removeItem: function() {
			this.model.destroy();
			this.remove();
		},
		
		editItem: function() {
			Backbone.history.navigate("#ContactsEdit/" + this.model.id, true);
		}
	});
	
	return view;
});
