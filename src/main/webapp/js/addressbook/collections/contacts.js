define([
	"underscore", 
	"backbone",
	"addressbook/collections/pagingcollection",
	"addressbook/models/contact"], 
	function(_, Backbone, PagingCollection, Contact) {
	
	var contacts = PagingCollection.extend({

		model: Contact,
		
		url: "/addressbook/api/contacts",
	});
	
	return contacts;
});