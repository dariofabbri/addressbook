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
		
		render: function() {

			this.$el.html(_.template(listTemplate));

			var that = this;
			_.each(this.collection.models, function(item) {
				that.renderItem(item);
			}, this);
			
			return this;
		},
		
		renderItem: function(item) {
			
			var itemView = new ItemView({
				model : item
			});
			$("tbody", this.el).append(itemView.render().el);
		},
		
		addItem: function() {
			
			Backbone.history.navigate("ContactsNew", true);
		}
	});
	
	return view;
});
