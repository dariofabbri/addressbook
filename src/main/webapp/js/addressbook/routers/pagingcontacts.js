define([
	"underscore", 
	"backbone",
	"addressbook/views/pagingcontactslist",
	"addressbook/views/pagingcontactsedit",
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
			
			this.collection.fetch();
			var view = new PagingContactsListView({collection: this.collection});
			
			this.show(view, "#container");
		},
		
		page: function(page) {

			var options = {
				data: {
					page: page || 1
				}	
			};
			
			this.collection.fetch(options);
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
