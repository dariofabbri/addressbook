define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/loginViewTemplate.html",
	"text!templates/alertTemplate.html",], 
	function(_, Backbone, $, loginViewTemplate, alertTemplate) {
	
	var LoginView = Backbone.View.extend({
		
		el: "#container",
	
		events: {
			"click #btnLogin": "processSubmit",
			"click #btnCancel": "cancelForm",
			"keypress": "manageEnter"
		},
	
		initialize: function() {
		
			this.render();
		},
		
		render: function() {
	
			this.$el.html(_.template(loginViewTemplate));
			return this;
		},
		
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
			
			if ($("#username").val() != "admin" ||
					$("#password").val() != "admin") {
				$("#notification").remove();
			    $("form>legend").after(
			   		_.template(alertTemplate,
						{
							alertClass: "alert-error", 
							title: "Error", 
							message: "Wrong credentials."}));
			} else {
				$("#notification").remove();
			    $("form>legend").after(
				   		_.template(alertTemplate,
							{
								alertClass: "alert-success", 
								title: "Success", 
								message: "Login executed."}));
			}
		}
	});
	
	return LoginView;
});
