define([
	"underscore", 
	"backbone",
	"jquery",
	"addressbook/views/common/pager",
	"addressbook/views/pagingcontacts/pagingcontactslistitem",
	"text!templates/pagingcontacts/pagingcontactslist.html"], 
	function(_, Backbone, $, Pager, ItemView, listTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		events: {
			"click a#add": "addItem",
			"click a#search": "search",
			"click a#reset-filters": "resetFilters",
		},
		
		initialize: function() {
			this.collection.on("reset", this.render, this);
		},
		
		onClose: function() {
			this.collection.off("reset", this.render);
		},
		
		childViews: [],
		
		render: function() {
			
			this.cleanChildViews();
			
			// Show main part of the view.
			//
			this.$el.html(_.template(listTemplate, {
				collection: this.collection
			}));
			
			// If the collection has filters applied, 
			// show special button.
			//
			$("a#reset-filters", this.el).tooltip("show");

			var that = this;
			_.each(this.collection.models, function(item) {
				that.renderItem(item);
			}, this);
			
			var pager = new Pager({
				collection: this.collection,
				baseUrl: "PagingContactsList/page/"
			});
			this.childViews.push(pager);
			this.$el.append(pager.render().el);
			
			return this;
		},
		
		renderItem: function(item) {
			
			var itemView = new ItemView({
				model : item
			});
			this.childViews.push(itemView);
			$("tbody", this.el).append(itemView.render().el);
		},
		
		addItem: function() {
			
			Backbone.history.navigate("PagingContactsNew", true);
		},
		
		search: function() {
			
			Backbone.history.navigate("PagingContactsSearch", true);
		},

		resetFilters: function() {

			$("a#reset-filters", this.el).tooltip("destroy");

			this.collection.resetFilters();
			this.collection.fetchPage();
		}
	});
	
	return view;
});
