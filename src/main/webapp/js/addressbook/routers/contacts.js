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
			
			var newView = new ContactsListView();
			newView.collection = application.contacts;
			this.show(newView, "#container");
		},
		
		create: function() {
			
			var newView = new ContactsEditView();
			newView.model = new Contact();
			this.show(newView, "#container");
		},
		
		edit: function(id) {
			
			var newView = new ContactsEditView();
			newView.model = application.contacts.get(id);
			this.show(newView, "#container");
		}
	});

	return contacts;
});
