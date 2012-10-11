define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/navbar.html"], 
	function(_, Backbone, $, navbarTemplate) {
	
	var navbarView = Backbone.View.extend({
		
		el: "#navbar",
	
		events: {
		},
		
		render: function() {

			this.$el.html(_.template(navbarTemplate));
			return this;
		},
	});
	
	return navbarView;
});
