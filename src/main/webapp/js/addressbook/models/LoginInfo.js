LoginInfo = Backbone.Model.extend({

	defaults: {
		loggedOn: false,
		username: null,
		name: null,
		surname: null,
		logonTs: null,
		securityToken: null
	},
	
	initialize: function(args) {
		
	}
});