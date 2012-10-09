define([
	"underscore", 
	"backbone"], 
	function(_, Backbone) {
	
	var LoginInfo = Backbone.Model.extend({
	
		defaults: {
			loggedOn: false,
			username: null,
			name: null,
			surname: null,
			logonTs: null,
			securityToken: null
		},
	});
	
	return LoginInfo;
});