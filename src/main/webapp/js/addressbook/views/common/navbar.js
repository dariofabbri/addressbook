define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/common/navbar.html"], 
	function(_, Backbone, $, navbarTemplate) {
	
	var navbarView = Backbone.View.extend({

		events: {
		},
		
		render: function() {

			this.$el.html(_.template(navbarTemplate));
			return this;
		}
	});
	
	return navbarView;
});
