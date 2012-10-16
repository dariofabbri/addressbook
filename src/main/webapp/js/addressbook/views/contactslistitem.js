define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/contactslistitem.html",
	"text!templates/contactconfirmdelete.html",], 
	function(_, Backbone, $, itemTemplate, confirmTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "tr",
		
		events: {
			"click a#remove": "removeItem",
			"click a#confirmRemove": "confirmRemoveItem",
			"click a#edit": "editItem",
			"click a#cancelRemove": "cancelRemove"
		},
		
		render: function() {
			
			this.$el.append(_.template(itemTemplate, this.model.toJSON()));
			return this;
		},
		
		removeItem: function() {
			
			this.$el.append(_.template(confirmTemplate));
			$("#confirm").modal("show");
		},
		
		confirmRemoveItem: function() {
			
			$("#confirm").modal("hide");
			this.model.destroy();
			this.remove();
		},
		
		cancelRemove: function() {
			
			$("#confirm").modal("hide");
		},
		
		editItem: function() {
			Backbone.history.navigate("#ContactsEdit/" + this.model.id, true);
		}
	});
	
	return view;
});
