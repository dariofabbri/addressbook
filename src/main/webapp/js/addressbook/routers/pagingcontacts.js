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
		
		routes: {
			"PagingContactsList": "list",
			"PagingContactsNew": "create",
			"PagingContactsEdit/:id": "edit"
		},
		
		list: function() {
			
			var collection = new Contacts();
			collection.fetch();
			var view = new PagingContactsListView({collection: collection});
			
			this.show(view, "#container");
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
