define([
	"underscore", 
	"backbone"], 
	function(_, Backbone) {
	
	var contact = Backbone.Model.extend({
	
		defaults: {
			id: null,
			firstName: "",
			lastName: "",
			phoneNumber: ""
		}
	});
	
	return contact;
});