define([
	"underscore", 
	"backbone",
	"jquery",
	"addressbook/views/pager",
	"addressbook/views/pagingcontactslistitem",
	"text!templates/pagingcontactslist.html"], 
	function(_, Backbone, $, Pager, ItemView, listTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		events: {
			"click a#add": "addItem"
		},
		
		initialize: function() {
			this.collection.on("reset", this.render, this);
		},
		
		render: function() {

			this.$el.html(_.template(listTemplate));

			var that = this;
			_.each(this.collection.models, function(item) {
				that.renderItem(item);
			}, this);
			
			var pager = new Pager({
				collection: this.collection,
				baseUrl: "PagingContactsList/page/"
			});
			this.$el.append(pager.render().el);
			
			return this;
		},
		
		renderItem: function(item) {
			
			var itemView = new ItemView({
				model : item
			});
			$("tbody", this.el).append(itemView.render().el);
		},
		
		addItem: function() {
			
			Backbone.history.navigate("PagingContactsNew", true);
		}
	});
	
	return view;
});
