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
		},
	
		sync: function(method, model, options) {
			console.log("Method: " + method);
			console.log("Model: " + model);
			console.log("Options: " + options);
		}
	});
	
	return contact;
});