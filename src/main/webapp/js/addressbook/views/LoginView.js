var LoginView = Backbone.View.extend({
	tagName: "div",
	
	template: $("#loginViewTemplate").html(),

	render: function() {

		//this.$el.html(_.template(this.template));
		$(this.el).html("<h1>Pippo</h1>");
		//return this;
	},

	events: {
		//"click .delete" : "deleteBook"
	}
});
