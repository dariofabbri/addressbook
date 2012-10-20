define([
	"underscore", 
	"backbone",
	"addressbook/models/contact"], 
	function(_, Backbone, Contact) {
	
	var contacts = Backbone.Collection.extend({

		model: Contact,
		
		url: "/addressbook/api/contacts",
		
		parse: function(response) {
			
			this.page = response.page;
			this.pageSize = response.pageSize;
			this.recordsFound = response.recordsFound;
			
			return response.results;
		}
	});
	
	return contacts;
});