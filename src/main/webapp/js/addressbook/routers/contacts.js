define([
	"underscore", 
	"backbone",
	"addressbook/views/contactslist",
	"addressbook/views/contactsedit",
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
			var newView = new ContactsListView({collection: collection});
			
			this.show(newView, "#container");
		},
		
		create: function() {

			var newView = new ContactsEditView({
				model: new Contact()
			});
			this.show(newView, "#container");
		},
		
		edit: function(id) {
			
			var model = new Contact({id: id});
			model.fetch();
			var newView = new ContactsEditView({model: model});
			
			this.show(newView, "#container");
		}
	});

	return contacts;
});
