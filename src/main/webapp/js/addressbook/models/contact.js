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
			if(console) {
				console.log("Method: " + method);
				console.log("Model: " + model);
				console.log("Options: " + options);
			}
		},
		
		validate: function(changed) {
			
			var errors = {};
			
			if(!_.isUndefined(changed.firstName)) {
				if(_.isEmpty(changed.firstName)) {
					errors.firstName = "The field is required.";
				}
			}
			
			if(!_.isUndefined(changed.lastName)) {
				if(_.isEmpty(changed.lastName)) {
					errors.lastName = "The field is required.";
				}
			}
			
			if(!_.isUndefined(changed.phoneNumber)) {
				if(!/^[+0123456789\. ]+$/i.test(changed.phoneNumber)) {
					errors.phoneNumber = "Invalid phone number specified.";
				}
			}
			
			if(!_.isEmpty(errors)) {
				return errors;
			}
		}
	});
	
	return contact;
});