define([
	"underscore", 
	"backbone",
	"addressbook/views/pagingcontacts/pagingcontactslist",
	"addressbook/views/pagingcontacts/pagingcontactsedit",
	"addressbook/models/contact",
	"addressbook/collections/contacts"], 
	function(
			_, 
			Backbone, 
			PagingContactsListView, 
			PagingContactsEditView,
			Contact,
			Contacts) {

	var pagingContacts = Backbone.Router.extend({
		
		collection: new Contacts(),
		
		routes: {
			"PagingContactsList": "list",
			"PagingContactsList/page/:page": "page",
			"PagingContactsNew": "create",
			"PagingContactsEdit/:id": "edit"
		},
		
		list: function() {
			
			this.collection.fetchPage(1);
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
		}
	});

	return pagingContacts;
});
