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
	});
	
	return loginInfo;
});