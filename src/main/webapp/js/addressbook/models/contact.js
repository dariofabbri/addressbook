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
		
		urlRoot: "/addressbook/api/contacts",			
		
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
				if(_.isEmpty(changed.phoneNumber)) {
					errors.phoneNumber = "The field is required.";
				}
				else if(!/^[+0123456789\. ]+$/i.test(changed.phoneNumber)) {
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