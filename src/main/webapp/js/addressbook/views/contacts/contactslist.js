define([
	"underscore", 
	"backbone",
	"jquery",
	"addressbook/views/contacts/contactslistitem",
	"text!templates/contacts/contactslist.html"], 
	function(_, Backbone, $, ItemView, listTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		events: {
			"click a#add": "addItem"
		},
		
		initialize: function() {
			this.collection.on("all", this.render, this);
		},
		
		onClose: function() {
			this.collection.off("all", this.render);
		},
		
		childViews: [],

		render: function() {

			this.cleanChildViews();

			this.$el.html(_.template(listTemplate));

			var that = this;
			_.each(this.collection.models, function(item) {
				that.renderItem(item);
			}, this);
			
			return this;
		},
		
		renderItem: function(item) {
			
			// Create child view and add it to table body.
			//
			var itemView = new ItemView({
				model : item
			});
			$("tbody", this.el).append(itemView.render().el);
			
			// Store the item view in the list of child views, to avoid
			// memory leaks.
			//
			this.childViews.push(itemView);
		},
		
		addItem: function() {
			
			Backbone.history.navigate("ContactsNew", true);
		}
	});
	
	return view;
});
