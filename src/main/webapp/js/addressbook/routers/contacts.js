define([
	"underscore", 
	"backbone",
	"addressbook/views/contactslist",
	"addressbook/collections/contacts"], 
	function(_, Backbone, ContactsListView, Contacts) {

	var contacts = Backbone.Router.extend({
		
		routes: {
			"ContactsManage": "list"
		},
		
		list: function() {
			var collection = new Contacts();
			collection.add([
                {
                	id: 1,
                	firstName: "Dario",
                	lastName: "Fabbri",
                	phoneNumber: "328.4414000"
                },
                {
                	id: 2,
                	firstName: "Selvana",
                	lastName: "Ruggieri",
                	phoneNumber: "328.0814868"
                },
			]);
			
			var newView = new ContactsListView();
			newView.collection = collection;
			this.show(newView, "#container");
		},
	});

	return contacts;
});
