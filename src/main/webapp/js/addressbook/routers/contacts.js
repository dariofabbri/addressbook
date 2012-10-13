define([
	"underscore", 
	"backbone",
	"addressbook/views/contactslist"], 
	function(_, Backbone, ContactsListView) {

	var contacts = Backbone.Router.extend({
		
		routes: {
			"ContactsManage": "list"
		},
		
		list: function() {
			var newView = new ContactsListView();
			this.show(newView, "#container");
		},
	});

	return contacts;
});
