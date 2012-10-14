define([
	"underscore", 
	"backbone",
	"jquery",
	"addressbook/views/contactslistitem",
	"text!templates/contactslist.html"], 
	function(_, Backbone, $, ItemView, listTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		events: {
		},
		
		render: function() {

			this.$el.append(_.template(listTemplate));

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
		}
	});
	
	return view;
});
