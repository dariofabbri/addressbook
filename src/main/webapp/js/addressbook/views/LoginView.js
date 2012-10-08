var LoginView = Backbone.View.extend({
	
	template: $("#loginViewTemplate").html(),

	events: {
		"click #btnLogin" : "executeLogin",
		"click #btnCancel" : "cancelForm",
	},

	initialize: function() {
	
		this.el = $("#container");
	},
	
	render: function() {

		$(this.el).html(_.template(this.template));
		//$("#container").html(_.template(this.template));
		return this;
	},
	
	cancelForm: function(e) {
		
		e.preventDefault();
		
		alert("Not allowed!");
	},
	
	executeLogin: function(e) {
		
		e.preventDefault();
		
		var template = $("#alertTemplate").html();

		if ($("#username").val() != "admin" ||
				$("#password").val() != "admin") {
			$("#notification").remove();
		    $("form>legend").after(
		   		_.template(template,
					{
						alertClass: "alert-error", 
						title: "Error", 
						message: "Wrong credentials."}));
		} else {
			$("#notification").remove();
		    $("form>legend").after(
			   		_.template(template,
						{
							alertClass: "alert-success", 
							title: "Success", 
							message: "Login executed."}));
		}

		// Return false to cancel normal form submit event methods.
		//
		return false;
	}
});
