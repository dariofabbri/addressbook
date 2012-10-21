define([
	"underscore", 
	"backbone",
	"addressbook/views/contacts/contactslist",
	"addressbook/views/contacts/contactsedit",
	"addressbook/models/contact",
	"addressbook/collections/contacts"], 
	function(
			_, 
			Backbone, 
			ContactsListView, 
			ContactsEditView,
			Contact,
			Contacts) {

	var contacts = Backbone.Router.extend({
		
		routes: {
			"ContactsList": "list",
			"ContactsNew": "create",
			"ContactsEdit/:id": "edit"
		},
		
		list: function() {
			
			var collection = new Contacts();
			collection.fetch();
			var view = new ContactsListView({collection: collection});
			
			this.show(view, "#container");
		},
		
		create: function() {

			var view = new ContactsEditView({
				model: new Contact()
			});
			this.show(view, "#container");
		},
		
		edit: function(id) {
			
			var model = new Contact({id: id});
			model.fetch();
			var view = new ContactsEditView({model: model});
			
			this.show(view, "#container");
		}
	});

	return contacts;
});
