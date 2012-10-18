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

			var that = this;
			$.ajax({
				url: "/addressbook/api/security",
				type: "POST",
				dataType: "json",
				data: JSON.stringify({username: username, password: password}),
				contentType: "application/json",
				async: false,
				success: function(data, textStatus, jqXHR){
					that.set("securityToken", data.token);
					that.set("loggedOn", true);
					that.set("username", username);
				}
			});
			
			return this.get("loggedOn");
		}
	});
	
	return loginInfo;
});