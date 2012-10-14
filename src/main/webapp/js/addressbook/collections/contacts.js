define([
	"underscore", 
	"backbone",
	"addressbook/models/contact"], 
	function(_, Backbone, Contact) {
	
	var contacts = Backbone.Collection.extend({

		model: Contact
			
	});
	
	return contacts;
});