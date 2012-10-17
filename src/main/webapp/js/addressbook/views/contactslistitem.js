define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/contactslistitem.html",
	"text!templates/contactsconfirmremove.html"], 
	function(_, Backbone, $, itemTemplate, confirmTemplate) {
	
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
			
			this.$el.append(_.template(confirmTemplate));
			$("#confirmRemoveDialog", this.$el).modal({show: true, backdrop: "static"});
		},
		
		editItem: function() {
			Backbone.history.navigate("#ContactsEdit/" + this.model.id, true);
		}
	});
	
	return view;
});
