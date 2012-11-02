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

		render: function(e) {

			this.cleanChildViews();
			
			// Show main part of the view.
			//
			this.$el.html(_.template(listTemplate, {
				collection: this.collection
			}));
			
			// If the collection has filters applied, 
			// show the special button to clean up filters.
			//
			$("a#reset-filters", this.el).tooltip("show");

			// Render an item view for each model in the collection.
			//
			var that = this;
			_.each(this.collection.models, function(item) {
				that.renderItem(item);
			}, this);
			that = null;
			
			// Add a pager at the bottom of the view.
			//
			var pager = new Pager({
				collection: this.collection,
				baseUrl: "PagingContactsList/page/"
			});
			this.$el.append(pager.render().el);
			
			// Store the pager view in the list of child views, to avoid
			// memory leaks.
			//
			this.childViews.push(pager);
			
			return this;
		},
		
		renderItem: function(item) {
			
			// Create and render the item view.
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
