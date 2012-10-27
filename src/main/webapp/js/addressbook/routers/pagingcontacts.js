define([
	"underscore", 
	"backbone",
	"addressbook/views/pagingcontacts/pagingcontactslist",
	"addressbook/views/pagingcontacts/pagingcontactsedit",
	"addressbook/views/pagingcontacts/pagingcontactssearch",
	"addressbook/models/contact",
	"addressbook/collections/contacts"], 
	function(
			_, 
			Backbone, 
			PagingContactsListView, 
			PagingContactsEditView,
			PagingContactsSearchView,
			Contact,
			Contacts) {

	var pagingContacts = Backbone.Router.extend({
		
		i: 0,
		
		collection: new Contacts(),
		
		routes: {
			"PagingContactsList": "list",
			"PagingContactsList/page/:page": "page",
			"PagingContactsNew": "create",
			"PagingContactsEdit/:id": "edit",
			"PagingContactsSearch": "search"
		},
		
		list: function() {
			
			this.collection.fetchPage();
			var view = new PagingContactsListView({collection: this.collection});
			
			this.show(view, "#container");
		},
		
		page: function(page) {
			
			this.collection.fetchPage(page);
		},
		
		create: function() {

			var view = new PagingContactsEditView({
				model: new Contact()
			});
			this.show(view, "#container");
		},
		
		edit: function(id) {
			
			var model = new Contact({id: id});
			model.fetch();
			var view = new PagingContactsEditView({model: model});
			
			this.show(view, "#container");
		},
		
		search: function() {

			var view = new PagingContactsSearchView({collection: this.collection});
			this.show(view, "#container");
		}
	});

	return pagingContacts;
});
