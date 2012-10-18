define([
	"underscore", 
	"backbone",
	"addressbook/models/contact"], 
	function(_, Backbone, Contact) {
	
	var contacts = Backbone.Collection.extend({

		model: Contact,
		
		url: "/addressbook/api/contacts"			
	});
	
	return contacts;
});