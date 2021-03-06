define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/login/loginpanel.html",
	"text!templates/common/alert.html"], 
	function(_, Backbone, $, loginPanelTemplate, alertTemplate) {
	
	var loginView = Backbone.View.extend({
	
		events: {
			"click #login": "processSubmit",
			"click #cancel": "cancelForm",
			"keypress": "manageEnter"
		},
		
		render: function() {
			
			this.$el.html(_.template(loginPanelTemplate));
			return this;
		},
		
		autofocus: "#username",
		
		manageEnter: function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				this.executeLogin();
			}
		},
		
		cancelForm: function(e) {
			
			e.preventDefault();
			alert(application.loginInfo.get("loggedOn"));
		},
		
		processSubmit: function(e) {
			
			e.preventDefault();
			this.executeLogin();
		},
		
		executeLogin: function() {
			
			var username = $("#username").val();
			var password = $("#password").val();
			if(!application.loginInfo.doLogin(username, password)) {
				$("#notification").remove();
			    $("form>legend").after(
			   		_.template(alertTemplate, {
							alertClass: "alert-error", 
							title: "Error", 
							message: "Wrong credentials."}));
			} else {
			    Backbone.history.navigate("home", true);	
			}
		}
	});
	
	return loginView;
});
