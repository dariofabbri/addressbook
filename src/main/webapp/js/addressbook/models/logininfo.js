define([
	"underscore", 
	"backbone"], 
	function(_, Backbone) {
	
	var loginInfo = Backbone.Model.extend({
	
		defaults: {
			loggedOn: false,
			username: null,
			name: null,
			surname: null,
			logonTs: null,
			securityToken: null,
			permissions: []
		},
		
		doLogin: function(username, password) {
			
			if(username != "admin" || password != "admin")
				return false;
			
			this.set({
				loggedOn: true,
				username: "admin",
				name: "System",
				surname: "Administrator",
				logonTs: new Date(),
				securityToken: "b5f8b096-6cef-41e1-a864-b0ec8065259e",
				permissions: [
				              "Contacts",
				              "Users"]				
			});
			return true;
		}
	});
	
	return loginInfo;
});